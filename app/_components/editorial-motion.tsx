"use client";

import { m, LazyMotion, domAnimation } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { useMotionEnabled } from "./motion-settings";

export function PhotoMotion({ children }: { children: ReactNode }) {
  const enabled = useMotionEnabled();
  const [finePointer, setFinePointer] = useState(false);
  useEffect(() => {
    const query = matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(query.matches);
    const frame = requestAnimationFrame(update);
    query.addEventListener("change", update);
    return () => { cancelAnimationFrame(frame); query.removeEventListener("change", update); };
  }, []);
  return <LazyMotion features={domAnimation} strict><m.div className="photo-motion" initial={false} animate={{ scale: 1 }} whileHover={enabled && finePointer ? { scale: 1.02 } : undefined} transition={{ duration: enabled ? 0.22 : 0, ease: "easeOut" }}>{children}</m.div></LazyMotion>;
}
