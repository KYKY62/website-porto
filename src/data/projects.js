import stamet from '../assets/stamet.webp';
import quran from '../assets/quran.webp';
import mybidan from '../assets/mybidan.webp';
import quizkuy from '../assets/quizkuy.webp';
import getjadwal from '../assets/getJadwal.webp';
import siap from '../assets/siap.webp';

const projects = [
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
    download: "https://www.mediafire.com/file/5wcvylcjmy9o54c/MarketKu.apk/file",
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
    download: "https://www.mediafire.com/file/s7mr41eg46sjp4u/Quiz_Kuy.apk/file",
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
    download: "https://www.mediafire.com/file/9y9ips45lyboe9k/GetJadwal.apk/file",
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
