import { ChecklistItem, DiscussionContent } from './types';

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
    title: 'Market Analysis: The Foundation of Strategy',
    content: `Market analysis is not a one-time event but a continuous process of environmental scanning. Understanding industry trends allows a business to pivot before a downturn or capitalize on an emerging wave. Competitor analysis identifies "blue oceans" where competition is irrelevant because the value proposition is unique.

### Key Focus Areas:
- **Macro Trends:** PESTEL analysis (Political, Economic, Social, Technological, Environmental, Legal).
- **Micro Trends:** Customer behavior shifts and niche emergence.
- **Competitor Mapping:** Identifying direct and indirect threats.

<MarketDataChart />`,
    caseStudy: {
      title: 'Netflix vs. Blockbuster',
      description: 'Netflix identified the trend toward digital convenience while Blockbuster remained focused on physical retail. By analyzing the shift in consumer behavior (target audience identification), Netflix disrupted an entire industry.',
    },
    pitfalls: [
      'Confirmation Bias: Only looking for data that supports your current plan.',
      'Ignoring Indirect Competitors: Thinking only similar businesses are threats.',
      'Static Analysis: Failing to update the analysis as the market moves.',
    ],
  },
  {
    id: 'financial-assessment',
    title: 'Financial Assessment: Ensuring Sustainability',
    content: `Profit is a theory; cash is a fact. Many profitable businesses fail because they run out of cash. A robust financial assessment looks beyond the P&L to the balance sheet and cash flow statement.

### Key Focus Areas:
- **Burn Rate:** How fast are we spending relative to revenue?
- **Unit Economics:** Is every sale actually contributing to fixed costs?
- **Scenario Planning:** What happens if revenue drops by 30%?`,
    caseStudy: {
      title: 'The 2008 Financial Crisis Survivors',
      description: 'Companies with strong cash flow management and low debt-to-equity ratios were able to acquire competitors during the downturn, proving that financial prudence is a competitive advantage.',
    },
    pitfalls: [
      'Over-optimistic Forecasting: Setting targets based on "best-case" scenarios.',
      'Mixing Personal and Business Finances: Common in SMEs, leading to tax and audit nightmares.',
      'Ignoring Hidden Costs: Failing to account for depreciation or customer acquisition costs.',
    ],
  },
  {
    id: 'sales-strategy',
    title: 'Sales Strategy: The Revenue Engine',
    content: `Sales is a numbers game, but the strategy is about the quality of those numbers. A high-performing sales funnel ensures that leads are qualified early and nurtured effectively.

### Key Focus Areas:
- **Lead Scoring:** Prioritizing prospects based on fit and intent.
- **Sales Enablement:** Providing the team with the tools and content they need to close.
- **Retention Strategy:** It is 5-25x cheaper to keep a customer than to find a new one.

<SalesFunnelDiagram />`,
    caseStudy: {
      title: 'Salesforce CRM Implementation',
      description: 'By implementing a centralized CRM, a global logistics firm increased sales productivity by 35% through better lead tracking and automated follow-ups.',
    },
    pitfalls: [
      'Focusing on Features over Benefits: Customers buy solutions to problems, not specs.',
      'Lack of Follow-up: 80% of sales require 5 follow-up calls; most reps stop after 1.',
      'Disconnected Sales and Marketing: Marketing brings leads that Sales can\'t close.',
    ],
  },
  {
    id: 'marketing-plan',
    title: 'Marketing Plan: Building the Brand',
    content: `Marketing is the bridge between the product and the customer. In the digital age, this bridge is built with content, data, and community.

### Key Focus Areas:
- **Omnichannel Presence:** Being where your customers are.
- **Content Authority:** Establishing the brand as a thought leader.
- **Data-Driven Attribution:** Knowing which dollar spent actually brought in a customer.`,
    caseStudy: {
      title: 'Airbnb\'s "Belong Anywhere"',
      description: 'Airbnb moved from being a utility (renting a room) to a lifestyle brand through emotional storytelling and consistent brand positioning.',
    },
    pitfalls: [
      'Vanity Metrics: Focusing on "likes" instead of conversions.',
      'Inconsistent Branding: Changing the message too often, confusing the market.',
      'Underestimating Content Quality: Pushing "noise" instead of value.',
    ],
  },
  {
    id: 'human-resources',
    title: 'Human Resources: The People Power',
    content: `A business is only as good as its people. HR is not just administrative; it is strategic. Hiring for culture fit and training for skill is a proven path to low turnover.

### Key Focus Areas:
- **Employer Branding:** Attracting top talent before you even have an opening.
- **Continuous Learning:** Upskilling the workforce to meet future challenges.
- **Performance Alignment:** Ensuring individual goals match company objectives.`,
    caseStudy: {
      title: 'Google\'s People Operations',
      description: 'Google uses data analytics to determine the best hiring practices and management styles, leading to one of the most productive workforces in the world.',
    },
    pitfalls: [
      'Hiring in a Hurry: "Hire slow, fire fast" is the golden rule.',
      'Lack of Feedback Loops: Only doing annual reviews instead of continuous coaching.',
      'Ignoring Company Culture: Letting toxic high-performers stay.',
    ],
  },
];
