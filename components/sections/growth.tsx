import { growth } from "@/content/portfolio";
import { SectionHeading } from "../section-heading";
import { SkillCards } from "../skill-cards";

export function Growth({ index }: { index: string }) {
  return (
    <section id="growth" className="page-section page-section--band tech-section">
      <div className="shell">
        <SectionHeading
          index={index}
          title={growth.title}
          accent={growth.accent}
          description={growth.description}
        />
        <SkillCards groups={growth.groups} />
      </div>
    </section>
  );
}
