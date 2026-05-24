"use client";
import { useEffect, useRef } from "react";

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface Planet {
  x: number;        // base x (0–1 of viewport width)
  y: number;        // base y (0–1 of viewport height)
  radius: number;
  color: string;
  glowColor: string;
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number;
  parallaxFactor: number;
}

const PLANETS: Planet[] = [
  { x: 0.85, y: 0.18, radius: 38, color: "#1a4fcc", glowColor: "rgba(60,130,255,0.35)", orbitRadius: 18, orbitSpeed: 0.00035, orbitOffset: 0, parallaxFactor: 0.08 },
  { x: 0.08, y: 0.45, radius: 26, color: "#c04010", glowColor: "rgba(255,100,40,0.3)", orbitRadius: 12, orbitSpeed: 0.00028, orbitOffset: 2.1, parallaxFactor: 0.12 },
  { x: 0.78, y: 0.72, radius: 20, color: "#0aaa80", glowColor: "rgba(0,200,140,0.28)", orbitRadius: 10, orbitSpeed: 0.0005, orbitOffset: 4.2, parallaxFactor: 0.06 },
  { x: 0.15, y: 0.82, radius: 32, color: "#7722cc", glowColor: "rgba(150,60,255,0.32)", orbitRadius: 16, orbitSpeed: 0.00022, orbitOffset: 1.3, parallaxFactor: 0.1 },
  { x: 0.55, y: 0.10, radius: 16, color: "#cc9900", glowColor: "rgba(255,200,0,0.25)", orbitRadius: 8, orbitSpeed: 0.0006, orbitOffset: 3.5, parallaxFactor: 0.07 },
  { x: 0.92, y: 0.55, radius: 12, color: "#cc3366", glowColor: "rgba(255,60,120,0.22)", orbitRadius: 6, orbitSpeed: 0.0008, orbitOffset: 5.1, parallaxFactor: 0.05 },
];

export default function SpaceCanvas() {
  const planetRef = useRef<HTMLCanvasElement>(null);
  const meteorRef = useRef<HTMLCanvasElement>(null);

  // ── Planet / space canvas ─────────────────────────────────────────────────
  useEffect(() => {
    const canvas = planetRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let scrollY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Stars — drawn once on a static offscreen canvas
    const starCanvas = document.createElement("canvas");
    const resetStars = () => {
      starCanvas.width = canvas.width;
      starCanvas.height = canvas.height;
      const sc = starCanvas.getContext("2d")!;
      sc.clearRect(0, 0, starCanvas.width, starCanvas.height);
      const count = Math.floor((canvas.width * canvas.height) / 3000);
      for (let i = 0; i < count; i++) {
        const x = Math.random() * starCanvas.width;
        const y = Math.random() * starCanvas.height;
        const r = Math.random() * 1.1 + 0.2;
        const a = Math.random() * 0.7 + 0.2;
        sc.beginPath();
        sc.arc(x, y, r, 0, Math.PI * 2);
        sc.fillStyle = `rgba(255,255,255,${a})`;
        sc.fill();
      }
    };
    resetStars();
    window.addEventListener("resize", resetStars);

    let animId: number;
    const draw = (t: number) => {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Stars
      ctx.drawImage(starCanvas, 0, 0);

      // Planets
      PLANETS.forEach((p) => {
        const bx = p.x * canvas.width;
        const by = p.y * canvas.height;
        const ox = Math.cos(t * p.orbitSpeed + p.orbitOffset) * p.orbitRadius;
        const oy = Math.sin(t * p.orbitSpeed * 0.7 + p.orbitOffset) * p.orbitRadius * 0.5;
        const px = bx + ox - scrollY * p.parallaxFactor * 0.3;
        const py = by + oy - scrollY * p.parallaxFactor;

        // Outer glow
        const glowR = p.radius * 2.8;
        const grd = ctx.createRadialGradient(px, py, p.radius * 0.4, px, py, glowR);
        grd.addColorStop(0, p.glowColor);
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(px, py, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Planet sphere with lit-side gradient
        const litX = px - p.radius * 0.3;
        const litY = py - p.radius * 0.3;
        const sphGrd = ctx.createRadialGradient(litX, litY, p.radius * 0.1, px, py, p.radius);
        sphGrd.addColorStop(0, lighten(p.color, 0.5));
        sphGrd.addColorStop(0.5, p.color);
        sphGrd.addColorStop(1, darken(p.color, 0.7));
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = sphGrd;
        ctx.fill();

        // Thin rim glow
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.strokeStyle = p.glowColor.replace(/[\d.]+\)$/, "0.6)");
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    };
    requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", resetStars);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // ── Meteor canvas (always on top) ────────────────────────────────────────
  useEffect(() => {
    const canvas = meteorRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const meteors: Meteor[] = [];
    let timer = 0;

    const spawn = () => {
      const fromLeft = Math.random() > 0.5;
      meteors.push({
        x: fromLeft ? -10 : window.innerWidth + 10,
        y: Math.random() * window.innerHeight * 0.7,
        vx: fromLeft ? 4.5 + Math.random() * 4 : -(4.5 + Math.random() * 4),
        vy: 1.8 + Math.random() * 2.5,
        length: 80 + Math.random() * 120,
        opacity: 0.85 + Math.random() * 0.15,
        life: 0,
        maxLife: 55 + Math.random() * 35,
      });
    };

    let animId: number;
    const loop = () => {
      animId = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timer++;
      if (timer > 75 + Math.random() * 90) {
        spawn();
        if (Math.random() > 0.5) spawn();
        timer = 0;
      }
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life++;
        const alpha = m.opacity * (1 - m.life / m.maxLife);
        const dir = m.vx > 0 ? 1 : -1;
        const tailX = m.x - dir * m.length;
        const tailY = m.y - (m.vy / Math.abs(m.vx)) * m.length;
        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(210,235,255,${alpha})`);
        grad.addColorStop(0.3, `rgba(80,160,255,${alpha * 0.5})`);
        grad.addColorStop(1, `rgba(0,80,200,0)`);
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.stroke();
        // Bright head
        const hGrad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 3);
        hGrad.addColorStop(0, `rgba(255,255,255,${alpha})`);
        hGrad.addColorStop(1, `rgba(100,180,255,0)`);
        ctx.beginPath();
        ctx.arc(m.x, m.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = hGrad;
        ctx.fill();
        if (m.life >= m.maxLife) meteors.splice(i, 1);
      }
    };
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={planetRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      <canvas
        ref={meteorRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9999 }}
      />
    </>
  );
}

// Helpers for sphere lighting effect
function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}
function lighten(hex: string, amount: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${Math.min(255, r + 255 * amount)},${Math.min(255, g + 255 * amount)},${Math.min(255, b + 255 * amount)})`;
}
function darken(hex: string, amount: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${Math.round(r * amount)},${Math.round(g * amount)},${Math.round(b * amount)})`;
}
