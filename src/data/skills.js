/**
 * SKILLS - edit this file only; the Skills section updates automatically.
 *
 * level:  "core"        -> I use it regularly / can build with it confidently
 *         "comfortable" -> used in projects, still growing
 *         "learning"    -> currently learning / basics
 *
 * Be honest with the levels - recruiters often ask about anything listed here.
 * To add a skill: add  { name: "...", icon: SomeIcon, color: "#hex", level: "core" }  in a category.
 * Icons come from react-icons: https://react-icons.github.io/react-icons/
 */
import { FaGift, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaBootstrap, FaPython, FaAws, FaServer, FaBrain, FaProjectDiagram, FaLanguage, FaFilter } from "react-icons/fa";
import {
  SiJavascript,SiMapbox , SiCloudinary, SiMongodb, SiPostgresql, SiExpress, SiTailwindcss, SiScikitlearn, SiKubernetes, SiApachekafka,
  SiGit, SiGithub, SiGreensock, SiThreedotjs, SiFramer, SiNumpy, SiPandas, SiCplusplus, SiDocker,
  SiLinux, SiVercel, SiRender, SiGrafana, SiPrometheus, SiOpentelemetry, SiSocketdotio, SiWebrtc,SiJsonwebtokens, SiK6, SiJaeger
} from "react-icons/si";

export const LEVELS = {
  core: { label: "Core", dot: "bg-[#4fe3ff]" },
  comfortable: { label: "Comfortable", dot: "bg-emerald-400" },
  learning: { label: "Learning", dot: "bg-amber-400" },
};

export const skillCategories = [
  {
    id: "frontend",
    title: "Frontend & Motion",
    subtitle: "Interfaces, animation and 3D on the web",
    skills: [
      { name: "HTML5", icon: FaHtml5, color: "#e34f26", level: "core" },
      { name: "CSS3", icon: FaCss3Alt, color: "#1572b6", level: "core" },
      { name: "JavaScript", icon: SiJavascript, color: "#f7df1e", level: "core" },
      { name: "React.js", icon: FaReact, color: "#61dafb", level: "core" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38bdf8", level: "core" },
      { name: "Bootstrap", icon: FaBootstrap, color: "#7952b3", level: "comfortable" },
      { name: "GSAP", icon: SiGreensock, color: "#88ce02", level: "comfortable" },
      { name: "Framer Motion", icon: SiFramer, color: "#ffffff", level: "comfortable" },
      { name: "Three.js", icon: SiThreedotjs, color: "#ffffff", level: "learning" },
      { name: "React Three Fiber", icon: FaReact, color: "#61dafb", level: "learning" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Databases",
    subtitle: "APIs, auth, real-time and data",
    skills: [
      { name: "Node.js", icon: FaNodeJs, color: "#339933", level: "core" },
      { name: "Express.js", icon: SiExpress, color: "#ffffff", level: "core" },
      { name: "MongoDB", icon: SiMongodb, color: "#47a248", level: "core" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", level: "comfortable" },
      { name: "jwt", icon: SiJsonwebtokens, color: "#8e20aa", level: "comfortable" },
      { name: "Socket.io", icon: SiSocketdotio, color: "#ffffff", level: "comfortable" },
      { name: "WebRTC", icon: SiWebrtc, color: "#ef4444", level: "comfortable" },
      { name: "Mapbox", icon: SiMapbox, color: "#068116", level: "comfortable" },
      { name: "Cloudinary", icon: SiCloudinary, color: "#4488ef", level: "comfortable" },
    ],
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    subtitle: "Intelligent systems & predictive models",
    skills: [
      { name: "Python", icon: FaPython, color: "#3776ab", level: "core" },
      { name: "NumPy", icon: SiNumpy, color: "#4dabcf", level: "comfortable" },
      { name: "Pandas", icon: SiPandas, color: "#e70488", level: "comfortable" },
      { name: "Scikit-learn", icon: SiScikitlearn, color: "#f7931e", level: "comfortable" },
      { name: "Data Preprocessing", icon: FaFilter, color: "#cbd5e1", level: "comfortable" },
      { name: "supervised & unsupervised learning", icon: FaBrain, color: "#b97e39", level: "comfortable" },
      { name: "Reinforcement Learning", icon: FaGift, color: "#b97e39", level: "comfortable" },
    ],
  },
  {
    id: "dsa",
    title: "DSA & Languages",
    subtitle: "Problem solving and core CS",
    skills: [
      { name: "C++", icon: SiCplusplus, color: "#00599c", level: "core" },
      { name: "Data Structures", icon: FaProjectDiagram, color: "#4fe3ff", level: "core" },
      { name: "Algorithms", icon: FaProjectDiagram, color: "#4fe3ff", level: "core" },
      { name: "JavaScript", icon: SiJavascript, color: "#f7df1e", level: "core" },
      { name: "Python", icon: FaPython, color: "#3776ab", level: "comfortable" },
    ],
  },
  {
    id: "devops",
    title: "Tools & DevOps",
    subtitle: "Shipping, deploying and observing",
    skills: [
      { name: "Git & GitHub", icon: SiGit, color: "#f05032", level: "core" },
      { name: "Vercel", icon: SiVercel, color: "#ffffff", level: "comfortable" },
      { name: "Render", icon: SiRender, color: "#46e3b7", level: "comfortable" },
      { name: "Docker", icon: SiDocker, color: "#2496ed", level: "learning" },
      { name: "Kubernetes", icon: SiKubernetes, color: "#326ce5", level: "learning" },
      { name: "Grafana", icon: SiGrafana, color: "#f46800", level: "learning" },
      { name: "Prometheus", icon: SiPrometheus, color: "#e6522c", level: "learning" },
      { name: "Apache Kafka", icon: SiApachekafka, color: "#ffffff", level: "learning" },
      { name: "OpenTelemetry", icon: SiOpentelemetry, color: "#f5a800", level: "learning" },
      { name: "Jaeger", icon: SiJaeger, color: "#ffc107", level: "learning" },
      { name: "K6", icon: SiK6, color: "#00b4ff", level: "learning" },
    ],
  },
];
