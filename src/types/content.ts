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
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
};

export type ProjectStatus = "completed" | "in_progress" | "planned";

export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  image: string;
  summary: string;
  status?: ProjectStatus;
  published?: boolean;
  featuredForYou?: boolean;
  featuredMostViewed?: boolean;
  landArea?: string;
  buildingArea?: string;
  totalFloorArea?: string;
  scale?: string;
  budget?: string;
  scope?: string;
  challenge?: string;
  solution?: string;
  gallery?: { src: string; alt: string }[];
  filters?: {
    type: "townhouse" | "villa" | "level4" | "commercial";
    province: "kien-giang" | "can-tho" | "other";
    landAreaM2: number;
    budgetBillion: number;
    popularity: number;
  };
};

export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  body?: string[];
};

export type Video = {
  slug: string;
  title: string;
  description: string;
  image: string;
  href: string;
  duration: string;
};

export type Service = {
  title: string;
  description: string;
};
