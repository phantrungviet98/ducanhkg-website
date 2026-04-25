import { PageIntro, Strengths } from "@/components/Sections";
import { strengths } from "@/data/site";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About"
        title="A construction team shaped around clarity, accountability, and finish quality"
        description="This page is structured so company history, leadership, certifications, and operating standards can later be edited from an admin panel."
      />
      <section className="split-section">
        <Image
          className="wide-image"
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80"
          alt=""
          width={1400}
          height={920}
        />
        <div>
          <p className="eyebrow">Company profile</p>
          <h2>Built to keep owners informed at every step</h2>
          <p>
            Duc Anh KG is a placeholder brand for now. The final copy, logo, color system, leadership story, and proof points can be replaced when your brand assets are ready.
          </p>
        </div>
      </section>
      <Strengths items={strengths} />
    </>
  );
}
