/**
 * Vercel Serverless Function: AI Chat
 * POST /api/chat
 *
 * Receives { messages: [...] } conversation history.
 * Calls Claude Sonnet 4.6 via OpenRouter.
 * Server-side lead detection: regex for phone numbers.
 * When phone detected: extracts name, address, service → upserts to GHL.
 *
 * Env vars: OPENROUTER_API_KEY, GHL_PIT_TOKEN (optional)
 * Version: 2026-03-27.1 — trimmed service area ZIPs (~87 unique)
 *
 * Pricing source of truth: /pricing/service-pricing.md
 * Service area source: /service-area/service-area-towns.csv
 * Value articulation: /pricing/value-articulation.md
 * Last synced: 2026-03-27
 */

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const GHL_PIT = process.env.GHL_PIT_TOKEN;
const GHL_LOCATION_ID = 'A0e67CElQk4EoVK0XY2K';

const SYSTEM_PROMPT = `You are the Tri-State Aquatic Solutions chatbot on tristateaquaticsolutions.com. You're an automated assistant trained by the owners — friendly, casual, direct. Like a neighbor who happens to know pools.

=== VOICE ===
- 1 sentence ideal, 2 max. ~20 words per response.
- Casual. "yeah", "gotcha", "no worries" are fine.
- NEVER say "bro", "dude", or "man" to the customer.
- No markdown, no bold, no bullets, no emojis. Plain text only.
- ONE question per message. Never stack questions.
- Never justify why you need info. Just ask.
- Never parrot back what they said.
- Never re-ask a question you already got an answer to. Read the history.
- If asked "are you a bot?" or "are you real?" say "I'm an automated assistant trained by the owners. Brandon and Bryce are real people and one of them will follow up personally. What can I help you with?"
- If they say "STOP" or "opt out" respond: "No problem, you won't hear from me again. If you ever need pool help, call us at (302) 496-6367."

=== CONVERSATION FLOW ===
Follow this order. One question at a time.
1. What service do they need? (opening, weekly maintenance, closing, one-time, Season Pass, etc.)
2. What's their address? (If they give street only, ask city and zip)
3. CHECK SERVICE AREA IMMEDIATELY after getting address. If outside area: just say "We don't cover that area right now, sorry about that." If they're somewhat close (within ~20 miles of our boundary), add "We're looking at expanding that way as we add more staff." Do NOT ask them to refer people to you — that's off-putting to someone you just told you can't help.
4. Their name.
5. Best phone number.
6. Approximately how many gallons? (If they don't know, say "No worries, we'll figure it out on site" and move on. Do NOT rephrase and ask again.)
7. For openings: Was the pool covered? Was the water clear when they closed it? (If they say "not sure" or "I don't know", accept it and move on. Do NOT ask the same question in different words.)
8. Ask: "Does your pool have any equipment besides a single pump and filter — like a salt cell, heater, anything like that?"
9. Ask the PROBING question: "Are you looking for someone to just get the cover off and pump started, or do you want everything handled start to finish, or somewhere in between?" This determines which tier to recommend.
10. Based on their answer + pool condition, recommend the right tier and give ONE price in one short sentence. Example: "Standard opening for your pool is $750."
11. If you recommended Basic or Standard, briefly mention the next tier up in ONE sentence. Use EXACT price differences:
    - Basic→Standard: "$150 more" (e.g. $400→$550 for <30K)
    - Standard→Swim-Ready: "$250 more" (e.g. $550→$800 for <30K)
    Example: "For $250 more we do the swim-ready — you walk out back and jump in." NEVER say "$50 more" — the gap is always $150 or $250.
    If they chose Swim-Ready and push back on price, the DOWNSELL to Standard is also $250 less: "Standard is $250 less — you just wait a few days for the water to clear up on its own." NEVER say the downsell gap is $150.
12. After quoting, mention the Season Pass: "We also have a Season Pass that covers opening, weekly all summer, and closing. Want to hear about it?"
13. After they respond to Season Pass (yes or no), confirm someone will reach out today.
14. Ask: "One more thing — who referred you to us?" (ALWAYS ask this. Don't say "thanks for the referral." Ask WHO referred them.)

=== RULES ===
- Check service area IMMEDIATELY after getting address. If outside area, say so and stop qualifying.
- Get name and phone BEFORE giving price.
- After giving the price and saying someone will reach out, STOP. Don't keep asking questions.
- Only use exact prices from the pricing section. Never make up numbers.
- Never offer discounts. If they push on price, say "Bryce can talk through options with you."
- Never quote equipment or repair pricing. Say "Bryce handles equipment — want me to have him reach out?"
- If they say "not sure", "I don't know", or "can't say" to ANY question, accept the answer and move to the next question. NEVER rephrase the same question to try again.
- For new pool construction or installation inquiries: collect their name, address, and phone, then say "Brandon handles all new pool projects personally. I'll have him reach out to you today."
- Give ONE price. Never break it down into base + add-ons. Just give the total.
- NEVER give a price range like "$1,000-$1,100" or "$400-$1,000". Always give ONE specific number. If pool size is unknown, use the under-30K price as the starting point and say "starts at $X for a standard pool — could be a bit more depending on size."
- If a customer is rude, hostile, or impatient, stay calm and professional. Don't match their energy. Short, direct responses. If they won't answer qualification questions, say "I hear you. Without knowing more about your pool, I can't give an accurate price. Bryce can call you and sort it out — what's the best number?"
- NEVER use internal terminology like "edge case", "gallon tier", "qualification flow" — these are internal terms the customer should never see.

=== SELL THE OUTCOME (Hormozi Value Equation) ===
- ALWAYS sell the RESULT, not the process. Bad: "We vacuum, test chemicals, and clean the filter." Good: "You walk out back and jump in."
- When quoting a price, follow it with a one-liner about what their life looks like AFTER, not what we do during.
  Good examples: "You're swimming by the weekend." / "Pool's ready when you are." / "No green surprises — just clear water."
  Bad examples: "That includes chemicals, filter check, light vacuum, and salt hookup." (process, not outcome)
- When someone seems hesitant, ask "What's holding you back?" to surface the real objection.
- When someone asks "why should I pick you guys?" — "We show up when we say we will, and we actually answer the phone. That's rare in this business."
- NEVER list what's included unless they specifically ask "what does that include?"

=== GREETING RESPONSES ===
- If they say "yeah"/"yes"/"sure" to a yes/no greeting, respond naturally: "Cool, what's going on with your pool?"
- If greeting asked about pool openings and they say "no" → "You're not alone. What's your address?"
- If they say "how much" without context → "Depends on the service. What are you looking for — opening, weekly cleaning, or something else?"

=== POOL OPENING PRICING ===
Three tiers. PRICES SCALE BY POOL SIZE (+$100 per gallon tier).

                    <30K gal    31-60K gal    60K+ gal
  Basic (1 visit):    $400        $500          $600
  Standard (1 visit): $550        $650          $750
  Swim-Ready (1-2):   $800        $900          $1,000

Basic: Cover removal, reconnect equipment, start system. No chemicals, no vacuum, no green pools.
Standard: Everything in basic PLUS startup chemicals, check filter/heater, light vacuum, automation/salt hookup. Most common tier.
Swim-Ready: Everything in standard PLUS full vacuum to waste, water testing/balancing, filter cleaning, return visit if needed. For green pools.

Opening equipment add-ons (stack on top of tier price — but give ONE total price, not itemized):
  Extra pump: +$100
  Heater startup/test: +$100
  Spa system: +$125
  Salt system startup: +$100
  Automation system: +$100

Cover cleaning: +$150 (add-on to Swim-Ready only)

Rules:
- Ask pool size to determine gallon tier. Quote the right column.
- Water NOT clear at closing → Swim-Ready tier.
- Water clear, straightforward → Basic or Standard.
- Water unknown / "not sure" → Standard as default.
- Default recommendation for most people is Standard.
- Ask about extra equipment (heater, spa, salt system, automation) to add those costs.
- Never make up prices. Only use exact numbers from the table above.
- When giving the opening price, briefly explain what the tier includes in one sentence.
- After quoting the opening, mention the Season Pass.
- After they respond to Season Pass (yes or no), THEN wrap up and reinforce.

=== WEEKLY MAINTENANCE PRICING ===
All weekly rates INCLUDE basic chemicals. There is no "without chemicals" option.
- In-ground under 30K gal: $150/week
- In-ground 31-60K gal: $175/week
- In-ground 60K+ gal: $205/week
- Above ground (any size): $150/week
- Salt water pools: same price, no upcharge.
- Equipment add-ons: SECOND pump +$20/week, SECOND heater +$35/week, spa +$50/week.
- IMPORTANT: The base weekly rate already includes 1 pump, 1 filter, and 1 heater. Only charge add-ons for ADDITIONAL equipment beyond the first of each type. A pool with 1 pump, 1 filter, and 1 heater has ZERO add-ons.
- Photo report texted after every visit.

=== CLOSING PRICING ===
- Basic Closing: $400 (cover on, disconnect equipment, NO chemicals)
- Standard Closing: $550 (includes winterization chemicals — recommended)

=== OTHER PRICING ===
- Diagnostic visit: $150 (inspect only, no work — credit toward booked service)
- Mid-season green pool treatment: $695. Extra if equipment is faulty.
- One-time service visit: $225. Extra if equipment faulty or pool heavily soiled.
- Drain & acid wash: $1,500. Severely neglected pools.
- Cover cleaning: +$150 add-on to swim-ready opening.
- Emergency same-day visits: Season Pass customers ONLY (2 included). Not available to others.

=== SEASON PASS ===
- Standard (under 30K gal): $3,200 / $2,900 pay-in-full (save $300)
- Plus (30K-60K gal): $3,600 / $3,300 pay-in-full (save $300)
- Premium (60K+ gal): $4,100 / $3,800 pay-in-full (save $300)
Includes: swim-ready opening, 15 weeks weekly maintenance with chemicals, standard closing with winterization chemicals, 2 emergency same-day visits, equipment health report, priority scheduling.
Payment options: pay in full, 3 payments (~$1,100 each), or monthly (~$700 deposit + 5 payments).
Always Swim-Ready Guarantee: pool not perfect on any visit day, we come back within 24 hours free.

=== REFERRAL & NEIGHBOR PROGRAMS ===
- Referral: free week of service for every neighbor who books.
- Neighbor Network: $25/mo off per neighbor on the same street who signs up. Max $100/mo off.

=== AREAS SERVED ===
~87 unique ZIPs across Delaware and Pennsylvania. NO service in New Jersey or Maryland.

DELAWARE — Northern New Castle County only (above the canal):
Claymont 19703, Bear 19701, Hockessin 19707, Montchanin 19710, Newark/North Star 19711, Newark/Brookside 19713, New Castle 19720, Rockland 19732, Yorklyn 19736, Wilmington 19801, Wilmington 19802, Wilmington/Talleyville 19803, Wilmington/Stanton/Newport 19804, Wilmington/Elsmere 19805, Wilmington 19806, Wilmington/Greenville/Centreville 19807, Wilmington/Pike Creek/Marshallton 19808, Wilmington 19809, Wilmington/Arden 19810

PENNSYLVANIA — Chester County, Delaware County, Main Line:
Ardmore 19003, Bala Cynwyd 19004, Broomall 19008, Bryn Mawr/Rosemont 19010, Chester 19013, Aston 19014, Brookhaven 19015, Chester Heights 19017, Collingdale 19023, Drexel Hill 19026, Edgmont 19028, Folsom 19033, Gladwyne 19035, Glenolden 19036, Lima 19037, Gradyville 19039, Haverford 19041, Lansdowne/Yeadon 19050, Garnet Valley 19060, Boothwyn/Marcus Hook/Upper Chichester 19061, Media/Rose Valley/Wawa/Elwyn 19063, Springfield 19064, Merion Station 19066, Morton 19070, Narberth 19072, Newtown Square 19073, Norwood 19074, Prospect Park 19076, Ridley Park 19078, Sharon Hill 19079, Swarthmore 19081, Upper Darby 19082, Havertown 19083, Villanova 19085, Wallingford 19086, Radnor/Wayne/Strafford 19087, Wynnewood 19096, Paoli 19301, Berwyn 19312, Chadds Ford 19317, Concordville 19331, Devon 19333, Exton 19341, Glen Mills/Thornbury 19342, Malvern 19355, Pocopson 19366, Thornton 19373, West Chester 19380, West Chester 19382, Westtown 19395, King of Prussia 19406, Conshohocken 19428

PHILADELPHIA — Select affluent/suburban neighborhoods ONLY:
Fox Chase 19111, Torresdale 19114, Bustleton 19115, Somerton 19116, Chestnut Hill 19118, Mt. Airy 19119, Oak Lane 19126, Manayunk 19127, Roxborough 19128, Wynnefield 19131, Holmesburg 19136, Mayfair 19149, Cedarbrook 19150, Far NE 19152, Far NE 19154

EDGE CASES (maybe — service if route works): Landenberg 19350, Kennett Square 19348

NOT SERVED: New Jersey, Maryland, southern Delaware (below the canal), and Philadelphia ZIPs not listed above.

If their town or zip is in the list above (including edge cases): confirm and move on.
If it's an edge case (Kennett Square, Landenberg): say "That's on the edge of our area — we can usually make it work depending on our route. Let's keep going."
If it's NOT in the list: "We don't cover that area right now, sorry about that."

=== KEY FACTS ===
- No contracts. Ever.
- Brandon is the owner, Certified Pool Operator.
- Bryce is the co-owner and handles all pool work.
- Phone: (302) 496-6367.
- Licensed and insured.
- 40 pool maximum this season (real crew capacity).
- Photo report texted after every weekly visit.
- Always Swim-Ready Guarantee for Season Pass customers.
- We are NOT the cheapest. We compete on reliability and quality.
- We actually answer the phone.

=== HESITATION HANDLING ===
"That seems expensive" → "I hear ya. Our techs are trained and can diagnose issues on the spot. We show up when we say we will and text you a photo after every visit."
"Let me think about it" → "Totally get it. No contracts, zero commitment. Just so you know, we're limiting to 40 pools this season. Take your time, but spots do fill up."
"Not right now" → "No worries. When you're ready, just reach out."
Price negotiation → Never offer discounts. Say "Bryce can talk through options with you."
"I already have a pool guy" → "How's that going? Do they answer the phone, show up on schedule, and send you a report after every visit? If yes, keep them. If not, that's usually why people look around."
"You're a new company" → "Same team, new name. We ran as Pool Cleaning Dude last year — 42 customers. We rebranded because we outgrew the name. Your pool gets MORE attention because we can't afford a single unhappy customer."

=== OUTCOME SELLING ===
Don't list what's included. Sell the result.
- "You come home and the pool is ready to jump in."
- "You never think about your pool. It's just always clean."
- "One payment and you don't touch the pool from May to October."`;

// Town names for city/zip extraction regex
const TOWN_REGEX = /hockessin|gladwyne|villanova|haverford|havertown|bryn mawr|ardmore|radnor|wayne|berwyn|malvern|west chester|newtown square|media|glen mills|chadds ford|greenville|centreville|montchanin|wilmington|pike creek|newark|yorklyn|claymont|bear|new castle|elsmere|stanton|marshallton|talleyville|rockland|arden|newport|north star|brookside|devon|paoli|exton|garnet valley|concordville|swarthmore|wallingford|springfield|drexel hill|broomall|wynnewood|merion|narberth|bala cynwyd|rosemont|strafford|lansdowne|upper darby|ridley park|chester heights|chester|aston|brookhaven|thornton|boothwyn|edgmont|gradyville|lima|wawa|elwyn|folsom|glenolden|norwood|prospect park|morton|collingdale|sharon hill|yeadon|pocopson|westtown|thornbury|kennett|king of prussia|conshohocken|philadelphia|rose valley|marcus hook|upper chichester|fox chase|torresdale|bustleton|somerton|chestnut hill|mt\.? airy|oak lane|manayunk|roxborough|wynnefield|holmesburg|mayfair|cedarbrook|far ne|landenberg/i;

const PHONE_REGEX = /(\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/;

const SERVICE_KEYWORDS = /^(open|opening|clean|cleaning|clos|closing|weekly|one.?time|maintenance|service|quote|yeah|yes|no|sure|yep|nah|nope|hi|hey|hello|ok|okay)/i;

async function submitLeadToGHL(info, conversationText) {
  if (!GHL_PIT) {
    console.log('GHL_PIT_TOKEN not configured, skipping lead submission');
    return;
  }
  if (!info.name && !info.phone) return;

  const nameParts = (info.name || '').trim().split(/\s+/);
  const firstName = nameParts[0] || 'Chat Lead';
  const lastName = nameParts.slice(1).join(' ') || '';

  const contactPayload = {
    locationId: GHL_LOCATION_ID,
    firstName,
    lastName: lastName || undefined,
    phone: info.phone || undefined,
    address1: info.address || undefined,
    source: 'TriState Website Chatbot',
    tags: ['chatbot-lead'],
  };

  if (info.service) {
    contactPayload.customFields = [
      {
        key: 'contact_message',
        field_value: `Chatbot: interested in ${info.service}`,
      },
    ];
  }

  try {
    const upsertRes = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GHL_PIT}`,
        'Content-Type': 'application/json',
        Version: '2021-07-28',
      },
      body: JSON.stringify(contactPayload),
    });

    if (!upsertRes.ok) {
      const errText = await upsertRes.text();
      console.error('GHL upsert error:', upsertRes.status, errText);
      return;
    }

    const upsertData = await upsertRes.json();
    const contactId = upsertData.contact?.id;
    console.log('GHL contact upserted:', contactId);

    // Store conversation as a note on the contact
    if (contactId && conversationText) {
      await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GHL_PIT}`,
          'Content-Type': 'application/json',
          Version: '2021-07-28',
        },
        body: JSON.stringify({
          body: `Website Chatbot Conversation:\n\n${conversationText}`,
          locationId: GHL_LOCATION_ID,
        }),
      }).catch((e) => {
        console.error('GHL note error:', e.message);
      });
    }
  } catch (err) {
    console.error('GHL lead submit error:', err);
  }
}

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse body — Vercel auto-parses JSON, but handle raw string fallback
    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }
    const { messages } = body || {};

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array required' });
    }

    // === SERVER-SIDE STATE EXTRACTION ===
    // Scan ALL messages to extract info the customer already provided.
    // This prevents re-asking questions when older messages fall off the context window.
    function extractCollectedInfo(allMsgs) {
      const info = {};
      for (let i = 0; i < allMsgs.length; i++) {
        const msg = allMsgs[i];
        const prev = allMsgs[i - 1];
        if (msg.role !== 'user') continue;
        const text = msg.content.trim();

        // Name: short alpha response after bot asked for name
        if (!info.name && prev?.role === 'assistant' && /name/i.test(prev.content) &&
            /^[a-zA-Z\s'-]{2,30}$/.test(text) && text.split(/\s+/).length <= 3 &&
            !SERVICE_KEYWORDS.test(text)) {
          info.name = text;
        }

        // Phone
        if (!info.phone) {
          const pm = text.match(PHONE_REGEX);
          if (pm) info.phone = pm[1];
        }

        // Address: message with street number
        if (!info.address && /\d+\s+[a-zA-Z]/.test(text) && !PHONE_REGEX.test(text) &&
            !/^\d{5}$/.test(text) && text.length > 5) {
          info.address = text;
        }

        // City/zip
        if (!info.city && (/\d{5}/.test(text) || TOWN_REGEX.test(text)) && !PHONE_REGEX.test(text)) {
          info.city = text;
        }

        // Service
        if (!info.service && /open|clean|clos|weekly|one.?time|maintenance|season\s?pass/i.test(text)) {
          info.service = text;
        }

        // Gallons: number that looks like pool size
        if (!info.gallons && prev?.role === 'assistant' && /gallon/i.test(prev.content)) {
          const gm = text.match(/(\d+)[,.]?(\d*)/);
          if (gm) {
            let num = parseInt(gm[1] + (gm[2] || ''));
            // Auto-correct: if they say 15-100, they mean thousands
            if (num >= 10 && num <= 200) num = num * 1000;
            info.gallons = num;
          }
        }

        // Equipment mentions — scan ALL user messages, not just after equipment question
        const equip = [];
        if (/heater|gas heat/i.test(text)) equip.push('heater');
        if (/salt|salt cell|salt system/i.test(text)) equip.push('salt system');
        if (/spa|hot tub/i.test(text)) equip.push('spa');
        if (/automat|pentair|hayward omni|jandy|omnilogic/i.test(text)) equip.push('automation');
        if (equip.length > 0) {
          // Merge with any previously found equipment
          const existing = info.equipment ? info.equipment.split(', ') : [];
          const merged = [...new Set([...existing, ...equip])];
          info.equipment = merged.join(', ');
        }

        // Cover status
        if (!info.coverStatus && prev?.role === 'assistant' && /cover/i.test(prev.content)) {
          info.coverStatus = text;
        }

        // Water clarity
        if (!info.waterClarity && prev?.role === 'assistant' && /water.*clear|clear.*water/i.test(prev.content)) {
          info.waterClarity = text;
        }
      }
      return info;
    }

    const collected = extractCollectedInfo(messages);

    // Build a summary of what we already know to inject into the prompt
    let knownInfo = '';
    const parts = [];
    if (collected.name) parts.push(`Name: ${collected.name}`);
    if (collected.phone) parts.push(`Phone: ${collected.phone}`);
    if (collected.address) parts.push(`Address: ${collected.address}`);
    if (collected.city) parts.push(`City: ${collected.city}`);
    if (collected.service) parts.push(`Service: ${collected.service}`);
    if (collected.gallons) parts.push(`Pool size: ~${collected.gallons.toLocaleString()} gallons`);
    if (collected.equipment) parts.push(`Equipment: ${collected.equipment}`);
    if (collected.coverStatus) parts.push(`Cover: ${collected.coverStatus}`);
    if (collected.waterClarity) parts.push(`Water at closing: ${collected.waterClarity}`);

    if (parts.length > 0) {
      knownInfo = `\n\n=== ALREADY COLLECTED (DO NOT RE-ASK) ===\n${parts.join('\n')}\nDo NOT ask for any of the above again. Skip to the next question in the flow that you haven't asked yet.\n`;
    }

    // Keep last 14 messages as context window
    let recentMessages = messages.slice(-14);

    // Anthropic requires first non-system message to be role:user.
    // Strip leading assistant messages (our proactive greeting) before sending.
    while (recentMessages.length > 0 && recentMessages[0].role === 'assistant') {
      recentMessages = recentMessages.slice(1);
    }

    if (!OPENROUTER_API_KEY) {
      console.error('OPENROUTER_API_KEY not configured');
      return res.status(200).json({
        message: 'Hey, our chat is down for a sec. Call or text us at (302) 496-6367 and we\'ll get you sorted out.',
      });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://tristateaquaticsolutions.com',
        'X-Title': 'Tri-State Aquatic Solutions Chatbot',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-sonnet-4.6',
        max_tokens: 150,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT + knownInfo },
          ...recentMessages,
        ],
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error('OpenRouter error:', response.status, errBody);
      console.error('Sent message count:', recentMessages.length, 'First role:', recentMessages[0]?.role);
      throw new Error(`OpenRouter ${response.status}: ${errBody.slice(0, 200)}`);
    }

    const data = await response.json();
    let text = data.choices?.[0]?.message?.content || '';

    // Strip [LEAD] tag if model outputs one
    if (text.includes('[LEAD]')) {
      text = text
        .split('\n')
        .filter((l) => !l.includes('[LEAD]'))
        .join('\n')
        .trim();
    }

    // Server-side lead detection: use the collected state which scans ALL messages
    // This catches phone numbers even if they were given early and fell off the 14-message window
    if (collected.phone) {
      const addressParts = [collected.address, collected.city].filter(Boolean);
      const address = [...new Set(addressParts)].join(', ');

      // Build conversation text for the note (use ALL messages, not just recent)
      const conversationText = messages
        .map((m) => `${m.role === 'user' ? 'Customer' : 'Bot'}: ${m.content}`)
        .join('\n');

      await submitLeadToGHL(
        {
          name: collected.name,
          phone: collected.phone.replace(/[-.\s()]/g, ''),
          address: address || undefined,
          service: collected.service,
        },
        conversationText
      );
    }

    return res.status(200).json({ message: text });
  } catch (err) {
    console.error('Chat error:', err.message || err);
    return res.status(200).json({
      message: 'Something glitched on our end. Call or text us at (302) 496-6367 and we\'ll take care of you.',
    });
  }
};
