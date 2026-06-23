import { prisma } from './prisma';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { validateEnvironment } from './env';

const MOCK_DB_PATH = path.join(process.cwd(), 'prisma', 'mock-db.json');

// Helper to check if we are in mock mode
export const isMockMode = () => {
  validateEnvironment();
  return process.env.DB_MOCK === 'true';
};

// Initial Mock Database Seed Structure
const initialMockData = {
  users: [
    {
      id: 'usr_1',
      email: 'admin@arrowheaddigitech.com',
      password: bcrypt.hashSync('admin123', 10),
      name: 'Super Admin',
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
  services: [
    {
      id: 'srv_1',
      slug: 'web-development',
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies for optimal performance and user experience.',
      icon: '💻',
      problem: 'Many businesses struggle with outdated, slow websites that do not convert visitors into customers. Poor user experience and lack of mobile optimization lead to lost opportunities.',
      solution: 'We build modern, fast, and responsive websites using cutting-edge technologies like Next.js, React, and TypeScript. Our focus is on performance, SEO, and user experience.',
      process: 'Discovery & Planning -> Design & Prototyping -> Development -> Testing & QA -> Launch & Optimization',
      benefits: 'Lightning-fast load times, Mobile-first responsive design, SEO-optimized structure, Secure and scalable architecture, Excellent user experience',
      deliverables: 'Custom-designed website, Mobile-responsive layout, SEO optimization, Analytics integration, Content management system, Training & documentation',
      featured: true,
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'srv_2',
      slug: 'mobile-apps',
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android with exceptional user experiences.',
      icon: '📱',
      problem: 'Businesses without a mobile presence miss out on direct customer engagement and the massive mobile commerce market.',
      solution: 'We design and develop native or cross-platform (React Native/Flutter) mobile apps that provide smooth performance, intuitive UI, and reliable offline capabilities.',
      process: 'Requirements Analysis -> UX/UI Design -> Native Development -> Integration & Testing -> App Store Submission',
      benefits: 'Direct marketing channel, Increased customer loyalty, High performance, App store presence, Secure payments',
      deliverables: 'iOS & Android App, Backend API Integration, Push notification setup, Analytics tracking, App Store guidelines documentation',
      featured: true,
      order: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'srv_3',
      slug: 'seo',
      title: 'SEO',
      description: 'Comprehensive SEO strategies to improve your search rankings and drive organic traffic to your website.',
      icon: '🔍',
      problem: 'Beautiful websites are useless if no one can find them. Low organic visibility means you are losing customers to competitors who rank higher.',
      solution: 'Our systematic search engine optimization audits and targets high-intent keywords, refactors site structure, and establishes high-quality authority backlinks.',
      process: 'SEO Audit -> Keyword Strategy -> On-page Optimization -> Content Creation -> Link Acquisition -> Monthly Report',
      benefits: 'Increased organic traffic, Higher search engine rankings, Better brand credibility, Long-term sustainable growth, Higher conversion rates',
      deliverables: 'Detailed keyword research, Technical SEO audit report, Content plan, On-page title/meta optimization, High-authority backlinks, Analytics dashboards',
      featured: true,
      order: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'srv_4',
      slug: 'google-ads',
      title: 'Google Ads',
      description: 'Strategic Google Ads campaigns that maximize ROI and drive qualified leads to your business.',
      icon: '📈',
      problem: 'Organic growth takes time, and businesses need immediate qualified traffic and conversions to hit sales targets now.',
      solution: 'We set up hyper-targeted Search, Display, and Performance Max Google Ads campaigns designed to target users actively searching for your services.',
      process: 'Competitor Analysis -> Account Setup -> Keyword Bidding -> Ad Creation -> Landing Page Design -> Daily Budget Optimization',
      benefits: 'Instant search engine visibility, Highly qualified traffic, Controllable budgets, Complete transparent attribution, Maximized ROI',
      deliverables: 'Google Ads account setup, Ad copywriting, Target keyword lists, Custom landing pages, Tag Manager conversion tracking, Performance reports',
      featured: false,
      order: 4,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'srv_5',
      slug: 'meta-ads',
      title: 'Meta Ads',
      description: 'Facebook and Instagram advertising campaigns that reach your target audience and drive conversions.',
      icon: '🎯',
      problem: 'Reaching specific demographics, interests, and custom audiences can be difficult without programmatic social media marketing.',
      solution: 'We construct high-converting visual Meta campaigns targeting specific lookalike and custom buyer persona groups with stunning creatives.',
      process: 'Demographic Research -> Creative Concepting -> Funnel Mapping -> Pixel/CAPI Setup -> Retargeting Setup -> Scaling',
      benefits: 'Hyper-focused demographic targeting, Strong brand awareness, Highly visual ad formats, Dynamic retargeting capabilities, Increased conversion rates',
      deliverables: 'Ad creative designs (video/static), Copywriting variations, Custom audience creation, Facebook Pixel / Conversion API setup, Performance reporting',
      featured: false,
      order: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'srv_6',
      slug: 'social-media-marketing',
      title: 'Social Media Marketing',
      description: 'Strategic social media management to build brand awareness and engage with your audience.',
      icon: '📱',
      problem: 'Maintaining an active, high-quality, and engaging presence on multiple social media networks is time-consuming and difficult.',
      solution: 'We plan content calendars, write engaging copy, design high-end templates, and handle community interaction across LinkedIn, Instagram, and Twitter.',
      process: 'Brand Audit -> Content Strategy -> Design Templates -> Copywriting -> Scheduling & Publishing -> Engagement Monitoring',
      benefits: 'Consistent brand image, Direct customer engagement, Increased brand trust, Higher social referrals, Community growth',
      deliverables: 'Social media audit, Monthly content calendar, Custom graphic templates, Copywriting assets, Monthly growth reports',
      featured: false,
      order: 6,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'srv_7',
      slug: 'lead-generation',
      title: 'Lead Generation',
      description: 'Comprehensive lead generation strategies to fill your sales pipeline with qualified prospects.',
      icon: '🚀',
      problem: 'Sales teams waste hours calling cold, unqualified leads, resulting in low closing rates and high acquisition costs.',
      solution: 'We design automated lead capture landing pages, build lead magnets, and run outbound email and inbound nurturing campaigns to deliver warm leads.',
      process: 'Funnel Analysis -> Landing Page Design -> Offer Creation -> Traffic Sourcing -> Automation Setup -> Qualification Call Routing',
      benefits: 'Warm outbound pipeline, Reduced acquisition cost, Highly targeted email lists, Automated client qualification, Better sales closure rates',
      deliverables: 'High-converting landing page, PDF Lead magnet creation, Cold email sequences, CRM automated workflow setup, Lead reports',
      featured: true,
      order: 7,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'srv_8',
      slug: 'crm-solutions',
      title: 'CRM Solutions',
      description: 'Custom CRM implementation and optimization to manage customer relationships effectively.',
      icon: '👥',
      problem: 'Disconnected customer records, forgotten follow-ups, and scattered client emails result in lost business and messy operations.',
      solution: 'We implement and configure HubSpot, Salesforce, or custom CRM solutions with automated email logging, deal tracking, and contract signing pipelines.',
      process: 'Workflow Analysis -> CRM Setup -> Data Migration -> Integration & Automation -> Team Training -> Custom Dashboards',
      benefits: 'Single source of truth, Automated client follow-ups, Standardized deal stages, Real-time sales dashboards, Enhanced data security',
      deliverables: 'Configured CRM instance, Custom automation sequences, API integrations, Data migration report, Interactive training videos',
      featured: false,
      order: 8,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'srv_9',
      slug: 'ai-chatbots',
      title: 'AI Chatbots',
      description: 'Intelligent AI-powered chatbots that automate customer support and improve user engagement.',
      icon: '🤖',
      problem: 'Hiring 24/7 customer support agents is expensive, yet customers expect instant responses to common questions at any time of day.',
      solution: 'We build advanced conversational AI chatbots using OpenAI API and custom semantic data sources that answer client questions instantly and book appointments.',
      process: 'FAQ Knowledge Mapping -> AI Agent Configuration -> Tone/Behavior Training -> Website/WhatsApp Integration -> Feedback Optimization',
      benefits: '24/7 instant client support, 80%+ FAQ automation rate, Instant lead capturing, Lower overhead operational costs, Seamless human handoff',
      deliverables: 'AI chatbot widget, Customized system prompt, Vector database knowledge injection, Handoff system integration, Usage logs dashboard',
      featured: true,
      order: 9,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'srv_10',
      slug: 'custom-software',
      title: 'Custom Software',
      description: 'Tailored software solutions to address your unique business challenges and streamline operations.',
      icon: '⚙️',
      problem: 'Off-the-shelf software doesn\'t match your unique internal processes, leading to double-data entries, spreadsheet bloat, and manual work.',
      solution: 'We develop secure, cloud-native bespoke portals, internal tools, and ERP integrations that perfectly match your specific business requirements.',
      process: 'Systems Architecture Design -> Database Design -> API Development -> UI/UX Frontend Code -> Deployment & Cloud Security',
      benefits: '100% custom business workflows, Full IP ownership, High security standards, Integrations with existing apps, High-performance databases',
      deliverables: 'Bespoke software build, Cloud container deployments, RESTful/GraphQL API, Administrator control panel, Technical source code handoff',
      featured: true,
      order: 10,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'srv_11',
      slug: 'video-production',
      title: 'Video Production',
      description: 'Professional video production services for marketing, training, and brand storytelling.',
      icon: '🎬',
      problem: 'Static images struggle to hold customer attention on modern visual platforms like TikTok, YouTube Shorts, and Instagram Reels.',
      solution: 'We write scripts, record 4K footage, edit color/grading, and add premium motion graphics to make highly engaging promotional videos.',
      process: 'Script Writing & Storyboard -> Pre-production -> Camera Shooting -> Professional Video Editing -> Sound Design & CGI',
      benefits: 'High audience retention, Increased CTR, Professional corporate image, Highly sharable viral formats, Better product explanations',
      deliverables: 'Raw footage source, HD/4K finalized marketing videos, Vertically formatted social edits, Professional voiceovers, Licensed sound library tracks',
      featured: false,
      order: 11,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'srv_12',
      slug: 'graphic-design',
      title: 'Graphic Design',
      description: 'Creative graphic design services to elevate your brand identity and marketing materials.',
      icon: '🎨',
      problem: 'Amateurish graphics, mismatched brand fonts, and inconsistent visual layouts damage corporate trust and brand value.',
      solution: 'We build comprehensive vector brand kits, custom website UI screens, pitch decks, and print assets that highlight premium luxury design systems.',
      process: 'Brand Audit -> Moodboard Creation -> Concept Sketching -> Vector Asset Generation -> Guidelines Formulation -> Client Revision',
      benefits: 'Premium visual identity, Clear brand positioning, Highly consistent social graphics, Polished sales presentations, High-resolution print files',
      deliverables: 'Vector corporate logos, Color palette guidelines, Font assets, Vector social media templates, Business card designs, Corporate presentation templates',
      featured: false,
      order: 12,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'srv_13',
      slug: 'digital-strategy',
      title: 'Digital Strategy',
      description: 'End-to-end consulting and roadmapping to structure your digital transformation and software architectures.',
      icon: '💡',
      problem: 'Companies jump into online marketing or software projects without a clear ROI roadmap, wasting budget on systems that don\'t work together.',
      solution: 'We provide senior consulting audits that outline technical stack configurations, competitor traffic models, and concrete customer acquisition paths.',
      process: 'Consultation & Audit -> Data Ingestion analysis -> Competitor reverse engineering -> Technical stack map -> ROI projection presentation',
      benefits: 'Clear software development plans, Unified brand communication, Zero wasted budget, Future-proof engineering decisions, 3x faster delivery schedules',
      deliverables: 'Competitor traffic reports, Technical system maps, 12-month marketing and development plan, Software RFP documentation, ROI projection dashboard',
      featured: true,
      order: 13,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
  projects: [
    {
      id: 'prj_1',
      slug: 'yalaride',
      title: 'YalaRide',
      description: 'Premium ride-sharing platform with real-time tracking and seamless booking experience.',
      clientName: 'YalaRide Ltd',
      industry: 'Transportation',
      images: [],
      thumbnail: '',
      featured: true,
      metrics: '50K+ Downloads, 4.8 Rating',
      testimonialId: 'tst_1',
      caseStudy: true,
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'prj_2',
      slug: 'america-needs-nurses',
      title: 'America Needs Nurses',
      description: 'Healthcare recruitment platform connecting nurses with top medical facilities nationwide.',
      clientName: 'ANN Recruitment',
      industry: 'Healthcare',
      images: [],
      thumbnail: '',
      featured: true,
      metrics: '200+ Placements, 95% Success',
      testimonialId: 'tst_2',
      caseStudy: true,
      order: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'prj_3',
      slug: 'go-jetter-tours',
      title: 'Go Jetter Tours',
      description: 'Travel booking platform with AI-powered recommendations and seamless itinerary management.',
      clientName: 'GoJetter Tours',
      industry: 'Travel',
      images: [],
      thumbnail: '',
      featured: true,
      metrics: '10K+ Bookings, 4.9 Rating',
      testimonialId: 'tst_3',
      caseStudy: true,
      order: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'prj_4',
      slug: 'atlanta-car-rental',
      title: 'Atlanta Car Rental',
      description: 'Car rental management system with fleet tracking and automated booking workflows.',
      clientName: 'Atlanta Car Services',
      industry: 'Automotive',
      images: [],
      thumbnail: '',
      featured: false,
      metrics: '5K+ Rentals, 98% Satisfaction',
      testimonialId: '',
      caseStudy: true,
      order: 4,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'prj_5',
      slug: 'cars-compound',
      title: 'Cars Compound',
      description: 'Luxury car dealership platform with virtual showroom and financing integration.',
      clientName: 'Cars Compound Inc',
      industry: 'E-commerce',
      images: [],
      thumbnail: '',
      featured: false,
      metrics: '$2M+ Sales, 300+ Cars',
      testimonialId: '',
      caseStudy: true,
      order: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'prj_6',
      slug: 'vipkars',
      title: 'VIPkars',
      description: 'Premium car rental service for VIP clients with concierge-level service.',
      clientName: 'VIPkars Rent',
      industry: 'Transportation',
      images: [],
      thumbnail: '',
      featured: false,
      metrics: '1K+ Clients, 5-Star Service',
      testimonialId: '',
      caseStudy: true,
      order: 6,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'prj_7',
      slug: 'priceless-rent-a-car',
      title: 'Priceless Rent A Car',
      description: 'Budget-friendly car rental platform with competitive pricing and excellent service.',
      clientName: 'Priceless Rent',
      industry: 'Automotive',
      images: [],
      thumbnail: '',
      featured: false,
      metrics: '8K+ Rentals, 4.7 Rating',
      testimonialId: '',
      caseStudy: true,
      order: 7,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
  testimonials: [
    {
      id: 'tst_1',
      name: 'Chaminda Silva',
      role: 'CEO',
      company: 'YalaRide',
      content: 'Arrowhead DigiTech transformed our ride-sharing idea into a highly functional, scalable platform. Their developer skills and technical agility are world-class.',
      image: '',
      rating: 5,
      featured: true,
      projectId: 'prj_1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'tst_2',
      name: 'Sarah Johnson',
      role: 'Director of HR',
      company: 'ANN Recruitment',
      content: 'Our placement rate surged by 300% within months of launching our new portal. They understand recruitment workflows like no other.',
      image: '',
      rating: 5,
      featured: true,
      projectId: 'prj_2',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'tst_3',
      name: 'Marc G.',
      role: 'VP of Marketing',
      company: 'Go Jetter Tours',
      content: 'Our mobile bookings exceeded our desktop sales within weeks of launching the application. An absolutely stunning user interface.',
      image: '',
      rating: 5,
      featured: true,
      projectId: 'prj_3',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
  faqs: [
    {
      id: 'faq_1',
      question: 'What services does Arrowhead DigiTech offer?',
      answer: 'We offer a comprehensive range of digital services including web development, mobile apps, SEO, Google Ads, Meta Ads, social media marketing, lead generation, CRM solutions, AI chatbots, custom software, video production, and graphic design.',
      category: 'General',
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'faq_2',
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on scope and complexity. A simple website typically takes 4-6 weeks, while more complex projects can take 8-12 weeks or longer. We provide detailed timelines during our initial consultation.',
      category: 'General',
      order: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'faq_3',
      question: 'Do you work with startups?',
      answer: 'Absolutely! We love working with startups and have special packages designed for growing businesses. Our scalable solutions can grow with your business.',
      category: 'General',
      order: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'faq_4',
      question: 'How do you price your services?',
      answer: 'We offer flexible pricing models including project-based, hourly, and retainer options. We provide transparent quotes with no hidden fees. Contact us for a custom quote based on your specific needs.',
      category: 'Pricing',
      order: 4,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
  blogPosts: [
    {
      id: 'blg_1',
      slug: 'future-of-web-development',
      title: 'The Future of Web Development: Next.js and Serverless Architecture',
      excerpt: 'Discover how serverless infrastructure and advanced React frameworks are revolutionizing the speed and maintenance of modern digital apps.',
      content: '<p>Web development is evolving at an unprecedented pace. Today, Next.js and Vercel serverless functions have made it easier than ever to build lightning-fast web applications.</p><h3>Why Next.js?</h3><p>Next.js offers hybrid static and server-rendered execution, automatic code-splitting, and optimized image rendering out of the box, ensuring Lighthouse 90+ performance scores with zero configuration. For digital agencies, this translates directly to higher organic conversion rates and superior client satisfaction.</p>',
      coverImage: '/uploads/blog-1.jpg',
      author: 'Usman Farooq',
      published: true,
      featured: true,
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
  pricingPackages: [
    {
      id: 'pkg_1',
      name: 'Starter Package',
      price: '$2,500',
      description: 'Ideal for small businesses and startups seeking a professional landing presence.',
      features: ['5 custom designed pages', 'Fully responsive mobile layout', 'Basic search engine optimization (SEO)', 'Standard email contact form', 'Google Analytics setup'],
      popular: false,
      serviceId: 'srv_1',
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'pkg_2',
      name: 'Professional Package',
      price: '$5,000',
      description: 'Perfect for growing companies needing dynamic content and CMS systems.',
      features: ['10 custom designed pages', 'Advanced mobile responsive flow', 'Full Content Management (CMS)', 'Search Console & SEO targeting', 'E-commerce capabilities integration'],
      popular: true,
      serviceId: 'srv_1',
      order: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'pkg_3',
      name: 'Enterprise Package',
      price: 'Custom Quote',
      description: 'Bespoke corporate web platforms with advanced databases and integration flows.',
      features: ['Unlimited custom page templates', 'Custom API integration flows', 'State management & web app code', 'Dedicated security audits', '24/7 Priority SLA support'],
      popular: false,
      serviceId: 'srv_1',
      order: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
  leads: [
    {
      id: 'ld_1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      company: 'Example Corp',
      service: 'Web Development',
      message: 'Hello, I would like to get a quote for a custom Next.js e-commerce app.',
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
  teamMembers: [
    {
      id: 'tm_1',
      name: 'Usman Farooq',
      role: 'Founding Partner & Architect',
      bio: 'Expert software engineer specializing in scalable Cloud Architectures, Web Performance optimization, and premium UI designs.',
      image: '/uploads/usman.jpg',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
  settings: [
    {
      id: 'set_1',
      key: 'contact_email',
      value: 'info@arrowheaddigitech.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ]
};

// Initialize file if not exists
const initializeDb = () => {
  if (!fs.existsSync(MOCK_DB_PATH)) {
    const dir = path.dirname(MOCK_DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(MOCK_DB_PATH, JSON.stringify(initialMockData, null, 2));
  }
};

const readMockDb = () => {
  initializeDb();
  const fileContent = fs.readFileSync(MOCK_DB_PATH, 'utf-8');
  return JSON.parse(fileContent);
};

const writeMockDb = (data: any) => {
  fs.writeFileSync(MOCK_DB_PATH, JSON.stringify(data, null, 2));
};

// --- DATA ACCESS METHODS ---

// Generic Helper for CRUD on Mock arrays
const mockCrud = <T extends { id: string }>(entityName: string) => {
  return {
    findMany: async (filter?: (item: T) => boolean): Promise<T[]> => {
      const db = readMockDb();
      const items = db[entityName] || [];
      return filter ? items.filter(filter) : items;
    },
    findFirst: async (filter: (item: T) => boolean): Promise<T | null> => {
      const db = readMockDb();
      const items = db[entityName] || [];
      return items.find(filter) || null;
    },
    findUnique: async (filter: (item: T) => boolean): Promise<T | null> => {
      const db = readMockDb();
      const items = db[entityName] || [];
      return items.find(filter) || null;
    },
    create: async (data: any): Promise<T> => {
      const db = readMockDb();
      if (!db[entityName]) db[entityName] = [];
      const newId = `${entityName.slice(0, 3)}_${Math.random().toString(36).substr(2, 9)}`;
      const newItem = {
        id: newId,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      db[entityName].push(newItem);
      writeMockDb(db);
      return newItem as T;
    },
    update: async (id: string, data: any): Promise<T> => {
      const db = readMockDb();
      const items = db[entityName] || [];
      const index = items.findIndex((item: any) => item.id === id);
      if (index === -1) throw new Error(`Entity ${entityName} with id ${id} not found`);
      const updatedItem = {
        ...items[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      db[entityName][index] = updatedItem;
      writeMockDb(db);
      return updatedItem as T;
    },
    delete: async (id: string): Promise<T> => {
      const db = readMockDb();
      const items = db[entityName] || [];
      const index = items.findIndex((item: any) => item.id === id);
      if (index === -1) throw new Error(`Entity ${entityName} with id ${id} not found`);
      const deletedItem = items[index];
      db[entityName] = items.filter((item: any) => item.id !== id);
      writeMockDb(db);
      return deletedItem as T;
    }
  };
};

export const dbService = {
  users: {
    findMany: async () => isMockMode() ? mockCrud<any>('users').findMany() : prisma.user.findMany(),
    findUnique: async (email: string) => {
      if (isMockMode()) {
        return mockCrud<any>('users').findFirst((u) => u.email === email);
      }
      return prisma.user.findUnique({ where: { email } });
    },
    create: async (data: any) => isMockMode() ? mockCrud<any>('users').create(data) : prisma.user.create({ data }),
    update: async (id: string, data: any) => isMockMode() ? mockCrud<any>('users').update(id, data) : prisma.user.update({ where: { id }, data }),
    delete: async (id: string) => isMockMode() ? mockCrud<any>('users').delete(id) : prisma.user.delete({ where: { id } }),
  },
  services: {
    findMany: async () => {
      if (isMockMode()) {
        return (await mockCrud<any>('services').findMany()).sort((a, b) => a.order - b.order);
      }
      return prisma.service.findMany({ orderBy: { order: 'asc' } });
    },
    findUnique: async (slug: string) => {
      if (isMockMode()) {
        const srv = await mockCrud<any>('services').findFirst((s) => s.slug === slug);
        if (srv) {
          // attach mock pricingPackages
          const packages = await mockCrud<any>('pricingPackages').findMany((p) => p.serviceId === srv.id);
          srv.pricingPackages = packages;
        }
        return srv;
      }
      return prisma.service.findUnique({
        where: { slug },
        include: { pricingPackages: { orderBy: { order: 'asc' } } }
      });
    },
    create: async (data: any) => isMockMode() ? mockCrud<any>('services').create(data) : prisma.service.create({ data }),
    update: async (id: string, data: any) => isMockMode() ? mockCrud<any>('services').update(id, data) : prisma.service.update({ where: { id }, data }),
    delete: async (id: string) => isMockMode() ? mockCrud<any>('services').delete(id) : prisma.service.delete({ where: { id } }),
  },
  projects: {
    findMany: async () => {
      if (isMockMode()) {
        const projects = await mockCrud<any>('projects').findMany();
        // resolve testimonials
        for (const prj of projects) {
          if (prj.testimonialId) {
            prj.testimonial = await mockCrud<any>('testimonials').findFirst((t) => t.id === prj.testimonialId);
          }
        }
        return projects.sort((a, b) => a.order - b.order);
      }
      return prisma.project.findMany({ include: { testimonial: true }, orderBy: { order: 'asc' } });
    },
    findUnique: async (slug: string) => {
      if (isMockMode()) {
        const prj = await mockCrud<any>('projects').findFirst((p) => p.slug === slug);
        if (prj && prj.testimonialId) {
          prj.testimonial = await mockCrud<any>('testimonials').findFirst((t) => t.id === prj.testimonialId);
        }
        return prj;
      }
      return prisma.project.findUnique({
        where: { slug },
        include: { testimonial: true }
      });
    },
    create: async (data: any) => isMockMode() ? mockCrud<any>('projects').create(data) : prisma.project.create({ data }),
    update: async (id: string, data: any) => isMockMode() ? mockCrud<any>('projects').update(id, data) : prisma.project.update({ where: { id }, data }),
    delete: async (id: string) => isMockMode() ? mockCrud<any>('projects').delete(id) : prisma.project.delete({ where: { id } }),
  },
  testimonials: {
    findMany: async () => isMockMode() ? mockCrud<any>('testimonials').findMany() : prisma.testimonial.findMany(),
    create: async (data: any) => isMockMode() ? mockCrud<any>('testimonials').create(data) : prisma.testimonial.create({ data }),
    update: async (id: string, data: any) => isMockMode() ? mockCrud<any>('testimonials').update(id, data) : prisma.testimonial.update({ where: { id }, data }),
    delete: async (id: string) => isMockMode() ? mockCrud<any>('testimonials').delete(id) : prisma.testimonial.delete({ where: { id } }),
  },
  faqs: {
    findMany: async () => {
      if (isMockMode()) {
        return (await mockCrud<any>('faqs').findMany()).sort((a, b) => a.order - b.order);
      }
      return prisma.fAQ.findMany({ orderBy: { order: 'asc' } });
    },
    create: async (data: any) => isMockMode() ? mockCrud<any>('faqs').create(data) : prisma.fAQ.create({ data }),
    update: async (id: string, data: any) => isMockMode() ? mockCrud<any>('faqs').update(id, data) : prisma.fAQ.update({ where: { id }, data }),
    delete: async (id: string) => isMockMode() ? mockCrud<any>('faqs').delete(id) : prisma.fAQ.delete({ where: { id } }),
  },
  blogPosts: {
    findMany: async () => isMockMode() ? mockCrud<any>('blogPosts').findMany() : prisma.blogPost.findMany(),
    findUnique: async (slug: string) => isMockMode() ? mockCrud<any>('blogPosts').findFirst((b) => b.slug === slug) : prisma.blogPost.findUnique({ where: { slug } }),
    create: async (data: any) => isMockMode() ? mockCrud<any>('blogPosts').create(data) : prisma.blogPost.create({ data }),
    update: async (id: string, data: any) => isMockMode() ? mockCrud<any>('blogPosts').update(id, data) : prisma.blogPost.update({ where: { id }, data }),
    delete: async (id: string) => isMockMode() ? mockCrud<any>('blogPosts').delete(id) : prisma.blogPost.delete({ where: { id } }),
  },
  pricingPackages: {
    findMany: async () => {
      if (isMockMode()) {
        return (await mockCrud<any>('pricingPackages').findMany()).sort((a, b) => a.order - b.order);
      }
      return prisma.pricingPackage.findMany({ orderBy: { order: 'asc' } });
    },
    create: async (data: any) => isMockMode() ? mockCrud<any>('pricingPackages').create(data) : prisma.pricingPackage.create({ data }),
    update: async (id: string, data: any) => isMockMode() ? mockCrud<any>('pricingPackages').update(id, data) : prisma.pricingPackage.update({ where: { id }, data }),
    delete: async (id: string) => isMockMode() ? mockCrud<any>('pricingPackages').delete(id) : prisma.pricingPackage.delete({ where: { id } }),
  },
  leads: {
    findMany: async () => {
      if (isMockMode()) {
        return (await mockCrud<any>('leads').findMany()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
      return prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
    },
    create: async (data: any) => isMockMode() ? mockCrud<any>('leads').create(data) : prisma.lead.create({ data }),
    update: async (id: string, data: any) => isMockMode() ? mockCrud<any>('leads').update(id, data) : prisma.lead.update({ where: { id }, data }),
    delete: async (id: string) => isMockMode() ? mockCrud<any>('leads').delete(id) : prisma.lead.delete({ where: { id } }),
  },
  teamMembers: {
    findMany: async () => {
      if (isMockMode()) {
        return (await mockCrud<any>('teamMembers').findMany()).sort((a, b) => a.order - b.order);
      }
      return prisma.teamMember.findMany({ orderBy: { order: 'asc' } });
    },
    create: async (data: any) => isMockMode() ? mockCrud<any>('teamMembers').create(data) : prisma.teamMember.create({ data }),
    update: async (id: string, data: any) => isMockMode() ? mockCrud<any>('teamMembers').update(id, data) : prisma.teamMember.update({ where: { id }, data }),
    delete: async (id: string) => isMockMode() ? mockCrud<any>('teamMembers').delete(id) : prisma.teamMember.delete({ where: { id } }),
  },
  settings: {
    findMany: async () => isMockMode() ? mockCrud<any>('settings').findMany() : prisma.setting.findMany(),
    findUnique: async (key: string) => isMockMode() ? mockCrud<any>('settings').findFirst((s) => s.key === key) : prisma.setting.findUnique({ where: { key } }),
    create: async (data: any) => isMockMode() ? mockCrud<any>('settings').create(data) : prisma.setting.create({ data }),
    update: async (id: string, data: any) => isMockMode() ? mockCrud<any>('settings').update(id, data) : prisma.setting.update({ where: { id }, data }),
    delete: async (id: string) => isMockMode() ? mockCrud<any>('settings').delete(id) : prisma.setting.delete({ where: { id } }),
  },
  projectMedia: {
    findMany: async () => isMockMode() ? mockCrud<any>('projectMedia').findMany() : prisma.projectMedia.findMany(),
    findUnique: async (slug: string) => isMockMode() ? mockCrud<any>('projectMedia').findFirst((pm) => pm.slug === slug) : prisma.projectMedia.findUnique({ where: { slug } }),
    upsert: async (slug: string, data: any) => {
      if (isMockMode()) {
        const existing = await mockCrud<any>('projectMedia').findFirst((pm) => pm.slug === slug);
        if (existing) {
          return mockCrud<any>('projectMedia').update(existing.id, data);
        }
        return mockCrud<any>('projectMedia').create({ ...data, slug });
      }
      return prisma.projectMedia.upsert({
        where: { slug },
        create: { slug, ...data },
        update: data,
      });
    },
    create: async (data: any) => isMockMode() ? mockCrud<any>('projectMedia').create(data) : prisma.projectMedia.create({ data }),
    update: async (id: string, data: any) => isMockMode() ? mockCrud<any>('projectMedia').update(id, data) : prisma.projectMedia.update({ where: { id }, data }),
    delete: async (id: string) => isMockMode() ? mockCrud<any>('projectMedia').delete(id) : prisma.projectMedia.delete({ where: { id } }),
  },
  founders: {
    findMany: async () => isMockMode() ? mockCrud<any>('founders').findMany() : prisma.founder.findMany(),
    create: async (data: any) => isMockMode() ? mockCrud<any>('founders').create(data) : prisma.founder.create({ data }),
    update: async (id: string, data: any) => isMockMode() ? mockCrud<any>('founders').update(id, data) : prisma.founder.update({ where: { id }, data }),
    delete: async (id: string) => isMockMode() ? mockCrud<any>('founders').delete(id) : prisma.founder.delete({ where: { id } }),
  },
  clientLogos: {
    findMany: async () => {
      if (isMockMode()) {
        return (await mockCrud<any>('clientLogos').findMany()).sort((a, b) => a.sortOrder - b.sortOrder);
      }
      return prisma.clientLogo.findMany({ orderBy: { sortOrder: 'asc' } });
    },
    create: async (data: any) => isMockMode() ? mockCrud<any>('clientLogos').create(data) : prisma.clientLogo.create({ data }),
    update: async (id: string, data: any) => isMockMode() ? mockCrud<any>('clientLogos').update(id, data) : prisma.clientLogo.update({ where: { id }, data }),
    delete: async (id: string) => isMockMode() ? mockCrud<any>('clientLogos').delete(id) : prisma.clientLogo.delete({ where: { id } }),
  },
};
