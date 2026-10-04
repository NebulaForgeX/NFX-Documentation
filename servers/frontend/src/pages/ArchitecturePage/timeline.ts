import type { RefObject } from "react";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import { REVEAL_UNITS } from "./grid";

gsap.registerPlugin(useGSAP, MotionPathPlugin);

const PACKET_SPEED = 170;
export const REDUCED = "(prefers-reduced-motion: no-preference)";
export const TRACE_SECONDS = 0.9;
const UNIT_STEP = 0.22;
const LINES_SECONDS = 1.4;

export function useFlowTimeline(scope: RefObject<HTMLElement | null>, armed: boolean, version: number) {
  const introEnd = useRef(0);

  useGSAP(
    () => {
      const root = scope.current;
      if (!armed || !root) return;
      const media = gsap.matchMedia();
      media.add(REDUCED, () => {
        const tiers = root.querySelectorAll("[data-tier]");
        const units = REVEAL_UNITS.map((ids) =>
          ids.flatMap((id) => Array.from(root.querySelectorAll(`.react-flow__node[data-id="${CSS.escape(id)}"] > *`))),
        ).filter((targets) => targets.length);
        const links = Array.from(root.querySelectorAll<SVGGElement>("[data-link]"));

        const tl = gsap.timeline();
        tl.from(tiers, {
          autoAlpha: 0,
          y: -10,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.06,
          clearProps: "opacity,visibility,transform",
        });
        units.forEach((targets, index) => {
          tl.from(
            targets,
            {
              autoAlpha: 0,
              y: 16,
              scale: 0.97,
              duration: 0.45,
              ease: "power3.out",
              stagger: 0.03,
              clearProps: "opacity,visibility,transform",
            },
            index === 0 ? "-=0.2" : `<${UNIT_STEP}`,
          );
        });

        const linesAt = tl.duration() + 0.15;
        const each = Math.min(0.06, LINES_SECONDS / Math.max(links.length, 1));
        links.forEach((link, index) => {
          const at = linesAt + index * each;
          const strokes = Array.from(link.querySelectorAll<SVGPathElement>("[data-stroke]"));
          strokes.forEach((stroke) => {
            const length = stroke.getTotalLength();
            gsap.set(stroke, { strokeDasharray: length, strokeDashoffset: length });
          });
          tl.to(
            strokes,
            {
              strokeDashoffset: 0,
              duration: 0.8,
              ease: "power2.inOut",
              clearProps: "strokeDasharray,strokeDashoffset",
            },
            at,
          );
          const label = root.querySelector(`[data-edge-label="${CSS.escape(link.dataset.link ?? "")}"]`);
          if (label) tl.from(label, { autoAlpha: 0, duration: 0.3, clearProps: "opacity,visibility" }, at + 0.6);
        });
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
      const start = version === 0 ? introEnd.current : TRACE_SECONDS;
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
