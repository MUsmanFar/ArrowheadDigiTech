import type { SiteContentMap } from './site-content';

export const SITE_CONTENT_DEFAULTS: SiteContentMap = {
  'site.nav': {
    brandName: 'Arrowhead',
    items: [
      { name: 'Services', href: '/services' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
    ctaLabel: 'Book A Call',
    ctaHref: '/contact',
  },
  'site.footer': {
    brandName: 'Arrowhead DigiTech',
    tagline: 'Building Digital Experiences That Drive Growth',
    columns: [
      {
        title: 'Services',
        links: [
          { name: 'Web Development', href: '/services/web-development' },
          { name: 'Mobile Apps', href: '/services/mobile-apps' },
          { name: 'SEO', href: '/services/seo' },
          { name: 'Google Ads', href: '/services/google-ads' },
          { name: 'Social Media Marketing', href: '/services/social-media-marketing' },
        ],
      },
      {
        title: 'Company',
        links: [
          { name: 'About Us', href: '/about' },
          { name: 'Portfolio', href: '/portfolio' },
          { name: 'Case Studies', href: '/case-studies' },
          { name: 'Careers', href: '/careers' },
          { name: 'Blog', href: '/blog' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { name: 'FAQ', href: '/faq' },
          { name: 'Pricing', href: '/pricing' },
          { name: 'Testimonials', href: '/testimonials' },
          { name: 'Contact', href: '/contact' },
          { name: 'Privacy Policy', href: '/privacy-policy' },
          { name: 'Terms & Conditions', href: '/terms-and-conditions' },
        ],
      },
    ],
    email: 'info@arrowheaddigitech.com',
    phone: '+1 (555) 123-4567',
    phoneHref: 'tel:+15551234567',
    address: '123 Tech Street, Digital City, DC 12345',
    social: {
      linkedin: 'https://linkedin.com/company/arrowheaddigitech',
      twitter: 'https://twitter.com/arrowheaddigit',
      facebook: 'https://facebook.com/arrowheaddigitech',
    },
  },
  'site.mobile-cta': {
    phone: '+1 (555) 123-4567',
    phoneHref: 'tel:+15551234567',
    buttonLabel: 'Book A Discovery Call',
    buttonHref: '/contact',
  },
  'site.cta': {
    badge: 'Get Started',
    headline: 'Ready to build something',
    headlineAccent: 'great together?',
    description: "Let's talk about your project and find the perfect solution for your business.",
    buttonLabel: 'Start Your Project',
    buttonHref: '/contact',
  },
  'site.client-logos': {
    label: 'Trusted by',
  },
  'site.metadata': {
    title: 'Arrowhead DigiTech | Digital Agency — Websites, AI & Growth',
    description:
      'Custom Websites, AI-Powered Experiences, and Digital Solutions designed to generate leads, improve credibility, and accelerate growth.',
    keywords:
      'web development, digital marketing, AI automation, CRM solutions, lead generation, business growth',
  },
  'home.hero': {
    badge: 'Web Development • AI • Digital Growth',
    headline: 'Building Websites That',
    headlineAccent: 'Actually Grow',
    headlineSuffix: 'Businesses.',
    subheadline:
      'Custom Websites, AI-Powered Experiences, and Digital Solutions designed to generate leads, improve credibility, and accelerate growth.',
    primaryCta: { label: 'Book A Discovery Call', href: '', external: true },
    secondaryCta: { label: 'View My Work', href: '/portfolio' },
  },
  'home.capabilities': {
    headline: 'Services designed to',
    headlineAccent: 'grow your business.',
    description:
      'From custom development to AI-powered experiences, we deliver digital solutions that drive real results.',
    capabilitySlugs: ['web-development', 'ai-chatbots', 'lead-generation', 'digital-strategy'],
    viewAllLabel: 'View All Services',
    viewAllHref: '/services',
  },
  'about.hero': {
    badge: 'About Arrowhead DigiTech',
    headline: 'We build digital platforms that deliver measurable outcomes.',
    subheadline:
      'A founder-led development shop that has delivered platforms across multiple industries — from ride-sharing apps and healthcare recruitment portals to travel booking and automotive marketplaces.',
  },
  'about.manifesto': {
    title: 'The Manifesto.',
    items: [
      {
        id: '01',
        title: 'Obsession with Outcomes',
        content:
          'We ignore vanity metrics. Every line of code written and every design decision made is relentlessly tied to increasing your revenue, reducing your costs, or scaling your operational efficiency.',
      },
      {
        id: '02',
        title: 'Architectural Excellence',
        content:
          'We refuse to build on brittle foundations. Our systems are cloud-native, headless, and engineered to scale infinitely without technical debt slowing down your future growth.',
      },
      {
        id: '03',
        title: 'Radical Transparency',
        content:
          'No black boxes. You get direct access to our tracking dashboards, GitHub repositories, and staging environments. We operate as a direct extension of your internal team.',
      },
      {
        id: '04',
        title: 'Psychological Design',
        content:
          'Aesthetics matter, but conversion is paramount. We utilize deep psychological principles in our UI/UX to naturally guide users toward high-value actions.',
      },
    ],
  },
  'about.process': {
    badge: 'Our Methodology',
    title: 'How We Build.',
    steps: [
      { title: 'Discovery', desc: 'Understanding your vision, audience, and business goals.' },
      { title: 'Strategy', desc: 'Crafting a tailored digital roadmap and UX architecture.' },
      { title: 'Design', desc: 'Creating premium, 3D-infused, and glassmorphic interfaces.' },
      { title: 'Development', desc: 'Building robust, scalable, and high-performance solutions.' },
      { title: 'Launch & Scale', desc: 'Deploying with precision and optimizing for growth.' },
    ],
  },
  'services.hero': {
    badge: 'Our Services',
    headline: 'Everything you need',
    headlineAccent: 'to succeed online.',
    subheadline:
      'From custom web development to AI-powered experiences and strategic digital marketing, we provide end-to-end solutions that drive measurable growth.',
  },
  'services.trusted-by': {
    badge: 'Trusted By',
    headline: 'Companies that rely on us.',
  },
  'portfolio.hero': {
    badge: 'Our Work',
    headline: 'Real work.',
    headlineAccent: 'Real results.',
    subheadline:
      'A curated selection of projects we have designed and built. Each one represents a partnership focused on solving real business challenges.',
  },
  'case-studies.hero': {
    badge: 'Case Studies',
    headline: 'Behind every project is a business problem solved.',
    subheadline:
      'A closer look at the constraints, decisions, and measurable outcomes behind the products we build for our clients.',
  },
  'pricing.page': {
    heroTitle: 'Simple, Transparent',
    heroTitleAccent: 'Pricing',
    heroDescription:
      'Choose the perfect plan for your business needs. All plans include our core features with no hidden fees.',
    compareTitle: 'Compare Plans',
    compareDescription: 'See the differences between our pricing tiers',
    ctaTitle: 'Not Sure Which Plan to Choose?',
    ctaDescription: 'Contact us for a custom quote tailored to your specific needs',
    ctaButtonLabel: 'Get Custom Quote',
    ctaButtonHref: '/contact',
  },
  'blog.page': {
    heroTitle: 'Our',
    heroTitleAccent: 'Blog',
    heroDescription: 'Insights, trends, and expert perspectives on digital transformation',
    newsletterTitle: 'Stay Updated',
    newsletterDescription: 'Subscribe to our newsletter for the latest insights and updates.',
    newsletterButtonLabel: 'Subscribe',
  },
  'faq.page': {
    heroTitle: 'Frequently Asked',
    heroTitleAccent: 'Questions',
    heroDescription:
      'Find instant answers to common questions about our agency services, billing packages, timeline scopes, and technical workflows.',
    ctaTitle: 'Still Have Questions?',
    ctaDescription: "Our team is here to help. Reach out and we'll get back to you within 24 hours.",
    ctaButtonLabel: 'Contact Us',
    ctaButtonHref: '/contact',
  },
  'contact.page': {
    badge: 'Initiate Contact',
    headline: "Let's build something",
    headlineAccent: 'great together.',
    subheadline:
      'Whether you need to overhaul your enterprise architecture or build a scalable acquisition funnel, our team is ready to engineer the solution.',
    headquartersLabel: 'Headquarters',
    headquarters: 'Colombo, Sri Lanka',
    inquiriesLabel: 'Direct Inquiries',
    inquiriesEmail: 'info@arrowheaddigitech.com',
  },
  'careers.page': {
    heroTitle: 'Join Our',
    heroTitleAccent: 'Team',
    heroDescription: 'Build the future of digital experiences with a passionate team of innovators',
    benefitsTitle: 'Why Work With Us',
    benefits: [
      'Competitive salary and equity',
      'Remote-first culture',
      'Health insurance',
      'Unlimited PTO',
      'Professional development budget',
      'Flexible working hours',
    ],
    openingsTitle: 'Open Positions',
    openingsDescription: 'Find your perfect role and join our team',
    openings: [
      {
        title: 'Senior Full Stack Developer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        salary: '$120,000 - $150,000',
        description:
          'We are looking for an experienced Full Stack Developer to join our growing team and help build cutting-edge digital solutions.',
      },
      {
        title: 'Digital Marketing Manager',
        department: 'Marketing',
        location: 'Remote',
        type: 'Full-time',
        salary: '$90,000 - $120,000',
        description:
          'Join our marketing team to drive growth through innovative digital marketing strategies and campaigns.',
      },
      {
        title: 'UI/UX Designer',
        department: 'Design',
        location: 'Remote',
        type: 'Full-time',
        salary: '$95,000 - $125,000',
        description:
          'Create beautiful and intuitive user experiences that delight our clients and their customers.',
      },
    ],
    ctaTitle: "Don't See a Role That Fits?",
    ctaDescription:
      "We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.",
    ctaButtonLabel: 'Send Resume',
    ctaEmail: 'careers@arrowheaddigitech.com',
  },
  'testimonials.page': {
    badge: 'Client Stories',
    headline: 'What our clients',
    headlineAccent: 'say about us.',
    subheadline: 'Real feedback from teams we have partnered with to build and scale digital products.',
  },
  'legal.privacy': {
    title: 'Privacy Policy',
    effectiveDate: 'June 15, 2026',
    sections: [
      {
        paragraphs: [
          'At Arrowhead DigiTech ("we," "our," or "us"), we are committed to protecting the privacy, security, and confidentiality of our clients, visitors, and users who access our website and digital services available through arrowheaddigitech.com.',
          'This Privacy Policy explains how we collect, use, store, disclose, and protect your information when you interact with our platform. By accessing or using our website, you agree to the practices described in this Privacy Policy.',
        ],
      },
      {
        heading: '1. Information We Collect',
        paragraphs: [
          'We may collect personal information that you voluntarily provide, including your name, email address, phone number, company name, and project details when you submit contact forms or request services.',
          'We also collect technical data such as IP address, browser type, device information, and usage analytics through cookies and similar technologies.',
        ],
      },
      {
        heading: '2. How We Use Your Information',
        paragraphs: [
          'We use collected information to respond to inquiries, deliver services, improve our website, communicate updates, and comply with legal obligations.',
        ],
      },
      {
        heading: '3. Contact Us',
        paragraphs: [
          'If you have questions about this Privacy Policy, contact us at info@arrowheaddigitech.com.',
        ],
      },
    ],
  },
  'legal.terms': {
    title: 'Terms & Conditions',
    effectiveDate: 'June 15, 2026',
    sections: [
      {
        paragraphs: [
          'Welcome to Arrowhead DigiTech. These Terms and Conditions govern your use of our website and services. By accessing our platform, you agree to be bound by these terms.',
        ],
      },
      {
        heading: '1. Services',
        paragraphs: [
          'Arrowhead DigiTech provides web development, digital marketing, and related technology services. Specific deliverables, timelines, and fees are defined in individual project agreements.',
        ],
      },
      {
        heading: '2. Intellectual Property',
        paragraphs: [
          'Unless otherwise agreed in writing, intellectual property rights for deliverables transfer to the client upon full payment. Arrowhead DigiTech retains rights to pre-existing tools, frameworks, and methodologies.',
        ],
      },
      {
        heading: '3. Contact',
        paragraphs: [
          'For questions regarding these Terms, contact info@arrowheaddigitech.com.',
        ],
      },
    ],
  },
  'home.featured-work': {
    headline: 'Featured work.',
    description: 'Real projects for real businesses — see how we help teams ship faster and grow revenue.',
    viewCaseStudyLabel: 'View Case Study',
    viewAllLabel: 'View All Projects',
  },
  'home.metrics-labels': {
    projectsLabel: 'Completed Projects',
    industriesLabel: 'Industries Served',
  },
  'portfolio.showcase': {
    headline: 'Selected Projects',
    subheadline: 'Featured work',
    viewCaseStudyLabel: 'View Case Study',
    emptyMessage: 'No projects to display yet.',
  },
  'services.list-intro': {
    headline: 'What We Offer',
    subheadline: 'Explore our capabilities',
  },
  'services.detail-labels': {
    backToServices: 'Back to Services',
    getStarted: 'Get Started',
    problemTitle: 'The Problem',
    problemSubtitle: 'What businesses face',
    solutionTitle: 'Our Solution',
    solutionSubtitle: 'How we solve it',
    processTitle: 'Our Process',
    processSubtitle: 'How we deliver',
    benefitsTitle: 'Key Benefits',
    benefitsSubtitle: 'What you gain',
    deliverablesTitle: 'What You Get',
    pricingTitle: 'Pricing',
    pricingSubtitle: 'Choose your plan',
    mostPopular: 'Most Popular',
    inquireNow: 'Inquire Now',
    faqTitle: 'FAQ',
    faqSubtitle: 'Frequently Asked Questions',
  },
  'about.section-labels': {
    founderBadge: 'Founder',
    experienceTitle: 'Experience',
    coreExpertiseTitle: 'Core Expertise',
    industriesServedTitle: 'Industries Served',
    projectsDeliveredTitle: 'Projects Delivered',
    statProjectsDelivered: 'Projects Delivered',
    statIndustriesServed: 'Industries Served',
    statClientTestimonials: 'Client Testimonials',
    statTechnologiesUsed: 'Technologies Used',
    statCaseStudies: 'Case Studies',
    teamHeadline: 'Our team.',
    technologiesTitle: 'Technologies',
    technologiesSubtitle: 'What we work with.',
    testimonialsTitle: 'Testimonials',
    testimonialsSubtitle: 'What clients say.',
  },
  'contact.form': {
    headline: 'Tell us about your project.',
    subheadline: 'Share a few details and we will respond within one business day.',
    successTitle: 'Message sent!',
    successMessage: 'Thank you for reaching out. Our team will get back to you shortly.',
    submitLabel: 'Send Message',
    sendingLabel: 'Sending...',
    bookCallLabel: 'Book a Call Instead',
    successSchedulingLabel: 'Prefer to pick a time now?',
  },
};
