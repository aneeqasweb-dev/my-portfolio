import { learning } from "@/content/portfolio";
import { SectionHeading } from "../section-heading";
import { SkillCards } from "../skill-cards";

export function Learning({ index }: { index: string }) {
  return (
    <section id="learning" className="page-section">
      <div className="shell">
        <SectionHeading
          index={index}
          title={learning.title}
          accent={learning.accent}
          description={learning.description}
        />
        <SkillCards groups={learning.groups} />
      </div>
    </section>
  );
}
