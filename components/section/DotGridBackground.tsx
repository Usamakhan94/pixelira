"use client";

import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/**
 * DotGridBackground
 * ------------------
 * Full-bleed grid of dots where random clusters ("shapes") fade in,
 * hold, then fade out — independently of one another, so there is
 * always at least one shape visible at any given time. As soon as a
 * shape disappears, a new one spawns somewhere else on the grid.
 *
 * Usage:
 *   <div className="relative min-h-screen">
 *     <DotGridBackground className="absolute inset-0 -z-10" />
 *     <YourContent className="relative z-10" />
 *   </div>
 */

type Cell = { col: number; row: number };
type ShapeTemplate = [number, number][]; // [col, row] offsets from an origin

// Pool of cluster shapes. Add/remove to change the "vocabulary" of clusters.
const SHAPES: ShapeTemplate[] = [
  [
    [0, 0],
    [1, 0],
  ], // horizontal pair
  [
    [0, 0],
    [0, 1],
  ], // vertical pair
  [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ], // 2x2 block
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ], // vertical line of 4
  [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
    [0, 2],
    [1, 2],
  ], // 2x3 block
  [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
    [0, 2],
    [1, 2],
    [0, 3],
    [1, 3],
  ], // 2x4 block
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [0, 2],
    [1, 2],
    [2, 2],
  ], // 3x3 box
  // big L / blob cluster (top-left style)
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
  ],
];

interface DotGridBackgroundProps {
  className?: string;
  /** Distance between dot centers, in px. Clamped to be >= dotSize. */
  cellSize?: number;
  /** Dot diameter, in px. Clamped to a 34px minimum. */
  dotSize?: number;
  /** Dot color */
  dotColor?: string;
  /** Number of shapes visible on screen at once (roughly) */
  density?: number;
  /** Average time (ms) a shape stays visible before it fades out */
  holdMs?: number;
  /** Set false to fade shapes in once and leave them (no despawn/respawn loop) */
  loop?: boolean;
}

const wait = (ms: number, cancelled: () => boolean) =>
  new Promise<void>((resolve) => {
    const start = Date.now();
    const check = () => {
      if (cancelled() || Date.now() - start >= ms) {
        resolve();
        return;
      }
      setTimeout(check, 50);
    };
    check();
  });

const tweenTo = (
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars,
): Promise<void> =>
  new Promise((resolve) => {
    gsap.to(targets, { ...vars, onComplete: resolve });
  });

function buildGrid(width: number, height: number, cellSize: number) {
  const cols = Math.max(1, Math.floor(width / cellSize));
  const rows = Math.max(1, Math.floor(height / cellSize));
  return { cols, rows };
}

function pickShapePlacement(
  cols: number,
  rows: number,
  occupied: Set<string>,
  maxAttempts = 40,
): { cells: Cell[]; keys: string[] } | null {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const template = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const flipX = Math.random() < 0.5 ? -1 : 1;
    const flipY = Math.random() < 0.5 ? -1 : 1;

    const flipped = template.map(([dx, dy]) => [dx * flipX, dy * flipY]);
    const minX = Math.min(...flipped.map((p) => p[0]));
    const minY = Math.min(...flipped.map((p) => p[1]));
    const normalized = flipped.map(([dx, dy]) => [dx - minX, dy - minY]);

    const width = Math.max(...normalized.map((p) => p[0])) + 1;
    const height = Math.max(...normalized.map((p) => p[1])) + 1;
    if (width > cols || height > rows) continue;

    const originCol = Math.floor(Math.random() * (cols - width + 1));
    const originRow = Math.floor(Math.random() * (rows - height + 1));

    const cells: Cell[] = normalized.map(([dx, dy]) => ({
      col: originCol + dx,
      row: originRow + dy,
    }));
    const keys = cells.map((c) => `${c.col},${c.row}`);

    if (keys.some((k) => occupied.has(k))) continue;
    return { cells, keys };
  }
  return null;
}

export default function DotGridBackground({
  className = "",
  cellSize = 34,
  dotSize = 34,
  dotColor = "#d9d6f2",
  density = 6,
  holdMs = 3200,
  loop = true,
}: DotGridBackgroundProps) {
  // Enforce a 34px floor, and keep cell spacing equal to (or larger than)
  // dot size so adjacent dots in a cluster touch with no gap between them.
  const resolvedDotSize = Math.max(34, dotSize);
  const resolvedCellSize = Math.max(resolvedDotSize, cellSize);

  const containerRef = useRef<HTMLDivElement>(null);
  const dotsLayerRef = useRef<HTMLDivElement>(null);
  const cancelledRef = useRef(false);
  const resizeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const createDotElement = useCallback(
    (cell: Cell) => {
      const el = document.createElement("div");
      el.className = "absolute rounded-full";
      el.style.width = `${resolvedDotSize}px`;
      el.style.height = `${resolvedDotSize}px`;
      el.style.left = `${cell.col * resolvedCellSize}px`;
      el.style.top = `${cell.row * resolvedCellSize}px`;
      el.style.backgroundColor = dotColor;
      el.style.opacity = "0";
      el.style.transform = "scale(0.3)";
      return el;
    },
    [resolvedDotSize, resolvedCellSize, dotColor],
  );

  // One independent "slot": spawns a shape, holds it, fades it out,
  // frees its cells, then immediately spawns a new shape elsewhere.
  // Because each slot runs its own randomized hold duration, slots
  // naturally desync from one another.
  const runWorker = useCallback(
    async (
      cols: number,
      rows: number,
      occupied: Set<string>,
      prefersReduced: boolean,
    ) => {
      const isCancelled = () => cancelledRef.current;

      // stagger initial start so all workers don't spawn in lockstep
      await wait(Math.random() * holdMs, isCancelled);

      while (!isCancelled()) {
        const placement = pickShapePlacement(cols, rows, occupied);
        if (!placement) {
          await wait(250, isCancelled);
          continue;
        }

        placement.keys.forEach((k) => occupied.add(k));
        const elements = placement.cells.map(createDotElement);
        const layer = dotsLayerRef.current;
        if (!layer || isCancelled()) {
          placement.keys.forEach((k) => occupied.delete(k));
          break;
        }
        elements.forEach((el) => layer.appendChild(el));

        if (prefersReduced) {
          gsap.set(elements, { opacity: 1, scale: 1 });
        } else {
          await tweenTo(elements, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            stagger: 0.05,
          });
        }

        if (!loop) return; // static mode: fade in once and stay

        const holdVariance = holdMs * 0.5;
        await wait(
          holdMs + (Math.random() * 2 - 1) * holdVariance,
          isCancelled,
        );

        if (!isCancelled()) {
          await tweenTo(elements, {
            opacity: 0,
            scale: 0.3,
            duration: 0.4,
            ease: "power1.in",
            stagger: 0.02,
          });
        }

        elements.forEach((el) => el.remove());
        placement.keys.forEach((k) => occupied.delete(k));

        await wait(Math.random() * 400, isCancelled);
      }
    },
    [createDotElement, holdMs, loop],
  );

  const start = useCallback(() => {
    const container = containerRef.current;
    const layer = dotsLayerRef.current;
    if (!container || !layer) return;

    cancelledRef.current = false;
    layer.innerHTML = "";

    const { width, height } = container.getBoundingClientRect();
    const { cols, rows } = buildGrid(width, height, resolvedCellSize);
    const occupied = new Set<string>();

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const area = cols * rows;
    const shapeCount = Math.max(3, Math.round((area / 1000) * density));

    for (let i = 0; i < shapeCount; i++) {
      runWorker(cols, rows, occupied, prefersReduced);
    }
  }, [resolvedCellSize, density, runWorker]);

  const stop = useCallback(() => {
    cancelledRef.current = true;
    const layer = dotsLayerRef.current;
    if (layer) {
      gsap.killTweensOf(layer.children);
      layer.innerHTML = "";
    }
  }, []);

  useGSAP(
    () => {
      start();

      const el = containerRef.current;
      if (!el) return;

      const observer = new ResizeObserver(() => {
        if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
        resizeTimeout.current = setTimeout(() => {
          stop();
          start();
        }, 200);
      });
      observer.observe(el);

      return () => {
        observer.disconnect();
        if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
        stop();
      };
    },
    { scope: containerRef, dependencies: [start, stop] },
  );

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none overflow-hidden absolute ${className}`}
      aria-hidden="true"
    >
      <div ref={dotsLayerRef} className="relative h-full w-full" />
    </div>
  );
}
