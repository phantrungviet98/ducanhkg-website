"use client";

import { PageIntro, Strengths } from "@/components/Sections";
import Image from "next/image";
import { useLocale } from "@/lib/locale-context";

export default function AboutPage() {
  const { content } = useLocale();
  const page = content.pages.about;

  return (
    <>
      <PageIntro
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
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
          <p className="eyebrow">{page.profileEyebrow}</p>
          <h2>{page.profileTitle}</h2>
          <p>{page.profileBody}</p>
        </div>
      </section>
      <Strengths items={content.strengths} />
    </>
  );
}
