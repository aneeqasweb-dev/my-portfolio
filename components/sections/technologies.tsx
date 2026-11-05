import { technologies } from "@/content/portfolio";
import { SectionHeading } from "../section-heading";
import { SkillCards } from "../skill-cards";

export function Technologies({ index }: { index: string }) {
  return (
    <section id="technologies" className="page-section page-section--band tech-section">
      <div className="shell">
        <SectionHeading
          index={index}
          title={technologies.title}
          accent={technologies.accent}
          description={technologies.description}
        />
        <SkillCards groups={technologies.groups} />
      </div>
    </section>
  );
}
