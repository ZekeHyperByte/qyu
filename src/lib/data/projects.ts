import atcsPreview from '$lib/assets/atcs-preview.webp';
import photonicPreview from '$lib/assets/photonic-preview.webp';
import lawangBps from '$lib/assets/lawang-bps.webp';
import seltronikCompro from '$lib/assets/seltronik-compro.png';
import medikuPreview from '$lib/assets/mediku-preview.webp';

export type Project = {
  id: number;
  year: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  industry: string;
  client: string;
  img: string;
  link: string;
};

export const projects: Project[] = [
  {
    id: 1,
    year: '2024',
    title: 'Seltronik ATCS',
    subtitle:
      'Adaptive Traffic Control System with multi-instance deployment, real-time monitoring, and IoT device integration for Indonesian cities.',
    category: 'Full-Stack / IoT',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    industry: 'Industrial / Automation',
    client: 'PT. Seltronik',
    img: atcsPreview,
    link: ''
  },
  {
    id: 2,
    year: '2024',
    title: 'Photonic Booth',
    subtitle:
      'Commercial-grade photo booth system with code-based workflow, QRIS payment, multi-channel delivery, and enterprise analytics.',
    category: 'Full-Stack / Systems',
    tags: ['React', 'Fastify', 'Electron', 'SQLite'],
    industry: 'Events / Entertainment',
    client: 'Photonic',
    img: photonicPreview,
    link: ''
  },
  {
    id: 3,
    year: '2024',
    title: 'Lawang BPS',
    subtitle:
      'Offline-first Flutter mobile app delivering statistical data for Semarang City across 10 categories — no internet required.',
    category: 'Mobile / UX Design',
    tags: ['Flutter', 'Dart', 'Material Design', 'fl_chart'],
    industry: 'Government / Public Sector',
    client: 'BPS Kota Semarang',
    img: lawangBps,
    link: ''
  },
  {
    id: 4,
    year: '2023',
    title: 'Seltronik Website',
    subtitle:
      'Company portal with tiered product access, admin dashboard, and Supabase-powered authentication and content management.',
    category: 'Full-Stack / UI System',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Framer Motion'],
    industry: 'Corporate / SaaS',
    client: 'PT. Seltronik',
    img: seltronikCompro,
    link: ''
  },
  {
    id: 5,
    year: '2023',
    title: 'Mediku',
    subtitle:
      'Multi-role healthcare app with AI-assisted diagnostics, health tracking, family profiles, and educational content.',
    category: 'Mobile / Healthcare',
    tags: ['Flutter', 'sqflite', 'fl_chart', 'Flutter Quill'],
    industry: 'Healthcare / Education',
    client: 'PPKO BEM FK',
    img: medikuPreview,
    link: ''
  }
];
