import { ChecklistItem, DiscussionContent, SubscriptionTier, BusinessService, OrgNode } from './types';

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'trial',
    name: 'Trial Tier',
    price: '$0',
    description: 'Perfect for initial research and basic business inquiries.',
    features: [
      'Basic Startup Roadmap',
      'Initial Capital Estimates',
      'General Industry Overviews',
      'Single Inquiry Access'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$49/mo',
    description: 'Complete toolkit for standard small-to-medium enterprises.',
    features: [
      'Comprehensive Business Planner',
      'Detailed Startup Checklists',
      'Marketing & Ads (PROMADS) Advisory',
      'HR & Recruitment Templates',
      'Standard Org Structures & JDs'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$199/mo',
    description: 'Elite consultation for complex, industrial-scale ventures.',
    features: [
      'Industrial Plant Scale Planning',
      'Complex Regulatory Guidance',
      'Executive Committee Org Designs',
      'LPG Refilling Specialist Data',
      '1-on-1 Interactive Sessions with EYE'
    ]
  }
];

export const BUSINESS_SERVICES: BusinessService[] = [
  {
    id: 'org-structure',
    label: 'Organizational Structure',
    icon: 'Users',
    description: 'Defining the hierarchy and roles from Executive to Staff.',
    trialContent: 'A basic carwash requires a Manager, 2 Washers, and a Cashier. Total staff: 4.',
    proContent: 'Full Org Chart for a Sales-driven enterprise including JD for CEO, CFO, Sales Manager, and Support Staff.'
  },
  {
    id: 'promads',
    label: 'PROMADS',
    icon: 'Megaphone',
    description: 'Promotion, Marketing, and Advertisement strategy.',
    trialContent: 'Use social media (FB/IG) and local signage to attract nearby customers.',
    proContent: 'Quarterly marketing budget allocation, influencer outreach strategy, and ROI tracking for digital ad spend.'
  },
  {
    id: 'capital',
    label: 'Initial Capital',
    icon: 'DollarSign',
    description: 'Budgeting and investment requirements.',
    trialContent: 'Estimated startup for a carwash: $5,000 - $15,000 including equipment and rent.',
    proContent: 'Detailed CapEx/OpEx breakdown for an LPG plant: $500,000+ including tanks, licensing, and logistics.'
  }
];

export const CARWASH_PLAN: OrgNode = {
  role: 'Owner/Manager',
  department: 'Executive',
  jd: {
    role: 'Owner/Manager',
    responsibilities: ['Overall operations', 'Financial management', 'Vendor relations'],
    requirements: ['Business management experience', 'Customer service skills']
  },
  children: [
    {
      role: 'Lead Washer',
      department: 'Operations',
      jd: {
        role: 'Lead Washer',
        responsibilities: ['Quality control', 'Inventory tracking', 'Supervising washers'],
        requirements: ['2+ years experience', 'Attention to detail']
      },
      children: [
        { role: 'Washer A', department: 'Operations' },
        { role: 'Washer B', department: 'Operations' }
      ]
    },
    {
      role: 'Cashier',
      department: 'Finance',
      jd: {
        role: 'Cashier',
        responsibilities: ['Point of sale', 'Customer bookings', 'End-of-day reporting'],
        requirements: ['Basic accounting', 'Friendly demeanor']
      }
    }
  ]
};

export const LPG_PLANT_PLAN: OrgNode = {
  role: 'President & CEO',
  department: 'Executive Committee',
  jd: {
    role: 'President & CEO',
    responsibilities: ['Strategic vision', 'Regulatory compliance', 'Major partnerships'],
    requirements: ['15+ years industrial experience', 'MBA or equivalent']
  },
  children: [
    {
      role: 'VP of Operations',
      department: 'Operations',
      children: [
        { role: 'Plant Manager', department: 'Operations' },
        { role: 'Logistics Manager', department: 'Supply Chain' }
      ]
    },
    {
      role: 'VP of Finance',
      department: 'Finance',
      children: [
        { role: 'Chief Accountant', department: 'Finance' },
        { role: 'Compliance Officer', department: 'Legal/Finance' }
      ]
    },
    {
      role: 'VP of HR',
      department: 'Human Resources',
      children: [
        { role: 'Recruitment Head', department: 'HR' },
        { role: 'Training & Education Lead', department: 'HR' }
      ]
    }
  ]
};

export const CHECKLIST: ChecklistItem[] = [
  {
    id: 'market-analysis',
    category: 'Market Analysis',
    title: 'Strategic Market Positioning',
    subItems: ['Industry Trends Analysis', 'Competitor Benchmarking', 'Target Audience Persona Mapping'],
    status: 'pending',
  },
  {
    id: 'financial-assessment',
    category: 'Financial Assessment',
    title: 'Fiscal Health & Forecasting',
    subItems: ['Budgeting and Forecasting', 'Cash Flow Management', 'Profitability Analysis'],
    status: 'pending',
  },
  {
    id: 'sales-strategy',
    category: 'Sales Strategy',
    title: 'Revenue Engine Optimization',
    subItems: ['Sales Funnel Optimization', 'CRM Implementation', 'Sales Training Programs'],
    status: 'pending',
  },
  {
    id: 'marketing-plan',
    category: 'Marketing Plan',
    title: 'Brand Growth & Visibility',
    subItems: ['Digital Marketing Strategies', 'Content Creation and Management', 'Brand Positioning'],
    status: 'pending',
  },
  {
    id: 'human-resources',
    category: 'Human Resources',
    title: 'Talent & Culture Management',
    subItems: ['Recruitment Processes', 'Employee Training and Development', 'Performance Evaluation Systems'],
    status: 'pending',
  },
];

export const DISCUSSIONS: DiscussionContent[] = [
  {
    id: 'market-analysis',
    title: 'EYE Insights: Market Dominance',
    content: `I, EYE, have seen many businesses fail by ignoring the tides. Market analysis is your radar. In my experience, if you are planning a **Carwash**, your success depends 80% on location and 20% on recurring subscription models.

If you are scaling to an **LPG Plant**, the market shift is toward safety standards and distribution density. As your expert, I recommend analyzing the "Last Mile" logistics before you even break ground.

### EYE'S Focus Areas:
- **The Alpha Trend:** Where is the money moving right now?
- **Competitor Blindspots:** What are they missing that you can own?
- **Customer Desires:** What do they want but aren't telling you?`,
    caseStudy: {
      title: 'EYE Private Audit: Disruption in Logistics',
      description: 'By shifting from bulk delivery to tech-enabled tracking, a client of mine captured 40% of their local LPG market in 6 months.',
    },
    pitfalls: [
      'Ego-driven planning: Refusing to listen when EYE shows you the data.',
      'Static perception: Thinking today\'s win is tomorrow\'s guarantee.',
    ],
  },
];
