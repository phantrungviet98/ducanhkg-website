import { PageIntro, ServicesGrid } from "@/components/Sections";
import { services } from "@/data/site";

export default function SectorsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Sectors"
        title="Residential, commercial, renovation, and fit-out work"
        description="Each sector is stored as structured content so it can later be managed from Supabase-backed admin screens."
      />
      <ServicesGrid items={services} />
    </>
  );
}
