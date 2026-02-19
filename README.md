# Web Portfolio

A modern web portfolio built with absolute greatness, one feature at a time.

## Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) v2.x with Svelte 5
- **Language**: TypeScript
- **Runtime**: [Bun](https://bun.sh/) v1.3+
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4.x
- **Deployment**: [Vercel](https://vercel.com/) (via adapter)

## Project Structure

```
web-portfolio/
├── src/
│   ├── app.css              # Tailwind CSS imports
│   ├── app.d.ts             # TypeScript declarations
│   ├── app.html             # HTML template
│   ├── lib/                 # Shared components and utilities
│   │   ├── assets/          # Static assets (favicon, etc.)
│   │   └── index.ts         # Library exports
│   └── routes/              # SvelteKit routes
│       ├── +layout.svelte   # Root layout with Tailwind
│       └── +page.svelte     # Homepage
├── static/                  # Static files
├── svelte.config.js         # SvelteKit configuration
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── vercel.json             # Vercel deployment config
```

## Development

```bash
# Install dependencies (already done)
bun install

# Start development server
bun run dev

# Open in browser
bun run dev -- --open

# Build for production
bun run build

# Preview production build
bun run preview
```

## Deployment

This project is configured to deploy on Vercel. The adapter is set up in `svelte.config.js`.

To recreate this project:

```bash
bun x sv create --template minimal --types ts --install bun web-portfolio
```

## Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run check` - Type-check the project
- `bun run check:watch` - Type-check in watch mode

---

Built with ❤️ using SvelteKit + Tailwind CSS + Bun
