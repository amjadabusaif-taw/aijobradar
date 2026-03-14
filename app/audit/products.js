// ─── PRODUCT CATALOG ─────────────────────────────────────────────────────────
// Maps radar results → Gumroad products in up to 2 recommendation slots:
//   Slot 1: Role-specific cluster guide (always one of the 9)
//   Slot 2: Universal guide (if Slot 1 wasn't already universal)
// ─────────────────────────────────────────────────────────────────────────────

const GUMROAD = 'https://ollkorrekt.gumroad.com/l';

// ── THE 9 GUIDES ─────────────────────────────────────────────────────────────

export const PRODUCTS = {
  universalGuide: {
    id: 'universalGuide',
    title: 'AI-Proof Your Career',
    subtitle: 'The Universal AI Displacement Guide',
    url: `${GUMROAD}/ai-proof-career`,
    tag: 'DEFENCE MANUAL',
    desc: 'A structured action plan built around the same 5 dimensions your radar scan just measured. Every chapter maps to a score.',
    cover: '/covers/cover-1.jpg',
  },
  clientFacing: {
    id: 'clientFacing',
    title: 'The Client-Facing AI Survival Guide',
    subtitle: 'When the chatbot handles the easy ones, you handle the ones that matter.',
    url: `${GUMROAD}/client-facing`,
    tag: 'FOR YOUR ROLE',
    desc: 'How to shift from transactional service to strategic relationship ownership before AI absorbs the rest.',
    cover: '/covers/cover-2.jpg',
  },
  creativePlaybook: {
    id: 'creativePlaybook',
    title: "The Creative Professional's AI Playbook",
    subtitle: 'When the machine can make it, your job is to mean it.',
    url: `${GUMROAD}/creative-playbook`,
    tag: 'FOR YOUR ROLE',
    desc: 'When output is no longer scarce, your value shifts to direction, curation, and original perspective.',
    cover: '/covers/cover-3.jpg',
  },
  educationGuide: {
    id: 'educationGuide',
    title: 'AI-Proofing Education',
    subtitle: "When the lesson plans write themselves, your job is to teach what they can't.",
    url: `${GUMROAD}/education-ai-proof`,
    tag: 'FOR YOUR ROLE',
    desc: 'Offload the automatable to focus on the irreplaceable — mentorship, inspiration, and genuine understanding.',
    cover: '/covers/cover-4.jpg',
  },
  technicalGuide: {
    id: 'technicalGuide',
    title: "The Technical Professional's AI Displacement Guide",
    subtitle: 'When the builders get built for.',
    url: `${GUMROAD}/technical-displacement`,
    tag: 'FOR YOUR ROLE',
    desc: 'From code production to system design. How to stay ahead when AI writes the code you used to write.',
    cover: '/covers/cover-5.jpg',
  },
  aiInFinance: {
    id: 'aiInFinance',
    title: "The Finance Professional's AI Displacement Guide",
    subtitle: 'When the numbers start running themselves.',
    url: `${GUMROAD}/finance-displacement`,
    tag: 'FOR YOUR ROLE',
    desc: 'Move from calculation to judgment — the advisory skill, strategic interpretation, and client trust that AI cannot replicate.',
    cover: '/covers/cover-6.jpg',
  },
  legalGuide: {
    id: 'legalGuide',
    title: "The Legal Professional's AI Displacement Guide",
    subtitle: 'When the fine print reads itself.',
    url: `${GUMROAD}/legal-displacement`,
    tag: 'FOR YOUR ROLE',
    desc: 'Move from process to judgment — the client counsel, negotiation, and strategic advisory that AI cannot provide.',
    cover: '/covers/cover-7.jpg',
  },
  healthcarePublic: {
    id: 'healthcarePublic',
    title: 'The Healthcare & Public Sector AI Displacement Guide',
    subtitle: 'When the system starts thinking for itself.',
    url: `${GUMROAD}/healthcare-public-sector`,
    tag: 'FOR YOUR ROLE',
    desc: 'Move from process to service — the human judgment, stakeholder leadership, and service design these sectors demand.',
    cover: '/covers/cover-8.jpg',
  },
  builtEnvironment: {
    id: 'builtEnvironment',
    title: 'The Built Environment AI Displacement Guide',
    subtitle: 'When the blueprints draw themselves.',
    url: `${GUMROAD}/built-environment`,
    tag: 'FOR YOUR ROLE',
    desc: 'The site stays human. The office, the estimate, and the transaction do not. How to stay on the right side.',
    cover: '/covers/cover-9.jpg',
  },
};


// ── ROLE → GUIDE MAPPING ────────────────────────────────────────────────────
// Every role maps to one of the 9 cluster guides.
// Roles without a specific cluster guide go to universalGuide.

const ROLE_MAP = {
  // Business and Management → universal (no specific AI guide)
  'Project and Programme Manager':   'universalGuide',
  'Business Analyst':                'universalGuide',
  'Operations Manager':              'universalGuide',
  'Team Lead and Manager':           'universalGuide',

  // Construction and Real Estate
  'Site and Project Engineer':       'builtEnvironment',
  'Quantity Surveyor':               'builtEnvironment',
  'Property and Real Estate Agent':  'builtEnvironment',

  // Customer and Client Services
  'Customer Success':                'clientFacing',
  'Customer Support':                'clientFacing',
  'Account Manager':                 'clientFacing',

  // Education
  'Teacher, Tutor and Trainer':      'educationGuide',
  'Academic Researcher':             'educationGuide',
  'Education Administrator':         'educationGuide',

  // Finance and Banking
  'Financial Analyst and Advisor':   'aiInFinance',
  'Risk and Compliance Officer':     'aiInFinance',
  'Accountant and Auditor':          'aiInFinance',
  'Fintech Specialist':              'aiInFinance',

  // Healthcare
  'Clinical and Medical Staff':      'healthcarePublic',
  'Healthcare Administrator':        'healthcarePublic',
  'Pharmacist and Lab Specialist':   'healthcarePublic',

  // HR and People → universal
  'HR and People Ops':               'universalGuide',
  'Talent Acquisition Specialist':   'clientFacing',
  'Learning and Development':        'educationGuide',

  // Legal
  'Legal Counsel and Advisor':       'legalGuide',
  'Paralegal and Legal Support':     'legalGuide',
  'Compliance and Regulatory Officer': 'legalGuide',

  // Manufacturing and Logistics → universal
  'Supply Chain Coordinator':        'universalGuide',
  'Production Supervisor':           'universalGuide',
  'Quality and Safety Inspector':    'universalGuide',

  // Media and Publishing
  'Content Creator and Journalist':  'creativePlaybook',
  'Video and Audio Producer':        'creativePlaybook',
  'Social Media Specialist':         'creativePlaybook',
  'Copywriter and Editor':           'creativePlaybook',

  // Public Sector
  'Policy and Regulatory Officer':   'healthcarePublic',
  'Civil Servant and Administrator': 'healthcarePublic',
  'Public Health and Social Worker': 'healthcarePublic',

  // Sales and Marketing
  'Sales Professional':              'clientFacing',
  'Marketing Specialist':            'creativePlaybook',
  'E-commerce and Merchandising':    'clientFacing',

  // Technology
  'Software Developer':              'technicalGuide',
  'IT and Systems Administrator':    'technicalGuide',
  'Data Analyst and Engineer':       'technicalGuide',
  'Cybersecurity Specialist':        'technicalGuide',
};


// ── RECOMMENDATION ENGINE ────────────────────────────────────────────────────

export function getRecommendations(role, dims) {
  const recs = [];

  // Slot 1: Role-specific guide
  const roleProductId = ROLE_MAP[role] || 'universalGuide';
  const roleProduct = PRODUCTS[roleProductId];
  if (roleProduct) {
    recs.push({ ...roleProduct, slot: 1, reason: `Based on your role as a ${role.toLowerCase()}` });
  }

  // Slot 2: Universal guide (only if Slot 1 was a different guide)
  if (roleProductId !== 'universalGuide') {
    recs.push({
      ...PRODUCTS.universalGuide,
      slot: 2,
      reason: 'Your complete defence strategy across all 5 dimensions',
    });
  }

  return recs;
}
