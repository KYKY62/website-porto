import multisite from "../assets/multisite.webp";
import diskominfosuperapp from "../assets/diskominfosuperapp.webp";
import langkatcctv from "../assets/cctv.webp";
import petasakti from "../assets/petasakti.webp";
import langkat from "../assets/portallangkat.webp";
import stamet from "../assets/stamet.webp";
import quran from "../assets/quran.webp";
import mybidan from "../assets/mybidan.webp";
import quizkuy from "../assets/quizkuy.webp";
import getjadwal from "../assets/getJadwal.webp";
import noimage from "../assets/noimage.webp";
import siap from "../assets/siap.webp";
import tracer from "../assets/tracer-study.webp";
import library from "../assets/library.webp";
import akbid from "../assets/akbid.webp";
import marketku from "../assets/marketku.webp";
import siakad from "../assets/siakad_akademi_kebidanan_langkat.webp";
import lpg from "../assets/lpg_hub.webp";

// description: { id, en }. Indonesian is the default locale.
const projects = [
  {
    id: "multisite",
    title: "MultiSite",
    thumbnail: multisite,
    images: [multisite],
    stack: [
      "Laravel",
      "Tailwind CSS",
      "71 Tenant",
      "Google Authenticator",
      "REST API",
    ],
    description: {
      id: "Mengembangkan platform website multi-tenant yang mampu mengelola hingga 71 website Pemerintah Kabupaten Langkat dalam satu codebase dan satu deployment, sehingga pemeliharaan menjadi lebih efisien, terpusat, dan tidak perlu lagi mengelola banyak VPS. Membangun fitur kustomisasi tema yang memungkinkan setiap admin website memilih dan mengatur tampilan website sesuai kebutuhan, sehingga informasi tersaji lebih menarik dan konsisten. Menerapkan Multi-Factor Authentication (MFA) untuk setiap admin website, serta sistem monitoring terpusat yang memungkinkan admin kabupaten memantau website pemerintah dan meninjau log aktivitas secara real time.",
      en: "Developed a multi-tenant website platform supporting the management of up to 71 websites for the Langkat Regency Government within a single codebase and deployment, making maintenance more efficient, centralized, and eliminating the need to manage multiple VPS instances. Developed a theme customization feature that allows each website administrator to select and configure the website’s appearance according to their needs, enabling information to be presented in a more engaging and consistent manner. Implemented Multi-Factor Authentication (MFA) for each website administrator, along with a centralized monitoring system that enables the regency administrator to monitor government websites and review activity logs in real time.",
    },
    link: "https://github.com/KYKY62",
  },
  {
    id: "Diskominfo SuperApp",
    title: "Diskominfo SuperApp",
    thumbnail: diskominfosuperapp,
    images: [diskominfosuperapp],
    stack: ["Flutter", "Supabase", "Google Playstore"],
    description: {
      id: "Merancang dan mengembangkan Diskominfostan SuperApp sebagai platform terintegrasi untuk mendigitalkan layanan internal Dinas Komunikasi, Informatika, Statistik, dan Persandian, mencakup pengelolaan Ruang LCC, permohonan sarana dan prasarana, serta layanan IT Helpdesk. Mengembangkan fitur manajemen kegiatan Ruang LCC yang meliputi laporan peminjaman ruangan, pencatatan kehadiran peserta, dan pembuatan laporan kehadiran otomatis sebagai dokumentasi administrasi resmi. Merilis aplikasi dalam bentuk platform web dan aplikasi Android yang tersedia di Google Play Store, sehingga pengguna dan staf dapat mengaksesnya dengan mudah kapan saja dari berbagai perangkat.",
      en: "Designed and developed the Diskominfostan SuperApp as an integrated platform to digitize internal services within the Department of Communication, Informatics, Statistics, and Encryption, covering LCC Room management, infrastructure and facility requests, and IT Helpdesk services. Developed an LCC Room activity management feature that includes room borrowing reports, participant attendance tracking, and automated attendance report generation as official administrative documentation. Deployed the application as both a web platform and an Android application published on the Google Play Store, providing convenient access for users and staff anytime across multiple devices.",
    },
    link: "https://github.com/KYKY62",
    download:
      "https://play.google.com/store/apps/details?id=go.id.langkatkab.diskominfostan&pcampaignid=web_share",
    website: "https://diskominfostan.langkatkab.go.id",
  },
  {
    id: "Website Langkat",
    title: "Website Langkat",
    thumbnail: langkat,
    images: [langkat],
    stack: ["Laravel", "Vue", "Tailwind CSS"],
    description: {
      id: "Mengembangkan website resmi Pemerintah Kabupaten Langkat sebagai portal informasi dan layanan publik digital yang terpusat, menyajikan informasi kegiatan pemerintahan, berita daerah, pengumuman, layanan publik, serta akses terintegrasi ke website perangkat daerah dan puskesmas. Platform ini juga menyediakan berbagai layanan digital, antara lain e-Lapor, layanan perizinan, e-Pasar, e-SPPT Bapenda, JDIH, serta informasi seputar pemerintahan dan pembangunan daerah. Website ini dirancang untuk memperluas akses masyarakat terhadap informasi dan layanan pemerintah, mendorong transparansi, dan mendukung transformasi digital dalam penyelenggaraan pemerintahan Kabupaten Langkat.",
      en: "Developed the official website of the Langkat Regency Government as a centralized digital information and public service portal, providing information on government activities, regional news, announcements, public services, and integrated access to websites of government agencies and public health centers. The platform also provides various digital services, including e-Lapor, licensing services, e-Pasar, e-SPPT Bapenda, JDIH, and information related to regional government and development. The website is designed to improve public access to government information and services, promote transparency, and support digital transformation in the administration of Langkat Regency.",
    },
    link: "https://github.com/KYKY62",
    website: "https://langkatkab.go.id/",
  },
  {
    id: "Peta Sakti",
    title: "Peta Sakti",
    thumbnail: petasakti,
    images: [petasakti],
    stack: ["Vue", "Tailwind CSS", "MapLibre GL", "REST API"],
    description: {
      id: "PETA SAKTI: Membangun PETA SAKTI, platform web untuk memetakan aset TIK Pemerintah Kabupaten Langkat yang menampilkan sebaran aset per perangkat daerah (OPD) dalam peta interaktif, sehingga pimpinan dapat memantau kondisi aset secara visual dan dari satu tempat. Mengintegrasikan sistem dengan API IAMT/CMDB untuk menyajikan lebih dari 18.500 data rincian barang secara real time, dilengkapi filter berdasarkan tahun dan kondisi aset. Menerapkan Single Sign-On melalui IAMT dengan kontrol akses berbasis peran, sinkronisasi sesi otomatis, dan pembatasan percobaan login, serta setiap perubahan data tercatat atas nama pengguna untuk keperluan audit. Mengoptimalkan performa dan ketersediaan data dengan strategi caching Redis berlapis (data langsung, cache, dan backup), sehingga peta tetap dapat diakses meskipun API sumber sedang lambat atau mengalami gangguan.",
      en: "PETA SAKTI: Built PETA SAKTI, a web platform for mapping the ICT assets of the Langkat Regency Government, displaying the distribution of assets per regional agency (OPD) on an interactive map so that leadership can monitor asset conditions visually and from a single place. Integrated the system with the IAMT/CMDB API to serve more than 18,500 detailed item records in real time, with filters by year and asset condition. Implemented Single Sign-On through IAMT with role-based access control, automatic session synchronization, and login attempt limiting, while every data change is logged under the user’s name for audit purposes. Optimized performance and data availability with a layered Redis caching strategy (live data, cache, and backup), so the map stays accessible even when the source API is slow or experiencing downtime.",
    },
    link: "https://github.com/KYKY62",
    website: "https://petasakti.langkatkab.go.id/",
    youtube: "https://youtu.be/AtV3SYDt1eM?si=TMuUZUtv80VmRaek",
  },
  {
    id: "Langkat CCTV",
    title: "Langkat CCTV",
    thumbnail: langkatcctv,
    images: [langkatcctv],
    stack: ["Vue", "Tailwind CSS", "Shinobi Video API", "REST API"],
    description: {
      id: "Mengembangkan Platform Streaming CCTV Kabupaten Langkat yang memungkinkan masyarakat dan instansi pemerintah terkait memantau kondisi lalu lintas secara real time melalui kamera CCTV yang terpasang di berbagai titik strategis. Mengintegrasikan Shinobi Video API untuk menghadirkan streaming video MJPEG di website, sehingga pengguna dapat menyaksikan tayangan CCTV langsung dengan latensi rendah.",
      en: "Developed the Langkat Regency CCTV Streaming Platform, enabling the public and relevant government agencies to monitor traffic conditions in real time through CCTV cameras installed at various strategic locations. Integrated the Shinobi Video API to deliver MJPEG video streaming on the website, allowing users to access live CCTV footage with low latency.",
    },
    link: "https://github.com/KYKY62",
    website: "https://cctv.langkatkab.go.id/",
  },
  {
    id: "Akademi Kebidanan Langkat",
    title: "Akademi Kebidanan Langkat",
    thumbnail: akbid,
    images: [akbid],
    stack: ["Vue", "Tailwind CSS", "Golang", "REST API"],
    description: {
      id: "Mengembangkan website resmi Akademi Kebidanan Langkat sebagai platform informasi digital yang memuat profil institusi, berita, agenda, galeri, pengumuman, dan informasi penerimaan mahasiswa baru. Website dirancang responsif dan mudah dikelola melalui Content Management System (CMS), sehingga admin dapat memperbarui informasi secara efisien sekaligus meningkatkan aksesibilitas bagi masyarakat. Mengelola deployment beberapa website di lingkungan VPS/Linux, meliputi publikasi aplikasi, konfigurasi layanan, monitoring, dan troubleshooting untuk memastikan layanan tersedia secara andal dan optimal.",
      en: "Developed the official website of Akademi Kebidanan Langkat as a digital information platform featuring institutional profiles, news, events, galleries, announcements, and new student admission information. The website was designed to be responsive and easily managed through a Content Management System (CMS), enabling administrators to efficiently update information while improving accessibility for the public. Managed the deployment of multiple websites in VPS/Linux environments, including application publishing, service configuration, monitoring, and troubleshooting to ensure reliable and optimal service availability.",
    },
    link: "https://github.com/KYKY62",
    website: "https://akbidlangkat.ac.id/",
  },
  {
    id: "SIAKAD Akademi Kebidanan Langkat",
    title: "SIAKAD Akademi Kebidanan Langkat",
    thumbnail: siakad,
    images: [siakad],
    stack: ["Next JS", "Tailwind CSS", "REST API"],
    description: {
      id: "Mengembangkan dan mengimplementasikan Sistem Informasi Akademik (SIAKAD) Akademi Kebidanan Langkat sebagai platform digital terintegrasi untuk mengelola administrasi akademik dan informasi mahasiswa. Sistem ini menyediakan layanan akademik utama, meliputi pengelolaan data mahasiswa, informasi dosen, manajemen mata kuliah, penjadwalan kelas, rekam akademik, nilai, presensi, dan proses administrasi akademik lainnya. Dirancang dengan antarmuka yang responsif dan mudah digunakan untuk meningkatkan aksesibilitas bagi mahasiswa, dosen, dan staf administrasi. Menerapkan Content Management System (CMS) dan fitur administrasi untuk memudahkan pengelolaan data, menyederhanakan alur kerja akademik, dan meningkatkan efisiensi operasional institusi. Mengelola deployment sistem di lingkungan VPS/Linux, meliputi publikasi aplikasi, konfigurasi server, manajemen database, monitoring, pemeliharaan, dan troubleshooting untuk memastikan layanan tersedia secara andal, aman, dan optimal.",
      en: "Developed and implemented the Academic Information System (SIAKAD) for Akademi Kebidanan Langkat as an integrated digital platform to manage academic administration and student information. The system provides essential academic services, including student data management, lecturer information, course management, class scheduling, academic records, grades, attendance, and other academic administration processes. Designed with a responsive and user-friendly interface to improve accessibility for students, lecturers, and administrative staff. Implemented a Content Management System (CMS) and administrative features to facilitate efficient data management, streamline academic workflows, and enhance institutional operational efficiency. Managed system deployment in VPS/Linux environments, including application publishing, server configuration, database management, monitoring, maintenance, and troubleshooting to ensure reliable, secure, and optimal service availability.",
    },
    link: "https://github.com/KYKY62",
    website: "https://siakad.akbidlangkat.ac.id/",
  },
  {
    id: "Library Kebidanan Langkat",
    title: "Library Kebidanan Langkat",
    thumbnail: library,
    images: [library],
    stack: ["Codeigniter 4", "Bootstrap 5", "Mysql"],
    description: {
      id: "Mengembangkan Website Perpustakaan Akademi Kebidanan Langkat untuk mengelola koleksi buku, jurnal, alat praktikum, serta sarana dan prasarana perpustakaan secara terpusat. Menerapkan sistem peminjaman online yang memungkinkan mahasiswa mengajukan dan meminjam aset perpustakaan, sekaligus membantu petugas memantau inventaris, riwayat peminjaman, dan pengembalian secara akurat. Mendigitalkan proses administrasi perpustakaan melalui pelacakan inventaris dan pengelolaan transaksi peminjaman, sehingga akurasi data, efisiensi operasional, dan kemudahan pemantauan bagi petugas perpustakaan meningkat.",
      en: "Developed the Akademi Kebidanan Langkat Library Website to centrally manage book collections, journals, practical equipment, and library facilities and infrastructure. Implemented an online borrowing system that enables students to request and borrow library assets while helping staff accurately monitor inventory, borrowing history, and returns. Digitized library administration processes through inventory tracking and borrowing transaction management, improving data accuracy, operational efficiency, and ease of monitoring for library staff.",
    },
    link: "https://github.com/KYKY62",
    website: "https://library.akbidlangkat.ac.id/",
  },
  {
    id: "Tracer Study Kebidanan Langkat",
    title: "Tracer Study Kebidanan Langkat",
    thumbnail: tracer,
    images: [tracer],
    stack: ["Codeigniter 4", "Bootstrap 5", "Mysql"],
    description: {
      id: "Mengembangkan Website Tracer Study Akademi Kebidanan Langkat sebagai platform untuk mengumpulkan dan mengelola data lulusan serta informasi alumni setelah menyelesaikan pendidikan. Sistem ini mencatat riwayat pekerjaan, kesesuaian pekerjaan dengan latar belakang pendidikan, dan perkembangan karier alumni. Menerapkan sistem kuesioner online dan pengelolaan data alumni secara terpusat, sehingga institusi dapat memantau, mengolah, dan menganalisis data tracer study secara efisien. Mendigitalkan proses tracer study untuk mendukung evaluasi institusi dan peningkatan program pendidikan berdasarkan capaian karier alumni dan kebutuhan dunia kerja.",
      en: "Developed the Akademi Kebidanan Langkat Tracer Study Website as a platform for collecting and managing graduate data and information regarding alumni after completing their education. The system records employment history, job relevance to their educational background, and alumni career development. Implemented an online questionnaire system and centralized alumni data management, enabling the institution to efficiently monitor, process, and analyze tracer study data. Digitized the tracer study process to support institutional evaluation and educational program improvement based on alumni career outcomes and workforce needs.",
    },
    link: "https://github.com/KYKY62",
    website: "https://tracerstudy.akbidlangkat.ac.id/",
  },
  {
    id: "lpg-hub",
    title: "LPG Hub",
    thumbnail: lpg,
    images: [lpg],
    stack: ["Flutter", "Firebase"],
    description: {
      id: "LPG Hub adalah aplikasi pencatatan pelanggan untuk pangkalan LPG. Setiap pangkalan bisa mendata pelanggannya lengkap dengan NIK, identitas, alamat, dan kategori sasaran, lalu melihat ringkasan serta komposisi pelanggan secara real-time. Admin dapat memantau seluruh jaringan pangkalan dan jumlah pelanggan di masing-masing pangkalan dari satu dashboard.",
      en: "LPG Hub is a customer registration application for LPG stations. Each station can register its customers completely with NIK, identity, address, and target category, then view summaries and customer composition in real-time. Admin can monitor the entire network of stations and the number of customers at each station from a single dashboard.",
    },
    link: "https://github.com/KYKY62",
  },
  {
    id: "stamet-medan",
    title: "Stamet Medan",
    thumbnail: stamet,
    images: [stamet],
    stack: ["Flutter", "Firebase"],
    description: {
      id: "Aplikasi cuaca yang memungkinkan pengguna memeriksa kondisi cuaca secara real time dan melihat prakiraan cuaca secara detail, menjadi solusi yang lengkap dan andal untuk selalu mendapatkan informasi cuaca setempat.",
      en: "Weather App that allows users to check real-time weather conditions, view detailed forecasts, offering a comprehensive and reliable solution for staying informed about local weather.",
    },
    link: "https://github.com/KYKY62",
    download:
      "https://play.google.com/store/apps/details?id=com.stamet.medan&pli=1",
  },
  {
    id: "quran-app",
    title: "Quran App",
    thumbnail: quran,
    images: [quran],
    stack: ["Flutter", "Public REST API"],
    description: {
      id: "Aplikasi mobile untuk membaca Al-Qur’an dan mengakses jadwal salat yang akurat, menjadi solusi lengkap untuk menunjang ibadah dan aktivitas keagamaan sehari-hari.",
      en: "Mobile Application that allows users to read the Quran and access accurate prayer times, offering a comprehensive and spiritual solution for daily worship and religious practices.",
    },
    link: "https://github.com/KYKY62/quran_app",
    download: "https://www.mediafire.com/file/yvj1fbvsehnc15u/quran.apk/file",
  },
  {
    id: "marketku",
    title: "MarketKu",
    thumbnail: marketku,
    images: [marketku],
    stack: ["Flutter", "Public REST API", "Firebase"],
    description: {
      id: "Aplikasi Mobile POS yang menerapkan Algoritma Dijkstra untuk optimasi rantai pasok dan rute pengiriman. Fitur ini secara cerdas menghitung rute pengiriman terpendek dan paling efisien dari kasir toko langsung ke pelanggan, sehingga menghemat waktu, menekan biaya, dan meningkatkan kepuasan pelanggan.",
      en: "Our Mobile POS application integrates Dijkstra's Algorithm for supply chain and delivery route optimization. This feature intelligently calculates the shortest and most efficient delivery route from the store checkout directly to the customer, saving time, reducing costs, and boosting customer satisfaction.",
    },
    link: "https://github.com/KYKY62",
    download:
      "https://www.mediafire.com/file/5wcvylcjmy9o54c/MarketKu.apk/file",
  },
  {
    id: "gohealth",
    title: "GoHealth",
    thumbnail: mybidan,
    images: [mybidan],
    stack: ["Flutter", "Firebase"],
    description: {
      id: "Aplikasi mobile yang menyediakan solusi lengkap untuk perawatan ibu dan bayi, dengan fitur konsultasi bersama bidan, chat untuk saran yang personal, belanja obat, dan rujukan klinik.",
      en: "Mobile application that provides a comprehensive solution for maternal and infant care, offering features such as consultation with midwives, chat for personalized advice, medication shopping, and clinic referrals.",
    },
    link: "https://github.com/KYKY62",
  },
  {
    id: "quiz-kuy",
    title: "Quiz Kuy",
    thumbnail: quizkuy,
    images: [quizkuy],
    stack: ["Flutter", "Google Sheets API"],
    description: {
      id: "Platform interaktif bagi siswa untuk mengerjakan kuis. Pengguna dapat masuk menggunakan Nomor Induk Siswa Nasional (NISN), memilih berbagai kuis yang tersedia, dan menjawab soal langsung di aplikasi.",
      en: "Interactive platform for students to take quizzes. Users can log in using their student ID (NISN), select from a variety of quizzes, and answer questions directly in the app.",
    },
    link: "https://github.com/KYKY62",
    download:
      "https://www.mediafire.com/file/s7mr41eg46sjp4u/Quiz_Kuy.apk/file",
  },
  {
    id: "getjadwal",
    title: "GetJadwal",
    thumbnail: getjadwal,
    images: [getjadwal],
    stack: ["Flutter", "Public REST API"],
    description: {
      id: "Aplikasi mobile yang dirancang untuk membantu pengguna mengatur jadwal harian secara efisien. Aplikasi ini menawarkan antarmuka yang mudah digunakan, tempat pengguna dapat masuk, membuat, dan mengelola tugas atau kegiatan harian. GetJadwal memudahkan pengguna untuk tetap teratur dan konsisten menjalankan agenda harian.",
      en: "Mobile application designed to help users manage their daily schedules efficiently. It offers a user-friendly interface where users can log in, create and manage daily tasks or events. GetJadwal makes it easy to stay organized and on track with daily commitments.",
    },
    link: "https://github.com/KYKY62/flutter_GetJadwal",
    download:
      "https://www.mediafire.com/file/9y9ips45lyboe9k/GetJadwal.apk/file",
  },
  {
    id: "siap-audiensi",
    title: "SIAP",
    thumbnail: siap,
    images: [siap],
    stack: ["Laravel", "WhatsApp Gateway"],
    description: {
      id: "Sistem Informasi Audiensi Pimpinan adalah layanan yang memfasilitasi pengajuan permohonan audiensi secara online melalui website ini, sehingga Anda dapat mengakses layanan audiensi tanpa perlu datang langsung ke kantor.",
      en: "Information System Audiensi Pimpinan is a service that facilitates the submission of audience requests online via this website, allowing you to access audience services without the need to visit the office in person.",
    },
    website: "https://siap-audiensi.langkatkab.go.id/",
  },
];

export default projects;
