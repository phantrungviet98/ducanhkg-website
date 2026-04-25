import { ContactForm } from "@/components/ContactForm";
import { PageIntro } from "@/components/Sections";

export default function CareersPage() {
  return (
    <>
      <PageIntro
        eyebrow="Careers"
        title="Join a project team that values discipline on site"
        description="Recruitment listings can later come from Supabase with roles, locations, and application status."
      />
      <section className="section two-column">
        <div className="check-list">
          <p>Site engineer</p>
          <p>Quantity surveyor</p>
          <p>Procurement coordinator</p>
          <p>Project supervisor</p>
        </div>
        <ContactForm source="careers" title="Send your application" />
      </section>
    </>
  );
}
