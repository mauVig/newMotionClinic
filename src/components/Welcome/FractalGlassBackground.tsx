"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// ⚙️ Configuración igual a la del ejemplo de Codegrid
const config = {
  lerpFactor: 0.035,
  parallaxStrength: 0.1,
  distortionMultiplier: 10,
  glassStrength: 2.0,
  glassSmoothness: 0.01,
  stripesFrequency: 15,
  edgePadding: 0.1,
};

// 🧠 Shaders tal cual los robamos 😈
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uTextureSize;
  uniform vec2 uMouse;
  uniform float uParallaxStrength;
  uniform float uDistortionMultiplier;
  uniform float uGlassStrength;
  uniform float ustripesFrequency;
  uniform float uglassSmoothness;
  uniform float uEdgePadding;

  varying vec2 vUv;

  vec2 getCoverUV(vec2 uv, vec2 textureSize) {
    if (textureSize.x < 1.0 || textureSize.y < 1.0) return uv;

    vec2 s = uResolution / textureSize;
    float scale = max(s.x, s.y);

    vec2 scaledSize = textureSize * scale;
    vec2 offset = (uResolution - scaledSize) * 0.5;

    return (uv * uResolution - offset) / scaledSize;
  }

  float displacement(float x, float num_stripes, float strength) {
    float modulus = 1.0 / num_stripes;
    return mod(x, modulus) * strength;
  }

  float fractalGlass(float x) {
    float d = 0.0;
    for (int i = -5; i <= 5; i++) {
      d += displacement(x + float(i) * uglassSmoothness, ustripesFrequency, uGlassStrength);
    }
    d = d / 11.0;
    return x + d;
  }

  float smoothEdge(float x, float padding) {
    float edge = padding;
    if (x < edge) {
      return smoothstep(0.0, edge, x);
    } else if (x > 1.0 - edge) {
      return smoothstep(1.0, 1.0 - edge, x);
    }
    return 1.0;
  }

  void main() {
    vec2 uv = vUv;

    float originalX = uv.x;

    float edgeFactor = smoothEdge(originalX, uEdgePadding);

    float distortedX = fractalGlass(originalX);

    uv.x = mix(originalX, distortedX, edgeFactor);

    float distortionFactor = uv.x - originalX;

    float parallaxDirection = -sign(0.5 - uMouse.x);

    vec2 parallaxOffset = vec2(
      parallaxDirection * abs(uMouse.x - 0.5) * uParallaxStrength * (1.0 + abs(distortionFactor) * uDistortionMultiplier),
      0.0
    );

    parallaxOffset *= edgeFactor;

    uv += parallaxOffset;

    vec2 coverUV = getCoverUV(uv, uTextureSize);

    if (coverUV.x < 0.0 || coverUV.x > 1.0 || coverUV.y < 0.0 || coverUV.y > 1.0) {
      coverUV = clamp(coverUV, 0.0, 1.0);
    }

    vec4 color = texture2D(uTexture, coverUV);

    gl_FragColor = color;
  }
`;

interface FractalGlassBackgroundProps {
  imageSrc: string; // la imagen que quiero usar de textura
}

const FractalGlassBackground: React.FC<FractalGlassBackgroundProps> = ({
  imageSrc,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!imageSrc) return;
    if (!containerRef.current) return;

    const container = containerRef.current;

    // 🎥 Escena básica ortográfica full-screen
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true, // dejo el fondo transparente por si quiero overlays
    });

    const { clientWidth, clientHeight } = container;
    renderer.setSize(clientWidth, clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 🖱️ Mouse y lerp
    const mouse = { x: 0.5, y: 0.5 };
    const targetMouse = { x: 0.5, y: 0.5 };

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    // 📏 Tamaño de textura
    const textureSize = { x: 1, y: 1 };

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: null },
        uResolution: { value: new THREE.Vector2(clientWidth, clientHeight) },
        uTextureSize: {
          value: new THREE.Vector2(textureSize.x, textureSize.y),
        },
        uMouse: { value: new THREE.Vector2(mouse.x, mouse.y) },
        uParallaxStrength: { value: config.parallaxStrength },
        uDistortionMultiplier: { value: config.distortionMultiplier },
        uGlassStrength: { value: config.glassStrength },
        ustripesFrequency: { value: config.stripesFrequency },
        uglassSmoothness: { value: config.glassSmoothness },
        uEdgePadding: { value: config.edgePadding },
      },
      vertexShader,
      fragmentShader,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 📸 Cargo la textura desde la imagen que le paso
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = "anonymous";

    image.onload = () => {
      const texture = new THREE.Texture(image);
      texture.needsUpdate = true;

      textureSize.x = image.naturalWidth || image.width;
      textureSize.y = image.naturalHeight || image.height;

      material.uniforms.uTexture.value = texture;
      material.uniforms.uTextureSize.value.set(textureSize.x, textureSize.y);
    };

    // 🖱️ Mouse move → targetMouse
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX / window.innerWidth;
      targetMouse.y = 1.0 - e.clientY / window.innerHeight;
    };

    // 📐 Resize del contenedor
    const handleResize = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      renderer.setSize(clientWidth, clientHeight);
      material.uniforms.uResolution.value.set(clientWidth, clientHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // 🔁 Loop de animación
    let frameId: number;

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);

      mouse.x = lerp(mouse.x, targetMouse.x, config.lerpFactor);
      mouse.y = lerp(mouse.y, targetMouse.y, config.lerpFactor);

      material.uniforms.uMouse.value.set(mouse.x, mouse.y);

      renderer.render(scene, camera);
    };

    animate();

    // 🧹 Cleanup al desmontar
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      if (material.uniforms.uTexture.value) {
        (material.uniforms.uTexture.value as THREE.Texture).dispose();
      }
      renderer.dispose();
    };
  }, [imageSrc]);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default FractalGlassBackground;
