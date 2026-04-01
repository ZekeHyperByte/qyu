# Seltronik Website

Seltronik Website is a modern, responsive, and interactive web application built with Next.js (Pages Router) and Supabase. It serves as the official company portal, showcasing products, certificates, and company information, while providing a restricted product catalog for registered users and an administrative dashboard for content management.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React, TypeScript) - Utilizing the Pages Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **UI Components**: [Headless UI](https://headlessui.com/), [React Icons](https://react-icons.github.io/react-icons/)
- **Database & Authentication**: [Supabase](https://supabase.com/) (PostgreSQL)
- **State Management & Data Fetching**: React Context API, custom hooks

## ✨ Key Features

- **Public Landing Pages**: Beautifully animated Home, About (Tentang), Contact (Kontak), and Certificates (Sertifikat) pages.
- **Tiered Product Access**: 
  - Guests can view product categories and blurred mockups.
  - Registered and approved users gain access to full product specifications, features, real images, and downloadable catalogs.
- **User Authentication**: Secure login, registration, and password recovery powered by Supabase Auth.
- **Admin Dashboard**: A protected area for administrators to manage:
  - Products (CRUD operations)
  - Certificates
  - User approvals and roles
  - Contact messages
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.

## 📁 Project Structure

```
seltronik-website/
├── components/       # Reusable React components (UI, Auth, Products, Layout)
├── contexts/         # React Context providers (Auth, Theme, Error)
├── database/         # Supabase SQL setup and migration scripts
├── hooks/            # Custom React hooks (useAuth, useGSAP, etc.)
├── lib/              # Utility functions and Supabase client configuration
├── pages/            # Next.js Pages Router (Public pages, Auth, Admin)
├── public/           # Static assets (Images, Videos, Icons, Catalogs)
├── services/         # API abstraction layer for Supabase operations
├── styles/           # Global CSS and Tailwind directives
└── types/            # TypeScript interface and type definitions
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, pnpm, or bun
- A Supabase account and project

### Environment Setup

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Set up your Supabase project as detailed in `SUPABASE_SETUP.md`. Run the SQL scripts found in the `database/` folder to create the necessary tables and policies.

3. Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

### Running the Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🔒 Authentication & Roles

The system uses two primary roles managed via the `user_profiles` table in Supabase:
- **customer**: Standard authenticated users who can view full product details.
- **admin**: Privileged users who can access the `/admin/*` routes to manage the website's content.

To create your first admin account, register normally and then manually update your user role to `'admin'` directly in the Supabase Table Editor.

## 🚢 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com). Connect your GitHub repository to Vercel and ensure you add the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the Vercel Environment Variables.
