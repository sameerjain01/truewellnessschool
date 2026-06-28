/**
 * True Wellness School — Google Apps Script Form Handler
 *
 * Deployed as: Web App → Execute as Me → Anyone can access
 * Script Properties required: RESEND_API_KEY
 *
 * Receives POST from Cloudflare Pages Function (/functions/submit.js)
 * which has already verified the Turnstile token before forwarding here.
 *
 * To redeploy: Deploy → Manage Deployments → Edit (pencil) → New Version → Save
 * (keeps the same URL — do NOT use "New Deployment" as it changes the URL)
 */

const SPREADSHEET_ID = '1gppSv6vRuZkFmArcxFkzb7kr0dSuz6tKmGo3E1dIOLA';
const ADMIN_EMAIL    = 'connecttruewellness@gmail.com';

function doPost(e) {
  try {
    const props        = PropertiesService.getScriptProperties();
    const RESEND_API_KEY = props.getProperty('RESEND_API_KEY');
    const data         = JSON.parse(e.postData.contents);
    const s            = (v) => String(v || '').replace(/<[^>]*>/g, '').trim().slice(0, 1000);
    const ss           = SpreadsheetApp.openById(SPREADSHEET_ID);
    const ts           = new Date().toISOString();
    let subject, body;

    // ── NEWSLETTER ────────────────────────────────────────────────────────────
    if (data.type === 'newsletter') {
      const email = s(data.email).toLowerCase();
      if (!validEmail(email)) return jsonResponse({ success: false, error: 'Invalid email.' });
      const sheet = ss.getSheetByName('Newsletter');
      if (isDupe(sheet, email, 2)) return jsonResponse({ success: false, error: 'duplicate' });
      sheet.appendRow([ts, email, 'subscribed']);
      subject = '🌿 New Newsletter Subscriber';
      body    = `Email: ${email}`;

    // ── CONTACT ───────────────────────────────────────────────────────────────
    } else if (data.type === 'contact') {
      const name    = s(data.name),    email   = s(data.email).toLowerCase(),
            phone   = s(data.phone),   program = s(data.program),
            subj    = s(data.subject), msg     = s(data.message),
            source  = s(data.source);
      if (!validEmail(email)) return jsonResponse({ success: false, error: 'Invalid email.' });
      ss.getSheetByName('Contact').appendRow([ts, name, email, phone, program, subj, msg, source]);
      subject = `📬 Contact: ${subj}`;
      body    = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nProgram: ${program}\nSource: ${source}\nSubject: ${subj}\n\n${msg}`;

    // ── PARTNERSHIP ───────────────────────────────────────────────────────────
    } else if (data.type === 'partnership') {
      const org     = s(data.org_name),     contact  = s(data.contact_name),
            email   = s(data.email).toLowerCase(), phone = s(data.phone),
            orgType = s(data.org_type),     programs = s(data.programs),
            referral = s(data.referral),    msg      = s(data.message);
      if (!validEmail(email)) return jsonResponse({ success: false, error: 'Invalid email.' });
      ss.getSheetByName('Partnership').appendRow([ts, org, contact, email, phone, orgType, programs, referral, msg]);
      subject = `🤝 Partnership — ${org}`;
      body    = `Org: ${org}\nContact: ${contact}\nEmail: ${email}\nPhone: ${phone}\nType: ${orgType}\nPrograms: ${programs}\nReferral: ${referral}\n\nMessage:\n${msg}`;

    // ── ASSESSMENT ────────────────────────────────────────────────────────────
    } else if (data.type === 'assessment') {
      const name  = s(data.name), email = s(data.email).toLowerCase();
      if (!validEmail(email)) return jsonResponse({ success: false, error: 'Invalid email.' });
      const sheet = ss.getSheetByName('Assessment');
      if (isDupe(sheet, email, 3)) return jsonResponse({ success: false, error: 'duplicate' });
      sheet.appendRow([ts, name, email]);
      subject = `📊 Assessment — ${name}`;
      body    = `Name: ${name}\nEmail: ${email}`;

    } else {
      return jsonResponse({ success: false, error: 'Unknown form type.' });
    }

    // ── ADMIN EMAIL VIA RESEND ────────────────────────────────────────────────
    UrlFetchApp.fetch('https://api.resend.com/emails', {
      method: 'post', muteHttpExceptions: true,
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify({
        from:    'alerts@truewellnessschool.com',
        to:      ADMIN_EMAIL,
        subject: subject,
        text:    body
      })
    });

    return jsonResponse({ success: true });

  } catch(err) {
    return jsonResponse({ success: false, error: 'Server error.' });
  }
}

// ── HELPERS ───────────────────────────────────────────────────────────────────

function isDupe(sheet, email, col) {
  return sheet.getDataRange().getValues()
    .some((r, i) => i > 0 && String(r[col - 1]).toLowerCase() === email);
}

function validEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return jsonResponse({ status: 'True Wellness form handler active.' });
}
