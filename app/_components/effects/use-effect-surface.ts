"use client";
import { useRef, useSyncExternalStore } from "react";
import { useInView } from "motion/react";
import { useMotionEnabled } from "../motion-settings";

function subscribe(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  window.addEventListener("xiaoyan-opening-change", callback);
  return () => { document.removeEventListener("visibilitychange", callback); window.removeEventListener("xiaoyan-opening-change", callback); };
}
const foreground = () => !document.hidden && document.documentElement.dataset.opening !== "playing";
const server = () => false;
export function useEffectSurface() {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useMotionEnabled();
  const inView = useInView(ref, { amount: 0.01 });
  const visible = useSyncExternalStore(subscribe, foreground, server);
  return { ref, enabled, active: enabled && inView && visible };
}

const fineQuery = "(hover: hover) and (pointer: fine)";
function subscribeFine(callback: () => void) { const query = window.matchMedia(fineQuery); query.addEventListener("change", callback); return () => query.removeEventListener("change", callback); }
export function useFinePointer() { return useSyncExternalStore(subscribeFine, () => window.matchMedia(fineQuery).matches, server); }
