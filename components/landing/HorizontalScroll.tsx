"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import ParticleHero from "./ParticleHero";
import MergedStatsPanel from "./MergedStatsPanel";
import CTAPanel from "./CTAPanel";

/*
  5 discrete steps, one per scroll gesture:
    0  Hero
    1  Merged panel — stats + floating names
    2  Merged panel — names organized into categories
    3  Merged panel — interactive buttons + labels
    4  CTA

  Track has 3 panels × 100vw.
  Steps 1-3 lock the track on the merged panel.
*/

const TOTAL_STEPS = 5;
const SNAP_MS = 450;
const COOLDOWN_MS = 500;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function trackOffsetForStep(step: number, panelW: number) {
  if (step === 0) return 0;
  if (step <= 3) return panelW;
  return panelW * 2;
}

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const versionRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef(0);
  const snappingRef = useRef(false);
  const cooldownRef = useRef(false);

  const [particlePaused, setParticlePaused] = useState(false);
  const [mergedPhase, setMergedPhase] = useState(0);
  const [statsResetKey, setStatsResetKey] = useState(0);
  const [ctaVisible, setCtaVisible] = useState(false);

  /* ── Animate to a step ──────────────────────────────────────── */
  const goToStep = useCallback((step: number, prevStep?: number) => {
    const track = trackRef.current;
    if (!track) return;

    const pW = window.innerWidth;
    const targetOffset = trackOffsetForStep(step, pW);

    // Read current offset
    const m = track.style.transform.match(/translateX\((-?[\d.]+)px\)/);
    const fromOffset = m ? -parseFloat(m[1]) : 0;

    // Update derived state immediately
    setParticlePaused(step >= 1);
    setMergedPhase(step >= 1 && step <= 3 ? step : step > 3 ? 3 : 0);
    // Bump reset key when returning from CTA so counters replay from 0
    if (step <= 3 && (prevStep ?? 0) >= 4) setStatsResetKey((k) => k + 1);
    if (step >= 4) setCtaVisible(true);

    // TopBar
    const topbar = document.getElementById("fs3-topbar");
    if (topbar) {
      topbar.style.opacity = step >= 1 ? "1" : "0";
      topbar.style.pointerEvents = step >= 1 ? "auto" : "none";
    }

    // Hint + version
    if (hintRef.current)
      hintRef.current.style.opacity = step >= 1 ? "0" : "1";
    if (versionRef.current)
      versionRef.current.style.opacity = step >= 1 ? "0" : "1";

    // Progress
    if (progressRef.current)
      progressRef.current.style.width = `${(step / (TOTAL_STEPS - 1)) * 100}%`;

    // If no track movement needed, done
    if (Math.abs(fromOffset - targetOffset) < 2) {
      snappingRef.current = false;
      return;
    }

    // Animate track
    snappingRef.current = true;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / SNAP_MS, 1);
      const offset = fromOffset + (targetOffset - fromOffset) * easeOutCubic(t);
      track.style.transform = `translateX(${-offset}px)`;

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        track.style.transform = `translateX(${-targetOffset}px)`;
        snappingRef.current = false;
      }
    };
    requestAnimationFrame(tick);
  }, []);

  /* ── Wheel / touch handlers ─────────────────────────────────── */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const advance = (dir: 1 | -1) => {
      if (snappingRef.current || cooldownRef.current) return;
      const next = Math.max(0, Math.min(TOTAL_STEPS - 1, stepRef.current + dir));
      if (next === stepRef.current) return;

      const prev = stepRef.current;
      stepRef.current = next;
      cooldownRef.current = true;
      goToStep(next, prev);
      setTimeout(() => {
        cooldownRef.current = false;
      }, COOLDOWN_MS);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta =
        Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      advance(delta > 0 ? 1 : -1);
    };

    let touchStartX = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dx = touchStartX - (e.changedTouches[0]?.clientX ?? touchStartX);
      if (Math.abs(dx) > 40) advance(dx > 0 ? 1 : -1);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [goToStep]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      <div
        ref={trackRef}
        className="flex h-screen"
        style={{ width: "300vw", willChange: "transform" }}
      >
        <ParticleHero paused={particlePaused} />
        <MergedStatsPanel phase={mergedPhase} statsResetKey={statsResetKey} />
        <CTAPanel visible={ctaVisible} />
      </div>

      {/* Version label */}
      <div
        ref={versionRef}
        className="fixed top-8 right-8 transition-opacity duration-500"
      >
        <span
          className="uppercase font-medium tracking-wider"
          style={{ fontSize: 10, color: "var(--text-faint)" }}
        >
          v{process.env.APP_VERSION}
        </span>
      </div>

      {/* Scroll hint */}
      <div
        ref={hintRef}
        className="fixed bottom-8 right-8 flex items-center gap-2 transition-opacity duration-500"
      >
        <span
          className="uppercase font-medium tracking-wider"
          style={{ fontSize: 10, color: "var(--text-faint)" }}
        >
          Scroll to explore
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          style={{ color: "var(--text-faint)" }}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>

      {/* Progress bar */}
      <div
        className="fixed bottom-0 left-0 right-0"
        style={{ height: 2, background: "var(--bg-surface)" }}
      >
        <div
          ref={progressRef}
          style={{
            height: "100%",
            width: "0%",
            background: "#E87722",
            transition: "width 300ms ease-out",
          }}
        />
      </div>
    </div>
  );
}
