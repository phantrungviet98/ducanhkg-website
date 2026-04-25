import type { Article, Hero, Project, Service } from "@/types/content";

export const site = {
  name: "Duc Anh KG",
  tagline: "Construction and project delivery",
  phone: "+84 000 000 000",
  email: "hello@ducanhkg.vn",
  address: "Ho Chi Minh City, Vietnam",
  zalo: "#",
  facebook: "#"
};

export const navItems = [
  { label: "About", href: "/ve-chung-toi" },
  { label: "Sectors", href: "/linh-vuc" },
  { label: "Projects", href: "/du-an" },
  { label: "News", href: "/danh-muc-bai-viet/tin-tuc" },
  { label: "Careers", href: "/tuyen-dung" },
  { label: "Contact", href: "/lien-he" }
];

export const homeHero: Hero = {
  eyebrow: "Built for demanding residential and commercial projects",
  title: "A disciplined construction partner for modern Vietnamese spaces",
  description:
    "We plan, coordinate, and deliver homes, offices, and mixed-use buildings with clear communication, structured controls, and careful finishing.",
  image:
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1800&q=80",
  primaryAction: { label: "Start a consultation", href: "/dang-ky-tu-van-ho-tro" },
  secondaryAction: { label: "View projects", href: "/du-an" }
};

export const services: Service[] = [
  {
    title: "Design coordination",
    description:
      "Translate owner goals into practical drawings, scope alignment, and buildable milestones before construction starts."
  },
  {
    title: "Residential construction",
    description:
      "Deliver townhouses, villas, and private residences with site supervision, procurement tracking, and finish control."
  },
  {
    title: "Commercial fit-out",
    description:
      "Build offices, showrooms, and mixed-use interiors with predictable scheduling and clear handover standards."
  },
  {
    title: "Renovation and upgrades",
    description:
      "Assess existing spaces, phase work around operations, and modernize structures with minimal disruption."
  }
];

export const strengths = [
  "Transparent cost and scope tracking",
  "Daily site coordination routines",
  "Documented material and finish approvals",
  "Reliable handover and warranty process"
];

export const projects: Project[] = [
  {
    slug: "urban-family-villa",
    title: "Urban Family Villa",
    category: "Residential",
    location: "Ho Chi Minh City",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
    summary:
      "A contemporary private residence focused on natural light, durable finishes, and calm interior proportions."
  },
  {
    slug: "mixed-use-townhouse",
    title: "Mixed-use Townhouse",
    category: "Residential and retail",
    location: "Kien Giang",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
    summary:
      "A street-facing home with flexible ground-floor business space and private upper-level living areas."
  },
  {
    slug: "compact-office-fitout",
    title: "Compact Office Fit-out",
    category: "Commercial",
    location: "Can Tho",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
    summary:
      "A practical workplace upgrade with acoustic meeting rooms, efficient lighting, and modular team zones."
  }
];

export const articles: Article[] = [
  {
    slug: "planning-a-townhouse-build",
    title: "How to prepare a townhouse project before construction",
    category: "Guide",
    date: "2026-04-12",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
    excerpt:
      "The decisions owners should clarify early: scope, budget buffers, permit timeline, material priorities, and site access."
  },
  {
    slug: "handover-quality-checklist",
    title: "A practical handover checklist for residential projects",
    category: "Quality",
    date: "2026-03-18",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80",
    excerpt:
      "A structured handover reduces disputes and makes warranty responsibilities easier to manage after move-in."
  },
  {
    slug: "choosing-finish-materials",
    title: "Choosing finish materials without losing control of budget",
    category: "Materials",
    date: "2026-02-21",
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=80",
    excerpt:
      "Use approval samples, alternates, and procurement deadlines to keep the final look aligned with the agreed budget."
  }
];
