export type CaseStudyMetric = { value: string; label: string };
export type Testimonial = {
  name: string;
  role: string;
  content: string;
  image?: string;
};
export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  projectType: string;
  summary: string;
  technologies: string[];
  thumbnail: string;
  images: string[];
  metrics: CaseStudyMetric[];
  challenge: string;
  painPoints: string[];
  context: string;
  approach: string[];
  outcome: string;
  keyResults: string[];
  testimonial?: Testimonial;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'yalaride',
    title: 'YalaRide',
    client: 'YalaRide Ltd',
    industry: 'Transportation',
    projectType: 'Mobile Application',
    summary: 'A premium ride-sharing platform built around fast booking, live trip visibility, and a calmer passenger experience.',
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'Socket.io', 'Google Maps API', 'Firebase'],
    thumbnail: '/uploads/yalaride-thumb.jpg',
    images: ['/uploads/yalaride-1.jpg', '/uploads/yalaride-2.jpg'],
    metrics: [{ value: '50K+', label: 'downloads' }, { value: '4.8', label: 'app rating' }],
    challenge: 'Turn a complex dispatch workflow into a simple mobile experience while keeping riders and drivers informed in real time.',
    painPoints: [
      'Drivers missed trips because dispatch information arrived late or was unclear',
      'Riders could see a driver assigned but had no way to track progress',
      'Support staff spent hours manually resolving trip disputes',
    ],
    context: 'YalaRide launched into a market dominated by established global players. To compete, they needed a focused experience that removed the uncertainty passengers feel while waiting for a ride.',
    approach: [
      'Mapped the booking journey around the moments that create rider uncertainty.',
      'Designed a mobile-first interface with clear trip states and live feedback.',
      'Structured the platform for dependable location updates and future service expansion.',
    ],
    outcome: 'YalaRide launched with a focused booking experience that supported rapid adoption and strong customer ratings.',
    keyResults: ['50,000+ downloads in the first quarter', '4.8-star average rating across app stores', 'Zero critical downtime since launch'],
    testimonial: {
      name: 'Chaminda Silva',
      role: 'CEO, YalaRide',
      content: 'Arrowhead DigiTech transformed our ride-sharing idea into a highly functional, scalable platform. Their developer skills and technical agility are world-class.',
    },
  },
  {
    slug: 'america-needs-nurses',
    title: 'America Needs Nurses',
    client: 'ANN Recruitment',
    industry: 'Healthcare',
    projectType: 'Web Application',
    summary: 'A healthcare recruitment experience that connects qualified nurses with facilities that need them.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'SendGrid'],
    thumbnail: '/uploads/nurses-thumb.jpg',
    images: ['/uploads/nurses-1.jpg'],
    metrics: [{ value: '200+', label: 'placements' }, { value: '95%', label: 'success rate' }],
    challenge: 'Reduce friction across a high-trust recruitment process involving candidates, credentials, and healthcare employers.',
    painPoints: [
      'Nurses abandoned applications midway through when asked to provide redundant information',
      'Employers received hundreds of unqualified applicants for every open position',
      'Credential verification required manual back-and-forth across multiple systems',
    ],
    context: 'The healthcare industry faced a critical nursing shortage. ANN needed a platform that could process high volumes of qualified candidates while maintaining the trust required for healthcare placements.',
    approach: [
      'Clarified the candidate journey from discovery through placement.',
      'Made role requirements and next steps easier to understand.',
      'Created a scalable foundation for recruitment campaigns and lead qualification.',
    ],
    outcome: 'The rebuilt journey made the service easier to navigate and helped the team convert interest into successful placements.',
    keyResults: ['200+ successful nurse placements', '95% employer satisfaction rate', '50% reduction in application abandonment'],
    testimonial: {
      name: 'Sarah Johnson',
      role: 'Director of HR, ANN Recruitment',
      content: 'Our placement rate surged by 300% within months of launching our new portal. They understand recruitment workflows like no other.',
    },
  },
  {
    slug: 'go-jetter-tours',
    title: 'Go Jetter Tours',
    client: 'GoJetter Tours',
    industry: 'Travel',
    projectType: 'Web Platform',
    summary: 'A travel booking platform that helps customers move from inspiration to a managed itinerary.',
    technologies: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Stripe', 'Cloudinary'],
    thumbnail: '/uploads/travel-thumb.jpg',
    images: ['/uploads/travel-1.jpg'],
    metrics: [{ value: '10K+', label: 'bookings' }, { value: '4.9', label: 'customer rating' }],
    challenge: 'Make a broad catalog of destinations and travel choices feel personal without complicating the path to booking.',
    painPoints: [
      'Travelers overwhelmed by too many destination options without personalized guidance',
      'Booking multi-part itineraries required navigating between disconnected systems',
      'Mobile booking experience was slow and unreliable',
    ],
    context: 'Go Jetter Tours differentiated itself through curated travel experiences rather than commodity bookings. Their platform needed to guide customers from inspiration to purchase without losing the personal touch.',
    approach: [
      'Organized discovery around traveler intent rather than inventory.',
      'Created a consistent flow from recommendation to itinerary.',
      'Prioritized responsive performance for customers planning on mobile devices.',
    ],
    outcome: 'The experience gave travelers a clearer path to purchase and supported sustained booking growth.',
    keyResults: ['10,000+ bookings processed', '4.9-star average customer rating', '40% increase in mobile bookings'],
    testimonial: {
      name: 'Marc G.',
      role: 'VP of Marketing, Go Jetter Tours',
      content: 'Our mobile bookings exceeded our desktop sales within weeks of launching the application. An absolutely stunning user interface.',
    },
  },
  {
    slug: 'atlanta-car-rental',
    title: 'Atlanta Car Rental',
    client: 'Atlanta Car Services',
    industry: 'Automotive',
    projectType: 'Web Application',
    summary: 'A fleet and reservation experience designed to keep availability, booking, and operations in sync.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
    thumbnail: '/uploads/rental-thumb.jpg',
    images: [],
    metrics: [{ value: '5K+', label: 'rentals' }, { value: '98%', label: 'satisfaction' }],
    challenge: 'Replace fragmented fleet and reservation workflows with one understandable customer and operator journey.',
    painPoints: [
      'Fleet availability was tracked in spreadsheets leading to double-bookings',
      'Customers had to call to confirm that quoted rates were accurate',
      'Staff wasted hours reconciling rental records between disconnected systems',
    ],
    context: 'Atlanta Car Services operated a mid-sized fleet across multiple locations. Their existing process relied on phone calls, paper forms, and spreadsheets, which could not keep up with growing demand.',
    approach: [
      'Connected vehicle discovery to real availability.',
      'Simplified booking details and confirmation states.',
      'Designed operational views around the decisions staff make most often.',
    ],
    outcome: 'The platform reduced booking friction while giving the team a more reliable view of fleet activity.',
    keyResults: ['5,000+ rentals processed', '98% customer satisfaction rate', 'Zero double-booking incidents since launch'],
  },
  {
    slug: 'cars-compound',
    title: 'Cars Compound',
    client: 'Cars Compound Inc',
    industry: 'E-commerce',
    projectType: 'Web Platform',
    summary: 'A digital showroom for high-value vehicles, built to make discovery and financing feel considered.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Stripe', 'Vercel'],
    thumbnail: '/uploads/dealership-thumb.jpg',
    images: [],
    metrics: [{ value: '$2M+', label: 'sales' }, { value: '300+', label: 'vehicles' }],
    challenge: 'Bring the confidence and detail of an in-person luxury showroom into an online buying journey.',
    painPoints: [
      'High-value vehicle buyers would not commit without seeing detailed imagery and specifications',
      'Financing inquiries required phone calls and manual credit checks',
      'Inventory management across multiple physical locations was error-prone',
    ],
    context: 'Cars Compound specialized in premium and exotics vehicles where the buying decision is driven by detail, trust, and presentation. Their existing website could not convey the quality of the in-person experience.',
    approach: [
      'Elevated vehicle imagery and key specifications.',
      'Built useful pathways for inventory search and comparison.',
      'Integrated inquiry and financing moments without disrupting discovery.',
    ],
    outcome: 'The new showroom supported a growing catalog and helped translate online attention into high-value sales conversations.',
    keyResults: ['$2M+ in vehicle sales through the platform', '300+ vehicle listings managed', '35% increase in online-to-showroom conversions'],
  },
  {
    slug: 'vipkars',
    title: 'VIPkars',
    client: 'VIPkars Rent',
    industry: 'Transportation',
    projectType: 'Web Application',
    summary: 'A concierge-led premium rental experience for clients who expect speed, discretion, and service.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Socket.io', 'Twilio', 'Stripe'],
    thumbnail: '/uploads/vip-thumb.jpg',
    images: [],
    metrics: [{ value: '1K+', label: 'clients' }, { value: '5-star', label: 'service' }],
    challenge: 'Express a high-touch service model digitally while keeping the reservation path immediate and practical.',
    painPoints: [
      'VIP clients expected immediate confirmations but the process required manual coordination',
      'Concierge requests during rentals often got lost over text and phone calls',
      'Fleet utilization was hard to track across drivers and vehicle types',
    ],
    context: 'VIPkars positioned itself as a premium alternative to standard rental services. Their clients included business travelers and high-net-worth individuals who expected white-glove treatment throughout the rental journey.',
    approach: [
      'Established a confident luxury visual system.',
      'Reduced the reservation journey to essential decisions.',
      'Made concierge support visible at the moments where it adds trust.',
    ],
    outcome: 'VIPkars gained a digital experience aligned with its premium service and repeat-client expectations.',
    keyResults: ['1,000+ premium clients served', '5-star service rating maintained', '40% reduction in concierge response time'],
  },
  {
    slug: 'priceless-rent-a-car',
    title: 'Priceless Rent A Car',
    client: 'Priceless Rent',
    industry: 'Automotive',
    projectType: 'Web Application',
    summary: 'A straightforward rental platform balancing competitive pricing with a dependable booking experience.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
    thumbnail: '/uploads/priceless-thumb.jpg',
    images: [],
    metrics: [{ value: '8K+', label: 'rentals' }, { value: '4.7', label: 'customer rating' }],
    challenge: 'Help value-conscious customers compare options quickly without making the service feel transactional or uncertain.',
    painPoints: [
      'Customers could not compare vehicle options side-by-side',
      'Hidden fees and unclear policies led to surprise charges and negative reviews',
      'The booking process required too many steps for mobile users',
    ],
    context: 'Priceless Rent served budget-conscious travelers who prioritized speed and transparency. Their existing website had a high abandonment rate during the booking funnel.',
    approach: [
      'Made pricing and vehicle differences easier to scan.',
      'Removed avoidable steps from booking.',
      'Used clear reassurance around policies, availability, and support.',
    ],
    outcome: 'Customers gained a faster path to the right vehicle, supporting rental volume and consistently positive ratings.',
    keyResults: ['8,000+ rentals processed', '4.7-star customer rating', '25% reduction in booking abandonment'],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((study) => study.slug === slug);
