# True Wellness School — Product Backlog

Features and improvements queued for future development.
Move items to IN PROGRESS when starting, DONE when shipped.

---

## IN PROGRESS

_Nothing currently in progress._

---

## BACKLOG

### [FEAT] Zoho Campaigns — Newsletter Sending
**Priority:** High  
**Effort:** Medium (1–2 hours setup)  
**Details:** [zoho-campaigns-setup.md](zoho-campaigns-setup.md)

The newsletter form captures subscriber emails into Google Sheets only.
Zoho Campaigns is needed to actually send newsletters to those subscribers.

Key steps:
- Sign in at campaigns.zoho.com (same Zoho account)
- Create mailing list: True Wellness Newsletter
- Import existing subscribers from Google Sheets Newsletter tab
- (Optional) Set up native Google Sheets integration for auto-sync
- Send first newsletter campaign

---

### [FEAT] Google Sheets → Zoho Campaigns Auto-Sync
**Priority:** Medium  
**Effort:** Low (30 min after Zoho Campaigns is set up)  
**Depends on:** Zoho Campaigns setup above

Connect the Google Sheets Newsletter tab directly to Zoho Campaigns
so new subscribers sync automatically — no manual CSV export needed.

---

### [FEAT] Assessment — Email Actual Wellness Report
**Priority:** Medium  
**Effort:** High  

Currently the assessment email capture collects name and email but
does not send a personalized report. User gets a generic "report on its way" message.

Build: Generate a personalized HTML email from assessment scores
and send via Resend when the user submits the email capture form.

---

### [FEAT] Events — Registration Integration
**Priority:** Medium  
**Effort:** Medium  

Events currently link to an external registration URL.
Consider integrating an actual registration form per event
with attendee tracking in Google Sheets.

---

### [FEAT] Membership — Payment Integration
**Priority:** Low  
**Effort:** High  

Membership page exists but has no payment flow.
Options: Stripe, Zoho Payments, or a third-party booking tool.

---

## DONE

- [x] Site rebuild in Hugo with full design system
- [x] 21 pages built and deployed on Cloudflare Pages
- [x] Wellness Assessment (JS quiz + scoring)
- [x] Zoho Mail — contact@truewellnessschool.com
- [x] Cloudflare Turnstile — invisible bot protection on all forms
- [x] CF Pages Function — server-side Turnstile verification
- [x] Google Apps Script — form handler, deduplication, Sheets logging
- [x] Resend — admin email alerts on every form submission
- [x] Google Sheets — subscriber and submission tracking (4 tabs)
- [x] Newsletter, Contact, Partnership, Assessment forms — fully wired
- [x] CSP headers hardened
- [x] Apps Script source saved to repo (docs/apps-script/form-handler.js)
