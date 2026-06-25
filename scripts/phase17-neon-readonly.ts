import { PrismaClient } from '@prisma/client';

const p = new PrismaClient();

async function main() {
  const keys = [
    'site.nav',
    'home.hero',
    'about.hero',
    'services.hero',
    'portfolio.hero',
    'case-studies.hero',
    'blog.page',
    'pricing.page',
    'faq.page',
    'contact.page',
    'careers.page',
    'site.footer',
  ];
  const settings = await p.setting.findMany({ where: { key: { in: keys } } });
  console.log('=== Neon Setting rows (site content) ===');
  for (const row of settings) {
    console.log(`${row.key}: ${row.value.slice(0, 100)}...`);
  }
  console.log('\n=== Neon entity counts ===');
  console.log(
    JSON.stringify(
      {
        projects: await p.project.count(),
        services: await p.service.count(),
        testimonials: await p.testimonial.count(),
        blogPosts: await p.blogPost.count(),
        pricingPackages: await p.pricingPackage.count(),
        teamMembers: await p.teamMember.count(),
        founders: await p.founder.count(),
        clientLogos: await p.clientLogo.count(),
        projectMedia: await p.projectMedia.count(),
        faqs: await p.fAQ.count(),
        leads: await p.lead.count(),
      },
      null,
      2,
    ),
  );
}

main()
  .finally(() => p.$disconnect());
