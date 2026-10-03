import type { RefObject } from "react";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(useGSAP, MotionPathPlugin);

const PACKET_SPEED = 170;
const REDUCED = "(prefers-reduced-motion: no-preference)";

export function useFlowTimeline(scope: RefObject<HTMLElement | null>, armed: boolean, version: number) {
  const introEnd = useRef(0);

  useGSAP(
    () => {
      const root = scope.current;
      if (!armed || !root) return;
      const media = gsap.matchMedia();
      media.add(REDUCED, () => {
        const tiers = root.querySelectorAll("[data-tier]");
        const groups = root.querySelectorAll("[data-group]");
        const blocks = root.querySelectorAll("[data-block]");
        const lines = Array.from(root.querySelectorAll<SVGPathElement>("[data-draw]"));

        const tl = gsap.timeline();
        tl.from(tiers, {
          autoAlpha: 0,
          y: -10,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.08,
          clearProps: "opacity,visibility,transform",
        });
        tl.from(
          groups,
          {
            autoAlpha: 0,
            scale: 0.98,
            duration: 0.5,
            ease: "power2.out",
            stagger: { amount: 0.5 },
            clearProps: "opacity,visibility,transform",
          },
          "<0.1",
        );
        tl.from(
          blocks,
          {
            autoAlpha: 0,
            y: 14,
            scale: 0.96,
            duration: 0.45,
            ease: "power3.out",
            stagger: { amount: 0.9 },
            clearProps: "opacity,visibility,transform",
          },
          "-=0.4",
        );

        lines.forEach((line) => {
          const length = line.getTotalLength();
          gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        });
        tl.to(
          lines,
          {
            strokeDashoffset: 0,
            duration: 0.9,
            ease: "power2.inOut",
            stagger: { amount: 1.2 },
            onComplete: () => {
              gsap.set(lines, { clearProps: "strokeDasharray,strokeDashoffset" });
            },
          },
          "-=0.3",
        );
        introEnd.current = tl.duration();
      });
      return () => media.revert();
    },
    { scope, dependencies: [armed] },
  );

  useGSAP(
    () => {
      const root = scope.current;
      if (!armed || !root) return;
      const start = version === 0 ? introEnd.current : 0;
      const media = gsap.matchMedia();
      media.add(REDUCED, () => {
        root.querySelectorAll<SVGCircleElement>("[data-packet]").forEach((packet, index) => {
          const path = packet.parentElement?.querySelector<SVGPathElement>("[data-draw]");
          if (!path) return;
          const delay = start + (index % 12) * 0.25;
          gsap.to(packet, { opacity: 1, duration: 0.2, delay });
          gsap.to(packet, {
            motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
            duration: Math.max(1.4, path.getTotalLength() / PACKET_SPEED),
            ease: "none",
            repeat: -1,
            repeatDelay: 0.6,
            delay,
          });
        });
      });
      return () => media.revert();
    },
    { scope, dependencies: [armed, version] },
  );
}
