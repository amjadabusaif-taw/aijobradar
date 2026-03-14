'use client';

import { useState, useEffect } from 'react';
import { getRecommendations } from './products';

// ─── DATA ────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    id: 'role',
    label: 'Your Role',
    sub: 'Job function',
    multi: false,
    q: 'What is your current role?',
    hint: 'Select the option that best describes your position',
    groups: [
      { cat: 'Business and Management', opts: [
        { i: '📋', l: 'Project and Programme Manager' },
        { i: '📊', l: 'Business Analyst' },
        { i: '⚙️', l: 'Operations Manager' },
        { i: '🧭', l: 'Team Lead and Manager' },
      ]},
      { cat: 'Construction and Real Estate', opts: [
        { i: '🏗️', l: 'Site and Project Engineer' },
        { i: '📐', l: 'Quantity Surveyor' },
        { i: '🏠', l: 'Property and Real Estate Agent' },
      ]},
      { cat: 'Customer and Client Services', opts: [
        { i: '🎯', l: 'Customer Success' },
        { i: '🎧', l: 'Customer Support' },
        { i: '🤝', l: 'Account Manager' },
      ]},
      { cat: 'Education', opts: [
        { i: '🎓', l: 'Teacher, Tutor and Trainer' },
        { i: '🔬', l: 'Academic Researcher' },
        { i: '🏫', l: 'Education Administrator' },
      ]},
      { cat: 'Finance and Banking', opts: [
        { i: '📈', l: 'Financial Analyst and Advisor' },
        { i: '⚖️', l: 'Risk and Compliance Officer' },
        { i: '🧾', l: 'Accountant and Auditor' },
        { i: '💳', l: 'Fintech Specialist' },
      ]},
      { cat: 'Healthcare', opts: [
        { i: '⚕️', l: 'Clinical and Medical Staff' },
        { i: '🏥', l: 'Healthcare Administrator' },
        { i: '💊', l: 'Pharmacist and Lab Specialist' },
      ]},
      { cat: 'HR and People', opts: [
        { i: '👥', l: 'HR and People Ops' },
        { i: '🔍', l: 'Talent Acquisition Specialist' },
        { i: '📚', l: 'Learning and Development' },
      ]},
      { cat: 'Legal', opts: [
        { i: '⚖️', l: 'Legal Counsel and Advisor' },
        { i: '📄', l: 'Paralegal and Legal Support' },
        { i: '🔏', l: 'Compliance and Regulatory Officer' },
      ]},
      { cat: 'Manufacturing and Logistics', opts: [
        { i: '🚚', l: 'Supply Chain Coordinator' },
        { i: '🏭', l: 'Production Supervisor' },
        { i: '🔎', l: 'Quality and Safety Inspector' },
      ]},
      { cat: 'Media and Publishing', opts: [
        { i: '✍️', l: 'Content Creator and Journalist' },
        { i: '🎬', l: 'Video and Audio Producer' },
        { i: '📱', l: 'Social Media Specialist' },
        { i: '✒️', l: 'Copywriter and Editor' },
      ]},
      { cat: 'Public Sector', opts: [
        { i: '🏛️', l: 'Policy and Regulatory Officer' },
        { i: '📋', l: 'Civil Servant and Administrator' },
        { i: '🌍', l: 'Public Health and Social Worker' },
      ]},
      { cat: 'Sales and Marketing', opts: [
        { i: '💼', l: 'Sales Professional' },
        { i: '📣', l: 'Marketing Specialist' },
        { i: '🛍️', l: 'E-commerce and Merchandising' },
      ]},
      { cat: 'Technology', opts: [
        { i: '💻', l: 'Software Developer' },
        { i: '🖥️', l: 'IT and Systems Administrator' },
        { i: '📊', l: 'Data Analyst and Engineer' },
        { i: '🔐', l: 'Cybersecurity Specialist' },
      ]},
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

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function scoreColor(s) {
  if (s >= 65) return '#c0392b';
  if (s >= 48) return '#b45309';
  if (s >= 34) return '#1d4ed8';
  return '#15803d';
}

// Deterministic variation based on input string (replaces rand())
function stableOffset(str, range) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  return Math.abs(h) % range;
}

// Role-specific automation weights — higher = more automatable
const AUTOMATION_WEIGHT = {
  'Project and Programme Manager': 58, 'Business Analyst': 55, 'Operations Manager': 52, 'Team Lead and Manager': 48,
  'Site and Project Engineer': 38, 'Quantity Surveyor': 62, 'Property and Real Estate Agent': 55,
  'Customer Success': 50, 'Customer Support': 72, 'Account Manager': 45,
  'Teacher, Tutor and Trainer': 40, 'Academic Researcher': 48, 'Education Administrator': 65,
  'Financial Analyst and Advisor': 62, 'Risk and Compliance Officer': 55, 'Accountant and Auditor': 70, 'Fintech Specialist': 45,
  'Clinical and Medical Staff': 30, 'Healthcare Administrator': 65, 'Pharmacist and Lab Specialist': 50,
  'HR and People Ops': 52, 'Talent Acquisition Specialist': 58, 'Learning and Development': 50,
  'Legal Counsel and Advisor': 48, 'Paralegal and Legal Support': 72, 'Compliance and Regulatory Officer': 55,
  'Supply Chain Coordinator': 60, 'Production Supervisor': 42, 'Quality and Safety Inspector': 45,
  'Content Creator and Journalist': 68, 'Video and Audio Producer': 55, 'Social Media Specialist': 70, 'Copywriter and Editor': 75,
  'Policy and Regulatory Officer': 45, 'Civil Servant and Administrator': 62, 'Public Health and Social Worker': 35,
  'Sales Professional': 50, 'Marketing Specialist': 62, 'E-commerce and Merchandising': 58,
  'Software Developer': 55, 'IT and Systems Administrator': 60, 'Data Analyst and Engineer': 58, 'Cybersecurity Specialist': 42,
};

// Role-specific task descriptions for the automation dimension
const ROLE_TASKS = {
  'Project and Programme Manager': 'status reporting, scheduling, resource allocation, and stakeholder updates',
  'Business Analyst': 'requirements documentation, process mapping, data gathering, and report generation',
  'Operations Manager': 'workflow coordination, performance tracking, process documentation, and resource scheduling',
  'Team Lead and Manager': 'status updates, reporting, scheduling, documentation, and performance tracking',
  'Customer Support': 'ticket triage, FAQ responses, status updates, and initial troubleshooting',
  'Customer Success': 'health score monitoring, renewal tracking, onboarding checklists, and usage reporting',
  'Account Manager': 'CRM updates, proposal drafts, meeting scheduling, and activity logging',
  'Financial Analyst and Advisor': 'financial modelling, report generation, data reconciliation, and scenario analysis',
  'Accountant and Auditor': 'bookkeeping, transaction reconciliation, audit sampling, and tax preparation',
  'Software Developer': 'boilerplate code, test writing, documentation, bug detection, and code review',
  'Data Analyst and Engineer': 'data pipeline creation, SQL queries, dashboard building, and exploratory analysis',
  'Content Creator and Journalist': 'first-draft articles, social media copy, research summaries, and content briefs',
  'Copywriter and Editor': 'first-draft copy, product descriptions, email sequences, and content variations',
  'Paralegal and Legal Support': 'document review, legal research, filing preparation, and contract analysis',
};

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
  const fearsAlready  = fearStr.includes('already doing');
  const fearsToolGap  = fearStr.includes('do not know which');
  const numFears      = fears.length;
  const numActions    = actions.filter(a => !a.includes('nothing')).length;

  // Deterministic offsets based on unique input combination
  const seed = `${role}|${exp}|${industry}|${location}`;
  const off1 = stableOffset(seed + 'auto', 8);
  const off2 = stableOffset(seed + 'irre', 8);
  const off3 = stableOffset(seed + 'econ', 8);
  const off4 = stableOffset(seed + 'adpt', 8);
  const off5 = stableOffset(seed + 'pivt', 8);

  // Experience modifier: more experience = slightly more to lose, but also more resilience
  const expMod = exp.includes('Under 2') ? -5 : exp.includes('2 to 5') ? -2 : exp.includes('20') ? 4 : exp.includes('11') ? 3 : 0;

  // Base automation score from role-specific weight
  const autoBase = AUTOMATION_WEIGHT[role] || 52;
  const fearPenalty = Math.min(numFears * 3, 12);
  const actionBonus = activelyAdapt ? Math.min(numActions * 5, 15) : watching ? 3 : 0;

  const roleTasks = ROLE_TASKS[role] || 'reporting, documentation, scheduling, and routine analysis';

  const dims = [
    {
      name: 'Task Automation Exposure',
      label: 'How much of your job can AI do?',
      score: clamp(autoBase + fearPenalty - actionBonus + off1 + expMod, 10, 95),
      urgency: autoBase >= 65 || (fearsObsolete && doingNothing) ? 'HIGH' : autoBase >= 50 ? 'MEDIUM' : 'LOW',
      text: `A significant portion of your daily ${role.toLowerCase()} tasks \u2014 ${roleTasks} \u2014 are already being handled by AI tools in ${industry.toLowerCase()}.${fearsObsolete ? ' Your own concern about obsolescence signals you already feel this pressure.' : fearsAlready ? ' You have already noticed AI encroaching on your work. That awareness is accurate.' : ''}`,
    },
    {
      name: 'Human Irreplaceability',
      label: 'What makes you hard to replace?',
      score: clamp(92 - autoBase - fearPenalty + actionBonus + off2, 10, 92),
      urgency: activelyAdapt && numActions >= 2 ? 'LOW' : doingNothing ? 'HIGH' : 'MEDIUM',
      text: `Your value as a ${role.toLowerCase()} lies in judgment, stakeholder trust, and contextual experience that AI cannot replicate. ${activelyAdapt && numActions >= 2 ? 'Your active investment in multiple areas is building real defences.' : doingNothing ? 'Your current inaction is quietly eroding the advantage your experience gives you.' : 'You are aware of the threat, but your actions need to match your awareness before that advantage fades.'}`,
    },
    {
      name: 'Economic Substitution Risk',
      label: 'Are you competitively priced?',
      score: clamp(autoBase - 6 + (fearsSalary ? 10 : 0) + off3 + expMod, 10, 90),
      urgency: fearsSalary ? 'HIGH' : autoBase >= 60 ? 'MEDIUM' : 'LOW',
      text: `In ${industry.toLowerCase()}, AI-augmented professionals are completing the same work significantly faster. ${fearsSalary ? 'You are right to be concerned \u2014 salary compression is already visible in your sector, and it accelerates as AI tools become standard.' : `This is already suppressing salary growth for ${role.toLowerCase()}s who have not adapted.`}`,
    },
    {
      name: 'Adaptability Velocity',
      label: 'How fast are you adapting?',
      score: clamp(doingNothing ? 22 + off4 : activelyAdapt ? 58 + numActions * 5 + off4 : watching ? 35 + off4 : 40 + off4, 10, 92),
      urgency: doingNothing ? 'HIGH' : activelyAdapt && numActions >= 2 ? 'LOW' : 'MEDIUM',
      text: doingNothing
        ? `Every month of inaction compounds your disadvantage. AI tools relevant to ${role.toLowerCase()}s in ${industry.toLowerCase()} are advancing whether you engage with them or not.`
        : activelyAdapt && numActions >= 2
        ? 'You are taking multiple active steps \u2014 this is exactly the right approach. The key now is consistency and focus on the highest-impact areas.'
        : fearsOutpaced
        ? 'Your concern about being outpaced by peers is well-founded. The gap between those who use AI tools daily and those who watch from the sideline is widening fast.'
        : fearsToolGap
        ? 'You have identified that you do not know which AI tools to learn. That honesty is the first step \u2014 but the window for action is narrowing.'
        : 'You are moving, but the pace of AI advancement rewards early movers disproportionately. Watching is not adapting.',
    },
    {
      name: 'Strategic Pivot Readiness',
      label: 'Do you have an exit plan?',
      score: clamp(pivoting ? 68 + off5 : doingNothing ? 22 + off5 : 36 + off5, 10, 92),
      urgency: pivoting ? 'LOW' : doingNothing ? 'HIGH' : 'MEDIUM',
      text: `Your ability to pivot \u2014 whether to a more AI-resistant role, a new industry, or a hybrid position \u2014 determines your long-term resilience as a ${role.toLowerCase()}. ${pivoting ? 'The fact that you are already exploring a career change puts you ahead of most. Now make it concrete with specific targets and skill gaps.' : 'Right now you have no documented exit plan, which increases your overall exposure to displacement.'}`,
    },
  ];

  // For the overall risk score, all dimensions must point the same direction (high = more risk).
  // Automation and Economic are already "high = bad". Irreplaceability, Adaptability, and Pivot
  // are "high = good", so we invert them for the average.
  const riskScores = dims.map(d => {
    if (['Human Irreplaceability', 'Adaptability Velocity', 'Strategic Pivot Readiness'].includes(d.name)) {
      return 100 - d.score; // invert: low irreplaceability/adaptability/pivot = high risk
    }
    return d.score; // high automation/economic = high risk
  });
  const overall = Math.round(riskScores.reduce((a, b) => a + b, 0) / riskScores.length);
  const risk    = overall >= 65 ? 'HIGH' : overall >= 45 ? 'MEDIUM' : 'LOW';

  // Clean summary paragraph
  const expLabel = exp.toLowerCase().replace('under ', 'less than ');
  const fearSummary = numFears === 0
    ? 'no stated concerns'
    : numFears === 1
    ? `one primary concern: ${fears[0].charAt(0).toLowerCase() + fears[0].slice(1)}`
    : `${numFears} concerns, including ${fears[0].charAt(0).toLowerCase() + fears[0].slice(1)}`;
  const actionSummary = doingNothing
    ? 'are not currently taking active steps to address it'
    : numActions === 1
    ? 'are taking one active step to address it'
    : `are taking ${numActions} active steps to address it`;

  // Role-specific action plans
  const actionPlan = buildActionPlan(role, industry, { doingNothing, activelyAdapt, pivoting, watching, fearsObsolete, fearsSalary, fearsOutpaced, fearsToolGap, numFears, numActions });

  // Product recommendations
  const recommendations = getRecommendations(role, dims);

  return {
    overall, risk, role, exp, industry, location, dims, recommendations,
    summary: `You are a ${role.toLowerCase()} with ${expLabel} of experience, working in ${industry.toLowerCase()} and based in ${location}. You have ${fearSummary}, and you ${actionSummary}.`,
    percentile: `Your overall displacement risk is ${risk.toLowerCase()} relative to professionals in similar roles who are actively managing their AI exposure.`,
    warning: doingNothing && numFears >= 2
      ? `You have identified ${numFears} real threats to your career and are doing nothing about any of them. That is not a position \u2014 it is a liability.`
      : doingNothing
      ? 'At your current trajectory, you are not preparing for disruption \u2014 you are practising for it.'
      : numActions >= 3
      ? 'You are taking more action than most. The risk now is losing focus \u2014 prioritise the actions with the highest impact on your specific role.'
      : 'The gap between knowing you need to adapt and actually adapting is where careers quietly end.',
    actions: actionPlan,
  };
}

// ─── ROLE-SPECIFIC ACTION PLANS ──────────────────────────────────────────────

function buildActionPlan(role, industry, ctx) {
  const r = role.toLowerCase();
  const ind = industry.toLowerCase();

  // Role-specific step 1 (always: audit your specific tasks)
  const step1Map = {
    'Project and Programme Manager': `Audit your project management workflow. List every recurring task \u2014 status reports, schedule updates, stakeholder emails, resource tracking \u2014 and identify which ones an AI tool category can already handle. This is your personal threat map for PM work.`,
    'Business Analyst': `Map your BA deliverables end to end. Identify which outputs \u2014 requirements documents, process flows, data analysis, meeting notes \u2014 AI can already produce a first draft of. Your threat map starts with the deliverables, not the title.`,
    'Customer Support': `Log every support interaction type you handle this week. Categorise each as: fully automatable (FAQ, status checks), partially automatable (guided troubleshooting), or human-only (complex escalations, emotional de-escalation). Your ratio determines your exposure.`,
    'Customer Success': `Map your client interactions for the past month. Separate transactional touchpoints (check-ins, renewals, usage reviews) from trust-layer work (strategic advice, relationship repair, expansion conversations). The transactional side is automating first.`,
    'Financial Analyst and Advisor': `Audit your analytical workflow. List every report, model, and analysis you produce regularly and assess which ones AI tools can now generate a credible first draft of. Your value is shifting from production to interpretation \u2014 make sure your time allocation reflects that.`,
    'Software Developer': `Review your last two weeks of work. Categorise each task: boilerplate and implementation (AI can accelerate), debugging and testing (AI can assist), or architecture and design decisions (human judgment required). The ratio reveals your exposure.`,
    'Content Creator and Journalist': `Audit your content output from the past month. For each piece, honestly assess: could AI have produced an acceptable first draft? Your highest-value work is where the answer is no \u2014 original reporting, distinctive voice, strategic narrative. That is where your time should shift.`,
    'Copywriter and Editor': `List every type of copy you produce. Product descriptions, email sequences, social posts, ad copy, blog posts. For each, rate how close AI-generated output gets to your quality level. The categories where AI reaches 80% of your quality are the ones being commoditised first.`,
    'Legal Counsel and Advisor': `Audit your billable work from the past month. Separate research and document production from advisory and strategic counsel. AI is automating the first category. Your career security depends on increasing the ratio of the second.`,
    'Paralegal and Legal Support': `Map every task type in your role: document review, research, filing, contract analysis, correspondence. Rate each for AI automation potential. This audit will be uncomfortable \u2014 paralegal work has among the highest automation exposure. That clarity is what lets you act.`,
  };

  // Role-specific step 3 (human irreplaceability)
  const step3Map = {
    'Project and Programme Manager': `Identify the three judgment calls in your PM role that no tool can make \u2014 stakeholder prioritisation, risk trade-offs, team dynamics decisions. Document specific examples and present them to leadership. Your irreplaceability must be visible to count.`,
    'Business Analyst': `Document three instances where your interpretation of requirements changed a project outcome. The analysis AI can do. The judgment call about what the stakeholder actually needs versus what they asked for \u2014 that is your irreplaceable contribution.`,
    'Customer Support': `Identify the escalation patterns where human judgment changes the outcome \u2014 angry customers, complex multi-system issues, situations requiring empathy. Start tracking resolution quality for these cases. That data proves your value.`,
    'Customer Success': `Build a client success story document: three accounts where your personal judgment, relationship, or strategic advice drove retention or expansion. This is not a vanity exercise \u2014 it is evidence that your role is not reducible to a health score dashboard.`,
    'Software Developer': `Identify three architecture or design decisions you made this quarter that required understanding business context, not just technical requirements. Document them. The developer who can explain why a system was built this way is harder to replace than the one who built it.`,
    'Content Creator and Journalist': `Identify what makes your creative work recognisably yours \u2014 your perspective, your sources, your narrative style, your audience understanding. Document it. When anyone can produce competent content, distinctive voice becomes the moat.`,
    'Financial Analyst and Advisor': `Identify three client or stakeholder decisions that were influenced by your interpretation, not just your analysis. The spreadsheet is a commodity. Your ability to say "here is what this means and what you should do about it" is not.`,
  };

  const defaultStep1 = `Audit your current role as a ${r}. List every recurring task and identify which ones an AI tool category can already perform. Be specific \u2014 not "AI might affect my job" but "this specific weekly task is already automatable." This is your personal threat map.`;
  const defaultStep3 = `Identify the three decisions in your ${r} role that require human judgment \u2014 context, relationships, or ambiguity that no tool can navigate. Document them and make them visible to leadership. Your irreplaceability must be seen to count.`;

  return [
    { n: 1, time: 'Next 7 days',  impact: 'HIGH',   dim: 'Task Automation Exposure',  text: step1Map[role] || defaultStep1 },
    { n: 2, time: 'Next 30 days', impact: 'HIGH',   dim: 'Adaptability Velocity',      text: `Deploy one AI productivity tool relevant to ${r} work in ${ind} and use it daily for one specific task until it becomes second nature. Passive awareness of available tools counts for nothing \u2014 active daily use is what changes your exposure score and signals adaptability to employers.` },
    { n: 3, time: 'Next 30 days', impact: 'HIGH',   dim: 'Human Irreplaceability',     text: step3Map[role] || defaultStep3 },
    { n: 4, time: 'Next 60 days', impact: 'MEDIUM', dim: 'Adaptability Velocity',      text: `Research one AI-related certification or credential relevant to ${r} roles in ${ind} and enrol. Your CV needs a visible signal that you are not standing still${ctx.fearsToolGap ? ' \u2014 especially since you have identified not knowing which AI tools to learn as a concern' : ctx.fearsSalary ? ' \u2014 particularly given the salary compression happening in your sector' : ''}.` },
    { n: 5, time: 'Next 90 days', impact: 'MEDIUM', dim: 'Strategic Pivot Readiness',  text: `Map two roles adjacent to ${r} that are more AI-resistant and that your skills transfer to. Research what each requires and identify specific skill gaps. ${ctx.pivoting ? 'You are already thinking about a career change \u2014 now make it concrete with target roles, companies, and a timeline.' : 'Having no exit plan is a risk multiplier for everything else on this report.'}` },
  ];
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

  function allOpts(stepIndex) {
    const s = STEPS[stepIndex];
    if (s.groups) return s.groups.flatMap(g => g.opts);
    return s.opts || [];
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
              How close are you to being replaced{' '}
              <span style={{ color: 'var(--red)' }}>by AI?</span>
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
      <div className="f-grid" style={S.fGrid}>
        <style>{`
          @media (max-width: 767px) {
            .f-sidebar { display: none !important; }
            .f-grid    { grid-template-columns: 1fr !important; }
            .f-body    { padding: 24px 20px !important; max-width: 100% !important; }
            .f-opts    { grid-template-columns: repeat(2, 1fr) !important; }
            .f-progress-bar { display: flex !important; }
          }
          @media (min-width: 768px) {
            .f-progress-bar { display: none !important; }
          }
        `}</style>
        {/* Mobile progress bar */}
        <div className="f-progress-bar" style={{ display: 'none', flexDirection: 'column', background: 'var(--bg)', borderBottom: '1px solid var(--border)', padding: '14px 20px', gap: 8, position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <img src="/aijr-logo.png" alt="AI Job Radar" style={{ maxHeight: '24px', width: 'auto', display: 'block' }} />
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, color: 'var(--muted)' }}>Step {step + 1} of {STEPS.length} — {STEPS[step].label}</div>
          </div>
          <div style={{ height: 3, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${((step + 1) / STEPS.length) * 100}%`, background: 'var(--red)', transition: 'width 0.3s ease', borderRadius: 2 }} />
          </div>
        </div>
        {/* Sidebar */}
        <div className="f-sidebar" style={S.fSidebar}>
          <img src="/aijr-logo.png" alt="AI Job Radar" style={{ maxWidth: '160px', display: 'block', marginBottom: 44 }} />
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
        <div className="f-body" style={S.fBody}>
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
          {s.groups ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
              {s.groups.map(g => (
                <div key={g.cat}>
                  <div style={S.catHeader}>{g.cat}</div>
                  <div className="f-opts" style={S.optsGrid}>
                    {g.opts.map(o => {
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
                </div>
              ))}
            </div>
          ) : (
            <div className="f-opts" style={{ ...S.optsGrid, marginBottom: 40 }}>
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
          )}
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

        {/* 90-Day Action Plan */}
        <div style={S.secLabel}>Your 90-Day Action Plan</div>
        {d.actions.map(a => (
          <div key={a.n} style={S.actItem}>
            <div style={S.actNum}>0{a.n}</div>
            <div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                <span style={S.actTime}>{a.time}</span>
                <span style={{
                  ...S.actImpact,
                  color: a.impact === 'HIGH' ? 'var(--red)' : 'var(--muted)',
                  borderColor: a.impact === 'HIGH' ? 'var(--red-border)' : 'var(--border)',
                  background: a.impact === 'HIGH' ? 'var(--red-bg)' : 'transparent',
                }}>{a.impact} impact</span>
              </div>
              <p style={S.actText}>{a.text}</p>
              <div style={S.actDim}>Dimension: {a.dim}</div>
            </div>
          </div>
        ))}
        <div style={{ height: 44 }} />


        {/* Product Recommendations */}
        <div style={{ marginBottom: 24 }}>
          <div style={S.secLabel}>Recommended For Your Results</div>
          <p style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 20, lineHeight: 1.65 }}>
            Based on your role, industry, and dimension scores, these resources address your specific displacement risks.
          </p>
          {d.recommendations && d.recommendations.map((rec, i) => (
            <div key={rec.id || i} style={{
              border: i === 0 ? '1px solid var(--red)' : '1px solid var(--border)',
              background: i === 0 ? 'var(--red-bg)' : 'var(--white)',
              padding: i === 0 ? 0 : '22px 24px',
              marginBottom: 10,
              overflow: 'hidden',
            }}>
              {/* Primary recommendation: large cover image layout */}
              {i === 0 && rec.cover ? (
                <div style={{ display: 'flex', gap: 0 }}>
                  <div style={{ width: 180, minHeight: 240, flexShrink: 0, background: '#0a0a0c' }}>
                    <img src={rec.cover} alt={rec.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ flex: 1, padding: '22px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: 6 }}>
                      {rec.tag}
                    </div>
                    <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, color: 'var(--text)', marginBottom: 4, lineHeight: 1.25 }}>
                      {rec.title}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8, fontStyle: 'italic' }}>
                      {rec.subtitle}
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.6, marginBottom: 10 }}>
                      {rec.desc}
                    </p>
                    <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'DM Mono, monospace', marginBottom: 14 }}>
                      {rec.reason}
                    </div>
                    <a
                      href={rec.url}
                      className="gumroad-button"
                      style={{
                        display: 'inline-flex', alignItems: 'center', alignSelf: 'flex-start',
                        padding: '10px 24px', textDecoration: 'none',
                        fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 500,
                        background: 'var(--red)', color: '#fff', border: 'none', cursor: 'pointer',
                      }}
                    >
                      Get This Guide →
                    </a>
                  </div>
                </div>
              ) : (
                /* Secondary/tertiary recommendations: compact with optional thumb */
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                  {rec.thumb && (
                    <div style={{ width: 64, height: 64, flexShrink: 0, borderRadius: 4, overflow: 'hidden', background: '#0a0a0c' }}>
                      <img src={rec.thumb} alt={rec.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }}>
                      {rec.tag}
                    </div>
                    <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, color: 'var(--text)', marginBottom: 4, lineHeight: 1.25 }}>
                      {rec.title}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8, fontStyle: 'italic' }}>
                      {rec.subtitle}
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.6, marginBottom: 10 }}>
                      {rec.desc}
                    </p>
                    <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'DM Mono, monospace' }}>
                      {rec.reason}
                    </div>
                  </div>
                  <a
                    href={rec.url}
                    className="gumroad-button"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '10px 20px', flexShrink: 0, textDecoration: 'none',
                      fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap',
                      background: 'var(--text)', color: '#fff', cursor: 'pointer', border: 'none',
                    }}
                  >
                    Get This Guide →
                  </a>
                </div>
              )}
            </div>
          ))}
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <a href="/guides" style={{ fontSize: 14, color: 'var(--red)', textDecoration: 'none', fontWeight: 500 }}>
              Browse all 9 guides →
            </a>
          </div>
        </div>

        {/* Email capture */}
        <div style={S.emailBox}>
          <div style={S.emailTitle}>Get your full report by email</div>
          <p style={S.emailSub}>Your complete report with all 5 action steps, dimension scores, and personalised recommendations — sent to your inbox.</p>
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

        {/* Restart */}
        <div style={{ textAlign: 'center', marginTop: 20 }}>
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
    <img src="/aijr-logo.png" alt="AI Job Radar" style={{ maxWidth: '100%', display: 'block' }} />
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
  fGrid:   { display: 'grid', gridTemplateColumns: '200px 1fr', minHeight: '100vh' },
  fSidebar: { background: 'var(--bg)', borderRight: '1px solid var(--border)', padding: '40px 20px', height: '100vh', position: 'sticky', top: 0, overflow: 'hidden' },
  sbLogo:  { fontFamily: 'DM Mono, monospace', fontSize: 15, fontWeight: 500, color: 'var(--text)', marginBottom: 44 },
  sbStep:  { display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 0' },
  sbNum:   { width: 28, height: 28, border: '1px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Mono, monospace', fontSize: 14, flexShrink: 0, transition: 'all 0.2s' },
  sbLabel: { fontSize: 15, fontWeight: 500, transition: 'color 0.2s' },
  sbSub:   { fontSize: 13, color: 'var(--muted)', marginTop: 2 },
  fBody:   { padding: '48px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 900 },
  qNum:    { fontFamily: 'DM Mono, monospace', fontSize: 15, color: 'var(--muted)', marginBottom: 10 },
  qTitle:  { fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 400, lineHeight: 1.15, color: 'var(--text)', marginBottom: 8 },
  qHint:   { fontSize: 16, color: 'var(--muted)', marginBottom: 16 },
  multiHint: { display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--mid)', background: 'var(--bg)', border: '1px solid var(--border)', padding: '5px 12px', marginBottom: 24 },
  catHeader: { fontFamily: 'DM Sans, sans-serif', fontSize: 16, fontWeight: 700, color: '#000000', letterSpacing: '0.02em', padding: '8px 0', borderBottom: '2px solid var(--border)', marginBottom: 10 },
  optsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 },
  opt:     { padding: '10px 12px', border: '1px solid', background: 'var(--white)', cursor: 'pointer', textAlign: 'left', fontFamily: 'DM Sans, sans-serif', fontSize: 14, display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1.35, transition: 'all 0.15s', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' },
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
  emailForm: { display: 'flex', flexWrap: 'wrap', gap: 10, maxWidth: 440, margin: '0 auto' },
  emailInput: { flex: 1, minWidth: '200px', padding: '13px 16px', border: '1px solid var(--border)', fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: 'var(--text)', outline: 'none' },
  emailBtn: { background: 'var(--red)', color: '#fff', border: 'none', padding: '13px 24px', fontFamily: 'DM Sans, sans-serif', fontSize: 16, fontWeight: 500, cursor: 'pointer', flexShrink: 0, flexGrow: 1 },
  emailSuccess: { display: 'inline-block', padding: '12px 24px', background: 'var(--green-bg)', border: '1px solid #bbf7d0', color: 'var(--green)', fontFamily: 'DM Mono, monospace', fontSize: 15 },
  // CTA
  ctaBox:  { background: 'var(--bg2)', border: '1px solid var(--border)', padding: 48, textAlign: 'center', marginTop: 24 },
  ctaTitle: { fontFamily: 'DM Serif Display, serif', fontSize: 34, color: 'var(--text)', marginBottom: 12 },
  ctaSub:  { fontSize: 17, color: 'var(--mid)', marginBottom: 28, maxWidth: 380, margin: '0 auto 28px' },
  btnCta:  { display: 'inline-block', padding: '16px 40px', background: 'var(--red)', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: 17, fontWeight: 500, border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(192,57,43,0.25)', textDecoration: 'none' },
  btnRestart: { display: 'inline-block', marginTop: 14, background: 'none', border: '1px solid var(--border)', color: 'var(--muted)', padding: '11px 28px', fontFamily: 'DM Sans, sans-serif', fontSize: 15, cursor: 'pointer' },
};
