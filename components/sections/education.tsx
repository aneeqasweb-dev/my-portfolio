import { education } from "@/content/portfolio";
import { GraduationCap } from "../icons";
import { reveal, SectionHeading } from "../section-heading";

export function Education({ index }: { index: string }) {
  return (
    <section id="education" className="page-section">
      <div className="shell">
        <SectionHeading
          index={index}
          title={education.title}
          accent={education.accent}
          description={education.description}
        />
        <ul className="edu-grid mt-7">
          {education.items.map((item, order) => (
            <li key={item.role} {...reveal(order * 2 + 1)}>
              <div className="tech-card edu-card">
                <div className="edu-top">
                  <span className="tech-card-icon">
                    <GraduationCap size={22} />
                  </span>
                  <span className="edu-period">{item.period}</span>
                </div>
                <h3 className="tech-card-title">{item.role}</h3>
                <p className="edu-school">{item.detail}</p>
                {item.grade ? <span className="tech-chip edu-grade">{item.grade}</span> : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
