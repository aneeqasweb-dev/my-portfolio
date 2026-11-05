import { profile } from "@/content/portfolio";
import { CodeScene } from "../code-scene";
import { ArrowDown, ArrowRight, BrandIcon, GraduationCap, Mail } from "../icons";
import { RotatingTitle } from "../rotating-title";
import { SilkCanvas } from "../silk-canvas";
import type { CSSProperties } from "react";

// The hero animates in with CSS alone (.hero-in), so the first thing visitors
// see doesn't wait for JavaScript. `order` staggers the elements.
const stagger = (order: number) => ({ "--d": order }) as CSSProperties;

export function Hero() {
  return (
    <section id="home" className="hero">
      <SilkCanvas mode="hero" />
      <div className="shell hero-grid">
        <div>
          <p className="pill hero-in" style={stagger(0)}>
            <GraduationCap size={16} />
            {profile.badge}
          </p>

          <h1 className="mt-6">
            <span className="hero-greet hero-in" style={stagger(1)}>
              {profile.greeting}
            </span>
            <span className="hero-name">
              <span className="hero-word" style={stagger(2)}>
                <span>{profile.firstName}</span>
              </span>{" "}
              <span className="hero-word" style={stagger(4)}>
                <span>{profile.lastName}</span>
              </span>
            </span>
          </h1>

          <p className="hero-in mt-5 max-w-[34rem] text-lg leading-relaxed text-muted" style={stagger(5)}>
            {profile.tagline}
          </p>

          <div className="hero-in mt-6" style={stagger(6)}>
            <RotatingTitle titles={profile.titles} />
          </div>

          <div className="hero-in hero-actions mt-6 flex flex-wrap gap-3.5" style={stagger(7)}>
            <a href="#projects" className="btn btn-primary" data-magnetic>
              View Projects <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-ghost btn-orbit" data-magnetic>
              Let’s Connect <Mail size={18} />
            </a>
          </div>

          <div className="hero-in hero-social mt-5" style={stagger(8)}>
            <a href={profile.github.url} target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub profile">
              <BrandIcon name="github" size={22} />
            </a>
            <a href={profile.linkedin.url} target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn profile">
              <BrandIcon name="linkedin" size={22} />
            </a>
          </div>

          <div className="hero-in mt-5" style={stagger(9)}>
            <a href="#about" className="scroll-cue">
              <span className="scroll-cue-mouse">
                <ArrowDown size={14} />
              </span>
              Scroll to explore
            </a>
          </div>
        </div>

        <div className="hero-in" style={stagger(5)}>
          <CodeScene />
        </div>
      </div>
    </section>
  );
}
