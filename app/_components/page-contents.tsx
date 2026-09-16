"use client";

import { useEffect, useState } from "react";

type ContentsItem = { id: string; label: string };

export function PageContents({ items, label = "本页目录" }: { items: ContentsItem[]; label?: string }) {
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
  return <nav className="page-contents" aria-label={label}><p>{label}</p><ol>{items.map(item => <li key={item.id}><a href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined} onClick={() => setActive(item.id)}>{item.label}</a></li>)}</ol><a className="page-contents__top" href="#top">回到顶部 <span aria-hidden="true">↑</span></a></nav>;
}
