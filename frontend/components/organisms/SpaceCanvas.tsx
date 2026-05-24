"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

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
  const threeRef = useRef<HTMLDivElement>(null);
  const meteorRef = useRef<HTMLCanvasElement>(null);

  // ── Three.js planets (fixed, behind page) ────────────────────────────────
  useEffect(() => {
    const mount = threeRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    scene.add(new THREE.AmbientLight(0x334466, 1.5));
    const sun = new THREE.DirectionalLight(0xffffff, 2);
    sun.position.set(10, 5, 15);
    scene.add(sun);

    const planetDefs = [
      { color: 0x3388ff, emissive: 0x112244, size: 1.6, scrollStart: 0.05, scrollEnd: 0.38, x: 12, y: 5, orbitSpeed: 0.004 },
      { color: 0xff5522, emissive: 0x331100, size: 1.1, scrollStart: 0.22, scrollEnd: 0.55, x: -11, y: -4, orbitSpeed: 0.003 },
      { color: 0x00ddaa, emissive: 0x002211, size: 0.85, scrollStart: 0.38, scrollEnd: 0.68, x: 10, y: -6, orbitSpeed: 0.005 },
      { color: 0xaa33ff, emissive: 0x1a0033, size: 1.3, scrollStart: 0.55, scrollEnd: 0.82, x: -9, y: 7, orbitSpeed: 0.0035 },
      { color: 0xffcc00, emissive: 0x221800, size: 0.65, scrollStart: 0.72, scrollEnd: 0.96, x: 7, y: 2, orbitSpeed: 0.006 },
    ];

    type PlanetEntry = {
      mesh: THREE.Mesh;
      pivot: THREE.Group;
      scrollStart: number;
      scrollEnd: number;
      orbitSpeed: number;
    };

    const planets: PlanetEntry[] = planetDefs.map((def) => {
      const mat = new THREE.MeshPhongMaterial({
        color: def.color,
        emissive: def.emissive,
        shininess: 30,
        transparent: true,
        opacity: 0,
      });
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(def.size, 32, 32), mat);
      const pivot = new THREE.Group();
      mesh.position.set(def.x, def.y, 0);
      pivot.add(mesh);
      scene.add(pivot);
      return { mesh, pivot, scrollStart: def.scrollStart, scrollEnd: def.scrollEnd, orbitSpeed: def.orbitSpeed };
    });

    // Asteroid belt
    const asteroidBelt = new THREE.Group();
    const aGeo = new THREE.IcosahedronGeometry(1, 0);
    const aMat = new THREE.MeshStandardMaterial({ color: 0x7788aa, roughness: 0.9 });
    for (let i = 0; i < 600; i++) {
      const a = new THREE.Mesh(aGeo, aMat);
      const angle = Math.random() * Math.PI * 2;
      const r = 17 + Math.random() * 10;
      a.position.set(Math.cos(angle) * r, (Math.random() - 0.5) * 3, Math.sin(angle) * r - 8);
      a.scale.setScalar(Math.random() * 0.1 + 0.03);
      a.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      asteroidBelt.add(a);
    }
    scene.add(asteroidBelt);

    let scrollRatio = 0;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRatio = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      planets.forEach((p) => {
        const mat = p.mesh.material as THREE.MeshPhongMaterial;
        const { scrollStart: s, scrollEnd: e } = p;
        if (scrollRatio < s || scrollRatio > e) {
          mat.opacity = Math.max(0, mat.opacity - 0.03);
        } else {
          const fadeIn = (scrollRatio - s) / 0.06;
          const fadeOut = (e - scrollRatio) / 0.06;
          mat.opacity = Math.min(1, Math.min(fadeIn, fadeOut));
        }
        p.pivot.rotation.y += p.orbitSpeed;
        p.mesh.rotation.y += 0.002;
      });
      asteroidBelt.rotation.y += 0.0004;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  // ── Meteor canvas (on top of everything) ─────────────────────────────────
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
        y: Math.random() * window.innerHeight * 0.65,
        vx: fromLeft ? 4 + Math.random() * 4 : -(4 + Math.random() * 4),
        vy: 1.5 + Math.random() * 2.5,
        length: 90 + Math.random() * 110,
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
      if (timer > 80 + Math.random() * 100) {
        spawn();
        if (Math.random() > 0.55) spawn();
        timer = 0;
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life++;
        const alpha = m.opacity * (1 - m.life / m.maxLife);
        const tailX = m.x - (m.vx / Math.abs(m.vx)) * m.length;
        const tailY = m.y - (m.vy / Math.abs(m.vx)) * m.length;
        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(200,230,255,${alpha})`);
        grad.addColorStop(0.35, `rgba(80,160,255,${alpha * 0.55})`);
        grad.addColorStop(1, `rgba(0,80,200,0)`);
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.stroke();
        // Head glow
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,230,255,${alpha})`;
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
      {/* Three.js planets — behind page content */}
      <div
        ref={threeRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      {/* Meteor canvas — always on top, pointer-events none */}
      <canvas
        ref={meteorRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9999 }}
      />
    </>
  );
}
