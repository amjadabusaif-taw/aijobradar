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
    subtitle: 'The Displacement Defence Field Guide',
    url: `${GUMROAD}/ai-proof-your-career`,
    tag: 'DEFENCE MANUAL',
    desc: 'A structured action plan built around the same 5 dimensions your radar scan just measured. Every chapter maps to a score.',
    coming: true,
  },

  // ── ROLE CLUSTER GUIDES (Tier 2 — new guides) ──
  clientFacing: {
    id: 'clientFacing',
    title: 'The Client-Facing Professional\'s AI Survival Guide',
    subtitle: 'Protecting Relationship-Based Roles',
    url: `${GUMROAD}/client-facing-ai-survival`,
    tag: 'FOR YOUR ROLE',
    desc: 'How to shift from transactional service to strategic relationship ownership before AI absorbs the rest.',
    coming: true,
  },
  aiInFinance: {
    id: 'aiInFinance',
    title: 'AI in Finance',
    subtitle: 'Protecting Your Career in an Automated Industry',
    url: `${GUMROAD}/ai-in-finance`,
    tag: 'FOR YOUR ROLE',
    desc: 'From producing financial analysis to interpreting it. How to use regulation as a window, not a wall.',
    coming: true,
  },
  creativePlaybook: {
    id: 'creativePlaybook',
    title: 'The Creative Professional\'s AI Playbook',
    subtitle: 'Thriving When AI Produces What You Produce',
    url: `${GUMROAD}/creative-ai-playbook`,
    tag: 'FOR YOUR ROLE',
    desc: 'When output is no longer scarce, your value shifts to direction, curation, and original perspective.',
    coming: true,
  },
  educationGuide: {
    id: 'educationGuide',
    title: 'AI-Proofing Education',
    subtitle: 'For Teachers, Trainers, and Academics',
    url: `${GUMROAD}/ai-proofing-education`,
    tag: 'FOR YOUR ROLE',
    desc: 'Offload the automatable to focus on the irreplaceable — mentorship, inspiration, and genuine understanding.',
    coming: true,
  },
  technicalGuide: {
    id: 'technicalGuide',
    title: 'The Technical Professional\'s AI Displacement Guide',
    subtitle: 'When the Builders Get Built For',
    url: `${GUMROAD}/technical-ai-displacement`,
    tag: 'FOR YOUR ROLE',
    desc: 'From code production to system design. How to stay ahead when AI writes the code you used to write.',
    coming: true,
  },
  healthcarePublic: {
    id: 'healthcarePublic',
    title: 'AI in Healthcare and Public Service',
    subtitle: 'Career Resilience for Regulated Industries',
    url: `${GUMROAD}/ai-healthcare-public-service`,
    tag: 'FOR YOUR ROLE',
    desc: 'Regulation gives you a window other sectors don\'t have. This guide shows you what to do with it.',
    coming: true,
  },
  builtEnvironment: {
    id: 'builtEnvironment',
    title: 'AI and the Built Environment',
    subtitle: 'Career Defence for Construction and Property',
    url: `${GUMROAD}/ai-built-environment`,
    tag: 'FOR YOUR ROLE',
    desc: 'The site stays human. The office, the estimate, and the transaction do not. How to stay on the right side.',
    coming: true,
  },
  legalGuide: {
    id: 'legalGuide',
    title: 'The Legal Professional\'s AI Readiness Guide',
    subtitle: 'When AI Reads Faster Than You',
    url: `${GUMROAD}/legal-ai-readiness`,
    tag: 'FOR YOUR ROLE',
    desc: 'Legal AI replaces legal work, not lawyers. Your career depends on which side of that line your daily work falls.',
    coming: true,
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

  // ── TECH TACTICAL (pair with technical guide) ──
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
// Maps each selectable role to its Slot 1 (role-specific) product

const ROLE_MAP = {
  // Business and Management
  'Project and Programme Manager':   'completeChampion',
  'Business Analyst':                'businessAnalyst',
  'Operations Manager':              'universalGuide',      // no cluster yet, fallback
  'Team Lead and Manager':           'universalGuide',      // no cluster yet, fallback

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

  // HR and People
  'HR and People Ops':               'hrFundamentals',
  'Talent Acquisition Specialist':   'clientFacing',        // recruitment is client-facing
  'Learning and Development':        'educationGuide',      // L&D maps to education cluster

  // Legal
  'Legal Counsel and Advisor':       'legalGuide',
  'Paralegal and Legal Support':     'legalGuide',
  'Compliance and Regulatory Officer': 'legalGuide',

  // Manufacturing and Logistics
  'Supply Chain Coordinator':        'universalGuide',      // no cluster yet
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


// ── DIMENSION → PRODUCT MAPPING ──────────────────────────────────────────────
// Maps each dimension to the best existing product for Slot 2

const DIM_MAP = {
  'Task Automation Exposure':    ['aiVideoPrompt', 'aiImagePrompt', 'digitalLiteracy'],
  'Human Irreplaceability':      ['communicationPlus', 'personalBranding'],
  'Economic Substitution Risk':  ['salaryNegotiation', 'personalBrandBundle'],
  'Adaptability Velocity':       ['aiVideoPrompt', 'aiImagePrompt', 'gitGithub', 'docker'],
  'Strategic Pivot Readiness':   ['personalBranding', 'personalBrandBundle', 'salaryNegotiation', 'sellMoreSocializeLess'],
};

// For tech roles, prefer tech-specific dimension products
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

  // Slot 2: Dimension-specific product (weakest dimension, excluding automation exposure if role guide already covers it)
  // Find the dimension with the lowest score (most at risk)
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

  // Slot 3: Universal guide (always, unless it was already used as Slot 1)
  if (!usedIds.has('universalGuide')) {
    recs.push({
      ...PRODUCTS.universalGuide,
      slot: 3,
      reason: 'Your complete defence strategy across all 5 dimensions',
    });
  }

  return recs;
}
