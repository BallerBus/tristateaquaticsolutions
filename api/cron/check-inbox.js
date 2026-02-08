/**
 * Vercel Cron Job: Check brandon@tristateaquaticsolutions.com inbox
 * Runs daily at 8am ET (13:00 UTC)
 * Fetches unread emails via Composio MCP and logs the digest.
 * Claude checks the live inbox at every session start for full briefing.
 */

const COMPOSIO_MCP_URL = process.env.COMPOSIO_MCP_URL;
const COMPOSIO_API_KEY = process.env.COMPOSIO_API_KEY;

async function callComposio(toolSlug, args) {
  const body = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/call',
    params: {
      name: 'COMPOSIO_MULTI_EXECUTE_TOOL',
      arguments: {
        tools: [{ tool_slug: toolSlug, arguments: args }],
        sync_response_to_workbench: false
      }
    }
  };

  const res = await fetch(COMPOSIO_MCP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream',
      'x-api-key': COMPOSIO_API_KEY
    },
    body: JSON.stringify(body)
  });

  const text = await res.text();
  const dataLine = text.split('\n').find(l => l.startsWith('data:'));
  if (!dataLine) throw new Error('No data in SSE response');
  const json = JSON.parse(dataLine.replace(/^data:\s*/, ''));

  if (json.error) throw new Error(json.error.message);

  const content = json.result?.content?.[0]?.text;
  if (!content) throw new Error('No content in response');

  return JSON.parse(content);
}

module.exports = async function handler(req, res) {
  // Vercel cron sends this header automatically
  if (req.headers['authorization'] !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!COMPOSIO_MCP_URL || !COMPOSIO_API_KEY) {
    return res.status(500).json({ error: 'Missing Composio env vars' });
  }

  try {
    // Fetch unread emails from the business inbox
    const result = await callComposio('GMAIL_FETCH_EMAILS', {
      user_id: 'me',
      max_results: 20,
      query: 'is:unread',
      include_spam_trash: false,
      verbose: true
    });

    const messages = result?.data?.results?.[0]?.response?.data?.messages || [];
    const timestamp = new Date().toISOString();

    const digest = messages.map(m => ({
      from: m.sender || '',
      subject: m.subject || '(no subject)',
      date: m.messageTimestamp || '',
      preview: (m.preview?.body || '').substring(0, 150)
    }));

    console.log(JSON.stringify({
      event: 'inbox_check',
      timestamp,
      unread_count: digest.length,
      digest
    }));

    return res.status(200).json({
      ok: true,
      timestamp,
      unread_count: digest.length,
      emails: digest
    });

  } catch (error) {
    console.error('Inbox check error:', error.message);
    return res.status(500).json({ error: error.message });
  }
};
