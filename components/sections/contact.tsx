import { contact, profile } from "@/content/portfolio";
import { ContactDialog } from "../contact-dialog";
import { ArrowUpRight, BrandIcon, Mail } from "../icons";
import { reveal, SectionHeading } from "../section-heading";

const links = [
  { kind: "Email", href: `mailto:${profile.email}`, label: profile.email, icon: <Mail size={19} />, external: false },
  { kind: "GitHub", href: profile.github.url, label: profile.github.label, icon: <BrandIcon name="github" size={19} />, external: true },
  { kind: "LinkedIn", href: profile.linkedin.url, label: profile.linkedin.label, icon: <BrandIcon name="linkedin" size={19} />, external: true },
];

export function Contact({ index }: { index: string }) {
  return (
    <section id="contact" className="page-section page-section--band">
      <div className="shell">
        <SectionHeading
          centered
          index={index}
          title={contact.title}
          accent={contact.accent}
          description={contact.description}
          action={<ContactDialog email={profile.email} />}
        />
        <ul className="contact-links mt-7">
          {links.map((link, order) => (
            <li key={link.kind} {...reveal(order + 1)}>
              <a
                href={link.href}
                className="card contact-link h-full"
                data-card
                data-tilt="6"
                {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                <span className="contact-link-icon">{link.icon}</span>
                <span className="block min-w-0">
                  <span className="block text-[0.95rem] font-semibold tracking-tight">{link.kind}</span>
                  <span className="contact-link-text">{link.label}</span>
                </span>
                <ArrowUpRight size={17} className="contact-link-arrow" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
