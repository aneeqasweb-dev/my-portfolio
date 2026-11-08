import { contact, profile } from "@/content/portfolio";
import { ContactForm } from "../contact-form";
import { ArrowUpRight, BrandIcon, Mail, Sparkles } from "../icons";
import { Letters, reveal } from "../section-heading";

const links = [
  { kind: "Email", href: `mailto:${profile.email}`, label: profile.email, icon: <Mail size={19} />, external: false },
  { kind: "LinkedIn", href: profile.linkedin.url, label: profile.linkedin.label, icon: <BrandIcon name="linkedin" size={19} />, external: true },
  { kind: "GitHub", href: profile.github.url, label: profile.github.label, icon: <BrandIcon name="github" size={19} />, external: true },
];

export function Contact() {
  return (
    <section id="contact" className="page-section page-section--band">
      <div className="shell">
        <header className="contact-head" {...reveal(0)}>
          <p className="pill pill--amber">
            <Sparkles size={16} /> {contact.badge}
          </p>
          <h2 className="sec-title contact-title">
            <span className="contact-title-lead">
              <Letters text={contact.title} />
            </span>{" "}
            <span className="sec-accent">
              <Letters text={contact.accent} start={contact.title.replace(/ /g, "").length} />
            </span>
          </h2>
          <span className="contact-rule" aria-hidden="true" />
          <p className="sec-desc">{contact.description}</p>
        </header>

        <div className="contact-grid">
          <div className="card contact-card" data-card {...reveal(1)}>
            <h3 className="contact-card-title">{contact.infoTitle}</h3>
            <ul className="contact-list">
              {links.map((link) => (
                <li key={link.kind}>
                  <a
                    href={link.href}
                    className="contact-item"
                    {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    <span className="contact-item-icon">{link.icon}</span>
                    <span className="min-w-0">
                      <span className="contact-item-label">{link.kind}</span>
                      <span className="contact-item-value">{link.label}</span>
                    </span>
                    <ArrowUpRight size={16} className="contact-item-arrow" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="card contact-card" {...reveal(2)}>
            <ContactForm email={profile.email} />
          </div>
        </div>
      </div>
    </section>
  );
}
