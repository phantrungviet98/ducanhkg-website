import { importedProjects } from "@/data/imported-projects";
import { getSupabaseServerClient } from "@/lib/supabase";
import type { Project, ProjectStatus } from "@/types/content";

export type ProjectRow = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  status: ProjectStatus;
  image: string;
  summary: string;
  land_area: string | null;
  building_area: string | null;
  total_floor_area: string | null;
  scale: string | null;
  budget: string | null;
  scope: string | null;
  challenge: string | null;
  solution: string | null;
  gallery: { src: string; alt: string }[] | null;
  project_type: "townhouse" | "villa" | "level4" | "commercial";
  province: "kien-giang" | "can-tho" | "other";
  land_area_m2: number;
  budget_billion: number;
  popularity: number;
  published: boolean;
  featured_for_you?: boolean;
  featured_most_viewed?: boolean;
  sort_order: number;
};

export function projectFromRow(row: ProjectRow): Project {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    location: row.location,
    year: row.year,
    status: row.status,
    image: row.image,
    summary: row.summary,
    landArea: row.land_area ?? undefined,
    buildingArea: row.building_area ?? undefined,
    totalFloorArea: row.total_floor_area ?? undefined,
    scale: row.scale ?? undefined,
    budget: row.budget ?? undefined,
    scope: row.scope ?? undefined,
    challenge: row.challenge ?? undefined,
    solution: row.solution ?? undefined,
    gallery: row.gallery ?? [],
    published: row.published,
    featuredForYou: row.featured_for_you ?? importedProjects.find((project) => project.slug === row.slug)?.featuredForYou ?? false,
    featuredMostViewed: row.featured_most_viewed ?? importedProjects.find((project) => project.slug === row.slug)?.featuredMostViewed ?? false,
    filters: {
      type: row.project_type,
      province: row.province,
      landAreaM2: Number(row.land_area_m2 || 0),
      budgetBillion: Number(row.budget_billion || 0),
      popularity: Number(row.popularity || 0),
    },
  };
}

export async function getPublicProjects(): Promise<Project[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return importedProjects;

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data?.length) return importedProjects;
  return (data as ProjectRow[]).map(projectFromRow);
}

export async function getPublicProject(slug: string): Promise<Project | undefined> {
  const projects = await getPublicProjects();
  return projects.find((project) => project.slug === slug);
}
