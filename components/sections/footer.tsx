import { profile } from "@/content/portfolio";
import { Heart } from "../icons";
import { Logo } from "../logo";
import { SilkCanvas } from "../silk-canvas";

export function Footer() {
  return (
    <footer className="site-footer">
      <SilkCanvas mode="footer" />
      <div className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-4 text-sm">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="flex items-center gap-2.5 font-display font-semibold tracking-tight">
            <Logo /> {profile.fullName}
          </span>
          <span className="hidden h-5 w-px bg-[var(--line-strong)] sm:block" aria-hidden="true" />
          <span className="text-muted">{profile.footerRole}</span>
        </div>
        <p className="flex items-center gap-2 text-muted">
          {profile.footerNote}
          <Heart size={16} className="heart" />
        </p>
      </div>
    </footer>
  );
}
