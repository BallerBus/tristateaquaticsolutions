# CRM Setup Guide - Tri-State Aquatic Solutions

## Platform Recommendation: HubSpot CRM

### Why HubSpot?

HubSpot CRM is the recommended platform for Tri-State Aquatic Solutions based on:

1. **Free Tier Availability** - Robust free CRM with essential features for startup operations
2. **Scalability** - Easy upgrade path as business grows (Starter → Professional → Enterprise)
3. **Integration Ecosystem** - Native integrations with 1,000+ business tools
4. **User-Friendly Interface** - Minimal training required for team adoption
5. **Marketing Hub Integration** - Seamless connection to email marketing and automation
6. **Mobile App** - Full-featured mobile CRM for field sales
7. **Local Business Focus** - Strong support for service-based local businesses

### Alternative Platforms Considered

| Platform | Pros | Cons | Best For |
|----------|------|------|----------|
| Salesforce | Enterprise features, customization | Expensive, complex | Large enterprises |
| Zoho CRM | Affordable, full suite | Learning curve | Budget-conscious |
| Pipedrive | Sales-focused, visual | Limited marketing | Pure sales teams |
| Monday Sales CRM | Visual, collaborative | Less mature | Project-heavy teams |

---

## Initial Configuration Steps

### Phase 1: Account Setup (Day 1)

#### 1.1 Create HubSpot Account

1. Navigate to [hubspot.com](https://www.hubspot.com)
2. Click "Get started free"
3. Sign up with company email: `[admin]@tristateaquaticsolutions.com`
4. Select "CRM" as primary product
5. Complete company profile:
   - Company Name: Tri-State Aquatic Solutions
   - Industry: Pool & Spa Services
   - Company Size: 1-10 employees
   - Website: tristateaquaticsolutions.com

#### 1.2 Configure Company Settings

**Settings → Account Defaults:**

- Time Zone: Eastern Time (ET)
- Date Format: MM/DD/YYYY
- Number Format: 1,000.00
- Currency: USD ($)
- Fiscal Year Start: January

**Settings → Branding:**

- Upload company logo (minimum 200x200px)
- Set primary brand color: #0066CC (or company brand color)
- Configure email footer with company address and contact info

#### 1.3 Domain & Email Configuration

**Settings → Domains & URLs:**

1. Add domain: tristateaquaticsolutions.com
2. Configure subdomain for tracking: go.tristateaquaticsolutions.com
3. Set up email sending domain

**Settings → Email:**

1. Connect company email domain
2. Configure DKIM, SPF, and DMARC records (follow HubSpot guide)
3. Set default "From" name: Tri-State Aquatic Solutions
4. Set default "From" email: info@tristateaquaticsolutions.com
5. Configure email signatures for team members

### Phase 2: Pipeline Setup (Day 2)

See [pipeline-configuration.md](./pipeline-configuration.md) for detailed pipeline setup.

**Quick Setup:**

1. Navigate to Settings → Objects → Deals
2. Select "Pipelines"
3. Create "Sales Pipeline" with stages
4. Create "Service Pipeline" with stages
5. Configure deal properties

### Phase 3: Property Configuration (Day 3)

See [contact-properties.md](./contact-properties.md) for complete property list.

**Quick Setup:**

1. Navigate to Settings → Objects → Contacts
2. Click "Manage properties"
3. Create custom properties for pool industry
4. Configure required fields

### Phase 4: Import Existing Data (Day 4-5)

#### 4.1 Prepare Data for Import

**Required CSV columns:**
- First Name
- Last Name
- Email
- Phone
- Address
- City
- State
- Zip Code
- Lead Source
- Pool Interest Type

**Data Cleaning Checklist:**
- [ ] Remove duplicate records
- [ ] Standardize phone number format: (XXX) XXX-XXXX
- [ ] Validate email addresses
- [ ] Standardize address formatting
- [ ] Remove test/fake entries
- [ ] Check for merged contacts

#### 4.2 Import Process

1. Navigate to Contacts → Import
2. Select "Start an import"
3. Choose "File from computer"
4. Upload cleaned CSV
5. Map columns to HubSpot properties
6. Set import name: "Initial Contact Import - [Date]"
7. Review and confirm import

---

## User Setup and Permissions

### User Roles

#### 1. Super Admin

**Assigned To:** Business Owner/Operations Manager

**Permissions:**
- Full access to all HubSpot tools
- Manage users and permissions
- Configure account settings
- Access billing and subscription
- Delete any records
- Export all data

#### 2. Sales Manager

**Assigned To:** Sales Team Lead

**Permissions:**
- View and edit all contacts and deals
- Create and modify sales pipelines
- Access sales reports and dashboards
- Assign leads to sales reps
- Approve quotes and discounts
- Limited settings access

#### 3. Sales Representative

**Assigned To:** Individual Sales Team Members

**Permissions:**
- View all contacts
- Edit contacts they own
- Create and manage own deals
- Access personal reports
- Send emails and make calls
- Create tasks and meetings
- Limited export capabilities

#### 4. Service Representative

**Assigned To:** Service/Installation Team

**Permissions:**
- View assigned contacts only
- Create service tickets
- Update service status
- Access service dashboard
- Limited contact editing

#### 5. Marketing (Optional)

**Assigned To:** Marketing Team/Agency

**Permissions:**
- Create and edit marketing emails
- Manage forms and landing pages
- Access marketing reports
- Create lists and segments
- Limited contact editing

### Adding Users

**Settings → Users & Teams:**

1. Click "Create user"
2. Enter user email address
3. Select permission set (role)
4. Configure seat assignment
5. Send invitation email

### Team Setup

**Create Teams:**

1. Sales Team
   - All sales representatives
   - Sales manager as team lead

2. Service Team
   - Installation technicians
   - Service coordinators

3. Management Team
   - Super admins
   - Executive access

---

## Integration Requirements

### Critical Integrations (Priority 1)

| Integration | Purpose | Setup Time |
|-------------|---------|------------|
| Website Forms | Lead capture | 2 hours |
| Email (Gmail/Outlook) | Email tracking | 30 minutes |
| Calendar | Meeting scheduling | 30 minutes |
| Phone System | Call tracking | 2-4 hours |

### Important Integrations (Priority 2)

| Integration | Purpose | Setup Time |
|-------------|---------|------------|
| QuickBooks | Financial sync | 2 hours |
| Stripe/Payment | Payment tracking | 1 hour |
| Google Analytics | Attribution | 1 hour |
| Facebook Lead Ads | Lead capture | 1 hour |

### Nice-to-Have Integrations (Priority 3)

| Integration | Purpose | Setup Time |
|-------------|---------|------------|
| Slack | Team notifications | 30 minutes |
| Zoom | Video meetings | 30 minutes |
| DocuSign | Contract signing | 1 hour |
| Canva | Design access | 30 minutes |

See [integration-guide.md](./integration-guide.md) for detailed integration instructions.

---

## Initial Launch Checklist

### Pre-Launch (Week 1)

- [ ] Create HubSpot account with company email
- [ ] Complete company profile and branding
- [ ] Configure email sending domain
- [ ] Set up sales pipeline stages
- [ ] Create custom contact properties
- [ ] Import existing contacts
- [ ] Create user accounts
- [ ] Assign user permissions

### Launch Week (Week 2)

- [ ] Connect website forms to HubSpot
- [ ] Integrate email accounts
- [ ] Connect calendars
- [ ] Set up phone integration
- [ ] Train team on basic usage
- [ ] Create initial reports/dashboards
- [ ] Test lead flow end-to-end

### Post-Launch (Week 3-4)

- [ ] Set up automation workflows
- [ ] Create email templates
- [ ] Configure lead scoring
- [ ] Set up meeting links
- [ ] Create quote templates
- [ ] Monitor and adjust as needed
- [ ] Schedule follow-up training

---

## Support Resources

### HubSpot Resources

- **HubSpot Academy:** Free certification courses
- **Knowledge Base:** help.hubspot.com
- **Community Forum:** community.hubspot.com
- **24/7 Support:** Available with paid plans

### Internal Documentation

- [Pipeline Configuration](./pipeline-configuration.md)
- [Contact Properties](./contact-properties.md)
- [Automation Workflows](./automation-workflows.md)
- [Reporting & Dashboards](./reporting-dashboards.md)
- [Integration Guide](./integration-guide.md)

---

## Maintenance Schedule

### Daily
- Review new leads and assign
- Check task notifications
- Update deal stages

### Weekly
- Review pipeline report
- Check automation performance
- Update stale deals
- Team pipeline review meeting

### Monthly
- Review and clean data
- Audit user access
- Check integration health
- Update reporting

### Quarterly
- Full pipeline review
- Lead scoring adjustment
- Workflow optimization
- User training refresh
