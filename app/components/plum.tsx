'use client';

import { useEffect, useRef } from 'react';

export default function Plum() {
    const r180 = Math.PI;
    const r90 = Math.PI / 2;
    const r15 = Math.PI / 12;
    const color = '#88888825';

    const el = useRef<HTMLCanvasElement>(null);
    const rafId = useRef<number | null>(null);

    const { random } = Math;
    const size = useRef({ width: 0, height: 0 });

    useEffect(() => {
        const canvas = el.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const initCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            const dpr = window.devicePixelRatio || 1;
            // @ts-expect-error vendor
            const bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
            const dpi = dpr / bsr;

            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            canvas.width = dpi * width;
            canvas.height = dpi * height;
            ctx.scale(dpi, dpi);
            size.current = { width, height };
        };

        const polar2cart = (x = 0, y = 0, r = 0, theta = 0) => {
            const dx = r * Math.cos(theta);
            const dy = r * Math.sin(theta);
            return [x + dx, y + dy];
        };

        let pendingSteps: (() => void)[] = [];
        let lastTime = performance.now();
        const interval = 1000 / 40; // 40fps
        const MIN_BRANCH = 30;
        const len = 6;

        const step = (x: number, y: number, rad: number, counter: { value: number } = { value: 0 }) => {
            const length = random() * len;
            const [nx, ny] = polar2cart(x, y, length, rad);

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(nx, ny);
            ctx.stroke();

            counter.value += 1;

            if (nx < -100 || nx > size.current.width + 100 || ny < -100 || ny > size.current.height + 100) {
                return;
            }

            const rad1 = rad + random() * r15;
            const rad2 = rad - random() * r15;

            const rate = counter.value <= MIN_BRANCH ? 0.8 : 0.5;

            if (random() < rate) {
                pendingSteps.push(() => step(nx, ny, rad1, counter));
            }
            if (random() < rate) {
                pendingSteps.push(() => step(nx, ny, rad2, counter));
            }
        };

        const frame = () => {
            const now = performance.now();
            if (now - lastTime < interval) {
                rafId.current = requestAnimationFrame(frame);
                return;
            }
            lastTime = now;

            const steps: (() => void)[] = [];
            pendingSteps = pendingSteps.filter((i) => {
                if (random() > 0.5) {
                    steps.push(i);
                    return false;
                }
                return true;
            });

            steps.forEach((fn) => fn());

            if (pendingSteps.length) {
                rafId.current = requestAnimationFrame(frame);
            }
        };

        const start = () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);

            // Check visibility before starting
            const isVisible = localStorage.getItem('plumVisible') !== 'false';
            if (!isVisible) {
                ctx.clearRect(0, 0, width, height);
                return;
            }

            initCanvas();
            ctx.clearRect(0, 0, width, height);
            ctx.lineWidth = 1;
            ctx.strokeStyle = color;

            const randomMiddle = () => random() * 0.6 + 0.2;

            pendingSteps = [
                () => step(randomMiddle() * size.current.width, -5, r90),
                () => step(randomMiddle() * size.current.width, size.current.height + 5, -r90),
                () => step(-5, randomMiddle() * size.current.height, 0),
                () => step(size.current.width + 5, randomMiddle() * size.current.height, r180),
            ];

            if (size.current.width < 500) {
                pendingSteps = pendingSteps.slice(0, 2);
            }

            frame();
        };

        start();

        const onResize = () => {
            start();
        };

        const onToggle = () => {
            start();
        };

        window.addEventListener('resize', onResize);
        window.addEventListener('plum:toggle', onToggle);

        return () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);
            window.removeEventListener('resize', onResize);
            window.removeEventListener('plum:toggle', onToggle);
        };
    }, []);

    return (
        <div
            className="fixed top-0 bottom-0 left-0 right-0 pointer-events-none print:hidden z-[-1]"
            style={{
                maskImage: 'radial-gradient(circle, transparent, black)',
                WebkitMaskImage: 'radial-gradient(circle, transparent, black)',
            }}
        >
            <canvas ref={el} />
        </div>
    );
}
