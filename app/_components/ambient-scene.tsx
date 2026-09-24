"use client";

import { useEffect, useRef } from "react";
import { useMotionEnabled } from "./motion-settings";

export type SceneKind = "cosmic" | "anime" | "life" | "research";

/** Decorative light particles; no simulated telemetry or scientific measurements. */
export function AmbientScene({ kind = "cosmic" }: { kind?: SceneKind }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const enabled = useMotionEnabled();

  useEffect(() => {
    const canvas = canvasRef.current;
    const surface = canvas?.parentElement;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !surface || !context) return;
    const fine = matchMedia("(pointer: fine)").matches;
    const total = fine ? (kind === "cosmic" ? 94 : 34) : (kind === "cosmic" ? 35 : 16);
    let seed = 317;
    const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    const particles = Array.from({ length: total }, () => ({ x: random(), y: random(), size: random() * 1.6 + 0.45, phase: random() * 6.28, speed: random() * 0.7 + 0.3 }));
    let width = 0, height = 0, frame = 0, last = 0, visible = true;
    let pointerX = 0, pointerY = 0;
    const color = kind === "life" ? "231,190,106" : kind === "anime" ? "255,223,236" : "180,215,255";

    function draw(time: number) {
      if (!canvas || !context || width < 1 || height < 1) return;
      context.clearRect(0, 0, width, height);
      const t = enabled ? time * 0.00017 : 0;
      for (const particle of particles) {
        const x = (particle.x * width + Math.sin(t * particle.speed + particle.phase) * (kind === "cosmic" ? 13 : 26) + pointerX * particle.speed + width) % width;
        const y = (particle.y * height - t * particle.speed * (kind === "cosmic" ? 2 : 16) + pointerY * particle.speed + height * 10) % height;
        const alpha = 0.23 + Math.sin(t + particle.phase) * 0.13;
        context.fillStyle = `rgba(${color},${alpha})`;
        context.beginPath();
        context.arc(x, y, particle.size * (kind === "life" ? 1.8 : 1), 0, Math.PI * 2);
        context.fill();
      }
      if (enabled && fine) {
        surface?.style.setProperty("--pointer-x", `${pointerX * 0.35}px`);
        surface?.style.setProperty("--pointer-y", `${pointerY * 0.35}px`);
      }
    }
    function loop(time: number) {
      if (time - last > 1000 / 30) { draw(time); last = time; }
      frame = requestAnimationFrame(loop);
    }
    function schedule() {
      cancelAnimationFrame(frame);
      const running = enabled && visible && !document.hidden && document.documentElement.dataset.opening !== "playing";
      canvas?.setAttribute("data-running", String(running));
      if (running) frame = requestAnimationFrame(loop);
    }
    function resize() {
      if (!canvas) return;
      width = surface?.clientWidth ?? 0;
      height = surface?.clientHeight ?? 0;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context?.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0);
    }
    function move(event: PointerEvent) {
      const rect = surface?.getBoundingClientRect();
      if (rect) { pointerX = (event.clientX / innerWidth - 0.5) * 26; pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 18; }
    }
    function leave() { pointerX = 0; pointerY = 0; }
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(surface);
    const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); });
    visibilityObserver.observe(surface);
    if (fine && enabled) { surface.addEventListener("pointermove", move, { passive: true }); surface.addEventListener("pointerleave", leave); }
    document.addEventListener("visibilitychange", schedule);
    window.addEventListener("xiaoyan-opening-change", schedule);
    resize(); schedule();
    return () => {
      cancelAnimationFrame(frame); resizeObserver.disconnect(); visibilityObserver.disconnect();
      surface.removeEventListener("pointermove", move); surface.removeEventListener("pointerleave", leave);
      surface.style.removeProperty("--pointer-x"); surface.style.removeProperty("--pointer-y");
      document.removeEventListener("visibilitychange", schedule);
      window.removeEventListener("xiaoyan-opening-change", schedule);
    };
  }, [enabled, kind]);

  return <canvas ref={canvasRef} className={`ambient-canvas ambient-canvas--${kind}`} aria-hidden="true" data-ambient={kind} />;
}
