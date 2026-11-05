import { about } from "@/content/portfolio";
import { traitIcons } from "../icons";
import { Laptop } from "../laptop";
import { reveal, SectionHeading } from "../section-heading";

export function About({ index }: { index: string }) {
  return (
    <section id="about" className="page-section">
      <div className="shell about-layout">
        <div>
          <SectionHeading index={index} title={about.title} accent={about.accent} />
          <p className="mt-6 max-w-[52ch] text-[1.08rem] leading-[1.75] text-muted" {...reveal(1)}>
            <strong className="font-semibold text-text">{about.lead}</strong> {about.body}
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {about.traits.map((trait, order) => {
              const Icon = traitIcons[trait.icon];
              return (
                <li key={trait.label} className="card trait" data-card {...reveal(order + 2)}>
                  <span className="trait-icon">
                    <Icon size={18} />
                  </span>
                  <span>{trait.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <Laptop />
      </div>
    </section>
  );
}
