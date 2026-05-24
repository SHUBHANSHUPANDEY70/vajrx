"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function EarthGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x00000a, 1);
    const canvas = renderer.domElement;
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.zIndex = "1";
    canvas.style.pointerEvents = "none";
    document.body.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2.8;

    const textureLoader = new THREE.TextureLoader();
    const earthTex = textureLoader.load("/earth_day.jpg");
    const cloudTex = textureLoader.load("/earth_clouds.jpg");

    // Earth
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshPhongMaterial({ map: earthTex, specular: new THREE.Color(0x333333), shininess: 15 })
    );
    scene.add(earth);

    // Clouds
    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(1.01, 64, 64),
      new THREE.MeshPhongMaterial({ map: cloudTex, transparent: true, opacity: 0.35, depthWrite: false })
    );
    scene.add(clouds);

    // Atmospheric glow
    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(1.15, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader: `varying vec3 vNormal; void main() { vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `varying vec3 vNormal; void main() { float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0); gl_FragColor = vec4(0.1, 0.5, 1.0, 1.0) * intensity; }`,
        side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true,
      })
    ));

    // Stars
    const positions = new Float32Array(8000 * 3);
    for (let i = 0; i < positions.length; i++) positions[i] = (Math.random() - 0.5) * 300;
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, sizeAttenuation: true })));

    // Lighting
    scene.add(new THREE.AmbientLight(0x222244, 0.8));
    const sun = new THREE.DirectionalLight(0xffffff, 1.4);
    sun.position.set(5, 3, 5);
    scene.add(sun);

    // Mouse parallax
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      earth.rotation.y += 0.0008;
      clouds.rotation.y += 0.001;
      earth.rotation.x += 0.00015;
      camera.position.x += (mouseX * 0.4 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 0.3 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (document.body.contains(canvas)) document.body.removeChild(canvas);
    };
  }, []);

  return <div ref={mountRef} />;
}
