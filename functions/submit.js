export async function onRequestPost({ request, env }) {
  try {
    let body;
    try { body = await request.json(); }
    catch { return json({ success: false, error: 'Invalid request.' }, 400); }

    // Honeypot — bots fill it, humans never see it
    if (body.website) return json({ success: true });

    // Turnstile verification (server-side, secret never leaves CF)
    const tsRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret:   env.TURNSTILE_SECRET,
        response: body.token,
        remoteip: request.headers.get('CF-Connecting-IP') || ''
      })
    });
    const ts = await tsRes.json();
    if (!ts.success) {
      return json({ success: false, error: 'Security check failed. Please refresh and try again.' }, 403);
    }

    // Forward to Apps Script — strip client-only fields
    const { token, website, ...fields } = body;
    const asRes = await fetch(env.APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
      redirect: 'follow'
    });

    let result;
    try { result = await asRes.json(); }
    catch { result = { success: false, error: 'Handler error.' }; }

    return json(result, result.success ? 200 : 400);

  } catch (err) {
    return json({ success: false, error: 'Server error. Please try again.' }, 500);
  }
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}
