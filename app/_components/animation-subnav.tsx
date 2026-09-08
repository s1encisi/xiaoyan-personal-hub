"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production requires native document navigation. */

import { usePathname } from "next/navigation";
import { animationSections } from "../_data/animation/navigation";

function sectionCurrent(pathname: string, href: string): "page" | "location" | undefined {
  if (pathname === href) return "page";
  if (href !== "/life/animation" && pathname.startsWith(`${href}/`)) return "location";
  if (
    href === "/life/animation/reviews" &&
    pathname.startsWith("/life/animation/") &&
    !pathname.startsWith("/life/animation/recommendations") &&
    !pathname.startsWith("/life/animation/archive") &&
    !pathname.startsWith("/life/animation/timeline")
  ) return "location";
  return undefined;
}

export function AnimationSubnav() {
  const pathname = usePathname();

  return (
    <nav className="animation-subnav" aria-label="动画档案导航">
      <div className="animation-subnav-inner">
        <a
          className="animation-subnav-brand"
          href="/life/animation"
          data-navigation="document"
          aria-current={pathname === "/life/animation" ? "page" : pathname.startsWith("/life/animation/") ? "location" : undefined}
        >
          <span>动画观测站</span>
          <small>ANIMATION ARCHIVE</small>
        </a>
        <div className="animation-subnav-links">
          {animationSections.slice(1).map((section, index) => {
            const current = sectionCurrent(pathname, section.href);
            return (
              <a
                key={section.href}
                href={section.href}
                data-navigation="document"
                aria-current={current}
              >
                <small>{String(index + 1).padStart(2, "0")}</small>
                <span>{section.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
