export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const body = await request.json();
    const { answers, results, email, sendReport } = body;

    // ── Save to Supabase ──────────────────────────────────────────────────────
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      await supabase.from('audits').insert({
        role:        answers?.role     || null,
        experience:  answers?.experience || null,
        industry:    answers?.industry || null,
        location:    answers?.location || null,
        fears:       Array.isArray(answers?.fear)     ? answers.fear     : (answers?.fear     ? [answers.fear]     : []),
        activities:  Array.isArray(answers?.activity) ? answers.activity : (answers?.activity ? [answers.activity] : []),
        email:       email || null,
        overall_score: results?.overall || null,
        risk_level:    results?.risk    || null,
        audit_data:    results          || null,
      });
    } catch (dbErr) {
      console.error('Supabase error (non-fatal):', dbErr);
    }

    // ── Send email if requested ───────────────────────────────────────────────
    if (sendReport && email) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        const d = results;
        const riskColor = d.risk === 'HIGH' ? '#c0392b' : d.risk === 'MEDIUM' ? '#b45309' : '#15803d';

        const dimsHtml = d.dims.map(dim => `
          <tr>
            <td style="padding:14px 0;border-bottom:1px solid #e2ddd7;">
              <div style="font-size:13px;font-weight:600;color:#a09a95;margin-bottom:4px;">${dim.label}</div>
              <div style="font-size:15px;color:#6b6460;line-height:1.6;">${dim.text}</div>
            </td>
            <td style="padding:14px 0 14px 20px;border-bottom:1px solid #e2ddd7;text-align:right;vertical-align:top;width:60px;">
              <span style="font-family:'Georgia',serif;font-size:36px;color:${['#c0392b','#b45309','#1d4ed8','#15803d'][dim.score>=65?0:dim.score>=48?1:dim.score>=34?2:3]};line-height:1;">${dim.score}</span>
            </td>
          </tr>`).join('');

        const actionsHtml = d.actions.map((a, i) => `
          <tr>
            <td style="padding:16px 0;border-bottom:1px solid #e2ddd7;">
              <div style="display:flex;gap:12px;align-items:flex-start;">
                <span style="font-family:'Georgia',serif;font-size:36px;color:#e2ddd7;line-height:1;flex-shrink:0;">0${a.n}</span>
                <div>
                  <div style="margin-bottom:6px;">
                    <span style="font-family:monospace;font-size:12px;color:#c0392b;font-weight:500;">${a.time}</span>
                    <span style="font-family:monospace;font-size:11px;padding:2px 8px;border:1px solid #f5c5c0;color:#c0392b;background:#fdf1f0;margin-left:8px;">${a.impact} impact</span>
                  </div>
                  <p style="font-size:15px;color:#6b6460;line-height:1.65;margin:0 0 4px;">${a.text}</p>
                  <div style="font-family:monospace;font-size:12px;color:#a09a95;">Dimension: ${a.dim}</div>
                </div>
              </div>
            </td>
          </tr>`).join('');

        const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f9f7f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f7f4;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e2ddd7;max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="padding:32px 40px;border-bottom:1px solid #e2ddd7;">
          <div style="font-family:monospace;font-size:15px;font-weight:500;color:#2c2825;">AI<span style="color:#c0392b;">Job</span>Radar</div>
        </td></tr>

        <!-- Score banner -->
        <tr><td style="padding:32px 40px;background:#fdf1f0;border-bottom:1px solid #f5c5c0;">
          <div style="font-family:monospace;font-size:12px;color:#a09a95;margin-bottom:8px;">AI Displacement Risk Report</div>
          <h1 style="font-family:Georgia,serif;font-size:36px;font-weight:400;color:#2c2825;margin:0 0 16px;line-height:1.1;">Your AI Displacement Report</h1>
          <div style="display:inline-flex;align-items:center;gap:8px;padding:7px 16px;background:#fdf1f0;border:1px solid #f5c5c0;color:${riskColor};font-family:monospace;font-size:14px;font-weight:500;">
            ● ${d.risk} Displacement Risk — Score: ${d.overall}/100
          </div>
        </td></tr>

        <!-- Summary -->
        <tr><td style="padding:28px 40px;border-bottom:1px solid #e2ddd7;">
          <p style="font-size:16px;color:#6b6460;line-height:1.75;margin:0 0 16px;">${d.summary}</p>
          <div style="border-left:4px solid #c0392b;background:#fdf1f0;padding:16px 20px;">
            <p style="font-family:Georgia,serif;font-size:18px;color:#c0392b;line-height:1.55;margin:0;">${d.warning}</p>
          </div>
        </td></tr>

        <!-- Dimensions -->
        <tr><td style="padding:28px 40px;border-bottom:1px solid #e2ddd7;">
          <div style="font-size:14px;font-weight:600;color:#a09a95;margin-bottom:16px;">5 Displacement Dimensions</div>
          <table width="100%" cellpadding="0" cellspacing="0">${dimsHtml}</table>
        </td></tr>

        <!-- Action plan -->
        <tr><td style="padding:28px 40px;border-bottom:1px solid #e2ddd7;">
          <div style="font-size:14px;font-weight:600;color:#a09a95;margin-bottom:16px;">Your 90-Day Action Plan</div>
          <table width="100%" cellpadding="0" cellspacing="0">${actionsHtml}</table>
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding:32px 40px;text-align:center;background:#f2eeea;">
          <div style="font-family:Georgia,serif;font-size:24px;color:#2c2825;margin-bottom:10px;">Stay ahead of the radar.</div>
          <p style="font-size:15px;color:#6b6460;margin:0 0 24px;">Pro members get monthly AI threat briefings, score tracking, and a living career dossier.</p>
          <a href="https://aijobradar.app" style="display:inline-block;padding:14px 36px;background:#c0392b;color:#ffffff;text-decoration:none;font-size:16px;font-weight:500;">Upgrade to Pro</a>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 40px;border-top:1px solid #e2ddd7;">
          <p style="font-family:monospace;font-size:12px;color:#a09a95;margin:0;">AIJobRadar.app · You received this because you ran a radar scan.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

        await resend.emails.send({
          from:    'AI Job Radar <radar@onlyscrollclub.com>',
          to:      [email],
          subject: `Your AI Displacement Report — ${d.risk} Risk · Score ${d.overall}/100`,
          html,
        });
      } catch (emailErr) {
        console.error('Resend error (non-fatal):', emailErr);
        return Response.json({ success: false, error: 'Email failed' }, { status: 500 });
      }
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error('API route error:', err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
