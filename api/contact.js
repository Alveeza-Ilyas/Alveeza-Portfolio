// Vercel Serverless Function: api/contact.js
// Handles saving messages to Supabase and sending email notifications via Resend

export default async function handler(req, res) {
  // CORS Headers (useful for local preview or cross-origin requests)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields (name, email, message) are required.' });
  }

  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.TO_EMAIL;

    let dbSaved = false;
    let emailSent = false;

    // 1. Save data to Supabase table ('contact_messages')
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      const supabaseRes = await fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ name, email, message })
      });

      if (supabaseRes.ok) {
        dbSaved = true;
      } else {
        const errorText = await supabaseRes.text();
        console.error('Supabase Insert Error:', errorText);
      }
    } else {
      console.warn('SUPABASE_URL or SUPABASE_ANON_KEY missing in environment variables.');
    }

    // 2. Send Email Notification via Resend
    if (RESEND_API_KEY && TO_EMAIL) {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: [TO_EMAIL],
          subject: `📩 New Portfolio Message from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
              <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 8px;">New Contact Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Message:</strong></p>
              <blockquote style="background: #f9f9f9; padding: 12px 16px; border-left: 4px solid #6366f1; margin: 10px 0; white-space: pre-wrap;">${message}</blockquote>
              <hr style="border: none; border-top: 1px solid #eee; margin-top: 20px;" />
              <p style="font-size: 12px; color: #777;">Sent automatically from your Portfolio contact form via Vercel & Supabase.</p>
            </div>
          `
        })
      });

      if (resendRes.ok) {
        emailSent = true;
      } else {
        const resendErr = await resendRes.text();
        console.error('Resend Email Error:', resendErr);
      }
    } else {
      console.warn('RESEND_API_KEY or TO_EMAIL missing in environment variables.');
    }

    return res.status(200).json({
      success: true,
      message: 'Message submitted successfully!',
      dbSaved,
      emailSent
    });
  } catch (err) {
    console.error('Server error processing contact submission:', err);
    return res.status(500).json({ error: 'Internal server error processing contact submission.' });
  }
}
