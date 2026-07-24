import atcsHome from '$lib/assets/atcs-home.webp';
import atcsLiveMonitoring from '$lib/assets/atcs-live-monitoring.webp';
import atcsController from '$lib/assets/atcs-controller.webp';
import atcsFtc from '$lib/assets/atcs-ftc.webp';
import atcsTrafficConfig from '$lib/assets/atcs-traffic-config.webp';
import atcsIntersections from '$lib/assets/atcs-intersections.webp';
import photonicPreview from '$lib/assets/photonic-preview.webp';
import photonicDemo from '$lib/assets/photonic-demo.mp4';
import lawangHome from '$lib/assets/lawang-home.webp';
import lawangEkonomi from '$lib/assets/lawang-ekonomi.webp';
import lawangSosial from '$lib/assets/lawang-sosial.webp';
import lawangPembangunan from '$lib/assets/lawang-pembangunan.webp';
import lawangDetail from '$lib/assets/lawang-detail.webp';
import lawangLogo from '$lib/assets/lawang-logo.webp';
import seltronikComproLoading from '$lib/assets/seltronik-compro-loading.webp';
import seltronikComproBeranda from '$lib/assets/seltronik-compro-beranda.webp';
import seltronikComproTentang from '$lib/assets/seltronik-compro-tentang.webp';
import seltronikComproProduct from '$lib/assets/seltronik-compro-product.webp';
import seltronikComproSertifikasi from '$lib/assets/seltronik-compro-sertifikasi.webp';
import seltronikComproKontak from '$lib/assets/seltronik-compro-kontak.webp';
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
  video?: string;
  gallery?: string[];
  captions?: string[];
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
    img: atcsHome,
    gallery: [atcsHome, atcsLiveMonitoring, atcsController, atcsFtc, atcsTrafficConfig, atcsIntersections],
    captions: [
      'Home Dashboard',
      'Live Monitoring',
      'Controller',
      'FTC (Fixed Time Controller)',
      'Traffic Lane Config',
      'Intersections'
    ],
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
    video: photonicDemo,
    link: ''
  },
  {
    id: 3,
    year: '2024',
    title: 'Mobile App LAWANG',
    subtitle:
      'Offline-first Flutter mobile app delivering statistical data for Semarang City across 10 categories — no internet required.',
    category: 'Mobile / UX Design',
    tags: ['Flutter', 'Dart', 'Material Design', 'fl_chart'],
    industry: 'Government / Public Sector',
    client: 'BPS Kota Semarang',
    img: lawangHome,
    gallery: [lawangHome, lawangEkonomi, lawangSosial, lawangPembangunan, lawangDetail, lawangLogo],
    captions: ['Home Dashboard', 'Ekonomi Category', 'Sosial Category', 'Pembangunan Category', 'Data Detail View', 'App Icon'],
    link: ''
  },
  {
    id: 4,
    year: '2023',
    title: 'Seltronik Company Profile',
    subtitle:
      'Company portal with tiered product access, admin dashboard, and Supabase-powered authentication and content management.',
    category: 'Full-Stack / UI System',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Framer Motion'],
    industry: 'Corporate / SaaS',
    client: 'PT. Seltronik',
    img: seltronikComproBeranda,
    gallery: [
      seltronikComproLoading,
      seltronikComproBeranda,
      seltronikComproTentang,
      seltronikComproProduct,
      seltronikComproSertifikasi,
      seltronikComproKontak
    ],
    captions: ['Loading Screen', 'Homepage', 'About Page', 'Products', 'Certifications', 'Contact Page'],
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
