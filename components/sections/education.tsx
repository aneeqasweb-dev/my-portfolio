import { education } from "@/content/portfolio";
import { BookOpen, GraduationCap, School } from "../icons";
import { reveal, SectionHeading } from "../section-heading";

const levelIcons = { cap: GraduationCap, book: BookOpen, school: School };

export function Education({ index }: { index: string }) {
  return (
    <section id="education" className="page-section page-section--band tech-section">
      <div className="shell">
        <SectionHeading
          index={index}
          title={education.title}
          accent={education.accent}
          description={education.description}
        />
        <ol className="edu-grid mt-7">
          {education.items.map((item, order) => {
            const Icon = levelIcons[item.icon];
            return (
              <li key={item.role} {...reveal(order * 2 + 1)}>
                <article className="tech-card edu-card">
                  <div className="edu-top">
                    <span className="tech-card-icon">
                      <Icon size={22} />
                    </span>
                    <span className="edu-period">{item.period}</span>
                  </div>
                  <p className="edu-level">{item.level}</p>
                  <h3 className="tech-card-title edu-title">{item.role}</h3>
                  <p className="edu-school">{item.detail}</p>
                  <div className="edu-foot">
                    {item.status ? (
                      <span className="edu-status">
                        <i aria-hidden="true" />
                        {item.status}
                      </span>
                    ) : null}
                    {item.grade || item.score ? (
                      <dl className="edu-stats">
                        {item.grade ? (
                          <div>
                            <dt>Grade</dt>
                            <dd>{item.grade}</dd>
                          </div>
                        ) : null}
                        {item.score ? (
                          <div>
                            <dt>Marks</dt>
                            <dd>{item.score}</dd>
                          </div>
                        ) : null}
                      </dl>
                    ) : null}
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
