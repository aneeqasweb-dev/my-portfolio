import Image from "next/image";
import { profile, projects, type Project } from "@/content/portfolio";
import { ArrowRight, ArrowUpRight, BrandIcon } from "../icons";
import { ProjectArt } from "../project-art";
import { reveal, SectionHeading } from "../section-heading";

export function Projects({ index }: { index: string }) {
  return (
    <section id="projects" className="page-section">
      {/* Wider than the other sections: the stacked project cards keep their original size. */}
      <div className="shell shell--wide">
        <div className="sec-row">
          <SectionHeading
            index={index}
            title={projects.title}
            accent={projects.accent}
            description={projects.description}
          />
          <div {...reveal(1)}>
            <a
              href={profile.github.repositories}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-sm"
              data-magnetic
            >
              View All Projects <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <ul className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.items.map((project, order) => (
            <ProjectCard key={project.name} project={project} order={order} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectCard({ project, order }: { project: Project; order: number }) {
  const layout = project.featured ? "project--featured" : "md:last:col-span-2 xl:last:col-span-1";
  const liveLabel = project.liveLabel ?? "Live Demo";

  return (
    <li
      className={`project ${layout}`}
      data-card
      data-tilt={project.featured ? "2" : "4"}
      {...reveal(order + 1)}
    >
      {"image" in project ? (
        <div className="project-media project-media--site">
          <div className="site-bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>{project.liveUrl ? new URL(project.liveUrl).host : project.name}</span>
          </div>
          <div className="site-view">
            <Image
              className="site-shot"
              src={project.image}
              alt={`Screenshot of the ${project.name} website`}
              sizes={
                project.featured
                  ? "(min-width: 80rem) 42rem, (min-width: 48rem) 55vw, 100vw"
                  : "(min-width: 80rem) 25rem, (min-width: 48rem) 50vw, 100vw"
              }
              placeholder="blur"
            />
          </div>
        </div>
      ) : (
        <div className="project-media">
          <ProjectArt name={project.art} />
        </div>
      )}

      <div className="project-body">
        {project.featured ? (
          <span className="project-live">
            <i aria-hidden="true" /> {project.badge ?? "Featured project"}
          </span>
        ) : null}
        <h3 className={`font-semibold tracking-tight ${project.featured ? "text-3xl" : "text-xl"}`}>
          {project.name}
        </h3>
        <p className="project-text mt-2 text-[0.95rem] leading-relaxed text-muted">{project.description}</p>

        {project.tech ? (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Built with">
            {project.tech.map((item) => (
              <li key={item.name} className="chip">
                {item.brand ? <BrandIcon name={item.brand} size={16} /> : <span className="tech-dot" />}
                {item.name}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2.5">
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm" aria-label={`${project.name}: ${liveLabel}`}>
              {liveLabel} <ArrowUpRight size={15} />
            </a>
          ) : null}
          {project.hideRepo ? null : (
            <a
              href={project.repoUrl ?? profile.github.repositories}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-sm"
              aria-label={`${project.name} on GitHub`}
            >
              <BrandIcon name="github" size={15} /> GitHub
            </a>
          )}
        </div>
      </div>
    </li>
  );
}
