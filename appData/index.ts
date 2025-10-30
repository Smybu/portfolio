// Data for portfolio
import {
  CIcon,
  DatabaseIcon,
  JavaIcon,
  JavaScriptIcon,
  NextjsIcon,
  NodejsIcon,
  PhpIcon,
  PythonIcon,
  ReactIcon,
  TailwindCSS,
  TypescriptIcon,
} from "../utils/icons";

// Project Data
export const projects = [
  {
    priority: 1,
    title: "Project Alpha",
    shortDescription:
      "A groundbreaking project that revolutionizes the way we approach technology. Built with cutting-edge tools for maximum efficiency, it sets new industry standards.",
    cover:
      "https://images.unsplash.com/photo-1585282263861-f55e341878f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    livePreview: "https://example.com/alpha",
    type: "Client Work 🙍‍♂️",
    siteAge: "1 month old",
  },
  {
    priority: 2,
    title: "Project Beta",
    shortDescription:
      "Project Beta is a static technical blog site built with GatsbyJS. I share tips on topics like building reusable components in React, explaining JavaScript methods and concepts, Node.js scripts, and more.",
    cover:
      "https://plus.unsplash.com/premium_photo-1663040328859-48bddaa9dfeb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    livePreview: "https://example.com/beta",
    visitors: "8K Visitors",
    earned: "$400 Earned",
  },
  {
    priority: 3,
    title: "Project Epsilon",
    shortDescription:
      "A collection of engaging coding challenges designed to help developers improve their ReactJS skills by writing functional business logic. Your task is to make it functional by writing business logic, to improve your frontend skills",
    cover:
      "https://plus.unsplash.com/premium_photo-1661700152890-931fb04588e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    type: "Free 🔥",
    livePreview: "https://example.com/epsilon",
    githubLink: "https://github.com/example/ReactJS-Coding-Challenges",
    githubStars: "40 Stars",
    numberOfSales: "138 Sales",
  },
  {
    priority: 4,
    title: "Ejucationzz",
    shortDescription:
      "Ejucationzz is a directory site I created for myself using Next.js. On Ejucationzz, you can find free and paid online and offline courses available in Pakistan. 14 academies and 12 main categories, each with subcategories, have been listed. Ejucationzz is a directory site I created for myself using Next.js. On Ejucationzz, you can find free and paid online and offline courses available in Pakistan. 14 academies and 12 main categories, each with subcategories, have been listed.",
    cover:
      "https://images.unsplash.com/photo-1527334919515-b8dee906a34b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "New 🔥",
    livePreview: "https://example.com/Ejucationzz",
    siteAge: "4 months old",
    visitors: "100 Visitors",
    githubLink: "",
    earned: "",
  },
];

export const skillData = [
  {
    icon: JavaScriptIcon,
    title: "JavaScript",
    shortDescription: "Javascript, Typescript, Next.js, React.js, Node.js",
    stars: 5,
  },
  {
    icon: JavaIcon,
    title: "Java",
    shortDescription: "Java, Spring Boot, Hibernate, JavaFX",
    stars: 4,
  },
  {
    icon: DatabaseIcon,
    title: "Databases",
    shortDescription: "MySQL, PostgreSQL, MongoDB, SQLite, Redis",
    stars: 4,
  },
  {
    icon: PhpIcon,
    title: "PHP",
    shortDescription: "PHP, Laravel, Symfony, CodeIgniter, PHPUnit",
    stars: 3,
  },
  {
    icon: PythonIcon,
    title: "Python",
    shortDescription: "Python, Django, Flask, FastAPI, Pandas",
    stars: 3,
  },
  {
    icon: CIcon,
    title: "C",
    shortDescription: "C, C++, C#, .NET, Qt, Boost.Asio, Unity",
    stars: 2,
  },
];

export const languageList = [
  {
    name: "JavaScript",
    icon: JavaScriptIcon,
  },
  {
    name: "TypeScript",
    icon: TypescriptIcon,
  },
  {
    name: "React.js",
    icon: ReactIcon,
  },
  {
    name: "Next.js",
    icon: NextjsIcon,
  },
  {
    name: "Node.js",
    icon: NodejsIcon,
  },
  {
    name: "Tailwind CSS",
    icon: TailwindCSS,
  },
];

export const footerLinks = [
  { title: { fr: "Accueil", en: "Home" }, href: "#" },
  { title: { fr: "Expériences", en: "Experiences" }, href: "#experiences" },
  { title: { fr: "Compétences", en: "Skills" }, href: "#skills" },
  { title: { fr: "Etudes", en: "Studies" }, href: "#studies" },
];

export const languages = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
];
