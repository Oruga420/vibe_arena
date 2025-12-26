"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AsciiTower() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return undefined;
        }

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

        renderer.setPixelRatio(pixelRatio);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        const towerGroup = new THREE.Group();
        const material = new THREE.MeshBasicMaterial({ color: 0x00c46a, wireframe: true });

        const stemGeom = new THREE.CylinderGeometry(0.5, 2, 40, 6);
        const stem = new THREE.Mesh(stemGeom, material);
        towerGroup.add(stem);

        const podGeom = new THREE.TorusGeometry(3, 0.5, 8, 20);
        const pod = new THREE.Mesh(podGeom, material);
        pod.rotation.x = Math.PI / 2;
        pod.position.y = 10;
        towerGroup.add(pod);

        const antGeom = new THREE.CylinderGeometry(0.1, 0.5, 15, 4);
        const antenna = new THREE.Mesh(antGeom, material);
        antenna.position.y = 25;
        towerGroup.add(antenna);

        scene.add(towerGroup);

        camera.position.z = 50;
        camera.position.y = 10;

        const resize = () => {
            const width = container.clientWidth || window.innerWidth;
            const height = container.clientHeight || window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        resize();
        window.addEventListener("resize", resize);

        let frame = 0;
        let animationId;

        const renderFrame = () => {
            if (!prefersReducedMotion) {
                frame += 1;
                towerGroup.rotation.y += 0.002;
                const scale = 1 + Math.sin(frame * 0.02) * 0.02;
                towerGroup.scale.set(scale, 1, scale);
            }

            if (!document.hidden) {
                renderer.render(scene, camera);
            }

            animationId = requestAnimationFrame(renderFrame);
        };

        if (prefersReducedMotion) {
            renderer.render(scene, camera);
        } else {
            renderFrame();
        }

        const handleMouseMove = (event) => {
            const x = event.clientX / window.innerWidth - 0.5;
            const y = event.clientY / window.innerHeight - 0.5;
            towerGroup.rotation.x = y * 0.2;
            towerGroup.position.x = x * 5;
        };

        if (!prefersReducedMotion) {
            window.addEventListener("mousemove", handleMouseMove);
        }

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            window.removeEventListener("resize", resize);
            if (!prefersReducedMotion) {
                window.removeEventListener("mousemove", handleMouseMove);
            }
            renderer.dispose();
            if (renderer.domElement && renderer.domElement.parentNode) {
                renderer.domElement.parentNode.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div id="canvas-container" ref={containerRef} aria-hidden="true" />;
}
