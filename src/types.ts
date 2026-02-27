export type SubscriptionLevel = 'trial' | 'professional' | 'enterprise';

export interface SubscriptionTier {
  id: SubscriptionLevel;
  name: string;
  price: string;
  features: string[];
  description: string;
  paypalPlanId: string;
}

export interface JobDescription {
  role: string;
  responsibilities: string[];
  requirements: string[];
}

export interface OrgNode {
  role: string;
  department: string;
  jd?: JobDescription;
  children?: OrgNode[];
}

export interface BusinessService {
  id: string;
  label: string;
  icon: string;
  description: string;
  trialContent: string;
  proContent: string;
}

export interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  subItems: string[];
  status: 'pending' | 'completed';
}

export interface DiscussionContent {
  id: string;
  title: string;
  content: string;
  caseStudy: {
    title: string;
    description: string;
  };
  pitfalls: string[];
}

export interface VaultComment {
  id: string;
  author: string;
  timestamp: string;
  text: string;
}

export interface VaultArticle {
  id: string;
  title: string;
  category: string;
  expertNote: string;
  date: string;
  contentType: 'text' | 'video' | 'mixed';
  content: string; // Markdown or description
  imageUrl?: string;
  videoUrl?: string;
  comments: VaultComment[];
}
