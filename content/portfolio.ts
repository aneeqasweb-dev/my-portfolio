// ─────────────────────────────────────────────────────────────────────────────
// Everything visitors read lives here. Edit this file to update the site;
// you shouldn't need to touch any component to change your details.
// ─────────────────────────────────────────────────────────────────────────────
import type { StaticImageData } from "next/image";
import type { BrandName } from "@/components/brands";
import bazmScreenshot from "./projects/bazm.webp";
import modoHomesScreenshot from "./projects/modo-homes.webp";

const githubHandle = "aneeqasweb-dev";

export const profile = {
  firstName: "Aneeqa",
  lastName: "Pervaiz",
  fullName: "Aneeqa Pervaiz",
  greeting: "Hi, I’m",
  // The animated title under the description cycles through these.
  titles: ["Full Stack Developer", "Computer Science Student"],
  badge: "BS Computer Science · Virtual University",
  tagline:
    "Passionate about building modern web applications with clean code and innovative solutions.",
  footerRole: "Computer Science Student",
  footerNote: "Built with passion in 2026",
  email: "aneeqa.dev@gmail.com",
  github: {
    label: `github.com/${githubHandle}`,
    url: `https://github.com/${githubHandle}`,
    repositories: `https://github.com/${githubHandle}?tab=repositories`,
  },
  linkedin: {
    label: "linkedin.com/in/aneeqapervaiz",
    url: "https://www.linkedin.com/in/aneeqapervaiz",
  },
  // Swap public/resume.pdf for your own file; the button picks it up.
  resumeUrl: "/resume.pdf",
  resumeFileName: "Aneeqa-Pervaiz-Resume.pdf",
};

export const about = {
  title: "About",
  accent: "Me",
  // `lead` is emphasised at the start of the paragraph.
  lead: "I’m Aneeqa Pervaiz,",
  body: "a Computer Science student with a strong interest in full-stack development. I enjoy turning ideas into scalable and user-friendly web applications.",
  traits: [
    { label: "Clean Code", icon: "code" },
    { label: "Problem Solver", icon: "puzzle" },
    { label: "Quick Learner", icon: "bolt" },
    { label: "Team Player", icon: "users" },
  ],
} as const;

export type ProjectArtName = "beatflow";

export type Project = {
  name: string;
  description: string;
  /** Deployed site. While null the card has no live site button. */
  liveUrl: string | null;
  /** Text on the live site button. Defaults to “Live Demo”. */
  liveLabel?: string;
  /** Repository. While null the GitHub button opens your repositories page. */
  repoUrl: string | null;
  /** Removes the GitHub button, for work without a public repository. */
  hideRepo?: boolean;
  /** Shows the card full width, with a larger layout. */
  featured?: boolean;
  /** The label above a featured project's name. Defaults to “Featured project”. */
  badge?: string;
  /** Technologies shown on the card. One with no `brand` shows an amber dot instead of a logo. */
  tech?: { name: string; brand?: BrandName }[];
} & (
  | {
      /**
       * A real screenshot: save it in content/projects, import it at the top of this
       * file, and pass it here. Full-page screenshots scroll inside the card on hover.
       */
      image: StaticImageData;
    }
  | {
      /** An animated illustration, for projects without a screenshot yet. */
      art: ProjectArtName;
    }
);

const projectItems: Project[] = [
  {
    name: "Bazm",
    description:
      "A Pakistan-first fashion e-commerce platform with a complete storefront, wishlist, cart and checkout, plus role-based tools for managing products, orders and inventory. Runs as a demo with a sample catalog and test checkout.",
    image: bazmScreenshot,
    liveUrl: "https://bazm-online-frontend.vercel.app",
    repoUrl: "https://github.com/aneeqasweb-dev/bazm.online",
    featured: true,
    tech: [
      { name: "TypeScript", brand: "typescript" },
      { name: "Firebase", brand: "firebase" },
      { name: "Cloudinary", brand: "cloudinary" },
    ],
  },
  {
    name: "MODO Homes",
    description:
      "A live e-commerce store for premium bath and kitchen fixtures, delivering across Pakistan, with a separate admin panel for managing products. Shoppers can browse, search and save products, check out with cash on delivery and track their orders, and turn on animated water in the showers and taps right on the page.",
    image: modoHomesScreenshot,
    liveUrl: "https://modohomes.pk",
    liveLabel: "Visit Website",
    repoUrl: null,
    hideRepo: true,
    badge: "Live project",
    featured: true,
    tech: [
      { name: "React", brand: "react" },
      { name: "TypeScript", brand: "typescript" },
      { name: "Tailwind CSS", brand: "tailwind" },
      { name: "Firebase", brand: "firebase" },
    ],
  },
  {
    name: "BeatFlow",
    description:
      "A music platform backend with separate listener and artist accounts. Artists upload tracks and build albums, listeners browse them, and it all runs through a REST API with JWT login, hashed passwords, cloud media storage and automated tests.",
    art: "beatflow",
    liveUrl: null,
    repoUrl: "https://github.com/aneeqasweb-dev/Spotify-Application",
    badge: "Music platform",
    featured: true,
    tech: [
      { name: "Node.js", brand: "nodejs" },
      { name: "Express.js", brand: "express" },
      { name: "MongoDB", brand: "mongodb" },
      { name: "JWT Auth" },
    ],
  },
];

export const projects = {
  title: "Projects That",
  accent: "Define My Craft",
  description: "Some of my recent projects that showcase my skills.",
  items: projectItems,
};

// A skill with no `brand` shows an amber dot instead of a logo.
export type SkillGroup = {
  label: string;
  icon: "layout" | "server" | "database" | "wrench" | "lightbulb" | "cap";
  items: { name: string; brand?: BrandName }[];
};

const technologyGroups: SkillGroup[] = [
  {
    label: "Frontend",
    icon: "layout",
    items: [
      { name: "HTML", brand: "html5" },
      { name: "CSS", brand: "css" },
      { name: "JavaScript", brand: "javascript" },
      { name: "TypeScript", brand: "typescript" },
      { name: "React", brand: "react" },
      { name: "Tailwind CSS", brand: "tailwind" },
    ],
  },
  {
    label: "Backend",
    icon: "server",
    items: [
      { name: "Node.js", brand: "nodejs" },
      { name: "Express.js", brand: "express" },
      { name: "REST APIs" },
      { name: "JWT Auth" },
      { name: "Google OAuth", brand: "google" },
    ],
  },
  {
    label: "Databases",
    icon: "database",
    items: [
      { name: "MongoDB", brand: "mongodb" },
      { name: "PostgreSQL", brand: "postgresql" },
    ],
  },
  {
    label: "Tools",
    icon: "wrench",
    items: [
      { name: "Git", brand: "git" },
      { name: "GitHub", brand: "github" },
      { name: "VS Code", brand: "vscode" },
      { name: "Vercel", brand: "vercel" },
      { name: "Claude" },
      { name: "Codex" },
      { name: "WordPress", brand: "wordpress" },
      { name: "Figma", brand: "figma" },
    ],
  },
];

export const technologies = {
  title: "Technologies",
  accent: "I Work With",
  description: "A solid foundation in modern technologies and development tools.",
  groups: technologyGroups,
};

const growthGroups: SkillGroup[] = [
  {
    label: "Core Concepts",
    icon: "lightbulb",
    items: [
      { name: "CRUD" },
      { name: "API Integration" },
      { name: "Debugging" },
      { name: "Computer Networking" },
      { name: "SEO" },
    ],
  },
  {
    label: "Currently Learning",
    icon: "cap",
    items: [
      { name: "Docker", brand: "docker" },
      { name: "Kubernetes", brand: "kubernetes" },
      { name: "Generative AI", brand: "python" },
      { name: "DevOps", brand: "devops" },
    ],
  },
];

export const growth = {
  title: "Knowledge &",
  accent: "Growth",
  description: "The concepts I build on, and what I’m learning next.",
  groups: growthGroups,
};

export const education = {
  title: "My",
  accent: "Education",
  description: "From school to university.",
  items: [
    {
      role: "Bachelor of Science in Computer Science",
      detail: "Virtual University of Pakistan",
      period: "2026 – Present",
    },
    {
      role: "Intermediate (Pre-Medical)",
      detail: "Punjab Group of Colleges",
      period: "2023 – 2025",
      grade: "Grade A+ · 83%",
    },
    {
      role: "Secondary School Certificate (SSC)",
      detail: "Government High School",
      period: "2021 – 2023",
      grade: "Grade A+ · 91%",
    },
  ] as {
    role: string;
    detail: string;
    period: string;
    grade?: string;
  }[],
};

export const contact = {
  title: "Contact",
  accent: "Me",
  description:
    "Let’s discuss opportunities, collaborations or just connect!",
};

// `id` matches each section's anchor. Reorder here only if you also reorder app/page.tsx.
export const navigation = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "technologies", label: "Technologies" },
  { id: "projects", label: "Projects" },
  { id: "growth", label: "Growth" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
