"use client";

import { useInView } from "@/lib/use-in-view";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div className={`section-heading fade-up${inView ? " in-view" : ""}`} ref={ref}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}
