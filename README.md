# Arrowhead DigiTech - Premium Digital Agency Website

A world-class premium futuristic digital agency website built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Three.js, React Three Fiber, PostgreSQL, and Prisma ORM.

## 🚀 Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Email**: Nodemailer
- **Authentication**: Signed JWT admin session cookie

## 📋 Features

### Frontend
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Cinematic 3D hero section with floating objects
- ✅ Glass morphism effects
- ✅ Smooth animations with Framer Motion
- ✅ Premium luxury white gradient theme
- ✅ Custom typography (Poppins, Montserrat)

### Pages
- ✅ Home page with hero, services, metrics, projects, testimonials
- ✅ Services overview page
- ✅ Individual service detail pages
- ✅ Portfolio page with filtering
- ✅ Pricing page with comparison table
- ✅ Contact page with form
- ✅ About Us page
- ✅ FAQ page with accordion

### Backend
- ✅ API routes for services, projects, testimonials
- ✅ Contact form with email sending
- ✅ Lead storage in database
- ✅ Prisma ORM with PostgreSQL

### Database Schema
- Users (admin authentication)
- Services
- Projects
- Testimonials
- FAQs
- Blog Posts
- Pricing Packages
- Leads
- Team Members
- Settings

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd arrowhead-digitech
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/arrowhead_digitech?schema=public"
DB_MOCK="false"
JWT_SECRET="replace-with-at-least-32-random-characters"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
EMAIL_FROM="info@arrowheaddigitech.com"
ADMIN_EMAIL="admin@arrowheaddigitech.com"
ADMIN_PASSWORD="admin123"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. Set up the database:
```bash
npx prisma generate
npm run db:migrate:dev
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
arrowhead-digitech/
├── app/
│   ├── about/
│   ├── api/
│   │   ├── contact/
│   │   ├── projects/
│   │   ├── services/
│   │   └── testimonials/
│   ├── case-studies/
│   ├── contact/
│   ├── faq/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── portfolio/
│   ├── pricing/
│   └── services/
│       └── [slug]/
├── components/
│   ├── 3d/
│   ├── layout/
│   └── ui/
├── lib/
│   ├── prisma.ts
│   └── utils.ts
├── prisma/
│   └── schema.prisma
├── public/
├── .env.example
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🎨 Design System

### Colors
- Primary: Blue (#3b82f6)
- Secondary: Cyan (#06b6d4)
- Background: Luxury white gradient
- Text: Slate (#0f172a)

### Typography
- Headings: Montserrat
- Body: Poppins

### Components
- Glass morphism cards
- Gradient buttons
- Animated counters
- 3D floating objects

## 🚢 Deployment

### GitHub
1. Push to GitHub repository
2. Configure GitHub Actions for CI/CD

### Hostinger Node.js Hosting
1. Provision PostgreSQL and set all production environment variables. `DATABASE_URL` and `JWT_SECRET` are mandatory; the JWT secret must contain at least 32 characters. Generate a unique random value and never commit it.

2. Set `DB_MOCK=false`. The application intentionally refuses to start or build with the mock database enabled in production.

Required SMTP settings are `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD`, and `EMAIL_FROM`. Configure them with the production mail provider before enabling contact-form delivery.

3. Apply the Prisma schema against the production database:
```bash
npm run db:migrate
```

For Neon PostgreSQL:
- Set `DATABASE_URL` to the **pooled** connection string (`?sslmode=require&pgbouncer=true`).
- Set `DIRECT_DATABASE_URL` to the **direct** connection string for migrations.

4. Build the project:
```bash
npm run build
```

5. Upload the build and configure the Node.js application to run:
```bash
npm run start
```

The public `GET` routes for services, projects, and testimonials remain readable. Their write operations require a valid admin session cookie and return `401 Unauthorized` otherwise.

## 📊 Performance

- Target: 90+ Lighthouse score
- Optimized images with Next.js Image component
- Code splitting and lazy loading
- Server-side rendering where appropriate
- CSS optimization with Tailwind

## 🔒 Security

- Environment variables for sensitive data
- No built-in or fallback JWT signing secret
- Production startup validation for JWT and database mode
- Authenticated writes for services, projects, testimonials, and uploads
- SQL injection prevention with Prisma
- XSS protection with React
- CSRF protection with Next.js
- Secure authentication with signed, HTTP-only admin session cookies

## 📧 Contact

For support or questions, email: info@arrowheaddigitech.com

## 📄 License

Copyright © 2026 Arrowhead DigiTech. All rights reserved.
