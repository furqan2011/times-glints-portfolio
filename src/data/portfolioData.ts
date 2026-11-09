import { SkillItem, ProductItem, TimelineMilestone } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Furqan Farooq',
  role: 'Founder | Digital Marketer | E-commerce Entrepreneur',
  brandName: 'TIMES & GLINTS',
  tagline: 'Turning Digital Ideas Into Real Growth.',
  location: 'Lahore, Pakistan',
  deliveryArea: 'Across Lahore',
  whatsappNumber: '+92 313 4343056',
  whatsappRaw: '923134343056',
  whatsappLink: 'https://wa.me/923134343056',
  instagramHandle: '@times.glints',
  instagramLink: 'https://instagram.com/times.glints',
  avatarImage: '/src/assets/images/hero_abstract_digital_avatar_1794211162967.jpg',
  heroDescription:
    "I'm an aspiring digital marketer passionate about Meta Ads, online business, and e-commerce. Learning independently, investing in my own journey, and building real-world experience through my brand, Times & Glints.",
  aboutStory: [
    "I believe the fastest way to truly master modern digital marketing is not merely consuming courses in isolation, but building a real business from the ground up and putting your own time, capital, and reputation on the line.",
    "Based in Lahore, Pakistan, I founded Times & Glints to serve as both an authentic luxury watches and jewellery brand and my direct testing ground for cutting-edge Meta advertising strategies.",
    "Through self-directed study, continuous experimentation, and hands-on execution, I focus on every pillar of online growth: audience targeting, creative testing, campaign planning, and converting attention into loyal customers.",
    "My mindset is grounded in curiosity, disciplined self-investment, and an ambition to engineer measurable digital growth."
  ]
};

export const CORE_PILLARS = [
  {
    title: 'Independent Learning',
    description: 'Self-guided study into Meta algorithm mechanics, auction theory, audience segmentation, and consumer psychology.',
    icon: 'BookOpen'
  },
  {
    title: 'Skin in the Game',
    description: 'Investing personal capital into Times & Glints to test creatives, validate ad angles, and fulfill real orders in Lahore.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Brand Craftsmanship',
    description: 'Curating an authentic luxury watch and jewellery identity with refined visuals, storytelling, and premium presentation.',
    icon: 'Sparkles'
  },
  {
    title: 'Data & Iteration',
    description: 'Treating every campaign as an experiment. Analyzing CTR, hook rates, creative fatigue, and customer conversation flows.',
    icon: 'LineChart'
  }
];

export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'meta-ads',
    name: 'Meta Ads',
    category: 'advertising',
    description: 'End-to-end management of Meta Ads Manager, understanding auction dynamics, bid strategies, and pixel/event tracking.',
    practicalApplication: 'Setting up structured campaigns for Times & Glints to test product hooks and conversion angles.',
    competencies: ['Ads Manager Hierarchy', 'Event & Pixel Tracking', 'A/B Creative Testing', 'Budget Optimization'],
    icon: 'Target'
  },
  {
    id: 'facebook-advertising',
    name: 'Facebook Advertising',
    category: 'advertising',
    description: 'Harnessing feed placements, carousel formats, and localized targeting to capture high-intent buyers on Facebook.',
    practicalApplication: 'Running targeted local ad sets in Lahore showcasing watch collections and customer delivery reliability.',
    competencies: ['Feed & Video Formats', 'Local Geographic Targeting', 'Placement Customization', 'Ad Copywriting'],
    icon: 'Share2'
  },
  {
    id: 'instagram-advertising',
    name: 'Instagram Advertising',
    category: 'advertising',
    description: 'Crafting visually immersive Story and Reels ads that resonate with design-conscious jewellery and fashion enthusiasts.',
    practicalApplication: 'Driving qualified profile visits and direct message inquiries to @times.glints via high-engagement Reels ads.',
    competencies: ['Reels & Story Formats', 'Visual Aesthetic Curation', 'Direct Message Ad Objectives', 'Engagement Traps'],
    icon: 'Instagram'
  },
  {
    id: 'campaign-planning',
    name: 'Campaign Planning',
    category: 'strategy',
    description: 'Structuring multi-stage promotion cycles from initial creative brainstorm to budget allocation and rollout timelines.',
    practicalApplication: 'Planning product drops and seasonal promotional drives for Times & Glints with clear schedules.',
    competencies: ['Budget Allocation', 'Creative Briefing', 'Flighting & Scheduling', 'Offer Structuring'],
    icon: 'Calendar'
  },
  {
    id: 'audience-research',
    name: 'Audience Research',
    category: 'strategy',
    description: 'Deconstructing customer demographics, affinity interests, local competitor landscapes, and consumer purchase triggers.',
    practicalApplication: 'Mapping out watch and jewellery gift buyers versus self-purchasers in Lahore urban demographics.',
    competencies: ['Customer Persona Mapping', 'Competitor Ad Audits', 'Interest Stacking', 'Lookalike Theory'],
    icon: 'Users'
  },
  {
    id: 'social-media-marketing',
    name: 'Social Media Marketing',
    category: 'strategy',
    description: 'Organic and paid content synergy, community engagement, brand voice consistency, and high-trust social proof.',
    practicalApplication: 'Managing the @times.glints Instagram identity, curating daily stories, and answering customer queries.',
    competencies: ['Brand Voice Consistency', 'Community Engagement', 'Social Proof Integration', 'Content Scheduling'],
    icon: 'Megaphone'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    category: 'commerce',
    description: 'Catalog curation, pricing strategy, order fulfillment workflows, and seamless direct-to-consumer checkout experiences.',
    practicalApplication: 'Operating order taking, customer communication, and fast delivery for watch buyers across Lahore.',
    competencies: ['Catalog Management', 'Cash on Delivery Operations', 'Customer Inquiries via WhatsApp', 'Post-Purchase Support'],
    icon: 'ShoppingBag'
  },
  {
    id: 'brand-development',
    name: 'Brand Development',
    category: 'brand',
    description: 'Building cohesive visual identities, luxury packaging touchpoints, value propositions, and long-term brand equity.',
    practicalApplication: 'Establishing Times & Glints as a refined, modern destination for statement timepieces and fine jewellery.',
    competencies: ['Visual Identity Systems', 'Packaging Aesthetics', 'Value Proposition Design', 'Brand Storytelling'],
    icon: 'Crown'
  }
];

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'obsidian-chronographe',
    name: 'The Obsidian Chronographe',
    category: 'Statement Timepiece',
    tagline: 'Deep midnight navy dial with polished icy steel casing',
    description: 'A flagship timepiece engineered for the modern professional. Features a rich midnight sunburst chronograph dial, luminous icy silver hands, and a precision tachymeter scale mounted on a genuine patterned strap.',
    specs: ['Deep Navy Sunburst Dial', 'Icy Silver Stainless Case', 'Precision Chronograph Subdials', 'Scratch-Resistant Crystal Glass', 'Delivery Across Lahore'],
    image: '/src/assets/images/times_glints_luxury_watch_1794211164691.jpg',
    status: 'Flagship Edition'
  },
  {
    id: 'geometric-sapphire-cuff',
    name: 'Sapphire & Silver Geometric Cuff',
    category: 'Fine Jewellery',
    tagline: 'Architectural silver bracelet with deep blue sapphire accents',
    description: 'Sculpted from high-grade sterling silver alloy, this statement cuff and matching signet ring feature precision-cut geometric facets embedded with midnight sapphire crystal accents.',
    specs: ['Architectural Faceted Silver', 'Midnight Sapphire Crystals', 'Ergonomic Open-Cuff Fit', 'Matching Signet Companion', 'Inspected for Purity'],
    image: '/src/assets/images/times_glints_fine_jewellery_1794211165067.jpg',
    status: 'Artisan Collection'
  },
  {
    id: 'executive-heritage-curation',
    name: 'Executive Midnight Curation Set',
    category: 'Curated Ensemble',
    tagline: 'Classic dress watch paired with silver cufflinks and signet ring',
    description: 'The definitive luxury starter set presented in a plush midnight blue velvet presentation case. Contains a timeless white dial dress watch with Roman numerals, paired with engraved silver cufflinks and signet ring.',
    specs: ['Classic Roman Dial Watch', 'Solid Silver Cufflink Pair', 'Polished Minimalist Signet Ring', 'Midnight Velvet Collector Box', 'Ready for Gifting'],
    image: '/src/assets/images/times_glints_collection_showcase_1794211165067.jpg',
    status: 'Signature Gift Set'
  }
];

export const TIMELINE_DATA: TimelineMilestone[] = [
  {
    id: 'independent-learning',
    step: '01',
    title: 'Independent Digital Marketing Learning',
    period: 'Foundation Stage',
    description: 'Embarked on a focused journey into digital marketing fundamentals. Studied consumer buying psychology, digital sales funnels, and organic brand building principles.',
    keyLearnings: ['Digital sales funnels', 'Consumer psychology', 'Organic engagement mechanics'],
    highlight: 'Building knowledge from curiosity to commitment.'
  },
  {
    id: 'learning-meta-ads',
    step: '02',
    title: 'Learning Meta Ads',
    period: 'Technical Deep-Dive',
    description: 'Dedicated hundreds of hours to mastering Meta Ads Manager. Deconstructed auction models, pixel architecture, creative hooks, and algorithmic targeting shifts.',
    keyLearnings: ['Auction theory & CPM dynamics', 'Creative fatigue mitigation', 'Event tracking & conversion objectives'],
    highlight: 'Transitioning from generic theory into ad manager mechanics.'
  },
  {
    id: 'starting-own-business',
    step: '03',
    title: 'Starting My Own Business',
    period: 'Venture Inception',
    description: 'Decided that the only genuine way to become an exceptional marketer is to have real skin in the game. Invested personal capital to establish an online venture.',
    keyLearnings: ['Supplier sourcing', 'Product quality assessment', 'Cash flow & inventory management'],
    highlight: 'Taking entrepreneurial risk and putting ideas into action.'
  },
  {
    id: 'building-times-glints',
    step: '04',
    title: 'Building Times & Glints',
    period: 'Brand Launch & Operations',
    description: 'Created Times & Glints as a premium watches and jewellery brand operating out of Lahore. Crafted the visual identity, Instagram presence, and local delivery network.',
    keyLearnings: ['Luxury brand positioning', 'Customer trust building in Lahore', 'WhatsApp customer communication'],
    highlight: 'Turning an abstract concept into an active local business.'
  },
  {
    id: 'exploring-ecommerce-growth',
    step: '05',
    title: 'Exploring E-commerce Growth',
    period: 'Active Optimization',
    description: 'Testing Meta ad creatives, analyzing conversion bottlenecks, refining customer purchase journeys, and optimizing fast order fulfillment across Lahore.',
    keyLearnings: ['Creative testing frameworks', 'Direct message response optimization', 'Fulfillment speed & customer satisfaction'],
    highlight: 'Real-time experimentation in a competitive retail landscape.'
  },
  {
    id: 'future-business-development',
    step: '06',
    title: 'Future Business Development',
    period: 'Long-term Horizon',
    description: 'Expanding Times & Glints into new product collections, scaling paid acquisition channels, and collaborating with brands seeking authentic, performance-driven digital marketing.',
    keyLearnings: ['Multi-channel ad scaling', 'Omni-channel brand experiences', 'Long-term customer retention systems'],
    highlight: 'Scaling with ambition, integrity, and relentless continuous improvement.'
  }
];
