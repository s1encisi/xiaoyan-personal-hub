"use client";

import { useEffect, useState } from "react";
import LineSidebar from "./react-bits-v2/LineSidebar";
import { useMotionEnabled } from "./motion-settings";

type ContentsItem = { id: string; label: string };

export function PageContents({ items, label = "本页目录" }: { items: ContentsItem[]; label?: string }) {
  const enabled = useMotionEnabled();
  const [active, setActive] = useState(items[0]?.id ?? "");
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-110px 0px -55% 0px", threshold: 0 });
    for (const item of items) {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [items]);
  return <nav className="page-contents" aria-label={label}><p>{label}</p><div data-effect="Line Sidebar" data-effect-active={enabled}>{enabled ? <LineSidebar items={items.map(item => item.label)} hrefs={items.map(item => "#" + item.id)} activeIndex={items.findIndex(item => item.id === active)} onItemClick={index => setActive(items[index].id)} accentColor="#2668a2" textColor="#405e79" markerColor="#b9cee0" markerLength={18} maxShift={7} itemGap={8} fontSize={0.9} showIndex={false} /> : <ol>{items.map(item => <li key={item.id}><a href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined} onClick={() => setActive(item.id)}>{item.label}</a></li>)}</ol>}</div><a className="page-contents__top" href="#top">回到顶部 <span aria-hidden="true">↑</span></a></nav>;
}
