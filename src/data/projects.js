import multisite from "../assets/multisite.webp";
import diskominfosuperapp from "../assets/diskominfosuperapp.webp";
import langkat from "../assets/cctv.webp";
import langkatcctv from "../assets/portallangkat.webp";
import stamet from "../assets/stamet.webp";
import quran from "../assets/quran.webp";
import mybidan from "../assets/mybidan.webp";
import quizkuy from "../assets/quizkuy.webp";
import getjadwal from "../assets/getJadwal.webp";
import noimage from "../assets/noimage.webp";
import siap from "../assets/siap.webp";

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
    description:
      "Developed a multi-tenant website platform supporting the management of up to 71 websites for the Langkat Regency Government within a single codebase and deployment, making maintenance more efficient, centralized, and eliminating the need to manage multiple VPS instances. Developed a theme customization feature that allows each website administrator to select and configure the website’s appearance according to their needs, enabling information to be presented in a more engaging and consistent manner. Implemented Multi-Factor Authentication (MFA) for each website administrator, along with a centralized monitoring system that enables the regency administrator to monitor government websites and review activity logs in real time.",
    link: "https://github.com/KYKY62",
  },
  {
    id: "Diskominfo SuperApp",
    title: "Diskominfo SuperApp",
    thumbnail: diskominfosuperapp,
    images: [diskominfosuperapp],
    stack: ["Flutter", "Supabase", "Google Playstore"],
    description:
      "Designed and developed the Diskominfostan SuperApp as an integrated platform to digitize internal services within the Department of Communication, Informatics, Statistics, and Encryption, covering LCC Room management, infrastructure and facility requests, and IT Helpdesk services. Developed an LCC Room activity management feature that includes room borrowing reports, participant attendance tracking, and automated attendance report generation as official administrative documentation. Deployed the application as both a web platform and an Android application published on the Google Play Store, providing convenient access for users and staff anytime across multiple devices.",
    link: "https://github.com/KYKY62",
    download:
      "https://play.google.com/store/apps/details?id=go.id.langkatkab.diskominfostan&pcampaignid=web_share",
    website: "https://diskominfostan.langkatkab.go.id/superapp/",
  },
  {
    id: "Website Langkat",
    title: "Website Langkat",
    thumbnail: langkat,
    images: [langkat],
    stack: ["Laravel", "Vue", "Tailwind CSS"],
    description:
      "Developed the official website of the Langkat Regency Government as a centralized digital information and public service portal, providing information on government activities, regional news, announcements, public services, and integrated access to websites of government agencies and public health centers. The platform also provides various digital services, including e-Lapor, licensing services, e-Pasar, e-SPPT Bapenda, JDIH, and information related to regional government and development. The website is designed to improve public access to government information and services, promote transparency, and support digital transformation in the administration of Langkat Regency.",
    link: "https://github.com/KYKY62",
    website: "https://langkatkab.go.id/",
  },
  {
    id: "Langkat CCTV",
    title: "Langkat CCTV",
    thumbnail: langkatcctv,
    images: [langkatcctv],
    stack: ["Vue", "Tailwind CSS", "Shinobi Video API", "REST API"],
    description:
      "Developed the Langkat Regency CCTV Streaming Platform, enabling the public and relevant government agencies to monitor traffic conditions in real time through CCTV cameras installed at various strategic locations. Integrated the Shinobi Video API to deliver MJPEG video streaming on the website, allowing users to access live CCTV footage with low latency.",
    link: "https://github.com/KYKY62",
    website: "https://cctv.langkatkab.go.id/",
  },
  {
    id: "Akademi Kebidanan Langkat",
    title: "Akademi Kebidanan Langkat",
    thumbnail: noimage,
    images: [noimage],
    stack: ["Vue", "Tailwind CSS", "Golang", "REST API"],
    description:
      "Developed the official website of Akademi Kebidanan Langkat as a digital information platform featuring institutional profiles, news, events, galleries, announcements, and new student admission information. The website was designed to be responsive and easily managed through a Content Management System (CMS), enabling administrators to efficiently update information while improving accessibility for the public. Managed the deployment of multiple websites in VPS/Linux environments, including application publishing, service configuration, monitoring, and troubleshooting to ensure reliable and optimal service availability.",
    link: "https://github.com/KYKY62",
    website: "https://akbidlangkat.ac.id/",
  },
  {
    id: "Library Kebidanan Langkat",
    title: "Library Kebidanan Langkat",
    thumbnail: noimage,
    images: [noimage],
    stack: ["Codeigniter 4", "Bootstrap 5", "Mysql"],
    description:
      "Developed the Akademi Kebidanan Langkat Library Website to centrally manage book collections, journals, practical equipment, and library facilities and infrastructure. Implemented an online borrowing system that enables students to request and borrow library assets while helping staff accurately monitor inventory, borrowing history, and returns. Digitized library administration processes through inventory tracking and borrowing transaction management, improving data accuracy, operational efficiency, and ease of monitoring for library staff.",
    link: "https://github.com/KYKY62",
    website: "https://library.akbidlangkat.ac.id/",
  },
  {
    id: "Tracer Study Kebidanan Langkat",
    title: "Tracer Study Kebidanan Langkat",
    thumbnail: noimage,
    images: [noimage],
    stack: ["Codeigniter 4", "Bootstrap 5", "Mysql"],
    description:
      "Developed the Akademi Kebidanan Langkat Tracer Study Website as a platform for collecting and managing graduate data and information regarding alumni after completing their education. The system records employment history, job relevance to their educational background, and alumni career development. Implemented an online questionnaire system and centralized alumni data management, enabling the institution to efficiently monitor, process, and analyze tracer study data. Digitized the tracer study process to support institutional evaluation and educational program improvement based on alumni career outcomes and workforce needs.",
    link: "https://github.com/KYKY62",
    website: "https://tracerstudy.akbidlangkat.ac.id/",
  },
  {
    id: "stamet-medan",
    title: "Stamet Medan",
    thumbnail: stamet,
    images: [stamet],
    stack: ["Flutter", "Firebase"],
    description:
      "Weather App that allows users to check real-time weather conditions, view detailed forecasts, offering a comprehensive and reliable solution for staying informed about local weather.",
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
    description:
      "Mobile Application that allows users to read the Quran and access accurate prayer times, offering a comprehensive and spiritual solution for daily worship and religious practices.",
    link: "https://github.com/KYKY62/quran_app",
    download: "https://www.mediafire.com/file/yvj1fbvsehnc15u/quran.apk/file",
  },
  {
    id: "marketku",
    title: "MarketKu",
    thumbnail: mybidan,
    images: [mybidan],
    stack: ["Flutter", "Public REST API", "Firebase"],
    description:
      "Mobile application that provides a comprehensive point-of-sale (POS) solution, enabling buyers, owners, and partners to seamlessly manage transactions and payments.",
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
    description:
      "Mobile application that provides a comprehensive solution for maternal and infant care, offering features such as consultation with midwives, chat for personalized advice, medication shopping, and clinic referrals.",
    link: "https://github.com/KYKY62",
  },
  {
    id: "quiz-kuy",
    title: "Quiz Kuy",
    thumbnail: quizkuy,
    images: [quizkuy],
    stack: ["Flutter", "Google Sheets API"],
    description:
      "Interactive platform for students to take quizzes. Users can log in using their student ID (NISN), select from a variety of quizzes, and answer questions directly in the app.",
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
    description:
      "Mobile application designed to help users manage their daily schedules efficiently. It offers a user-friendly interface where users can log in, create and manage daily tasks or events. GetJadwal makes it easy to stay organized and on track with daily commitments.",
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
    description:
      "Information System Audiensi Pimpinan is a service that facilitates the submission of audience requests online via this website, allowing you to access audience services without the need to visit the office in person.",
    website: "https://siap-audiensi.langkatkab.go.id/",
  },
];

export default projects;
