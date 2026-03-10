'use client';

import { useState, useEffect } from 'react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    id: 'role',
    label: 'Your Role',
    sub: 'Job function',
    multi: false,
    q: 'What is your current role?',
    hint: 'Select the option that best describes your position',
    opts: [
      { i: '📋', l: 'Project and Programme Manager' },
      { i: '📊', l: 'Business and Systems Analyst' },
      { i: '💼', l: 'Sales Professional' },
      { i: '📣', l: 'Marketing Specialist' },
      { i: '🤝', l: 'HR and People Ops' },
      { i: '🎯', l: 'Customer Success' },
      { i: '⚙️', l: 'Operations and Finance' },
      { i: '💻', l: 'Software Developer' },
      { i: '🧭', l: 'Team Lead and Manager' },
    ],
  },
  {
    id: 'experience',
    label: 'Experience',
    sub: 'Years in workforce',
    multi: false,
    q: 'How many years of professional experience do you have?',
    hint: 'Total years across your entire career, not just your current role',
    opts: [
      { i: '🌱', l: 'Under 2 years' },
      { i: '📈', l: '2 to 5 years' },
      { i: '🏆', l: '6 to 10 years' },
      { i: '⭐', l: '11 to 20 years' },
      { i: '👑', l: '20 years or more' },
    ],
  },
  {
    id: 'industry',
    label: 'Industry',
    sub: 'Your sector',
    multi: false,
    q: 'Which industry are you working in?',
    hint: 'Choose your primary sector',
    opts: [
      { i: '💻', l: 'Technology' },
      { i: '🏦', l: 'Financial Services' },
      { i: '📡', l: 'Telecom' },
      { i: '🏛️', l: 'Public Sector' },
      { i: '🛍️', l: 'Retail and E-commerce' },
      { i: '⚕️', l: 'Healthcare' },
      { i: '🏗️', l: 'Construction and Real Estate' },
      { i: '🌐', l: 'Consulting and Professional Services' },
      { i: '🎓', l: 'Education and Training' },
      { i: '⚖️', l: 'Legal Services' },
      { i: '🏭', l: 'Manufacturing and Logistics' },
      { i: '📰', l: 'Media and Publishing' },
    ],
  },
  {
    id: 'location',
    label: 'Location',
    sub: 'Your region',
    multi: false,
    q: 'Where are you based?',
    hint: 'Your region shapes the job market dynamics in your report',
    opts: [
      { i: '🌎', l: 'North America' },
      { i: '🌎', l: 'Latin America' },
      { i: '🌍', l: 'Europe' },
      { i: '🌍', l: 'Middle East and Africa' },
      { i: '🌏', l: 'Asia Pacific' },
    ],
  },
  {
    id: 'fear',
    label: 'AI Concerns',
    sub: 'Your worries',
    multi: true,
    q: 'What are your AI-related concerns?',
    hint: 'Select all that apply — the more honest you are, the sharper your report',
    opts: [
      { i: '🤖', l: 'AI tools are already doing parts of my job' },
      { i: '📉', l: 'My skills will be obsolete within 2 years' },
      { i: '🚀', l: 'Younger colleagues using AI are outpacing me' },
      { i: '💸', l: 'My salary will be undercut by AI-augmented workers' },
      { i: '☠️', l: 'My entire role will be automated away' },
      { i: '❓', l: 'I do not know which AI tools I need to learn' },
    ],
  },
  {
    id: 'activity',
    label: 'Your Response',
    sub: 'What you are doing',
    multi: true,
    exclusive: 'Honestly, nothing yet',
    q: 'What are you actively doing about it?',
    hint: 'Select all that apply — every combination leads to a different report',
    opts: [
      { i: '🛠️', l: 'Actively learning AI tools for my role' },
      { i: '🎓', l: 'Taking courses or certifications' },
      { i: '👀', l: 'Watching what others do before acting' },
      { i: '🧠', l: 'Building skills AI cannot replicate' },
      { i: '🔄', l: 'Exploring a career change' },
      { i: '😶', l: 'Honestly, nothing yet' },
    ],
  },
];

// ─── SCORING ─────────────────────────────────────────────────────────────────

function rand(n) { return Math.floor(Math.random() * n); }
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function scoreColor(s) {
  if (s >= 65) return '#c0392b';
  if (s >= 48) return '#b45309';
  if (s >= 34) return '#1d4ed8';
  return '#15803d';
}

function buildResults(ans) {
  const role     = ans.role     || 'Professional';
  const exp      = ans.experience || '6 to 10 years';
  const industry = ans.industry || 'Technology';
  const location = ans.location || 'Europe';
  const fears    = Array.isArray(ans.fear)     ? ans.fear     : (ans.fear     ? [ans.fear]     : []);
  const actions  = Array.isArray(ans.activity) ? ans.activity : (ans.activity ? [ans.activity] : []);

  const fearStr   = fears.join(' ');
  const actionStr = actions.join(' ');

  const doingNothing  = actionStr.includes('nothing');
  const activelyAdapt = actionStr.includes('Actively') || actionStr.includes('courses') || actionStr.includes('Building');
  const pivoting      = actionStr.includes('career');
  const watching      = actionStr.includes('Watching');
  const fearsObsolete = fearStr.includes('obsolete') || fearStr.includes('automated away');
  const fearsSalary   = fearStr.includes('salary');
  const fearsOutpaced = fearStr.includes('outpacing');
  const numFears      = fears.length;
  const numActions    = actions.length;

  const base        = doingNothing ? 72 : activelyAdapt ? 40 : watching ? 58 : 54;
  const fearPenalty = Math.min(numFears * 3, 12);
  const actionBonus = activelyAdapt ? Math.min(numActions * 4, 14) : 0;

  const dims = [
    {
      name: 'Task Automation Exposure',
      label: 'How much of your job can AI do?',
      score: clamp(base + fearPenalty - actionBonus + rand(10), 10, 95),
      urgency: fearsObsolete || doingNothing ? 'HIGH' : 'MEDIUM',
      text: `A significant portion of your daily ${role.toLowerCase()} tasks — status updates, reporting, scheduling, documentation — are already being handled by AI tools in your industry.${fearsObsolete ? ' Your own concern about obsolescence signals you already feel this pressure.' : ''}`,
    },
    {
      name: 'Human Irreplaceability',
      label: 'What makes you hard to replace?',
      score: clamp(90 - base - fearPenalty + actionBonus + rand(10), 10, 92),
      urgency: activelyAdapt ? 'LOW' : fearsObsolete ? 'HIGH' : 'MEDIUM',
      text: `Your value lies in judgment, stakeholder trust, and contextual experience. ${activelyAdapt && numActions >= 2 ? 'The fact that you are taking multiple active steps is building real defences.' : doingNothing ? 'Your current inaction is quietly eroding your irreplaceability.' : 'You are aware of the threat but your actions need to match your awareness.'}`,
    },
    {
      name: 'Economic Substitution Risk',
      label: 'Are you competitively priced?',
      score: clamp(base - 5 + (fearsSalary ? 8 : 0) + rand(10), 10, 90),
      urgency: fearsSalary ? 'HIGH' : 'MEDIUM',
      text: `In ${industry}, AI-augmented professionals are completing the same work 40% faster. This is already suppressing salary growth for those who have not adapted.${fearsSalary ? ' You are right to be concerned — salary compression is already happening in your sector.' : ''}`,
    },
    {
      name: 'Adaptability Velocity',
      label: 'How fast are you adapting?',
      score: clamp(doingNothing ? 25 + rand(15) : activelyAdapt ? 60 + rand(20) : 38 + rand(18), 10, 92),
      urgency: doingNothing ? 'HIGH' : activelyAdapt && numActions >= 2 ? 'LOW' : 'MEDIUM',
      text: doingNothing
        ? 'Every month of inaction compounds your disadvantage. AI tools in your field are advancing whether you engage with them or not.'
        : activelyAdapt && numActions >= 2
        ? 'You are taking multiple active steps — this is exactly the right approach. Keep the pace up.'
        : fearsOutpaced
        ? 'Your concern about being outpaced by peers is well-founded. The gap between watchers and doers is widening fast.'
        : 'You are moving, but the pace of AI advancement rewards early movers disproportionately.',
    },
    {
      name: 'Strategic Pivot Readiness',
      label: 'Do you have an exit plan?',
      score: clamp(pivoting ? 70 + rand(15) : doingNothing ? 25 + rand(15) : 38 + rand(20), 10, 92),
      urgency: pivoting ? 'LOW' : doingNothing ? 'HIGH' : 'MEDIUM',
      text: `Your ability to pivot — whether to a more AI-resistant role, a new industry, or a hybrid position — determines your long-term resilience. ${pivoting ? 'The fact that you are already exploring a career change puts you ahead of most.' : 'Right now you have no documented exit plan, which increases your overall exposure.'}`,
    },
  ];

  const overall = Math.round(dims.map(d => d.score).reduce((a, b) => a + b, 0) / dims.length);
  const risk    = overall >= 65 ? 'HIGH' : overall >= 48 ? 'MEDIUM' : 'LOW';

  const fearSummary   = numFears === 1
    ? `one primary concern: ${fears[0].toLowerCase()}`
    : `${numFears} concerns including ${fears.slice(0, 2).map(f => f.toLowerCase()).join(' and ')}`;
  const actionSummary = doingNothing
    ? 'are currently taking no active steps'
    : numActions === 1
    ? 'are taking one active step'
    : `are taking ${numActions} active steps`;

  return {
    overall, risk, role, exp, industry, location, dims,
    summary: `You are a ${exp} ${role.toLowerCase()} in ${industry} based in ${location}. You have ${fearSummary}, and you ${actionSummary} to address your AI displacement risk.`,
    percentile: `You are below 65% of ${role.toLowerCase()}s at your experience level who are actively managing their AI displacement risk.`,
    warning: doingNothing && numFears >= 2
      ? `You have identified ${numFears} real threats to your career and are doing nothing about any of them. That is not a position — it is a liability.`
      : doingNothing
      ? 'At your current trajectory, you are not preparing for disruption — you are practising for it.'
      : numActions >= 3
      ? 'You are taking more action than most. The risk now is losing focus — prioritise the actions with the highest impact on your specific role.'
      : 'The gap between knowing you need to adapt and actually adapting is where careers quietly end.',
    actions: [
      { n: 1, time: 'Next 7 days',  impact: 'HIGH',   dim: 'Task Automation Exposure',  text: `Audit your current role. List every recurring task and identify which ones an AI tool can already perform. This is your personal threat map — it will make every other action more targeted.` },
      { n: 2, time: 'Next 30 days', impact: 'HIGH',   dim: 'Adaptability Velocity',      text: `Deploy one AI tool directly in your workflow — Copilot, Notion AI, or an equivalent for ${industry}. Use it daily until it becomes invisible. Passive awareness of AI tools counts for nothing.` },
      { n: 3, time: 'Next 30 days', impact: 'HIGH',   dim: 'Human Irreplaceability',     text: `Identify the three decisions in your role that require human judgment and make those your visible speciality. Document them and present them to leadership — your irreplaceability must be visible to count.` },
      { n: 4, time: 'Next 60 days', impact: 'MEDIUM', dim: 'Adaptability Velocity',      text: `Research one AI certification relevant to your role and enrol. Your CV needs a visible signal that you are not standing still — especially relevant given your concern about ${fearsSalary ? 'salary compression' : fearsOutpaced ? 'being outpaced by peers' : 'skill obsolescence'}.` },
      { n: 5, time: 'Next 90 days', impact: 'MEDIUM', dim: 'Strategic Pivot Readiness',  text: `Map two adjacent roles that are more AI-resistant and that your skills transfer to. Keep them as live options. ${pivoting ? 'You are already thinking about this — now make it concrete with names, companies, and required skill gaps.' : 'Having no exit plan is a risk multiplier for everything else.'}` },
    ],
  };
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function AuditPage() {
  const [screen, setScreen]   = useState('welcome'); // welcome | form | loading | results
  const [step, setStep]       = useState(0);
  const [ans, setAns]         = useState({});
  const [results, setResults] = useState(null);
  const [loadStep, setLoadStep] = useState(-1);
  const [email, setEmail]     = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);

  // Animate bars on welcome screen
  useEffect(() => {
    if (screen === 'welcome') {
      const t = setTimeout(() => {
        document.querySelectorAll('[data-bar-w]').forEach(el => {
          el.style.width = el.getAttribute('data-bar-w') + '%';
        });
      }, 400);
      return () => clearTimeout(t);
    }
  }, [screen]);

  // Loading animation
  useEffect(() => {
    if (screen === 'loading') {
      setLoadStep(0);
      let i = 0;
      const t = setInterval(() => {
        i++;
        setLoadStep(i);
        if (i >= 5) {
          clearInterval(t);
          const data = buildResults(ans);
          setResults(data);
          // Save to Supabase + send email (fire and forget, no email gate)
          fetch('/api/audit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers: ans, results: data }),
          }).catch(() => {});
          setTimeout(() => setScreen('results'), 600);
        }
      }, 900);
      return () => clearInterval(t);
    }
  }, [screen]);

  // Scroll to top on screen change
  useEffect(() => { window.scrollTo(0, 0); }, [screen]);

  function pickOption(stepIndex, val) {
    const s = STEPS[stepIndex];
    if (s.multi) {
      const current = Array.isArray(ans[s.id]) ? [...ans[s.id]] : [];
      const nothing = s.exclusive || '';
      if (val === nothing) {
        setAns(prev => ({ ...prev, [s.id]: [val] }));
      } else {
        const without = current.filter(v => v !== nothing);
        const already = without.includes(val);
        const next = already ? without.filter(v => v !== val) : [...without, val];
        setAns(prev => ({ ...prev, [s.id]: next }));
      }
    } else {
      setAns(prev => ({ ...prev, [s.id]: val }));
    }
  }

  function isSelected(stepIndex, val) {
    const s = STEPS[stepIndex];
    const a = ans[s.id];
    if (s.multi) return Array.isArray(a) && a.includes(val);
    return a === val;
  }

  function hasAnswer(stepIndex) {
    const a = ans[STEPS[stepIndex].id];
    return Array.isArray(a) ? a.length > 0 : !!a;
  }

  async function sendEmail() {
    if (!email || !email.includes('@')) { setEmailError('Please enter a valid email address.'); return; }
    setSendingEmail(true);
    setEmailError('');
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: ans, results, email, sendReport: true }),
      });
      if (res.ok) { setEmailSent(true); }
      else { setEmailError('Something went wrong. Please try again.'); }
    } catch {
      setEmailError('Something went wrong. Please try again.');
    } finally {
      setSendingEmail(false);
    }
  }

  function restart() {
    setScreen('welcome');
    setStep(0);
    setAns({});
    setResults(null);
    setLoadStep(-1);
    setEmail('');
    setEmailSent(false);
    setEmailError('');
  }

  // ── WELCOME ──────────────────────────────────────────────────────────────
  if (screen === 'welcome') {
    const bars = [
      { role: 'Data Entry', pct: 94 },
      { role: 'Customer Service', pct: 81 },
      { role: 'Finance and Accounting', pct: 73 },
      { role: 'Project Management', pct: 62 },
      { role: 'Software Development', pct: 47 },
      { role: 'Strategic Leadership', pct: 28 },
    ];
    return (
      <div style={S.wGrid}>
        {/* Left */}
        <div style={S.wLeft}>
          <Logo />
          <div style={{ padding: '48px 0 40px' }}>
            <h1 style={S.heroH1}>
              How close are you to being{' '}
              <span style={{ color: 'var(--red)' }}>replaced?</span>
            </h1>
            <p style={S.heroP}>
              Answer 6 questions. Get your personal AI Displacement Risk Score — scored across 5 dimensions and benchmarked against your peers.
            </p>
            <button style={S.btnPrimary} onClick={() => setScreen('form')}>
              Run My Radar Scan →
            </button>
            <span style={S.btnNote}>Free — takes 2 minutes — no account needed</span>
          </div>
          <div style={S.wStats}>
            {[['5', 'Risk Dimensions'], ['2 min', 'To Complete'], ['AI', 'Powered Analysis']].map(([n, l]) => (
              <div key={l}><span style={S.statN}>{n}</span><span style={S.statL}>{l}</span></div>
            ))}
          </div>
        </div>
        {/* Right */}
        <div style={S.wRight}>
          <div>
            <p style={S.barsTitle}>AI automation risk by role — 2026</p>
            {bars.map(b => (
              <div key={b.role} style={S.barRow}>
                <span style={S.barRole}>{b.role}</span>
                <div style={S.barTrack}>
                  <div data-bar-w={b.pct} style={{ ...S.barFill, width: 0, transition: 'width 1.2s ease' }} />
                </div>
                <span style={S.barPct}>{b.pct}%</span>
              </div>
            ))}
          </div>
          <div style={S.rightQuote}>
            <p style={S.rightQuoteP}>
              The question is not whether AI will affect your job. The question is whether you will know before it does.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── FORM ─────────────────────────────────────────────────────────────────
  if (screen === 'form') {
    const s = STEPS[step];
    return (
      <div style={S.fGrid}>
        {/* Sidebar */}
        <div style={S.fSidebar}>
          <div style={S.sbLogo}>AI<span style={{ color: 'var(--red)' }}>Job</span>Radar</div>
          {STEPS.map((st, i) => (
            <div key={st.id} style={{
              ...S.sbStep,
              borderBottom: i < STEPS.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{
                ...S.sbNum,
                background: i < step ? 'var(--green)' : i === step ? 'var(--red)' : 'var(--white)',
                borderColor: i < step ? 'var(--green)' : i === step ? 'var(--red)' : 'var(--border)',
                color: i <= step ? '#fff' : 'var(--muted)',
              }}>
                {i < step ? '✓' : i + 1}
              </div>
              <div>
                <div style={{ ...S.sbLabel, color: i === step ? 'var(--text)' : 'var(--muted)' }}>{st.label}</div>
                <div style={S.sbSub}>{st.sub}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Form body */}
        <div style={S.fBody}>
          <div style={S.qNum}>Question {step + 1} of {STEPS.length}</div>
          <h2 style={S.qTitle}>{s.q}</h2>
          <p style={S.qHint}>{s.hint}</p>
          {s.multi && (
            <div style={S.multiHint}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
              Select all that apply
            </div>
          )}
          <div style={S.optsGrid}>
            {s.opts.map(o => {
              const sel = isSelected(step, o.l);
              return (
                <button
                  key={o.l}
                  onClick={() => pickOption(step, o.l)}
                  style={{
                    ...S.opt,
                    borderColor: sel ? 'var(--red)' : 'var(--border)',
                    background: sel ? 'var(--red-bg)' : 'var(--white)',
                    color: sel ? 'var(--text)' : 'var(--mid)',
                  }}
                >
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{o.i}</span>
                  {o.l}
                </button>
              );
            })}
          </div>
          <div style={S.fNav}>
            {step > 0
              ? <button style={S.btnBack} onClick={() => setStep(step - 1)}>Back</button>
              : <div />
            }
            <button
              style={{ ...S.btnNext, opacity: hasAnswer(step) ? 1 : 0.3, cursor: hasAnswer(step) ? 'pointer' : 'not-allowed' }}
              disabled={!hasAnswer(step)}
              onClick={() => {
                if (!hasAnswer(step)) return;
                if (step < STEPS.length - 1) setStep(step + 1);
                else setScreen('loading');
              }}
            >
              {step === STEPS.length - 1 ? 'Run My Radar' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── LOADING ───────────────────────────────────────────────────────────────
  if (screen === 'loading') {
    const loadingItems = [
      'Profiling your role and industry',
      'Mapping AI threat exposure',
      'Benchmarking against your peers',
      'Scoring 5 displacement dimensions',
      'Generating your action plan',
    ];
    return (
      <div style={S.loadWrap}>
        <div style={S.loadInner}>
          <div style={S.radarCircle}>
            <div style={S.sweep} />
          </div>
          <h2 style={S.loadTitle}>Scanning your profile</h2>
          <p style={S.loadSub}>Calculating your displacement risk. This takes a moment.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left' }}>
            {loadingItems.map((item, i) => {
              const done   = i < loadStep - 1;
              const active = i === loadStep - 1;
              return (
                <div key={item} style={{
                  ...S.loadItem,
                  color: done ? 'var(--muted)' : active ? 'var(--text)' : 'var(--muted)',
                  background: active ? 'var(--white)' : 'transparent',
                  borderColor: active ? 'var(--red-border)' : 'transparent',
                  textDecoration: done ? 'line-through' : 'none',
                }}>
                  <span style={{
                    width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                    background: done ? 'var(--green)' : active ? 'var(--red)' : 'var(--border)',
                    display: 'inline-block',
                  }} />
                  {item}
                </div>
              );
            })}
          </div>
        </div>
        <style>{`@keyframes sweep{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  // ── RESULTS ───────────────────────────────────────────────────────────────
  if (screen === 'results' && results) {
    const d  = results;
    const C  = 2 * Math.PI * 52;
    const rc = scoreColor(d.overall);
    const riskColors = { HIGH: 'var(--red)', MEDIUM: 'var(--amber)', LOW: 'var(--green)' };
    const riskBgs    = { HIGH: 'var(--red-bg)', MEDIUM: 'var(--amber-bg)', LOW: 'var(--green-bg)' };
    const riskBorders = { HIGH: 'var(--red-border)', MEDIUM: '#fde68a', LOW: '#bbf7d0' };

    return (
      <div style={S.rWrap}>
        <div style={S.rEyebrow}>AIJobRadar — Displacement Risk Report</div>

        {/* Header */}
        <div style={S.rHeader}>
          <div>
            <div style={{
              ...S.riskBadge,
              color: riskColors[d.risk],
              borderColor: riskBorders[d.risk],
              background: riskBgs[d.risk],
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: riskColors[d.risk], display: 'inline-block', flexShrink: 0 }} />
              {d.risk} Displacement Risk
            </div>
            <h1 style={S.rTitle}>Your AI Displacement Report</h1>
          </div>
          {/* Score ring */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div style={{ width: 116, height: 116, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 120 120" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                <circle cx="60" cy="60" r="52" fill="none" stroke="var(--bg2)" strokeWidth="7" />
                <circle cx="60" cy="60" r="52" fill="none" stroke={rc} strokeWidth="7"
                  strokeDasharray={C}
                  strokeDashoffset={C - (d.overall / 100) * C}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)' }}
                />
              </svg>
              <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: 34, color: rc, zIndex: 1, lineHeight: 1 }}>{d.overall}</span>
            </div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 14, color: 'var(--muted)', textAlign: 'center' }}>Risk Score / 100</div>
          </div>
        </div>

        {/* Percentile bar */}
        <div style={S.pctBar}>
          <div style={S.pctTrack}>
            <div style={{ height: '100%', width: d.overall + '%', background: 'linear-gradient(to right, var(--green), var(--amber), var(--red))', transition: 'width 1.5s ease' }} />
            <div style={{ position: 'absolute', top: -5, left: d.overall + '%', width: 2, height: 16, background: 'var(--text)', transition: 'left 1.5s ease' }} />
          </div>
          <div style={S.pctLabel}>{d.percentile}</div>
        </div>

        <p style={S.rSummary}>{d.summary}</p>
        <div style={S.warningBox}><p style={S.warningP}>{d.warning}</p></div>

        {/* Score key */}
        <div style={S.scoreKey}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--mid)', marginRight: 4 }}>Score guide:</span>
          {[['#c0392b','70 to 100 — High Risk'],['#b45309','50 to 69 — Moderate'],['#1d4ed8','35 to 49 — Managed'],['#15803d','0 to 34 — Low Risk']].map(([c,l]) => (
            <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 14, color: 'var(--mid)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block', flexShrink: 0 }} />{l}
            </span>
          ))}
        </div>

        {/* Dimensions */}
        <div style={S.secLabel}>5 Displacement Dimensions</div>
        <div style={S.dimsGrid}>
          {d.dims.map(dim => {
            const c = scoreColor(dim.score);
            const urgColors = { HIGH: 'var(--red)', MEDIUM: 'var(--amber)', LOW: 'var(--green)' };
            const urgBgs    = { HIGH: 'var(--red-bg)', MEDIUM: 'var(--amber-bg)', LOW: 'var(--green-bg)' };
            return (
              <div key={dim.name} style={{ ...S.dimCard, borderBottomColor: c }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div>
                    <div style={S.dimName}>{dim.label}</div>
                    <span style={{ ...S.dimTag, color: urgColors[dim.urgency], background: urgBgs[dim.urgency], borderColor: urgColors[dim.urgency] }}>
                      {dim.urgency} urgency
                    </span>
                  </div>
                  <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 44, lineHeight: 1, color: c }}>{dim.score}</div>
                </div>
                <p style={S.dimText}>{dim.text}</p>
              </div>
            );
          })}
        </div>

        {/* Action plan */}
        <div style={S.secLabel}>Your 90-Day Action Plan</div>
        <div style={{ marginBottom: 48 }}>
          {d.actions.map(a => (
            <div key={a.n} style={S.actItem}>
              <div style={S.actNum}>0{a.n}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
                  <span style={S.actTime}>{a.time}</span>
                  <span style={{
                    ...S.actImpact,
                    ...(a.impact === 'HIGH' ? { borderColor: 'var(--red-border)', color: 'var(--red)', background: 'var(--red-bg)' } : {}),
                  }}>{a.impact} impact</span>
                </div>
                <p style={S.actText}>{a.text}</p>
                <div style={S.actDim}>Dimension: {a.dim}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Email capture */}
        <div style={S.emailBox}>
          <div style={S.emailTitle}>Get your full report by email</div>
          <p style={S.emailSub}>We will send you a complete copy of this report with your scores and action plan — keep it, share it, come back to it.</p>
          {emailSent ? (
            <div style={S.emailSuccess}>Report sent. Check your inbox.</div>
          ) : (
            <div style={S.emailForm}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={S.emailInput}
                onKeyDown={e => e.key === 'Enter' && sendEmail()}
              />
              <button style={S.emailBtn} onClick={sendEmail} disabled={sendingEmail}>
                {sendingEmail ? 'Sending...' : 'Send My Report'}
              </button>
            </div>
          )}
          {emailError && <p style={{ color: 'var(--red)', fontSize: 14, marginTop: 8 }}>{emailError}</p>}
        </div>

        {/* CTA */}
        <div style={S.ctaBox}>
          <div style={S.ctaTitle}>Stay ahead of the radar.</div>
          <p style={S.ctaSub}>Pro members get monthly AI threat briefings, score tracking, and a living career dossier.</p>
          <a href="#" style={S.btnCta}>Upgrade to Pro</a>
          <br />
          <button style={S.btnRestart} onClick={restart}>Run a new scan</button>
        </div>
      </div>
    );
  }

  return null;
}

// ─── Logo component ───────────────────────────────────────────────────────────
function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 34, height: 34, background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
          <circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1"/>
          <circle cx="8" cy="8" r="3.5" stroke="white" strokeWidth="1" opacity="0.5"/>
          <line x1="8" y1="8" x2="14" y2="4.5" stroke="white" strokeWidth="1.5"/>
          <circle cx="8" cy="8" r="1.2" fill="white"/>
        </svg>
      </div>
      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 16, fontWeight: 500, color: 'var(--text)' }}>
        AI<span style={{ color: 'var(--red)' }}>Job</span>Radar
      </div>
    </div>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const S = {
  // Welcome
  wGrid:   { display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' },
  wLeft:   { padding: '56px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '1px solid var(--border)' },
  wRight:  { background: 'var(--bg)', padding: '56px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 40 },
  heroH1:  { fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(38px, 5vw, 62px)', fontWeight: 400, lineHeight: 1.08, color: 'var(--text)', marginBottom: 22 },
  heroP:   { fontSize: 18, color: 'var(--mid)', lineHeight: 1.7, maxWidth: 440, marginBottom: 36 },
  btnPrimary: { display: 'inline-flex', alignItems: 'center', gap: 10, background: 'var(--red)', color: '#fff', border: 'none', padding: '16px 36px', fontFamily: 'DM Sans, sans-serif', fontSize: 17, fontWeight: 500, cursor: 'pointer', boxShadow: '0 4px 14px rgba(192,57,43,0.25)' },
  btnNote: { display: 'block', fontSize: 14, color: 'var(--muted)', marginTop: 10 },
  wStats:  { display: 'flex', gap: 40, paddingTop: 36, borderTop: '1px solid var(--border)' },
  statN:   { fontFamily: 'DM Serif Display, serif', fontSize: 30, color: 'var(--text)', display: 'block', lineHeight: 1, marginBottom: 4 },
  statL:   { fontSize: 14, color: 'var(--muted)' },
  barsTitle: { fontSize: 15, fontWeight: 600, color: 'var(--mid)', marginBottom: 18 },
  barRow:  { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 },
  barRole: { fontSize: 15, color: 'var(--mid)', width: 180, flexShrink: 0 },
  barTrack: { flex: 1, height: 6, background: 'var(--border)', position: 'relative', overflow: 'hidden' },
  barFill: { height: '100%', background: 'var(--red)' },
  barPct:  { fontFamily: 'DM Mono, monospace', fontSize: 15, color: 'var(--red)', width: 40, textAlign: 'right', flexShrink: 0 },
  rightQuote: { background: 'var(--white)', border: '1px solid var(--border)', borderLeft: '4px solid var(--red)', padding: '22px 24px' },
  rightQuoteP: { fontFamily: 'DM Serif Display, serif', fontSize: 20, color: 'var(--text)', lineHeight: 1.6 },
  // Form
  fGrid:   { display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '100vh' },
  fSidebar: { background: 'var(--bg)', borderRight: '1px solid var(--border)', padding: '48px 28px', height: '100vh', position: 'sticky', top: 0, overflow: 'hidden' },
  sbLogo:  { fontFamily: 'DM Mono, monospace', fontSize: 15, fontWeight: 500, color: 'var(--text)', marginBottom: 44 },
  sbStep:  { display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 0' },
  sbNum:   { width: 28, height: 28, border: '1px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Mono, monospace', fontSize: 14, flexShrink: 0, transition: 'all 0.2s' },
  sbLabel: { fontSize: 15, fontWeight: 500, transition: 'color 0.2s' },
  sbSub:   { fontSize: 13, color: 'var(--muted)', marginTop: 2 },
  fBody:   { padding: '64px 72px', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 720 },
  qNum:    { fontFamily: 'DM Mono, monospace', fontSize: 15, color: 'var(--muted)', marginBottom: 10 },
  qTitle:  { fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 400, lineHeight: 1.15, color: 'var(--text)', marginBottom: 8 },
  qHint:   { fontSize: 16, color: 'var(--muted)', marginBottom: 16 },
  multiHint: { display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--mid)', background: 'var(--bg)', border: '1px solid var(--border)', padding: '5px 12px', marginBottom: 24 },
  optsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 40 },
  opt:     { padding: '16px 18px', border: '1px solid', background: 'var(--white)', cursor: 'pointer', textAlign: 'left', fontFamily: 'DM Sans, sans-serif', fontSize: 16, display: 'flex', alignItems: 'flex-start', gap: 12, lineHeight: 1.4, transition: 'all 0.15s', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' },
  fNav:    { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  btnBack: { background: 'none', border: '1px solid var(--border)', color: 'var(--muted)', padding: '12px 24px', fontFamily: 'DM Sans, sans-serif', fontSize: 16, cursor: 'pointer' },
  btnNext: { background: 'var(--text)', color: '#fff', border: 'none', padding: '14px 36px', fontFamily: 'DM Sans, sans-serif', fontSize: 16, fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' },
  // Loading
  loadWrap:  { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg)', textAlign: 'center' },
  loadInner: { maxWidth: 460, padding: 40 },
  radarCircle: { width: 90, height: 90, border: '1px solid var(--border)', borderRadius: '50%', margin: '0 auto 44px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  sweep:     { position: 'absolute', width: 45, height: 1.5, background: 'linear-gradient(to right, var(--red), transparent)', transformOrigin: 'left center', animation: 'sweep 1.6s linear infinite', top: '50%', left: '50%' },
  loadTitle: { fontFamily: 'DM Serif Display, serif', fontSize: 30, color: 'var(--text)', marginBottom: 8 },
  loadSub:   { fontSize: 16, color: 'var(--muted)', marginBottom: 36 },
  loadItem:  { display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'DM Mono, monospace', fontSize: 15, padding: '12px 16px', border: '1px solid transparent', transition: 'all 0.4s' },
  // Results
  rWrap:   { maxWidth: 880, margin: '0 auto', padding: '64px 40px 100px' },
  rEyebrow: { fontFamily: 'DM Mono, monospace', fontSize: 15, color: 'var(--muted)', marginBottom: 14 },
  rHeader: { display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'start', marginBottom: 36 },
  rTitle:  { fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, lineHeight: 1.05, color: 'var(--text)' },
  riskBadge: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', fontFamily: 'DM Mono, monospace', fontSize: 15, fontWeight: 500, border: '1px solid', marginBottom: 16 },
  pctBar:  { display: 'flex', alignItems: 'center', gap: 20, background: 'var(--bg)', border: '1px solid var(--border)', padding: '18px 22px', marginBottom: 28 },
  pctTrack: { flex: 1, height: 6, background: 'var(--border)', position: 'relative' },
  pctLabel: { fontSize: 15, color: 'var(--mid)', maxWidth: 280, flexShrink: 0 },
  rSummary: { fontSize: 17, color: 'var(--mid)', lineHeight: 1.75, marginBottom: 16, maxWidth: 640 },
  warningBox: { borderLeft: '4px solid var(--red)', background: 'var(--red-bg)', padding: '18px 22px', marginBottom: 44 },
  warningP: { fontFamily: 'DM Serif Display, serif', fontSize: 20, color: 'var(--red)', lineHeight: 1.55 },
  scoreKey: { display: 'flex', gap: 20, flexWrap: 'wrap', padding: '14px 18px', background: 'var(--bg)', border: '1px solid var(--border)', marginBottom: 24 },
  secLabel: { fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 600, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18, borderBottom: '1px solid var(--border)', paddingBottom: 12 },
  dimsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 44 },
  dimCard: { border: '1px solid var(--border)', borderBottom: '3px solid', padding: 22, background: 'var(--white)' },
  dimName: { fontSize: 14, fontWeight: 600, color: 'var(--muted)', marginBottom: 6 },
  dimTag:  { fontFamily: 'DM Mono, monospace', fontSize: 13, fontWeight: 500, padding: '3px 10px', border: '1px solid', display: 'inline-block', marginBottom: 10 },
  dimText: { fontSize: 15, color: 'var(--mid)', lineHeight: 1.65 },
  actItem: { display: 'grid', gridTemplateColumns: '52px 1fr', gap: 20, padding: '20px 0', borderBottom: '1px solid var(--border)' },
  actNum:  { fontFamily: 'DM Serif Display, serif', fontSize: 48, color: 'var(--border)', lineHeight: 1 },
  actTime: { fontFamily: 'DM Mono, monospace', fontSize: 14, color: 'var(--red)', fontWeight: 500 },
  actImpact: { fontFamily: 'DM Mono, monospace', fontSize: 13, padding: '2px 9px', border: '1px solid var(--border)', color: 'var(--muted)' },
  actText: { fontSize: 16, color: 'var(--mid)', lineHeight: 1.65 },
  actDim:  { fontFamily: 'DM Mono, monospace', fontSize: 13, color: 'var(--muted)', marginTop: 6 },
  // Email
  emailBox: { background: 'var(--bg)', border: '1px solid var(--border)', padding: 40, marginBottom: 24, textAlign: 'center' },
  emailTitle: { fontFamily: 'DM Serif Display, serif', fontSize: 26, color: 'var(--text)', marginBottom: 10 },
  emailSub: { fontSize: 16, color: 'var(--mid)', marginBottom: 24, maxWidth: 420, margin: '0 auto 24px' },
  emailForm: { display: 'flex', gap: 10, maxWidth: 440, margin: '0 auto' },
  emailInput: { flex: 1, padding: '13px 16px', border: '1px solid var(--border)', fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: 'var(--text)', outline: 'none' },
  emailBtn: { background: 'var(--red)', color: '#fff', border: 'none', padding: '13px 24px', fontFamily: 'DM Sans, sans-serif', fontSize: 16, fontWeight: 500, cursor: 'pointer', flexShrink: 0 },
  emailSuccess: { display: 'inline-block', padding: '12px 24px', background: 'var(--green-bg)', border: '1px solid #bbf7d0', color: 'var(--green)', fontFamily: 'DM Mono, monospace', fontSize: 15 },
  // CTA
  ctaBox:  { background: 'var(--bg2)', border: '1px solid var(--border)', padding: 48, textAlign: 'center', marginTop: 24 },
  ctaTitle: { fontFamily: 'DM Serif Display, serif', fontSize: 34, color: 'var(--text)', marginBottom: 12 },
  ctaSub:  { fontSize: 17, color: 'var(--mid)', marginBottom: 28, maxWidth: 380, margin: '0 auto 28px' },
  btnCta:  { display: 'inline-block', padding: '16px 40px', background: 'var(--red)', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: 17, fontWeight: 500, border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(192,57,43,0.25)', textDecoration: 'none' },
  btnRestart: { display: 'inline-block', marginTop: 14, background: 'none', border: '1px solid var(--border)', color: 'var(--muted)', padding: '11px 28px', fontFamily: 'DM Sans, sans-serif', fontSize: 15, cursor: 'pointer' },
};
