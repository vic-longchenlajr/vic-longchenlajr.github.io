"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { TOOLS, CATEGORIES, type CategoryKey } from "@/lib/tools";

/* ── Constants ─────────────────────────────────────────────────── */
const CATEGORY_ORDER: CategoryKey[] = [
  "configuration",
  "engineering",
  "resources",
];
const ROW_H = 32;
const CAT_HEADER_H = 28;
const CAT_GAP = 20;
// ORG_LEFT_X computed at runtime from viewport width for centering
const TWEEN_SPEED = 0.07; // per-frame lerp rate

const ACCENT_RGB: Record<CategoryKey, [number, number, number]> = {
  engineering: [232, 119, 34],
  configuration: [133, 183, 235],
  resources: [93, 202, 165],
};
// ORG_RGB is read per-tick from the DOM so it responds to theme changes
function getOrgRgb(): [number, number, number] {
  const isDark = typeof document === 'undefined' || document.documentElement.dataset.theme !== 'light';
  return isDark ? [212, 212, 212] : [41, 37, 36];
}

/* ── Helpers ───────────────────────────────────────────────────── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function rgb(r: number, g: number, b: number) {
  return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
}

/* ── Float state per name ──────────────────────────────────────── */
interface FloatName {
  x: number;
  y: number;
  vx: number;
  vy: number;
  wobble: number;
  wobbleSpd: number;
  fontSize: number;
  baseOpacity: number;
  catIdx: number;
  orgX: number;
  orgY: number;
}

/* ── Rolling digit ─────────────────────────────────────────────── */
function RollingDigit({
  target,
  active,
  delay = 0,
}: {
  target: number;
  active: boolean;
  delay?: number;
}) {
  const [go, setGo] = useState(false);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setGo(true), delay);
    return () => {
      clearTimeout(t);
      setGo(false);
    };
  }, [active, delay]);

  return (
    <span
      className="inline-block overflow-hidden relative"
      style={{ height: "1.1em", lineHeight: "1.1em" }}
    >
      <span
        className="inline-flex flex-col transition-transform"
        style={{
          transitionDuration: "1000ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transform: go ? `translateY(-${target * 1.1}em)` : "translateY(0)",
        }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="block" style={{ height: "1.1em" }}>
            {i}
          </span>
        ))}
      </span>
    </span>
  );
}

function StatCounter({
  value,
  label,
  active,
  delay = 0,
}: {
  value: number;
  label: string;
  active: boolean;
  delay?: number;
}) {
  const digits = String(value).split("").map(Number);
  return (
    <div>
      <div
        className="font-extrabold flex"
        style={{ fontSize: 48, color: "#E87722" }}
      >
        {digits.map((d, i) => (
          <RollingDigit
            key={i}
            target={d}
            active={active}
            delay={delay + i * 80}
          />
        ))}
      </div>
      <div className="font-medium" style={{ fontSize: 14, color: "var(--text-muted)" }}>
        {label}
      </div>
    </div>
  );
}

/* ── Main component ────────────────────────────────────────────── */
interface Props {
  phase: number; // 0=hidden, 1=stats+float, 2=organized, 3=interactive
  statsResetKey: number; // increments when returning from CTA
}

export default function MergedStatsPanel({ phase, statsResetKey }: Props) {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);
  const descRefs = useRef<(HTMLElement | null)[]>([]);
  const badgeRefs = useRef<(HTMLElement | null)[]>([]);
  const iconRefs = useRef<(Element | null)[]>([]);
  const headerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const floats = useRef<FloatName[]>([]);
  const rafRef = useRef(0);
  const phaseRef = useRef(phase);
  const tweenOrg = useRef(0); // 0=floating, 1=organized
  const tweenDetail = useRef(0); // 0=hidden, 1=visible
  const tweenMissionX = useRef(0); // 0=centered, 1=left column

  const [statsActive, setStatsActive] = useState(false);

  // Keep phaseRef in sync
  useEffect(() => {
    phaseRef.current = phase;
    setStatsActive(phase >= 1 && phase <= 3);
  }, [phase]);

  /* ── rAF loop ────────────────────────────────────────────────── */
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const panelH = panel.offsetHeight;
    const viewW = window.innerWidth;

    const driftMinX = 40;
    const driftMaxX = viewW - 40;
    const driftMinY = 50;
    const driftMaxY = panelH - 50;

    // Exclusion zone: centered mission block (stats + heading + subline)
    const exclW = 620; // slightly wider than the 580px container
    const exclH = 280; // approx height of stats + heading + subline
    const exclLeft = viewW / 2 - exclW / 2;
    const exclRight = viewW / 2 + exclW / 2;
    const exclTop = panelH / 2 - exclH / 2;
    const exclBottom = panelH / 2 + exclH / 2;

    /* ── Organized positions (right column) ───────────────────── */
    const orgLeftX = viewW * 0.55; // right column

    const groups = CATEGORY_ORDER.map((cat) =>
      TOOLS.filter((t) => t.category === cat)
    );
    let totalH = 0;
    for (const g of groups) totalH += CAT_HEADER_H + g.length * ROW_H;
    totalH += (groups.length - 1) * CAT_GAP;
    const startY = (panelH - totalH) / 2;

    const orgMap: { x: number; y: number }[] = new Array(TOOLS.length);
    const hdrPos: { x: number; y: number }[] = [];
    const spPos: { x: number; y: number }[] = [];

    let y = startY;
    for (let gi = 0; gi < groups.length; gi++) {
      hdrPos.push({ x: orgLeftX, y });
      y += CAT_HEADER_H;
      for (const tool of groups[gi]) {
        orgMap[TOOLS.indexOf(tool)] = { x: orgLeftX, y };
        y += ROW_H;
      }
      if (gi < groups.length - 1) {
        spPos.push({ x: orgLeftX, y: y + CAT_GAP / 2 });
        y += CAT_GAP;
      }
    }

    /* ── Initialize floats (spawn outside exclusion zone) ─────── */
    const spawnOutside = (): { x: number; y: number } => {
      for (let attempt = 0; attempt < 50; attempt++) {
        const x = driftMinX + Math.random() * (driftMaxX - driftMinX);
        const y = driftMinY + Math.random() * (driftMaxY - driftMinY);
        if (x < exclLeft - 60 || x > exclRight + 10 || y < exclTop - 10 || y > exclBottom + 10) {
          return { x, y };
        }
      }
      // Fallback: place in top-left corner
      return { x: driftMinX, y: driftMinY };
    };

    if (floats.current.length === 0) {
      floats.current = TOOLS.map((tool, i) => {
        const pos = spawnOutside();
        return {
        x: pos.x,
        y: pos.y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.4,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpd: 0.008 + Math.random() * 0.008,
        fontSize: 13 + Math.random() * 5,
        baseOpacity: 0.25 + Math.random() * 0.2,
        catIdx: CATEGORY_ORDER.indexOf(tool.category as CategoryKey),
        orgX: orgMap[i].x,
        orgY: orgMap[i].y,
      };
      });
    }

    /* ── Animation tick ────────────────────────────────────────── */
    const tick = () => {
      const p = phaseRef.current;

      // Tween targets based on phase
      const targetOrg = p >= 2 ? 1 : 0;
      const targetDetail = p >= 3 ? 1 : 0;
      const targetMissionX = p >= 2 ? 1 : 0; // 0=centered, 1=left column

      // Smooth lerp toward targets
      tweenOrg.current += (targetOrg - tweenOrg.current) * TWEEN_SPEED;
      tweenDetail.current += (targetDetail - tweenDetail.current) * TWEEN_SPEED;
      tweenMissionX.current +=
        (targetMissionX - tweenMissionX.current) * TWEEN_SPEED;

      // Snap when very close
      if (Math.abs(tweenOrg.current - targetOrg) < 0.001)
        tweenOrg.current = targetOrg;
      if (Math.abs(tweenDetail.current - targetDetail) < 0.001)
        tweenDetail.current = targetDetail;
      if (Math.abs(tweenMissionX.current - targetMissionX) < 0.001)
        tweenMissionX.current = targetMissionX;

      const org = tweenOrg.current;
      const detail = tweenDetail.current;
      const mx = tweenMissionX.current;

      // Mission — slide from center to left column
      if (missionRef.current) {
        // Center position = 50% - half width, left position = ~8%
        const centerX = viewW * 0.5;
        const leftX = viewW * 0.27;
        const currentX = lerp(centerX, leftX, mx);
        missionRef.current.style.left = `${currentX}px`;
        missionRef.current.style.transform = `translateX(-50%)`;
      }

      // ── Names ──
      for (let i = 0; i < TOOLS.length; i++) {
        const f = floats.current[i];
        const el = rowRefs.current[i];
        if (!el) continue;

        // Drift (only when not organized)
        const drift = 1 - org;
        f.wobble += f.wobbleSpd;
        f.x += f.vx * drift + Math.sin(f.wobble) * 0.3 * drift;
        f.y += f.vy * drift + Math.cos(f.wobble * 0.7) * 0.2 * drift;

        // Edge bounce
        if (f.x < driftMinX) { f.x = driftMinX; f.vx = Math.abs(f.vx); }
        if (f.x > driftMaxX) { f.x = driftMaxX; f.vx = -Math.abs(f.vx); }
        if (f.y < driftMinY) { f.y = driftMinY; f.vy = Math.abs(f.vy); }
        if (f.y > driftMaxY) { f.y = driftMaxY; f.vy = -Math.abs(f.vy); }

        // Exclusion zone bounce — push names out of the mission text area
        if (
          f.x > exclLeft - 60 && f.x < exclRight + 10 &&
          f.y > exclTop - 10 && f.y < exclBottom + 10
        ) {
          // Find shortest exit direction
          const dL = f.x - (exclLeft - 60);
          const dR = (exclRight + 10) - f.x;
          const dT = f.y - (exclTop - 10);
          const dB = (exclBottom + 10) - f.y;
          const minD = Math.min(dL, dR, dT, dB);
          if (minD === dL)      { f.x = exclLeft - 60;  f.vx = -Math.abs(f.vx); }
          else if (minD === dR) { f.x = exclRight + 10;  f.vx = Math.abs(f.vx); }
          else if (minD === dT) { f.y = exclTop - 10;    f.vy = -Math.abs(f.vy); }
          else                  { f.y = exclBottom + 10;  f.vy = Math.abs(f.vy); }
        }

        // Interpolate position
        const cx = lerp(f.x, f.orgX, org);
        const cy = lerp(f.y, f.orgY, org);

        // Font size & opacity
        const fs = lerp(f.fontSize, 14, org);
        const op = lerp(f.baseOpacity, 1.0, org);

        // Color (accent → organized color in last 30% of organize)
        const colorT = Math.max(0, Math.min(1, (org - 0.7) / 0.3));
        const accent = ACCENT_RGB[TOOLS[i].category as CategoryKey];
        const orgRgb = getOrgRgb();
        const r = lerp(accent[0], orgRgb[0], colorT);
        const g = lerp(accent[1], orgRgb[1], colorT);
        const b = lerp(accent[2], orgRgb[2], colorT);

        el.style.transform = `translate(${cx}px, ${cy}px)`;
        el.style.fontSize = `${fs}px`;
        el.style.opacity = String(op);
        el.style.color = rgb(r, g, b);
        el.style.pointerEvents = detail > 0.8 ? "auto" : "none";

        // Detail elements
        if (descRefs.current[i])
          descRefs.current[i]!.style.opacity = String(detail);
        if (badgeRefs.current[i])
          badgeRefs.current[i]!.style.opacity = String(detail);
        if (iconRefs.current[i])
          (iconRefs.current[i] as HTMLElement).style.opacity = String(
            detail * 0.4
          );
      }

      // ── Category headers ──
      for (let i = 0; i < hdrPos.length; i++) {
        const el = headerRefs.current[i];
        if (!el) continue;
        const hOp = Math.max(0, Math.min(1, (org - 0.7) / 0.3));
        el.style.transform = `translate(${hdrPos[i].x}px, ${hdrPos[i].y}px)`;
        el.style.opacity = String(hOp);
      }

      // ── Separators ──
      for (let i = 0; i < spPos.length; i++) {
        const el = sepRefs.current[i];
        if (!el) continue;
        const sOp = Math.max(0, Math.min(1, (org - 0.8) / 0.2));
        el.style.transform = `translate(${spPos[i].x}px, ${spPos[i].y}px)`;
        el.style.opacity = String(sOp);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (tool: (typeof TOOLS)[0], e: React.MouseEvent) => {
    if (tool.type === "internal") {
      e.preventDefault();
      router.push(tool.url);
    }
  };

  return (
    <div
      ref={panelRef}
      className="relative h-screen"
      style={{ width: "100vw", background: "var(--bg-base)" }}
    >
      {/* ── Mission statement ───────────────────────────────────── */}
      <div
        ref={missionRef}
        className="absolute top-0 h-full flex items-center"
        style={{ pointerEvents: "none", left: "50%", transform: "translateX(-50%)" }}
      >
        <div className="w-[580px] shrink-0" style={{ pointerEvents: "auto" }}>
          <div className="flex items-center gap-8">
            <StatCounter
              key={`tools-${statsResetKey}`}
              value={6}
              label="Tools"
              active={statsActive}
              delay={200}
            />
            <div
              className="self-stretch"
              style={{ width: 1, minHeight: 32, background: "var(--border-default)" }}
            />
            <StatCounter
              key={`lines-${statsResetKey}`}
              value={3}
              label="Product Lines"
              active={statsActive}
              delay={400}
            />
          </div>
          <div className="mt-8">
            <h2
              className="font-bold"
              style={{ fontSize: 18, color: "var(--text-secondary)", lineHeight: 1.4 }}
            >
              Custom-built software tools for Victaulic Fire Suppression
              Technology
            </h2>
            <p
              className="mt-2"
              style={{ fontSize: 14, color: "var(--text-faint)", lineHeight: 1.6 }}
            >
              Engineered internally to close the gaps between how we work and
              how we should work.
            </p>
          </div>
        </div>
      </div>

      {/* ── Tool name rows ──────────────────────────────────────── */}
      {TOOLS.map((tool, i) => (
        <a
          key={tool.name}
          ref={(el) => {
            rowRefs.current[i] = el;
          }}
          href={tool.url}
          target={tool.type === "external" ? "_blank" : undefined}
          rel={tool.type === "external" ? "noopener noreferrer" : undefined}
          onClick={(e) => handleClick(tool, e)}
          className="absolute left-0 top-0 flex items-center gap-3 whitespace-nowrap select-none h-[28px] rounded px-1 -ml-1"
          style={{
            fontWeight: 600,
            textDecoration: "none",
            pointerEvents: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--bg-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <span>{tool.name}</span>
          {tool.status === "beta" && (
            <span
              ref={(el) => {
                badgeRefs.current[i] = el;
              }}
              className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded shrink-0"
              style={{
                color: "#D4A845",
                background: "#D4A84515",
                opacity: 0,
              }}
            >
              Beta
            </span>
          )}
          {tool.status === "alpha" && (
            <span
              ref={(el) => {
                badgeRefs.current[i] = el;
              }}
              className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded shrink-0"
              style={{
                color: "#A78BFA",
                background: "#A78BFA15",
                opacity: 0,
              }}
            >
              Alpha
            </span>
          )}
          <span
            ref={(el) => {
              descRefs.current[i] = el;
            }}
            className="text-[11px] ml-1 shrink-0"
            style={{ color: "var(--text-faint)", opacity: 0 }}
          >
            {tool.description}
          </span>
          {tool.type === "external" && (
            <svg
              ref={(el) => {
                iconRefs.current[i] = el;
              }}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#707070"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: 0, flexShrink: 0 }}
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          )}
        </a>
      ))}

      {/* ── Category headers ────────────────────────────────────── */}
      {CATEGORY_ORDER.map((cat, i) => (
        <div
          key={cat}
          ref={(el) => {
            headerRefs.current[i] = el;
          }}
          className="absolute left-0 top-0 flex items-center gap-2"
          style={{ opacity: 0, pointerEvents: "none" }}
        >
          <div
            className="rounded-sm"
            style={{
              width: 3,
              height: 14,
              background: CATEGORIES[cat].accent,
            }}
          />
          <span
            className="font-bold uppercase tracking-[1.5px]"
            style={{ fontSize: 10, color: CATEGORIES[cat].accent }}
          >
            {CATEGORIES[cat].label}
          </span>
        </div>
      ))}

      {/* ── Separator lines ─────────────────────────────────────── */}
      {[0, 1].map((i) => (
        <div
          key={i}
          ref={(el) => {
            sepRefs.current[i] = el;
          }}
          className="absolute left-0 top-0"
          style={{
            width: 500,
            height: 1,
            background: "var(--border-subtle)",
            opacity: 0,
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  );
}
