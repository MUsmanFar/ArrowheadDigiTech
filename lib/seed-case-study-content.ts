import type { CaseStudyContent } from './case-study';

export const CASE_STUDY_SEED_BY_SLUG: Record<
  string,
  { caseStudyContent: CaseStudyContent; serviceSlugs: string[] }
> = {
  yalaride: {
    serviceSlugs: ['web-development'],
    caseStudyContent: {
      summary: 'A premium ride-sharing platform built around fast booking, live trip visibility, and a calmer passenger experience.',
      projectType: 'Mobile Application',
      technologies: ['React Native', 'Node.js', 'PostgreSQL', 'Socket.io', 'Google Maps API', 'Firebase'],
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
      metrics: [{ value: '50K+', label: 'downloads' }, { value: '4.8', label: 'app rating' }],
    },
  },
  'america-needs-nurses': {
    serviceSlugs: ['ai-chatbots'],
    caseStudyContent: {
      summary: 'A healthcare recruitment experience that connects qualified nurses with facilities that need them.',
      projectType: 'Web Application',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'SendGrid'],
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
      metrics: [{ value: '200+', label: 'placements' }, { value: '95%', label: 'success rate' }],
    },
  },
  'go-jetter-tours': {
    serviceSlugs: ['digital-strategy'],
    caseStudyContent: {
      summary: 'A travel booking platform that helps customers move from inspiration to a managed itinerary.',
      projectType: 'Web Platform',
      technologies: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Stripe', 'Cloudinary'],
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
      metrics: [{ value: '10K+', label: 'bookings' }, { value: '4.9', label: 'customer rating' }],
    },
  },
  'atlanta-car-rental': {
    serviceSlugs: ['web-development'],
    caseStudyContent: {
      summary: 'A fleet and reservation experience designed to keep availability, booking, and operations in sync.',
      projectType: 'Web Application',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
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
      metrics: [{ value: '5K+', label: 'rentals' }, { value: '98%', label: 'satisfaction' }],
    },
  },
  'cars-compound': {
    serviceSlugs: ['lead-generation'],
    caseStudyContent: {
      summary: 'A digital showroom for high-value vehicles, built to make discovery and financing feel considered.',
      projectType: 'Web Platform',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Stripe', 'Vercel'],
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
      metrics: [{ value: '$2M+', label: 'sales' }, { value: '300+', label: 'vehicles' }],
    },
  },
  vipkars: {
    serviceSlugs: ['digital-strategy'],
    caseStudyContent: {
      summary: 'A concierge-led premium rental experience for clients who expect speed, discretion, and service.',
      projectType: 'Web Application',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Socket.io', 'Twilio', 'Stripe'],
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
      metrics: [{ value: '1K+', label: 'clients' }, { value: '5-star', label: 'service' }],
    },
  },
  'priceless-rent-a-car': {
    serviceSlugs: ['lead-generation'],
    caseStudyContent: {
      summary: 'A straightforward rental platform balancing competitive pricing with a dependable booking experience.',
      projectType: 'Web Application',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
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
      metrics: [{ value: '8K+', label: 'rentals' }, { value: '4.7', label: 'customer rating' }],
    },
  },
};
