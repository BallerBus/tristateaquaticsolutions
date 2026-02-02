/**
 * GoHighLevel API Handler (Server-Side)
 *
 * This module should run on your server (Node.js/Express, Vercel Functions, etc.)
 * NEVER expose the API key to the client side.
 *
 * Environment Variables Required:
 * - GHL_API_KEY: Your GoHighLevel Private Integration API Key
 * - GHL_LOCATION_ID: Your GoHighLevel Location ID
 */

const GHL_BASE_URL = 'https://services.leadconnectorhq.com';

// Configuration from environment
const config = {
  apiKey: process.env.GHL_API_KEY,
  locationId: process.env.GHL_LOCATION_ID || 'A0e67CElQk4EoVK0XY2K',
  apiVersion: '2021-07-28'
};

// Headers for GHL API requests
function getHeaders() {
  return {
    'Authorization': `Bearer ${config.apiKey}`,
    'Version': config.apiVersion,
    'Content-Type': 'application/json'
  };
}

/**
 * Create a new contact in GoHighLevel
 * @param {Object} contactData - Contact information
 * @returns {Promise<Object>} - Created contact response
 */
async function createContact(contactData) {
  const response = await fetch(`${GHL_BASE_URL}/contacts/`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      ...contactData,
      locationId: config.locationId
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GHL API Error: ${error.message || response.statusText}`);
  }

  return response.json();
}

/**
 * Update an existing contact
 * @param {string} contactId - GHL Contact ID
 * @param {Object} updateData - Fields to update
 * @returns {Promise<Object>} - Updated contact response
 */
async function updateContact(contactId, updateData) {
  const response = await fetch(`${GHL_BASE_URL}/contacts/${contactId}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(updateData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GHL API Error: ${error.message || response.statusText}`);
  }

  return response.json();
}

/**
 * Search for a contact by email or phone
 * @param {string} email - Email to search
 * @param {string} phone - Phone to search
 * @returns {Promise<Object|null>} - Contact if found, null otherwise
 */
async function findContact(email, phone) {
  const params = new URLSearchParams({
    locationId: config.locationId
  });

  if (email) params.append('email', email);
  if (phone) params.append('phone', phone);

  const response = await fetch(`${GHL_BASE_URL}/contacts/?${params.toString()}`, {
    method: 'GET',
    headers: getHeaders()
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GHL API Error: ${error.message || response.statusText}`);
  }

  const data = await response.json();
  return data.contacts && data.contacts.length > 0 ? data.contacts[0] : null;
}

/**
 * Create or update a contact (upsert)
 * Checks if contact exists by email/phone, updates if found, creates if not
 * @param {Object} contactData - Contact information
 * @returns {Promise<Object>} - Contact response with isNew flag
 */
async function upsertContact(contactData) {
  const existingContact = await findContact(contactData.email, contactData.phone);

  if (existingContact) {
    // Update existing contact - merge tags, don't replace
    const existingTags = existingContact.tags || [];
    const newTags = contactData.tags || [];
    const mergedTags = [...new Set([...existingTags, ...newTags])];

    const updateData = {
      ...contactData,
      tags: mergedTags
    };

    const updated = await updateContact(existingContact.id, updateData);
    return { ...updated, isNew: false };
  } else {
    const created = await createContact(contactData);
    return { ...created, isNew: true };
  }
}

/**
 * Add tags to a contact
 * @param {string} contactId - GHL Contact ID
 * @param {Array<string>} tags - Tags to add
 */
async function addTags(contactId, tags) {
  const contact = await getContact(contactId);
  const existingTags = contact.contact?.tags || [];
  const mergedTags = [...new Set([...existingTags, ...tags])];

  return updateContact(contactId, { tags: mergedTags });
}

/**
 * Get a contact by ID
 * @param {string} contactId - GHL Contact ID
 * @returns {Promise<Object>} - Contact data
 */
async function getContact(contactId) {
  const response = await fetch(`${GHL_BASE_URL}/contacts/${contactId}`, {
    method: 'GET',
    headers: getHeaders()
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GHL API Error: ${error.message || response.statusText}`);
  }

  return response.json();
}

/**
 * Create an opportunity in a pipeline
 * @param {Object} opportunityData - Opportunity details
 * @returns {Promise<Object>} - Created opportunity
 */
async function createOpportunity(opportunityData) {
  const response = await fetch(`${GHL_BASE_URL}/opportunities/`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      ...opportunityData,
      locationId: config.locationId
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GHL API Error: ${error.message || response.statusText}`);
  }

  return response.json();
}

/**
 * Move opportunity to a different stage
 * @param {string} opportunityId - Opportunity ID
 * @param {string} stageId - Target stage ID
 * @returns {Promise<Object>} - Updated opportunity
 */
async function moveOpportunityStage(opportunityId, stageId) {
  const response = await fetch(`${GHL_BASE_URL}/opportunities/${opportunityId}/status`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ stageId })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GHL API Error: ${error.message || response.statusText}`);
  }

  return response.json();
}

/**
 * Schedule an appointment on a calendar
 * @param {Object} appointmentData - Appointment details
 * @returns {Promise<Object>} - Created appointment
 */
async function createAppointment(appointmentData) {
  const response = await fetch(`${GHL_BASE_URL}/calendars/events/appointments`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      ...appointmentData,
      locationId: config.locationId
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GHL API Error: ${error.message || response.statusText}`);
  }

  return response.json();
}

/**
 * Get available slots for a calendar
 * @param {string} calendarId - Calendar ID
 * @param {string} startDate - Start date (ISO format)
 * @param {string} endDate - End date (ISO format)
 * @returns {Promise<Object>} - Available slots
 */
async function getAvailableSlots(calendarId, startDate, endDate) {
  const params = new URLSearchParams({
    calendarId,
    startDate,
    endDate
  });

  const response = await fetch(`${GHL_BASE_URL}/calendars/${calendarId}/free-slots?${params.toString()}`, {
    method: 'GET',
    headers: getHeaders()
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GHL API Error: ${error.message || response.statusText}`);
  }

  return response.json();
}

/**
 * Add a note to a contact
 * @param {string} contactId - Contact ID
 * @param {string} note - Note content
 * @returns {Promise<Object>} - Created note
 */
async function addNote(contactId, note) {
  const response = await fetch(`${GHL_BASE_URL}/contacts/${contactId}/notes`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      body: note,
      userId: null // System note
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GHL API Error: ${error.message || response.statusText}`);
  }

  return response.json();
}

/**
 * Add a task for a contact
 * @param {string} contactId - Contact ID
 * @param {Object} taskData - Task details
 * @returns {Promise<Object>} - Created task
 */
async function addTask(contactId, taskData) {
  const response = await fetch(`${GHL_BASE_URL}/contacts/${contactId}/tasks`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(taskData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GHL API Error: ${error.message || response.statusText}`);
  }

  return response.json();
}

// Express.js middleware handler example
// Use this pattern for your API routes

/**
 * Express handler for contact form submissions
 * POST /api/ghl/contacts
 */
function contactFormHandler(req, res) {
  return async function(req, res) {
    try {
      const contactData = req.body;

      // Validate required fields
      if (!contactData.firstName || !contactData.lastName) {
        return res.status(400).json({ error: 'First and last name required' });
      }

      if (!contactData.email && !contactData.phone) {
        return res.status(400).json({ error: 'Email or phone required' });
      }

      // Upsert the contact
      const result = await upsertContact(contactData);

      // If this is a new high-value lead, create an opportunity
      const leadScore = contactData.customFields?.find(
        cf => cf.id === 'NjVEV6p5lJxiIEKPKhIk'
      )?.value || 0;

      if (parseInt(leadScore) >= 50 && result.isNew) {
        // Create opportunity in Active Deals pipeline
        await createOpportunity({
          contactId: result.contact?.id,
          pipelineId: 'LGgQEViEFr1pAKKzvMtJ',
          pipelineStageId: 'a8b53e0c-ccd5-45df-af4e-304811750b53', // Discovery Scheduled
          name: `Pool Project - ${contactData.firstName} ${contactData.lastName}`,
          status: 'open',
          source: 'Website'
        });

        // Add a task for follow-up
        await addTask(result.contact?.id, {
          title: 'Hot Lead - Call Within 5 Minutes',
          dueDate: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes from now
          description: `High lead score: ${leadScore}. Priority follow-up required.`,
          status: 'pending'
        });
      }

      return res.status(result.isNew ? 201 : 200).json({
        success: true,
        contactId: result.contact?.id,
        isNew: result.isNew
      });

    } catch (error) {
      console.error('GHL Contact Error:', error);
      return res.status(500).json({
        error: 'Failed to process contact',
        message: error.message
      });
    }
  };
}

// Export for use in your server
module.exports = {
  createContact,
  updateContact,
  findContact,
  upsertContact,
  addTags,
  getContact,
  createOpportunity,
  moveOpportunityStage,
  createAppointment,
  getAvailableSlots,
  addNote,
  addTask,
  contactFormHandler,
  config
};

// Also export for ES modules
if (typeof exports !== 'undefined') {
  exports.default = {
    createContact,
    updateContact,
    findContact,
    upsertContact,
    addTags,
    getContact,
    createOpportunity,
    moveOpportunityStage,
    createAppointment,
    getAvailableSlots,
    addNote,
    addTask,
    contactFormHandler,
    config
  };
}
