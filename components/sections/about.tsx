import { about, aboutStats } from "@/content/portfolio";
import { CountUp } from "../count-up";
import { BrandIcon, traitIcons } from "../icons";
import { Laptop } from "../laptop";
import { reveal, SectionHeading } from "../section-heading";

export function About({ index }: { index: string }) {
  return (
    <section id="about" className="page-section">
      <div className="shell">
        <div className="about-layout">
          <div>
            <SectionHeading index={index} title={about.title} accent={about.accent} />
            <p className="about-lead" {...reveal(1)}>
              <strong>{about.lead}</strong> {about.body}
            </p>
            <p className="about-story" {...reveal(2)}>
              {about.story}
            </p>
            <dl className="about-stats" {...reveal(3)}>
              {aboutStats.map((stat) => (
                <div key={stat.label} className="about-stat">
                  <dt>{stat.label}</dt>
                  <dd>
                    <CountUp value={stat.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="about-visual">
            <Laptop />
            <div className="about-float about-float--study" {...reveal(4)}>
              <div className="about-float-inner">
                <span className="about-float-label">
                  <i aria-hidden="true" />
                  {about.studying.label}
                </span>
                <strong className="about-float-title">{about.studying.title}</strong>
                <span className="about-float-detail">{about.studying.detail}</span>
              </div>
            </div>
            <div className="about-float about-float--stack" {...reveal(5)}>
              <div className="about-float-inner">
                <span className="about-float-label">Core stack</span>
                <ul className="about-logos">
                  {about.coreStack.map((item) => (
                    <li key={item.name} title={item.name}>
                      <BrandIcon name={item.brand} size={20} />
                      <span className="sr-only">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <ul className="about-traits">
          {about.traits.map((trait, order) => {
            const Icon = traitIcons[trait.icon];
            return (
              <li key={trait.label} className="card about-trait" data-card data-tilt="4" {...reveal(order + 2)}>
                <span className="about-trait-icon">
                  <Icon size={20} />
                </span>
                <h3 className="about-trait-title">{trait.label}</h3>
                <p className="about-trait-text">{trait.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
