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
  { title: { fr: "Projets", en: "Projects" }, href: "#projects" },
];

export const languages = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
];
