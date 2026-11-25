// UI copy per locale. Retro "system" labels (PERSONAL_WORKSPACE.EXE, SYSTEM ONLINE,
// section eyebrows, PROJECT_01, Loading....) stay in English in both languages as
// part of the visual style, so they live in the components, not here.
const name = 'Rizky Akbar Siregar';

const id = {
  nav: {
    main: 'Navigasi utama',
    brand: 'Beranda Rizky',
    home: 'Beranda',
    projects: 'Proyek',
    collection: 'Koleksi',
    language: 'Pilih bahasa',
  },
  footer: {
    tagline: 'Dibuat dengan tujuan. Sedikit sihir piksel.',
    backToTop: 'Kembali ke atas ↑',
  },
  card: {
    previewAlt: (title) => `Pratinjau aplikasi ${title}`,
  },
  home: {
    computerAlt: 'Komputer piksel retro yang menampilkan prompt kode',
    introLine1: 'Mengubah ide menjadi sesuatu yang bisa digunakan.',
    introLine2: 'Saya membangun pengalaman web & mobile yang matang,',
    introLine3: 'satu piksel demi satu piksel.',
    explore: 'Jelajahi proyek',
    downloadCv: 'Unduh CV',
    experienceHeading: 'Pengalaman kerja.',
    current: 'Aktif',
    selectedHeading: 'Dibuat dengan sepenuh hati.',
    allProjects: (count) => `Semua proyek (${count})`,
    contactLine1: 'Punya ide di kepala?',
    contactLine2: 'Ayo wujudkan.',
    github: 'Temukan saya di GitHub',
  },
  projects: {
    heading: 'Proyek web & mobile.',
    lead: 'Kumpulan proyek web, mobile, dan semua yang ada di antaranya.',
  },
  detail: {
    breadcrumb: 'Jejak navigasi',
    github: 'Lihat di GitHub',
    download: 'Unduh Aplikasi',
    website: 'Kunjungi Website',
    demo: 'Tonton Demo',
    heroAlt: (title) => `Antarmuka aplikasi ${title}`,
    galleryAlt: (title, index) => `Tangkapan layar tambahan ${title} ${index}`,
    more: 'Proyek lainnya',
  },
  notFound: {
    heading: 'Belum ada apa-apa di sini.',
    body: 'Halaman mungkin sudah dipindahkan atau alamatnya salah.',
    home: 'Kembali ke beranda',
    explore: 'Jelajahi proyek',
  },
  seo: {
    siteName: `Portofolio ${name}`,
    homeTitle: `${name} | Full-Stack Developer di Indonesia`,
    homeDescription: `Jelajahi portofolio pengembangan web dan mobile ${name}, termasuk proyek Laravel, Vue, Flutter, dan layanan publik di Langkat dan Medan.`,
    projectsTitle: `Proyek Web & Mobile | ${name}`,
    projectsDescription: `Jelajahi proyek web dan mobile karya ${name}: portal pemerintahan, website multi-tenant, aplikasi Flutter, dan platform pendidikan.`,
    projectTitle: (title) => `${title} | Proyek oleh ${name}`,
    notFoundTitle: `Halaman Tidak Ditemukan | ${name}`,
    notFoundDescription: `Halaman ini tidak ditemukan. Jelajahi portofolio serta proyek web dan mobile ${name}.`,
    portfolioAlt: `Portofolio web dan mobile ${name}`,
    projectListName: 'Proyek web dan mobile',
  },
};

const en = {
  nav: {
    main: 'Main navigation',
    brand: 'Rizky home',
    home: 'Home',
    projects: 'Projects',
    collection: 'Collection',
    language: 'Choose language',
  },
  footer: {
    tagline: 'Built with purpose. A little pixel magic.',
    backToTop: 'Back to top ↑',
  },
  card: {
    previewAlt: (title) => `${title} application preview`,
  },
  home: {
    computerAlt: 'Retro pixel computer displaying a code prompt',
    introLine1: 'Turning ideas into things you can use.',
    introLine2: 'I build thoughtful web & mobile experiences,',
    introLine3: 'one pixel at a time.',
    explore: 'Explore projects',
    downloadCv: 'Download CV',
    experienceHeading: 'Where I’ve worked.',
    current: 'Current',
    selectedHeading: 'Made with intention.',
    allProjects: (count) => `All projects (${count})`,
    contactLine1: 'Have an idea in mind?',
    contactLine2: 'Let’s make it real.',
    github: 'Find me on GitHub',
  },
  projects: {
    heading: 'Web & mobile projects.',
    lead: 'A collection of web, mobile, and everything in between.',
  },
  detail: {
    breadcrumb: 'Breadcrumb',
    github: 'View on GitHub',
    download: 'Download App',
    website: 'Visit Website',
    demo: 'Watch Demo',
    heroAlt: (title) => `${title} application interface`,
    galleryAlt: (title, index) => `${title} additional screenshot ${index}`,
    more: 'More projects',
  },
  notFound: {
    heading: 'Nothing here yet.',
    body: 'The page may have moved or the address may be incorrect.',
    home: 'Back to home',
    explore: 'Explore projects',
  },
  seo: {
    siteName: `${name} Portfolio`,
    homeTitle: `${name} | Full-Stack Developer in Indonesia`,
    homeDescription: `Explore ${name}’s web and mobile development portfolio, including Laravel, Vue, Flutter, and public service projects in Langkat and Medan.`,
    projectsTitle: `Web & Mobile Projects | ${name}`,
    projectsDescription: `Browse web and mobile projects by ${name}: government portals, multi-tenant websites, Flutter apps, and education platforms.`,
    projectTitle: (title) => `${title} | Project by ${name}`,
    notFoundTitle: `Page Not Found | ${name}`,
    notFoundDescription: `This page could not be found. Explore ${name}’s portfolio and web and mobile projects.`,
    portfolioAlt: `${name} web and mobile portfolio`,
    projectListName: 'Web and mobile projects',
  },
};

export const messages = { id, en };
