export type PageKey =
  | "home"
  | "about"
  | "sectors"
  | "projects"
  | "news"
  | "careers"
  | "contact"
  | "cooperation"
  | "consultation";

export type Hero = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  video?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  image: string;
  summary: string;
};

export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
};

export type Service = {
  title: string;
  description: string;
};
