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

interface Planet {
  mesh: THREE.Mesh;
  pivot: THREE.Group;
  scrollStart: number;
  scrollEnd: number;
  orbitSpeed: number;
  driftX: number;
  driftY: number;
}

export default function SpaceCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    // Lighting
    scene.add(new THREE.AmbientLight(0x334466, 1.2));
    const sun = new THREE.DirectionalLight(0xffffff, 1.5);
    sun.position.set(10, 5, 15);
    scene.add(sun);

    // Planets config: [color, size, scrollStart(0-1), scrollEnd(0-1), x, y, z]
    const planetDefs = [
      { color: 0x3366ff, emissive: 0x112244, size: 1.8, scrollStart: 0.1, scrollEnd: 0.45, x: 14, y: 4, z: -5, orbitSpeed: 0.004 },
      { color: 0xff6633, emissive: 0x331100, size: 1.2, scrollStart: 0.25, scrollEnd: 0.6, x: -13, y: -3, z: -8, orbitSpeed: 0.003 },
      { color: 0x22ccaa, emissive: 0x001a14, size: 0.9, scrollStart: 0.4, scrollEnd: 0.75, x: 11, y: -5, z: -4, orbitSpeed: 0.005 },
      { color: 0xaa44ff, emissive: 0x1a0033, size: 1.4, scrollStart: 0.55, scrollEnd: 0.88, x: -10, y: 6, z: -6, orbitSpeed: 0.0035 },
      { color: 0xffcc00, emissive: 0x221800, size: 0.7, scrollStart: 0.7, scrollEnd: 0.95, x: 8, y: 2, z: -3, orbitSpeed: 0.006 },
    ];

    const planets: Planet[] = planetDefs.map((def) => {
      const geo = new THREE.SphereGeometry(def.size, 32, 32);
      const mat = new THREE.MeshPhongMaterial({
        color: def.color,
        emissive: def.emissive,
        shininess: 30,
        specular: new THREE.Color(0x444444),
      });
      const mesh = new THREE.Mesh(geo, mat);
      const pivot = new THREE.Group();
      pivot.add(mesh);
      mesh.position.set(def.x, def.y, def.z);
      pivot.position.set(0, 0, 0);
      scene.add(pivot);
      return {
        mesh,
        pivot,
        scrollStart: def.scrollStart,
        scrollEnd: def.scrollEnd,
        orbitSpeed: def.orbitSpeed,
        driftX: def.x,
        driftY: def.y,
      };
    });

    // Asteroid belt (ring of small rocks)
    const asteroidBelt = new THREE.Group();
    const asteroidGeo = new THREE.IcosahedronGeometry(1, 0);
    const asteroidMat = new THREE.MeshStandardMaterial({ color: 0x888899, roughness: 0.9 });
    for (let i = 0; i < 800; i++) {
      const a = new THREE.Mesh(asteroidGeo, asteroidMat);
      const angle = Math.random() * Math.PI * 2;
      const r = 18 + Math.random() * 12;
      a.position.set(Math.cos(angle) * r, (Math.random() - 0.5) * 4, Math.sin(angle) * r - 10);
      a.scale.setScalar(Math.random() * 0.12 + 0.04);
      a.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      asteroidBelt.add(a);
    }
    scene.add(asteroidBelt);

    // 2D Meteor canvas overlay
    const meteorCanvas = document.createElement("canvas");
    meteorCanvas.style.position = "absolute";
    meteorCanvas.style.inset = "0";
    meteorCanvas.style.pointerEvents = "none";
    meteorCanvas.style.zIndex = "2";
    meteorCanvas.width = window.innerWidth;
    meteorCanvas.height = window.innerHeight;
    mount.appendChild(meteorCanvas);
    const ctx = meteorCanvas.getContext("2d")!;

    const meteors: Meteor[] = [];
    const spawnMeteor = () => {
      const fromRight = Math.random() > 0.5;
      meteors.push({
        x: fromRight ? window.innerWidth + 20 : -20,
        y: Math.random() * window.innerHeight * 0.6,
        vx: fromRight ? -(3 + Math.random() * 4) : (3 + Math.random() * 4),
        vy: 1.5 + Math.random() * 2.5,
        length: 80 + Math.random() * 120,
        opacity: 0.8 + Math.random() * 0.2,
        life: 0,
        maxLife: 60 + Math.random() * 40,
      });
    };
    let meteorTimer = 0;

    const drawMeteors = () => {
      ctx.clearRect(0, 0, meteorCanvas.width, meteorCanvas.height);
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life++;
        const progress = m.life / m.maxLife;
        const alpha = m.opacity * (1 - progress);
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * (m.length / Math.abs(m.vx)), m.y - m.vy * (m.length / Math.abs(m.vx)));
        grad.addColorStop(0, `rgba(180,220,255,${alpha})`);
        grad.addColorStop(0.4, `rgba(100,170,255,${alpha * 0.6})`);
        grad.addColorStop(1, `rgba(0,100,255,0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - (m.vx / Math.abs(m.vx)) * m.length, m.y - (m.vy / Math.abs(m.vx)) * m.length);
        ctx.stroke();
        if (m.life >= m.maxLife) meteors.splice(i, 1);
      }
    };

    // Scroll tracking
    let scrollRatio = 0;
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRatio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Resize
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      meteorCanvas.width = window.innerWidth;
      meteorCanvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // Animation loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Planets visibility based on scroll
      planets.forEach((p) => {
        const inRange = scrollRatio >= p.scrollStart && scrollRatio <= p.scrollEnd;
        const fadeIn = scrollRatio >= p.scrollStart && scrollRatio < p.scrollStart + 0.08;
        const fadeOut = scrollRatio > p.scrollEnd - 0.08 && scrollRatio <= p.scrollEnd;
        let opacity = 0;
        if (inRange) {
          if (fadeIn) opacity = (scrollRatio - p.scrollStart) / 0.08;
          else if (fadeOut) opacity = (p.scrollEnd - scrollRatio) / 0.08;
          else opacity = 1;
        }
        (p.mesh.material as THREE.MeshPhongMaterial).opacity = opacity;
        (p.mesh.material as THREE.MeshPhongMaterial).transparent = true;
        p.pivot.rotation.y += p.orbitSpeed;
        p.mesh.rotation.y += 0.002;
      });

      asteroidBelt.rotation.y += 0.0004;

      // Meteors
      meteorTimer++;
      if (meteorTimer > 90 + Math.random() * 120) {
        spawnMeteor();
        if (Math.random() > 0.6) spawnMeteor();
        meteorTimer = 0;
      }
      drawMeteors();

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      if (mount.contains(meteorCanvas)) mount.removeChild(meteorCanvas);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
