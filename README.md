# True Wellness School

Hugo static site for **True Wellness School** — holistic wellness education for families, youth, and seniors across the DMV region.

**Live site:** https://truewellnessschool.com  
**Dev branch:** https://develop.truewellnessschool.pages.dev  
**Hosting:** Cloudflare Pages  
**Instagram:** [@truewellnessschool](https://www.instagram.com/truewellnessschool)

---

## Tech Stack

| Layer | Tool |
|---|---|
| Static site generator | Hugo |
| Hosting | Cloudflare Pages |
| Form security | Cloudflare Turnstile (invisible) |
| Form handler | Cloudflare Pages Function (`/functions/submit.js`) |
| Data backend | Google Apps Script + Google Sheets |
| Admin email alerts | Resend (`alerts@truewellnessschool.com`) |
| Business email | Zoho Mail (`contact@truewellnessschool.com`) |
| DNS | Cloudflare |

---

## Local Development

```bash
hugo server
```

Forms will not submit locally (the CF Pages Function only runs on Cloudflare). All other pages work fine.

---

## Deployment

Push to `develop` branch → auto-deploys to `develop.truewellnessschool.pages.dev`  
Push to `master` branch → auto-deploys to `truewellnessschool.com`

---

## Form Infrastructure Setup

All four forms (newsletter, contact, partnership, assessment) share one secure pipeline:

```
Browser → Cloudflare Turnstile (invisible bot check)
        → CF Pages Function /functions/submit.js (Turnstile verify + rate limit)
        → Google Apps Script (validate, deduplicate, log to Sheets)
        → Resend (admin email alert to connecttruewellness@gmail.com)
```

### Required Cloudflare Pages Environment Variables

Set these under **Settings → Environment variables** for both Production and Preview:

| Variable | Description |
|---|---|
| `TURNSTILE_SITE_KEY` | Public key — embedded in HTML by Hugo at build time |
| `TURNSTILE_SECRET` | Secret key — used by CF Function to verify tokens server-side |
| `APPS_SCRIPT_URL` | Google Apps Script web app URL |

### Cloudflare Turnstile

- Dashboard → Turnstile → True Wellness School widget
- Widget type: Managed (invisible)
- Allowed hostnames: `truewellnessschool.com`, `truewellnessschool.pages.dev`

### Google Sheets

Spreadsheet ID: `1gppSv6vRuZkFmArcxFkzb7kr0dSuz6tKmGo3E1dIOLA`

| Tab | Columns |
|---|---|
| Newsletter | Timestamp, Email, Status |
| Contact | Timestamp, Name, Email, Subject, Message |
| Partnership | Timestamp, Org Name, Contact Name, Email, Phone, Org Type, Programs, Referral, Message |
| Assessment | Timestamp, Name, Email |

### Google Apps Script

- File: `True Wellness Form Handler` at script.google.com
- Script Properties required: `RESEND_API_KEY`
- Deployed as: Web App, Execute as Me, Anyone can access
- **When redeploying:** Use Manage Deployments → Edit existing → New version (keeps same URL). Do NOT create a new deployment (changes the URL and requires updating `APPS_SCRIPT_URL` in CF Pages).

### Resend

- Domain: `truewellnessschool.com` (verified via Cloudflare auto-config)
- Sends from: `alerts@truewellnessschool.com`
- Sends to: `connecttruewellness@gmail.com`

---

## Newsletter — How Sending Works

> **Important distinction:** The newsletter form only *captures* subscriber emails into Google Sheets. It does NOT send newsletters.

To send a newsletter to your subscriber list:

1. Export emails from the **Newsletter tab** in Google Sheets
2. Import into a bulk email tool — recommended options:
   - **Zoho Campaigns** (free, already have Zoho account, integrates with Zoho Mail)
   - **Mailchimp** (free up to 500 contacts)
3. Design and send your newsletter from that tool

**Zoho Campaigns** is the simplest path since you already use Zoho Mail for `contact@truewellnessschool.com`.

---

## Pages

| URL | Layout |
|---|---|
| `/` | Homepage |
| `/about/` | About True Wellness |
| `/programs/` | All programs |
| `/programs/family/` | Family Wellness Foundations |
| `/programs/youth/` | Youth Wellness & Resilience |
| `/programs/seniors/` | Senior Wellness & Healthy Aging |
| `/four-pillars/mental/` | Mental Wellness |
| `/four-pillars/emotional/` | Emotional Wellness |
| `/four-pillars/physical/` | Physical Wellness |
| `/four-pillars/spiritual/` | Spiritual Wellness |
| `/assessment/` | Free Wellness Assessment |
| `/events/` | Workshops & Events |
| `/resources/` | Free Resources |
| `/community/` | Community |
| `/partnership/` | Partner With Us |
| `/membership/` | Membership |
| `/contact/` | Contact |

---

## License

Website code: MIT  
Content: © 2026 True Wellness School. All rights reserved.
