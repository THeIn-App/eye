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

export interface ChartData {
  name: string;
  value: number;
  secondary?: number;
}
