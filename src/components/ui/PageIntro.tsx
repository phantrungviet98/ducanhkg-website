type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  compact?: boolean;
};

export function PageIntro({ eyebrow, title, description, compact = false }: PageIntroProps) {
  return (
    <section className={`page-intro${compact ? " is-compact" : ""}`}>
      <div className="page-intro-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
