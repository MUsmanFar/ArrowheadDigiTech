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
- **Authentication**: NextAuth.js

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
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
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
npx prisma db push
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
1. Build the project:
```bash
npm run build
```

2. Upload files to Hostinger
3. Set environment variables in Hostinger control panel
4. Configure Node.js application
5. Set up PostgreSQL database
6. Run database migrations:
```bash
npx prisma db push
```

## 📊 Performance

- Target: 90+ Lighthouse score
- Optimized images with Next.js Image component
- Code splitting and lazy loading
- Server-side rendering where appropriate
- CSS optimization with Tailwind

## 🔒 Security

- Environment variables for sensitive data
- SQL injection prevention with Prisma
- XSS protection with React
- CSRF protection with Next.js
- Secure authentication with NextAuth.js

## 📧 Contact

For support or questions, email: info@arrowheaddigitech.com

## 📄 License

Copyright © 2026 Arrowhead DigiTech. All rights reserved.
