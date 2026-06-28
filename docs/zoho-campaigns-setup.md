# Zoho Campaigns Setup

## What This Is For

The newsletter form captures subscriber emails into Google Sheets (Newsletter tab).
Zoho Campaigns is the tool that actually **sends** newsletters to those subscribers.

Since we already use Zoho Mail for `contact@truewellnessschool.com`, Zoho Campaigns
is the natural fit — same account, same domain, no extra DNS setup.

**Free tier:** Up to 2,000 subscribers and 6,000 emails/month.

---

## Setup Steps

- [ ] **1. Sign in to Zoho Campaigns**
  - Go to `campaigns.zoho.com`
  - Sign in with the same Zoho account used for Zoho Mail

- [ ] **2. Connect your domain**
  - Zoho Campaigns → Settings → Email Authentication
  - Verify `truewellnessschool.com` (likely already done via Zoho Mail DNS records)

- [ ] **3. Create a Mailing List**
  - Campaigns → Mailing Lists → Create List
  - Name: `True Wellness Newsletter`
  - From name: `True Wellness School`
  - From email: `contact@truewellnessschool.com`

- [ ] **4. Import existing subscribers from Google Sheets**
  - Export Newsletter tab from Google Sheets as CSV
  - Campaigns → Mailing Lists → True Wellness Newsletter → Add Contacts → Import CSV
  - Map columns: Email → Email, Timestamp → (ignore)

- [ ] **5. Set up double opt-in (recommended)**
  - Mailing List settings → Subscription Settings → Enable double opt-in
  - Customize the confirmation email with True Wellness branding

- [ ] **6. Create first newsletter campaign**
  - Campaigns → Email Campaigns → Create Campaign
  - Choose template or start from scratch
  - Subject line, content, send

- [ ] **7. (Future) Automate import from Google Sheets**
  - Zoho Campaigns has a native Google Sheets integration
  - Campaigns → Integrations → Google Sheets → connect the Newsletter tab
  - New rows auto-sync to the mailing list — no manual CSV export needed

---

## Ongoing Workflow

Until step 7 is set up, the manual workflow is:
1. New subscriber fills form → saved to Google Sheets Newsletter tab
2. Periodically export CSV from Sheets → import to Zoho Campaigns
3. Send newsletter from Zoho Campaigns

After step 7:
1. New subscriber fills form → auto-syncs to Zoho Campaigns mailing list
2. Send newsletter from Zoho Campaigns

---

## Notes

- Unsubscribe links are handled automatically by Zoho Campaigns (legally required)
- Keep subject lines under 50 characters for best open rates
- Send on Tuesday–Thursday mornings for best engagement
