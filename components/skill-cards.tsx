import type { SkillGroup } from "@/content/portfolio";
import { BrandIcon, techIcons } from "./icons";
import { reveal } from "./section-heading";

export function SkillCards({ groups }: { groups: SkillGroup[] }) {
  return (
    <ul className="tech-grid mt-7">
      {groups.map((group, order) => {
        const Icon = techIcons[group.icon];
        return (
          // Doubled so the cards visibly arrive one after another.
          <li key={group.label} {...reveal(order * 2 + 1)}>
            <div className="tech-card">
              <div className="tech-card-head">
                <span className="tech-card-icon">
                  <Icon size={22} />
                </span>
                <h3 className="tech-card-title">{group.label}</h3>
              </div>
              <ul className="tech-chips">
                {group.items.map((item) => (
                  <li key={item.name} className="tech-chip">
                    {item.brand ? <BrandIcon name={item.brand} size={18} /> : <span className="tech-dot" />}
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
