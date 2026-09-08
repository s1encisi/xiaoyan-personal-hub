import type { Viewport } from "next";
import { AnimationSubnav } from "../../_components/animation-subnav";
import "../../animation-system.css";

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#061421",
};

export default function AnimationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="animation-site-shell">
      <AnimationSubnav />
      {children}
    </div>
  );
}
