// GHL (GoHighLevel) API helpers for sending SMS via the active brand's sub-account

import type { BrandConfig } from './brands';

const GHL_BASE = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';

interface GHLSmsResponse {
  messageId?: string;
  id?: string;
  conversationId?: string;
}

/**
 * Send an SMS message via GHL Conversations API using the brand's PIT token.
 * Requires the GHL contactId (not the phone number directly).
 */
export async function sendGhlSms(
  brand: BrandConfig,
  contactId: string,
  message: string,
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const res = await fetch(`${GHL_BASE}/conversations/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${brand.ghlPitToken}`,
        Version: GHL_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'SMS',
        contactId,
        message,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('GHL SMS failed:', res.status, errText);
      return { success: false, error: `SMS send failed (${res.status})` };
    }

    const data: GHLSmsResponse = await res.json();
    return {
      success: true,
      messageId: data.messageId || data.id || undefined,
    };
  } catch (err) {
    const message_ = err instanceof Error ? err.message : 'Unknown error';
    console.error('GHL SMS error:', message_);
    return { success: false, error: message_ };
  }
}

/**
 * Look up a GHL contact by phone number within the brand's location.
 * Returns the contactId if found.
 */
export async function findGhlContactByPhone(
  brand: BrandConfig,
  phone: string,
): Promise<string | null> {
  try {
    const cleanPhone = phone.replace(/\D/g, '');
    const queryPhone = cleanPhone.startsWith('1') && cleanPhone.length === 11
      ? `+${cleanPhone}`
      : `+1${cleanPhone}`;

    const res = await fetch(
      `${GHL_BASE}/contacts/search/duplicate?locationId=${brand.ghlLocationId}&number=${encodeURIComponent(queryPhone)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${brand.ghlPitToken}`,
          Version: GHL_VERSION,
        },
      },
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.contact?.id || null;
  } catch {
    return null;
  }
}
