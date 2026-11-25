/**
 * PROJECTS - edit this file only; the Projects section updates automatically.
 *
 * ORDER = the order shown on the page (best / most relevant first).
 * The first FEATURED_COUNT projects are shown big on the home page;
 * the rest appear under "View all projects".
 *
 * Fields:
 *   title, subtitle, desc, tech[]      (required)
 *   category   "Full Stack" | "AI / ML" | "DSA" | ...  (used for the filter in "View all")
 *   image      imported image (optional - a gradient card is used if missing)
 *   github     repo URL  (leave "" to hide the button)
 *   live       deployed URL (leave "" to hide the button)
 *
 * To add a project:
 *   1. put its screenshot in src/assets (e.g. mynewproject.jpg) and import it below
 *   2. copy one object below, change the fields
 */
import wanderlust from "../assets/wanderlust.jpg";
import yorsa from "../assets/yorsa.jpg";
import vantra from "../assets/vantra.jpg";
import scar from "../assets/scar.jpg";
import kulprit from "../assets/kulprit.jpg";
import kalix from "../assets/kalix.jpg";

export const FEATURED_COUNT = 3;

export const projects = [
  {
    title: "Wanderlust",
    subtitle: "Airbnb like Full Stack Rental Platform",
    category: "Full Stack",
    image: wanderlust,
    desc: "A full-stack Airbnb-style application. Includes CRUD listings of properties, authentication, reviews, image uploads, validation, and deployment.",
    tech: ["Node.js", "Express", "MongoDB", "EJS", "Cloudinary", "Passport.js", "Mapbox"],
    github: "https://github.com/Sparky-2501/major-project-1-wanderlust",
    live: "https://wanderlust-gns2.onrender.com/listings",
  },
  {
    title: "Yorsa",
    subtitle: "Zoom like Full Stack Real-time Meeting Platform",
    category: "Full Stack",
    image: yorsa,
    desc: "A real-time video conferencing application built using React, Node.js, WebRTC, Socket.io, enabling video calls, screen sharing, and group communication.",
    tech: ["MongoDB","Express.js","React", "Node.js", "WebRTC", "Socket.io", "llm" ],
    github: "https://github.com/Sparky-2501/02-dev-major-project-2-yorsa", 
    live: "https://yorsa.onrender.com/"
  },
  {
    title: "Vantra",
    subtitle: "Uber like Full Stack Ride Hailing Platform",
    category: "Full Stack",
    image: vantra,
    desc: "A full-stack ride hailing application. It includes a distributed architecture with microservices, real-time communication, and a user-friendly interface for booking rides.",
    tech: ["MongoDB","Express.js","React", "Node.js","Microservices"],
    github: "https://github.com/Sparky-2501/02-dev-major-project-3-winston",
    live: "",
  },

  {
    title: "Scar",
    subtitle: "Amazon like e-commerce platform features atomic inventory management",
    category: "Devops",
    image: scar,
    desc: "features atomic inventory management to prevent overselling, dynamic promotional campaigns, role-based access control, secure authentication, real-time sales analytics, and a responsive storefront with advanced animations.",
    tech: ["MERN stack", "Docker", "NGINX"],
    github: "https://github.com/Sparky-2501/02-dev-major-project-5-scar",
    live: "https://scar-8k4z.onrender.com/",
  },

  {
    title: "Kulprit",
    subtitle: "coming soon...",
    category: "Devops",
    image: kulprit,
    desc: "",
    tech: [],
    github: "",
    live: "",
  },

  {
    title: "Kalix",
    subtitle: "a personalized website for interview preparation using local llm(ollama).",
    category: "Devops",
    image: kalix,
    //desc: "a personalized website for interview preparation using local llm(ollama).",
    tech: [],
    github: "",
    live: "",
  },

    // ---- TEMPLATE: copy, uncomment and fill in ----
  // {
  //   title: "My New Project",
  //   subtitle: "One line about what it is",
  //   category: "AI / ML",
  //   image: null,
  //   desc: "2-3 sentences: what problem it solves, how you built it, what you learned.",
  //   tech: ["Python", "FastAPI"],
  //   github: "https://github.com/Sparky-2501/...",
  //   live: "",
  // },
];
