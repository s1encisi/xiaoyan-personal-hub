"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production requires native document navigation. */

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigationGroups, siteInfo } from "../_data/site";
import { MotionSettings } from "./motion-settings";

function pathMatches(pathname: string, href: string) {
  return pathCurrentState(pathname, href) !== undefined;
}

function pathCurrentState(pathname: string, href: string): "page" | "location" | undefined {
  if (pathname === href) return "page";
  if (href !== "/" && pathname.startsWith(`${href}/`)) return "location";
  return undefined;
}

function currentMarker(current: "page" | "location" | undefined) {
  if (current === "page") return "当前";
  if (current === "location") return "所在";
  return "↗";
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const headerInnerRef = useRef<HTMLDivElement>(null);
  const desktopNavigationRef = useRef<HTMLElement>(null);
  const desktopContactRef = useRef<HTMLAnchorElement>(null);
  const megaNavigationRef = useRef<HTMLElement>(null);
  const focusMegaOnOpenRef = useRef(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileDialogRef = useRef<HTMLDivElement>(null);
  const mobileDrawerRef = useRef<HTMLElement>(null);
  const mobileCloseRef = useRef<HTMLButtonElement>(null);
  const desktopToggleRefs = useRef(new Map<string, HTMLButtonElement>());

  const activeGroup =
    navigationGroups.find((group) => pathMatches(pathname, group.href)) ??
    navigationGroups.find((group) => group.children.some((child) => pathMatches(pathname, child.href)));
  const activeGroupCode = activeGroup?.code;
  const expandedGroup = navigationGroups.find((group) => group.code === openGroup);

  const restoreDesktopFocus = (code: string | null) => {
    if (!code) return;
    window.requestAnimationFrame(() => desktopToggleRefs.current.get(code)?.focus({ preventScroll: true }));
  };

  const closeDesktopNavigation = (restoreFocus = false) => {
    const code = openGroup;
    focusMegaOnOpenRef.current = false;
    setOpenGroup(null);
    if (restoreFocus) restoreDesktopFocus(code);
  };

  const focusMegaNavigation = () => {
    window.requestAnimationFrame(() => {
      megaNavigationRef.current?.querySelector<HTMLAnchorElement>("a[href]")?.focus();
    });
  };

  const openDesktopNavigation = (code: string, moveFocus: boolean) => {
    focusMegaOnOpenRef.current = moveFocus;
    setOpenGroup(code);
  };

  const closeMobileNavigation = (restoreFocus = false) => {
    if (restoreFocus) {
      if (headerInnerRef.current) headerInnerRef.current.inert = false;
      menuButtonRef.current?.focus({ preventScroll: true });
    }
    setMobileOpen(false);
  };

  const toggleMobileNavigation = () => {
    if (mobileOpen) {
      closeMobileNavigation();
      return;
    }
    setOpenGroup(null);
    setMobileGroup(activeGroup?.code ?? navigationGroups[0]?.code ?? null);
    setMobileOpen(true);
  };

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousScroll = { left: window.scrollX, top: window.scrollY };
    const headerInner = headerInnerRef.current;
    const previousHeaderInert = headerInner?.inert ?? false;
    const backgroundTargets = Array.from(document.body.children).filter(
      (element): element is HTMLElement => element instanceof HTMLElement && element !== headerRef.current,
    );
    const previousInert = backgroundTargets.map((element) => element.inert);
    document.body.style.overflow = "hidden";
    backgroundTargets.forEach((element) => {
      element.inert = true;
    });
    if (headerInner) headerInner.inert = true;
    mobileCloseRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobileNavigation(true);
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = Array.from(
        mobileDrawerRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => element.offsetParent !== null);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.scrollTo({ ...previousScroll, behavior: "instant" });
      backgroundTargets.forEach((element, index) => {
        element.inert = previousInert[index];
      });
      if (headerInner) headerInner.inert = previousHeaderInert;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(width > 1020px)");
    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      const activeElement = document.activeElement;
      const focusMovesToDesktop = event.matches && (
        activeElement === menuButtonRef.current || mobileDialogRef.current?.contains(activeElement)
      );
      const focusMovesToMobile = !event.matches && (
        desktopNavigationRef.current?.contains(activeElement) ||
        megaNavigationRef.current?.contains(activeElement) ||
        activeElement === desktopContactRef.current
      );

      if (focusMovesToMobile) {
        menuButtonRef.current?.focus({ preventScroll: true });
      } else if (focusMovesToDesktop) {
        if (headerInnerRef.current) headerInnerRef.current.inert = false;
        const targetCode = activeGroupCode ?? navigationGroups[0]?.code;
        if (targetCode) desktopToggleRefs.current.get(targetCode)?.focus({ preventScroll: true });
      }

      setMobileOpen(false);
      setOpenGroup(null);
    };
    desktopQuery.addEventListener("change", handleBreakpointChange);
    return () => desktopQuery.removeEventListener("change", handleBreakpointChange);
  }, [activeGroupCode]);

  useEffect(() => {
    if (!openGroup || !focusMegaOnOpenRef.current) return;
    focusMegaOnOpenRef.current = false;
    focusMegaNavigation();
  }, [openGroup]);

  useEffect(() => {
    if (!openGroup) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        const code = openGroup;
        setOpenGroup(null);
        window.requestAnimationFrame(() => desktopToggleRefs.current.get(code)?.focus({ preventScroll: true }));
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpenGroup(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [openGroup]);

  const handleHeaderBlur = () => {
    if (!openGroup) return;
    window.requestAnimationFrame(() => {
      if (!headerRef.current?.contains(document.activeElement)) setOpenGroup(null);
    });
  };

  return (
    <header ref={headerRef} className={`global-header ${pathname === "/" ? "header-cosmic" : pathname.startsWith("/life/animation") ? "header-anime" : pathname === "/life" ? "header-life" : "header-light"}`} onBlur={handleHeaderBlur}>
      <div ref={headerInnerRef} className="header-inner">
        <a
          className="site-brand"
          href="/"
          data-navigation="document"
          aria-label={`${siteInfo.name}的个人网站，返回首页`}
          onClick={() => {
            setOpenGroup(null);
            setMobileOpen(false);
          }}
        >
          <span className="brand-symbol" aria-hidden="true" />
          <span className="brand-copy">
            <strong>{siteInfo.name}</strong>
            <small>Zhezhen Yan</small>
          </span>
        </a>

        <nav ref={desktopNavigationRef} className="desktop-navigation" aria-label="主导航">
          <a
            className={`desktop-home-link${pathname === "/" ? " is-active" : ""}`}
            href="/"
            data-navigation="document"
            aria-current={pathname === "/" ? "page" : undefined}
            onClick={() => setOpenGroup(null)}
          >
            首页
          </a>
          {navigationGroups.map((group) => {
            const active = activeGroup?.code === group.code;
            const expanded = openGroup === group.code;
            const groupCurrent = pathname === group.href ? "page" : active ? "location" : undefined;
            return (
              <div className={`desktop-nav-group${active ? " is-active" : ""}${expanded ? " is-open" : ""}`} key={group.code}>
                <a
                  href={group.href}
                  data-navigation="document"
                  aria-current={groupCurrent}
                >
                  {group.label}
                </a>
                <button
                  ref={(node) => {
                    if (node) desktopToggleRefs.current.set(group.code, node);
                    else desktopToggleRefs.current.delete(group.code);
                  }}
                  type="button"
                  aria-label={`${expanded ? "收起" : "展开"}${group.label}栏目导航`}
                  aria-expanded={expanded}
                  aria-controls={expanded ? `mega-navigation-${group.code}` : undefined}
                  onClick={(event) => {
                    if (expanded) closeDesktopNavigation();
                    else openDesktopNavigation(group.code, event.detail === 0);
                  }}
                  onKeyDown={(event) => {
                    if (event.key !== "ArrowDown") return;
                    event.preventDefault();
                    if (expanded) focusMegaNavigation();
                    else openDesktopNavigation(group.code, true);
                  }}
                >
                  <span aria-hidden="true">⌄</span>
                </button>
              </div>
            );
          })}
        </nav>

        <a
          ref={desktopContactRef}
          className="header-contact"
          href="/contact"
          data-navigation="document"
          aria-current={pathname === "/contact" ? "page" : undefined}
        >
          <span>联系</span><b aria-hidden="true">↗</b>
        </a>

        <MotionSettings />
        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-label={mobileOpen ? "关闭导航" : "打开导航"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={toggleMobileNavigation}
        >
          <span /><span />
        </button>
      </div>

      {expandedGroup && (
        <nav
          ref={megaNavigationRef}
          className="mega-navigation"
          id={`mega-navigation-${expandedGroup.code}`}
          aria-label={`${expandedGroup.label}栏目导航`}
        >
          <div className="mega-navigation-inner">
            <div className="mega-navigation-intro">
              <p className="micro-label">SECTION {expandedGroup.code}</p>
              <a
                href={expandedGroup.href}
                aria-current={pathname === expandedGroup.href ? "page" : activeGroup?.code === expandedGroup.code ? "location" : undefined}
                data-navigation="document"
              >
                <strong>{expandedGroup.label}</strong>
                <span>{expandedGroup.description}</span>
                <b>进入栏目总览 <i aria-hidden="true">→</i></b>
              </a>
            </div>
            <div className="mega-navigation-links">
              {expandedGroup.children.map((child) => {
                const childCurrent = pathCurrentState(pathname, child.href);
                return (
                  <a
                    key={`${expandedGroup.code}-${child.code}`}
                    href={child.href}
                    aria-current={childCurrent}
                    data-navigation="document"
                  >
                    <span>{child.code}</span>
                    <div><strong>{child.label}</strong><small>{child.description}</small></div>
                    <b aria-hidden="true">{currentMarker(childCurrent)}</b>
                  </a>
                );
              })}
            </div>
            <button className="mega-navigation-close" type="button" onClick={() => closeDesktopNavigation(true)}>
              关闭 <span aria-hidden="true">×</span>
            </button>
          </div>
        </nav>
      )}

      <div
        ref={mobileDialogRef}
        className={`mobile-navigation-shell${mobileOpen ? " is-open" : ""}`}
        inert={!mobileOpen}
        role={mobileOpen ? "dialog" : undefined}
        aria-modal={mobileOpen ? true : undefined}
        aria-labelledby="mobile-navigation-title"
        aria-hidden={!mobileOpen}
      >
        <button className="menu-backdrop" type="button" aria-label="关闭导航" onClick={() => closeMobileNavigation(true)} />
        <nav ref={mobileDrawerRef} id="mobile-navigation" className="mobile-navigation" aria-label="移动端导航">
          <div className="mobile-navigation-head">
            <div><p>EXPLORE</p><strong id="mobile-navigation-title">网站导航</strong></div>
            <button ref={mobileCloseRef} type="button" aria-label="关闭导航" onClick={() => closeMobileNavigation(true)}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <a
            className={`mobile-home-link${pathname === "/" ? " is-active" : ""}`}
            href="/"
            data-navigation="document"
            aria-current={pathname === "/" ? "page" : undefined}
            onClick={() => closeMobileNavigation(true)}
          >
            <span>首页</span><small>00</small>
          </a>
          <div className="mobile-navigation-groups">
            {navigationGroups.map((group) => {
              const active = activeGroup?.code === group.code;
              const expanded = mobileGroup === group.code;
              const groupCurrent = pathname === group.href ? "page" : active ? "location" : undefined;
              return (
                <section className={`${active ? "is-active" : ""}${expanded ? " is-open" : ""}`} key={group.code}>
                  <div className="mobile-group-heading">
                    <a
                      href={group.href}
                      aria-current={groupCurrent}
                      data-navigation="document"
                    >
                      <small>{group.code}</small><span>{group.label}</span>
                    </a>
                    <button
                      type="button"
                      aria-label={`${expanded ? "收起" : "展开"}${group.label}栏目`}
                      aria-expanded={expanded}
                      aria-controls={`mobile-group-${group.code}`}
                      onClick={() => setMobileGroup(expanded ? null : group.code)}
                    >
                      <span aria-hidden="true">+</span>
                    </button>
                  </div>
                  <div className="mobile-group-links" id={`mobile-group-${group.code}`} hidden={!expanded}>
                    <p>{group.description}</p>
                    {group.children.map((child) => {
                      const childCurrent = pathCurrentState(pathname, child.href);
                      return (
                        <a
                          key={`${group.code}-${child.code}`}
                          href={child.href}
                          aria-current={childCurrent}
                          data-navigation="document"
                        >
                          <small>{child.code}</small><span>{child.label}</span><b aria-hidden="true">{currentMarker(childCurrent)}</b>
                        </a>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
          <div className="mobile-nav-note">研究复杂的问题，也认真过具体的生活。</div>
        </nav>
      </div>
    </header>
  );
}
