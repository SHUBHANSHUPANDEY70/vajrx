"use client";
import { useEffect } from "react";

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

export default function SpaceCanvas() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.zIndex = "3";
    canvas.style.pointerEvents = "none";
    canvas.style.background = "transparent";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d", { alpha: true })!;

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
        y: Math.random() * window.innerHeight * 0.75,
        vx: fromLeft ? 4.5 + Math.random() * 4 : -(4.5 + Math.random() * 4),
        vy: 1.8 + Math.random() * 2.5,
        length: 80 + Math.random() * 130,
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

        const hGrad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 4);
        hGrad.addColorStop(0, `rgba(255,255,255,${alpha})`);
        hGrad.addColorStop(1, `rgba(100,180,255,0)`);
        ctx.beginPath();
        ctx.arc(m.x, m.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = hGrad;
        ctx.fill();

        if (m.life >= m.maxLife) meteors.splice(i, 1);
      }
    };
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      if (document.body.contains(canvas)) document.body.removeChild(canvas);
    };
  }, []);

  return null;
}
