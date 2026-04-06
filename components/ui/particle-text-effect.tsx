"use client";

import { useEffect, useRef } from "react";

/* ── Orange palette from spec ─────────────────────────────────── */
const PALETTE = [
  { r: 232, g: 119, b: 34 },
  { r: 245, g: 155, b: 60 },
  { r: 215, g: 100, b: 22 },
  { r: 255, g: 175, b: 90 },
  { r: 200, g: 85, b: 18 },
];

/* ── Phase hold durations (frames @ 60 fps) ───────────────────── */
const PHASE_A_FRAMES = 300; // ~10 s — "FS³" centered
const PHASE_B_FRAMES = 330; // ~11 s — stacked text

const PIXEL_STEP = 3;
const FONT_FAMILY = "'Helvetica Neue', Arial, sans-serif";

/* ── Vector / color helpers ────────────────────────────────────── */
interface V2 {
  x: number;
  y: number;
}
interface RGB {
  r: number;
  g: number;
  b: number;
}

/* ── Particle class ────────────────────────────────────────────── */
class Particle {
  pos: V2 = { x: 0, y: 0 };
  vel: V2 = { x: 0, y: 0 };
  acc: V2 = { x: 0, y: 0 };
  target: V2 = { x: 0, y: 0 };

  closeEnough = 100;
  maxSpeed = 5;
  maxForce = 0.2;
  size = 2;
  isKilled = false;

  startColor: RGB = { r: 0, g: 0, b: 0 };
  targetColor: RGB = { r: 0, g: 0, b: 0 };
  colorWeight = 0;
  colorBlendRate = 0.015;

  currentColor(): RGB {
    return {
      r: Math.round(
        this.startColor.r +
          (this.targetColor.r - this.startColor.r) * this.colorWeight
      ),
      g: Math.round(
        this.startColor.g +
          (this.targetColor.g - this.startColor.g) * this.colorWeight
      ),
      b: Math.round(
        this.startColor.b +
          (this.targetColor.b - this.startColor.b) * this.colorWeight
      ),
    };
  }

  move() {
    const dx = this.target.x - this.pos.x;
    const dy = this.target.y - this.pos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const proximity = dist < this.closeEnough ? dist / this.closeEnough : 1;

    const mag = dist || 1;
    const desired = {
      x: (dx / mag) * this.maxSpeed * proximity,
      y: (dy / mag) * this.maxSpeed * proximity,
    };

    const steerX = desired.x - this.vel.x;
    const steerY = desired.y - this.vel.y;
    const sMag = Math.sqrt(steerX * steerX + steerY * steerY) || 1;

    this.acc.x += (steerX / sMag) * this.maxForce;
    this.acc.y += (steerY / sMag) * this.maxForce;

    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.acc.x = 0;
    this.acc.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.colorWeight < 1)
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1);

    const c = this.currentColor();
    ctx.fillStyle = `rgb(${c.r},${c.g},${c.b})`;
    ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
  }

  kill(w: number, h: number) {
    if (this.isKilled) return;
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.max(w, h);
    this.target.x = w / 2 + Math.cos(angle) * dist;
    this.target.y = h / 2 + Math.sin(angle) * dist;

    this.startColor = this.currentColor();
    this.targetColor = { r: 0, g: 0, b: 0 };
    this.colorWeight = 0;
    this.isKilled = true;
  }
}

/* ── Component ─────────────────────────────────────────────────── */
interface ParticleTextEffectProps {
  paused?: boolean;
}

export function ParticleTextEffect({ paused = false }: ParticleTextEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const particles = useRef<Particle[]>([]);
  const frameCount = useRef(0);
  const phaseIdx = useRef(0);
  const pausedRef = useRef(paused);
  const sizeRef = useRef({ w: 0, h: 0 });
  const mouse = useRef({ x: 0, y: 0, pressed: false, right: false });

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    /* ── Render a phase onto offscreen canvas, retarget particles ─ */
    const applyPhase = (idx: number) => {
      const { w, h } = sizeRef.current;
      if (w === 0 || h === 0) return;

      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const oc = off.getContext("2d")!;

      if (idx % 2 === 0) {
        // Phase A — "FS³" centered
        const fs = Math.min(130, w * 0.18);
        oc.font = `800 ${fs}px ${FONT_FAMILY}`;
        oc.textAlign = "center";
        oc.textBaseline = "middle";
        oc.fillStyle = "white";
        oc.fillText("FS\u00B3", w / 2, h / 2);
      } else {
        // Phase B — stacked left-aligned
        const fs = Math.min(68, w * 0.115);
        const lh = fs * 1.08;
        const lines = ["FIRE", "SUPPRESSION", "SOFTWARE", "SUITE"];
        const totalH = lh * lines.length;
        const startY = (h - totalH) / 2;
        const x = w * 0.12;
        oc.font = `800 ${fs}px ${FONT_FAMILY}`;
        oc.textAlign = "left";
        oc.textBaseline = "top";
        oc.fillStyle = "white";
        lines.forEach((l, i) => oc.fillText(l, x, startY + lh * i));
      }

      const imgData = oc.getImageData(0, 0, w, h);
      const px = imgData.data;

      // Pick random base color from palette
      const base = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      const vary = () => Math.floor(Math.random() * 70) - 35;

      // Collect lit pixel indices & shuffle
      const coords: number[] = [];
      for (let i = 0; i < px.length; i += PIXEL_STEP * 4) {
        if (px[i + 3] > 0) coords.push(i);
      }
      for (let i = coords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [coords[i], coords[j]] = [coords[j], coords[i]];
      }

      const ps = particles.current;
      let pi = 0;

      for (const ci of coords) {
        const x = (ci / 4) % w;
        const y = Math.floor(ci / 4 / w);

        let p: Particle;
        if (pi < ps.length) {
          p = ps[pi];
          p.isKilled = false;
        } else {
          p = new Particle();
          const a = Math.random() * Math.PI * 2;
          const d = Math.max(w, h) * 0.8;
          p.pos.x = w / 2 + Math.cos(a) * d;
          p.pos.y = h / 2 + Math.sin(a) * d;
          p.maxSpeed = Math.random() * 10 + 8;
          p.maxForce = p.maxSpeed * 0.1;
          p.size = Math.random() * 0.6 + 0.6;
          p.colorBlendRate = Math.random() * 0.025 + 0.005;
          ps.push(p);
        }

        p.startColor = p.currentColor();
        p.targetColor = {
          r: Math.max(0, Math.min(255, base.r + vary())),
          g: Math.max(0, Math.min(255, base.g + vary())),
          b: Math.max(0, Math.min(255, base.b + vary())),
        };
        p.colorWeight = 0;
        p.target.x = x;
        p.target.y = y;
        pi++;
      }

      // Kill excess
      for (let i = pi; i < ps.length; i++) ps[i].kill(w, h);
    };

    /* ── Resize handler ────────────────────────────────────────── */
    const resize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      sizeRef.current = { w, h };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      applyPhase(phaseIdx.current);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    /* ── Animation loop ────────────────────────────────────────── */
    const holdFrames = [PHASE_A_FRAMES, PHASE_B_FRAMES];

    const animate = () => {
      if (!pausedRef.current) {
        const { w, h } = sizeRef.current;
        const ps = particles.current;

        // Motion blur
        ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
        ctx.fillRect(0, 0, w, h);

        for (let i = ps.length - 1; i >= 0; i--) {
          const p = ps[i];
          p.move();
          p.draw(ctx);
          if (
            p.isKilled &&
            (p.pos.x < -50 ||
              p.pos.x > w + 50 ||
              p.pos.y < -50 ||
              p.pos.y > h + 50)
          ) {
            ps.splice(i, 1);
          }
        }

        // Right-click destroy easter egg
        if (mouse.current.pressed && mouse.current.right) {
          for (const p of ps) {
            const dx = p.pos.x - mouse.current.x;
            const dy = p.pos.y - mouse.current.y;
            if (dx * dx + dy * dy < 2500) p.kill(w, h);
          }
        }

        // Phase cycling
        frameCount.current++;
        if (
          frameCount.current >= holdFrames[phaseIdx.current % holdFrames.length]
        ) {
          frameCount.current = 0;
          phaseIdx.current = (phaseIdx.current + 1) % holdFrames.length;
          applyPhase(phaseIdx.current);
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    /* ── Mouse handlers ────────────────────────────────────────── */
    const onDown = (e: MouseEvent) => {
      mouse.current.pressed = true;
      mouse.current.right = e.button === 2;
      const r = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - r.left;
      mouse.current.y = e.clientY - r.top;
    };
    const onUp = () => {
      mouse.current.pressed = false;
      mouse.current.right = false;
    };
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - r.left;
      mouse.current.y = e.clientY - r.top;
    };
    const onCtx = (e: MouseEvent) => e.preventDefault();

    canvas.addEventListener("mousedown", onDown);
    canvas.addEventListener("mouseup", onUp);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("contextmenu", onCtx);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousedown", onDown);
      canvas.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("contextmenu", onCtx);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
