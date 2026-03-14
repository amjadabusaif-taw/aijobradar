// ─── PRODUCT CATALOG ─────────────────────────────────────────────────────────
// Maps radar results → Gumroad products in 3 recommendation slots:
//   Slot 1: Role-specific guide (cluster match or direct match)
//   Slot 2: Dimension-specific guide (weakest dimension)
//   Slot 3: Universal guide (always AI-Proof Your Career)
// ─────────────────────────────────────────────────────────────────────────────

const GUMROAD = 'https://ollkorrekt.gumroad.com/l';

// ── ALL PRODUCTS ─────────────────────────────────────────────────────────────

export const PRODUCTS = {
  // ── UNIVERSAL (Tier 1) ──
  universalGuide: {
    id: 'universalGuide',
    title: 'AI-Proof Your Career',
    subtitle: 'The Universal AI Displacement Guide',
    url: `${GUMROAD}/ai-proof-career`,
    tag: 'DEFENCE MANUAL',
    desc: 'A structured action plan built around the same 5 dimensions your radar scan just measured. Every chapter maps to a score.',
    cover: '/covers/cover-1.jpg',
    thumb: '/thumbs/thumb-1.jpg',
  },

  // ── ROLE CLUSTER GUIDES (Tier 2) ──
  clientFacing: {
    id: 'clientFacing',
    title: 'The Client-Facing AI Survival Guide',
    subtitle: 'When the chatbot handles the easy ones, you handle the ones that matter.',
    url: `${GUMROAD}/client-facing`,
    tag: 'FOR YOUR ROLE',
    desc: 'How to shift from transactional service to strategic relationship ownership before AI absorbs the rest.',
    cover: '/covers/cover-2.jpg',
    thumb: '/thumbs/thumb-2.jpg',
  },
  aiInFinance: {
    id: 'aiInFinance',
    title: "The Finance Professional's AI Displacement Guide",
    subtitle: 'When the numbers start running themselves.',
    url: `${GUMROAD}/finance-displacement`,
    tag: 'FOR YOUR ROLE',
    desc: 'Move from calculation to judgment — the advisory skill, strategic interpretation, and client trust that AI cannot replicate.',
    cover: '/covers/cover-6.jpg',
    thumb: '/thumbs/thumb-6.jpg',
  },
  creativePlaybook: {
    id: 'creativePlaybook',
    title: "The Creative Professional's AI Playbook",
    subtitle: 'When the machine can make it, your job is to mean it.',
    url: `${GUMROAD}/creative-playbook`,
    tag: 'FOR YOUR ROLE',
    desc: 'When output is no longer scarce, your value shifts to direction, curation, and original perspective.',
    cover: '/covers/cover-3.jpg',
    thumb: '/thumbs/thumb-3.jpg',
  },
  educationGuide: {
    id: 'educationGuide',
    title: 'AI-Proofing Education',
    subtitle: "When the lesson plans write themselves, your job is to teach what they can't.",
    url: `${GUMROAD}/education-ai-proof`,
    tag: 'FOR YOUR ROLE',
    desc: 'Offload the automatable to focus on the irreplaceable — mentorship, inspiration, and genuine understanding.',
    cover: '/covers/cover-4.jpg',
    thumb: '/thumbs/thumb-4.jpg',
  },
  technicalGuide: {
    id: 'technicalGuide',
    title: "The Technical Professional's AI Displacement Guide",
    subtitle: 'When the builders get built for.',
    url: `${GUMROAD}/technical-displacement`,
    tag: 'FOR YOUR ROLE',
    desc: 'From code production to system design. How to stay ahead when AI writes the code you used to write.',
    cover: '/covers/cover-5.jpg',
    thumb: '/thumbs/thumb-5.jpg',
  },
  healthcarePublic: {
    id: 'healthcarePublic',
    title: 'The Healthcare & Public Sector AI Displacement Guide',
    subtitle: 'When the system starts thinking for itself.',
    url: `${GUMROAD}/healthcare-public-sector`,
    tag: 'FOR YOUR ROLE',
    desc: 'Move from process to service — the human judgment, stakeholder leadership, and service design these sectors demand.',
    cover: '/covers/cover-8.jpg',
    thumb: '/thumbs/thumb-8.jpg',
  },
  builtEnvironment: {
    id: 'builtEnvironment',
    title: 'The Built Environment AI Displacement Guide',
    subtitle: 'When the blueprints draw themselves.',
    url: `${GUMROAD}/built-environment`,
    tag: 'FOR YOUR ROLE',
    desc: 'The site stays human. The office, the estimate, and the transaction do not. How to stay on the right side.',
    cover: '/covers/cover-9.jpg',
    thumb: '/thumbs/thumb-9.jpg',
  },
  legalGuide: {
    id: 'legalGuide',
    title: "The Legal Professional's AI Displacement Guide",
    subtitle: 'When the fine print reads itself.',
    url: `${GUMROAD}/legal-displacement`,
    tag: 'FOR YOUR ROLE',
    desc: 'Move from process to judgment — the client counsel, negotiation, and strategic advisory that AI cannot provide.',
    cover: '/covers/cover-7.jpg',
    thumb: '/thumbs/thumb-7.jpg',
  },

  // ── EXISTING ROLE-SPECIFIC (PM, BA, HR) ──
  completeChampion: {
    id: 'completeChampion',
    title: 'Complete Champion Bundle',
    subtitle: 'Everything You Need for PM Career Mastery',
    url: `${GUMROAD}/complete-champion-bundle`,
    tag: 'FOR YOUR ROLE',
    desc: 'The full project management career toolkit — audit readiness, interview mastery, competency frameworks, and PMO navigation.',
  },
  businessAnalyst: {
    id: 'businessAnalyst',
    title: 'The Business Analyst Playbook',
    subtitle: 'Your Complete BA Career Guide',
    url: `${GUMROAD}/business-analyst-playbook`,
    tag: 'FOR YOUR ROLE',
    desc: 'Frameworks, templates, and strategies specifically for business analysts navigating an AI-augmented workplace.',
  },
  hrFundamentals: {
    id: 'hrFundamentals',
    title: 'HR Fundamentals for Managers',
    subtitle: 'Essential People Management Skills',
    url: `${GUMROAD}/hr-fundamentals`,
    tag: 'FOR YOUR ROLE',
    desc: 'The people management skills that AI cannot replicate — hiring judgment, team dynamics, and performance leadership.',
  },

  // ── DIMENSION-SPECIFIC (existing guides) ──
  personalBranding: {
    id: 'personalBranding',
    title: 'The Personal Branding Blueprint',
    subtitle: 'Build a Professional Brand That Opens Doors',
    url: `${GUMROAD}/personal-branding`,
    tag: 'STRATEGIC PIVOT',
    desc: 'Your personal brand is your most portable career asset. This blueprint builds it from scratch — LinkedIn, content, networking, and visibility.',
  },
  personalBrandBundle: {
    id: 'personalBrandBundle',
    title: 'Personal Branding Bundle',
    subtitle: 'Complete Brand Building Kit',
    url: `${GUMROAD}/personal-brand-bundle`,
    tag: 'STRATEGIC PIVOT',
    desc: 'The full personal branding system — blueprint, templates, and quick-start guide in one package.',
  },
  salaryNegotiation: {
    id: 'salaryNegotiation',
    title: 'The Salary Negotiation Playbook',
    subtitle: 'Negotiate Higher Compensation at Every Stage',
    url: `${GUMROAD}/salary-negotiation`,
    tag: 'ECONOMIC DEFENCE',
    desc: 'When AI compresses salaries, negotiation skill becomes your pricing power. Frameworks for every career stage.',
  },
  communicationPlus: {
    id: 'communicationPlus',
    title: 'Communication PLUS',
    subtitle: 'Master Professional Communication',
    url: `${GUMROAD}/communication-plus`,
    tag: 'IRREPLACEABILITY',
    desc: 'The communication skills AI cannot replicate — persuasion, stakeholder management, and high-stakes conversations.',
  },
  aiVideoPrompt: {
    id: 'aiVideoPrompt',
    title: 'AI Video Prompt Engineering',
    subtitle: 'Creating Professional AI Videos',
    url: `${GUMROAD}/ai-video-prompt-engineering`,
    tag: 'ADAPTABILITY',
    desc: 'Master AI video generation tools. Turn AI fluency into a visible, marketable skill.',
  },
  aiImagePrompt: {
    id: 'aiImagePrompt',
    title: 'AI Image Prompt Engineering',
    subtitle: 'Creating Stunning AI Art',
    url: `${GUMROAD}/ai-image-prompt-engineering`,
    tag: 'ADAPTABILITY',
    desc: 'Master AI image generation. A practical skill that demonstrates AI fluency to employers and clients.',
  },
  sellMoreSocializeLess: {
    id: 'sellMoreSocializeLess',
    title: 'Introvert Guide to Selling Digital Products',
    subtitle: 'Sell More, Socialise Less',
    url: `${GUMROAD}/sell-more-socialize-less`,
    tag: 'STRATEGIC PIVOT',
    desc: 'Build a digital product income stream as career insurance — without the constant self-promotion.',
  },

  // ── TECH TACTICAL ──
  gitGithub: {
    id: 'gitGithub',
    title: 'Git & GitHub Complete Workflow Guide',
    subtitle: 'Version Control Mastery',
    url: `${GUMROAD}/git-github-complete-workflow`,
    tag: 'ADAPTABILITY',
    desc: 'The version control foundation every technical professional needs — workflows, collaboration, and best practices.',
  },
  docker: {
    id: 'docker',
    title: 'Docker for Beginners',
    subtitle: 'Build, Ship, and Run Applications Anywhere',
    url: `${GUMROAD}/docker-for-beginners`,
    tag: 'ADAPTABILITY',
    desc: 'Containerisation is a core technical skill. This guide takes you from zero to deployment-ready.',
  },
  digitalLiteracy: {
    id: 'digitalLiteracy',
    title: 'Digital Literacy Handbooks Collection',
    subtitle: 'Essential Tech Skills Bundle',
    url: `${GUMROAD}/shortcut-handbooks-bundle-deal`,
    tag: 'ADAPTABILITY',
    desc: 'The foundational digital skills that every professional needs — file management, cloud storage, security, and maintenance.',
  },
};


// ── ROLE → PRODUCT MAPPING ───────────────────────────────────────────────────

const ROLE_MAP = {
  'Project and Programme Manager':   'completeChampion',
  'Business Analyst':                'businessAnalyst',
  'Operations Manager':              'universalGuide',
  'Team Lead and Manager':           'universalGuide',
  'Site and Project Engineer':       'builtEnvironment',
  'Quantity Surveyor':               'builtEnvironment',
  'Property and Real Estate Agent':  'builtEnvironment',
  'Customer Success':                'clientFacing',
  'Customer Support':                'clientFacing',
  'Account Manager':                 'clientFacing',
  'Teacher, Tutor and Trainer':      'educationGuide',
  'Academic Researcher':             'educationGuide',
  'Education Administrator':         'educationGuide',
  'Financial Analyst and Advisor':   'aiInFinance',
  'Risk and Compliance Officer':     'aiInFinance',
  'Accountant and Auditor':          'aiInFinance',
  'Fintech Specialist':              'aiInFinance',
  'Clinical and Medical Staff':      'healthcarePublic',
  'Healthcare Administrator':        'healthcarePublic',
  'Pharmacist and Lab Specialist':   'healthcarePublic',
  'HR and People Ops':               'hrFundamentals',
  'Talent Acquisition Specialist':   'clientFacing',
  'Learning and Development':        'educationGuide',
  'Legal Counsel and Advisor':       'legalGuide',
  'Paralegal and Legal Support':     'legalGuide',
  'Compliance and Regulatory Officer': 'legalGuide',
  'Supply Chain Coordinator':        'universalGuide',
  'Production Supervisor':           'universalGuide',
  'Quality and Safety Inspector':    'universalGuide',
  'Content Creator and Journalist':  'creativePlaybook',
  'Video and Audio Producer':        'creativePlaybook',
  'Social Media Specialist':         'creativePlaybook',
  'Copywriter and Editor':           'creativePlaybook',
  'Policy and Regulatory Officer':   'healthcarePublic',
  'Civil Servant and Administrator': 'healthcarePublic',
  'Public Health and Social Worker': 'healthcarePublic',
  'Sales Professional':              'clientFacing',
  'Marketing Specialist':            'creativePlaybook',
  'E-commerce and Merchandising':    'clientFacing',
  'Software Developer':              'technicalGuide',
  'IT and Systems Administrator':    'technicalGuide',
  'Data Analyst and Engineer':       'technicalGuide',
  'Cybersecurity Specialist':        'technicalGuide',
};


// ── DIMENSION → PRODUCT MAPPING ──────────────────────────────────────────────

const DIM_MAP = {
  'Task Automation Exposure':    ['aiVideoPrompt', 'aiImagePrompt', 'digitalLiteracy'],
  'Human Irreplaceability':      ['communicationPlus', 'personalBranding'],
  'Economic Substitution Risk':  ['salaryNegotiation', 'personalBrandBundle'],
  'Adaptability Velocity':       ['aiVideoPrompt', 'aiImagePrompt', 'gitGithub', 'docker'],
  'Strategic Pivot Readiness':   ['personalBranding', 'personalBrandBundle', 'salaryNegotiation', 'sellMoreSocializeLess'],
};

const TECH_DIM_MAP = {
  'Task Automation Exposure':    ['gitGithub', 'docker', 'aiVideoPrompt'],
  'Human Irreplaceability':      ['communicationPlus', 'personalBranding'],
  'Economic Substitution Risk':  ['salaryNegotiation', 'personalBrandBundle'],
  'Adaptability Velocity':       ['gitGithub', 'docker', 'aiVideoPrompt', 'aiImagePrompt'],
  'Strategic Pivot Readiness':   ['personalBranding', 'sellMoreSocializeLess', 'salaryNegotiation'],
};

const TECH_ROLES = [
  'Software Developer', 'IT and Systems Administrator',
  'Data Analyst and Engineer', 'Cybersecurity Specialist',
];


// ── RECOMMENDATION ENGINE ────────────────────────────────────────────────────

export function getRecommendations(role, dims) {
  const recs = [];
  const usedIds = new Set();

  // Slot 1: Role-specific product
  const roleProductId = ROLE_MAP[role] || 'universalGuide';
  const roleProduct = PRODUCTS[roleProductId];
  if (roleProduct) {
    recs.push({ ...roleProduct, slot: 1, reason: `Based on your role as a ${role.toLowerCase()}` });
    usedIds.add(roleProductId);
  }

  // Slot 2: Dimension-specific product (weakest dimension)
  const sortedDims = [...dims].sort((a, b) => a.score - b.score);
  const isTech = TECH_ROLES.includes(role);
  const dimMap = isTech ? TECH_DIM_MAP : DIM_MAP;

  let dimProduct = null;
  for (const dim of sortedDims) {
    const candidates = dimMap[dim.name] || [];
    for (const candidateId of candidates) {
      if (!usedIds.has(candidateId)) {
        dimProduct = PRODUCTS[candidateId];
        if (dimProduct) {
          const weakLabel = dim.label || dim.name;
          recs.push({
            ...dimProduct,
            slot: 2,
            reason: `Your weakest dimension: "${weakLabel}"`,
          });
          usedIds.add(candidateId);
          break;
        }
      }
    }
    if (dimProduct) break;
  }

  // Slot 3: Universal guide (always, unless already used as Slot 1)
  if (!usedIds.has('universalGuide')) {
    recs.push({
      ...PRODUCTS.universalGuide,
      slot: 3,
      reason: 'Your complete defence strategy across all 5 dimensions',
    });
  }

  return recs;
}
