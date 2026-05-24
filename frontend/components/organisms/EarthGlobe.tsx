"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function EarthGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.z = 2.8;

    const textureLoader = new THREE.TextureLoader();
    const earthTex = textureLoader.load("/earth_day.jpg");
    const cloudTex = textureLoader.load("/earth_clouds.jpg");

    // Earth
    const earthGeo = new THREE.SphereGeometry(1, 64, 64);
    const earthMat = new THREE.MeshPhongMaterial({
      map: earthTex,
      specular: new THREE.Color(0x333333),
      shininess: 15,
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    scene.add(earth);

    // Clouds
    const cloudGeo = new THREE.SphereGeometry(1.01, 64, 64);
    const cloudMat = new THREE.MeshPhongMaterial({
      map: cloudTex,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    const clouds = new THREE.Mesh(cloudGeo, cloudMat);
    scene.add(clouds);

    // Atmospheric glow
    const glowGeo = new THREE.SphereGeometry(1.15, 64, 64);
    const glowMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          gl_FragColor = vec4(0.1, 0.5, 1.0, 1.0) * intensity;
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glow);

    // Stars
    const starGeo = new THREE.BufferGeometry();
    const starCount = 8000;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 300;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, sizeAttenuation: true });
    scene.add(new THREE.Points(starGeo, starMat));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x222244, 0.8);
    scene.add(ambientLight);
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.4);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Resize
    const onResize = () => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    // Animation
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      earth.rotation.y += 0.0008;
      clouds.rotation.y += 0.0010;
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
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
