"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

const key = "xiaoyan:motion";
const eventName = "xiaoyan-motion-change";
const reducedQuery = "(prefers-reduced-motion: reduce)";
let memoryPreference: "paused" | "enabled" | null = null;

function subscribe(callback: () => void) {
  const query = window.matchMedia(reducedQuery);
  const handleStorage = (event: StorageEvent) => { if (!event.key || event.key === key) { memoryPreference = null; callback(); } };
  window.addEventListener(eventName, callback);
  window.addEventListener("storage", handleStorage);
  query.addEventListener("change", callback);
  return () => {
    window.removeEventListener(eventName, callback);
    window.removeEventListener("storage", handleStorage);
    query.removeEventListener("change", callback);
  };
}

function systemReduced() { return window.matchMedia(reducedQuery).matches; }
function getEnabled() {
  if (systemReduced()) return false;
  try { return (memoryPreference ?? localStorage.getItem(key)) !== "paused"; } catch { return memoryPreference !== "paused"; }
}

export function useMotionEnabled() {
  return useSyncExternalStore(subscribe, getEnabled, () => false);
}

export function MotionSettings() {
  const enabled = useMotionEnabled();
  const reduced = useSyncExternalStore(subscribe, systemReduced, () => false);

  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "on" : "off";
    const items = Array.from(document.querySelectorAll<HTMLElement>(".u-reveal"));
    if (!enabled || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.remove("is-pending"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.remove("is-pending");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08, rootMargin: "0px 0px -24px" });
    for (const item of items) if (item.getBoundingClientRect().top > innerHeight) {
      item.classList.add("is-pending");
      observer.observe(item);
    }
    return () => observer.disconnect();
  }, [enabled]);

  function toggle() {
    if (reduced) return;
    memoryPreference = enabled ? "paused" : "enabled";
    try { localStorage.setItem(key, memoryPreference); } catch { /* The in-memory preference still works. */ }
    window.dispatchEvent(new Event(eventName));
  }

  return (
    <button className="motion-toggle" type="button" onClick={toggle} aria-pressed={enabled} disabled={reduced}
      aria-label={reduced ? "系统已启用减少动态效果" : enabled ? "暂停动态效果" : "开启动态效果"}
      title={reduced ? "遵循系统的减少动态效果设置" : enabled ? "暂停动态效果" : "开启动态效果"}>
      {enabled ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}<span>{reduced ? "静态" : "动态"}</span>
    </button>
  );
}
