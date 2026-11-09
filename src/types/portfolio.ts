export interface SkillItem {
  id: string;
  name: string;
  category: 'advertising' | 'strategy' | 'commerce' | 'brand';
  description: string;
  practicalApplication: string;
  competencies: string[];
  icon: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  specs: string[];
  image: string;
  status: string;
}

export interface TimelineMilestone {
  id: string;
  step: string;
  title: string;
  period: string;
  description: string;
  keyLearnings: string[];
  highlight: string;
}
