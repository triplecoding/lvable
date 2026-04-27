import { Article, CalculatorDefinition, DashboardData, PdfItem, Slide } from './types';

export const slides: Slide[] = [
  {
    id: '1',
    title: 'Navigate Maritime Success',
    subtitle: 'Practical guides, calculators, and briefings for modern seafarers.',
    image: 'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef',
    ctaLabel: 'Explore Library',
    ctaHref: '/pdf-library'
  },
  {
    id: '2',
    title: 'Master Port Calculations',
    subtitle: 'Use live calculators to estimate costs and voyage metrics instantly.',
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1d3',
    ctaLabel: 'Open Calculators',
    ctaHref: '/calculators'
  }
];

export const articles: Article[] = [
  {
    id: 'a1',
    slug: 'bunker-cost-optimization',
    title: 'Bunker Cost Optimization Playbook',
    excerpt: 'A tactical framework to reduce fuel spend while staying compliant.',
    content: '# Strategy\n## Audit\n## Monitor\n## Hedge\nDetailed article content goes here.',
    category: 'Operations',
    tags: ['fuel', 'cost', 'strategy'],
    faq: [
      { question: 'What is bunker adjustment?', answer: 'It is a surcharge tied to fuel prices.' },
      { question: 'How often should we revise models?', answer: 'At least weekly for volatile routes.' }
    ],
    publishedAt: '2026-04-10'
  },
  {
    id: 'a2',
    slug: 'port-delay-risk-management',
    title: 'Port Delay Risk Management',
    excerpt: 'Mitigate schedule slippage with scenario planning.',
    content: '# Risk Model\n## Inputs\n## Response Matrix\nBuild buffers and monitor events.',
    category: 'Risk',
    tags: ['ports', 'risk'],
    faq: [{ question: 'Best KPI?', answer: 'On-time departure percentage.' }],
    publishedAt: '2026-04-17'
  }
];

export const pdfs: PdfItem[] = [
  {
    id: 'p1',
    title: 'Mariner Safety Checklist 2026',
    summary: 'Bridge and deck operational checklist PDF.',
    category: 'Safety',
    tags: ['checklist', 'safety'],
    previewImage: 'https://images.unsplash.com/photo-1528150177508-7cc0db2129ab',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 'p2',
    title: 'IMO Compliance Handbook',
    summary: 'Core compliance quick-reference for officers.',
    category: 'Compliance',
    tags: ['imo', 'regulation'],
    previewImage: 'https://images.unsplash.com/photo-1519068737630-e5db30e12e42',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
];

export const calculators: CalculatorDefinition[] = [
  {
    id: 'c1',
    title: 'Voyage Fuel Cost Calculator',
    description: 'Estimate fuel budget by consumption and price.',
    fields: [
      { id: 'consumption', label: 'Daily Consumption', type: 'number', unit: 'tons' },
      { id: 'days', label: 'Voyage Days', type: 'number', unit: 'days' },
      { id: 'price', label: 'Fuel Price', type: 'number', unit: 'USD/ton' }
    ],
    formula: 'consumption * days * price'
  }
];

export const dashboardData: DashboardData = {
  profile: { name: 'Captain Riley', email: 'riley@heymariner.com', plan: 'Pro Annual' },
  downloadHistory: pdfs,
  recentlyRead: articles,
  subscriptionStatus: { active: true, renewalDate: '2027-04-01' }
};
