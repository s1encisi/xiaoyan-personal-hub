"use client";
/* eslint-disable @next/next/no-img-element -- Local photographic gallery. */
// Independent Motion implementation of the user-approved bending-gallery interaction.
// No React Bits Pro source is used. See docs/AI_MOTION_REDESIGN.md.
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useMotionEnabled } from "../motion-settings";
import type { GalleryItem } from "./ai-effects";
import "./effects.css";

function BendTile({ item, enabled }: { item: GalleryItem; enabled: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [48, 16, 0, -16, -48]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1, 0.88]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.5, 1, 1, 0.5]);
  return <motion.a ref={ref} href={item.href} className="bend-gallery__tile" style={enabled ? { rotateX, scale, opacity } : undefined}><img src={item.image} alt={item.title} width={1100} height={730} loading="lazy" /><span>{item.title}<b aria-hidden="true">↗</b></span></motion.a>;
}
export function BendGallery({ items }: { items: GalleryItem[] }) {
  const enabled = useMotionEnabled();
  return <div className="bend-gallery" data-effect="Bend Gallery" data-effect-active={enabled}>{items.map(item => <BendTile key={item.href} item={item} enabled={enabled} />)}</div>;
}
