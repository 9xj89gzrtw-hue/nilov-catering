"use client";

/**
 * PARTICLES BACKGROUND
 *
 * Красивые частицы на фоне - как у лучших сайтов мира
 */

import { useMemo } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions, Engine } from "@tsparticles/engine";

interface ParticlesBackgroundProps {
  variant?: "confetti" | "stars" | "snow" | "floating" | "fireflies";
  className?: string;
  count?: number;
  color?: string;
}

export function ParticlesBackground({
  variant = "floating",
  className = "",
  count = 50,
  color = "#d4a574",
}: ParticlesBackgroundProps) {
  const options: ISourceOptions = useMemo(() => {
    switch (variant) {
      case "confetti":
        return {
          fullScreen: { enable: false },
          particles: {
            number: { value: count, density: { enable: true } },
            color: { value: ["#d4a574", "#c9a227", "#ffffff", "#8b4513"] },
            shape: { type: ["circle", "square"] as any },
            opacity: {
              value: { min: 0.5, max: 1 },
              animation: { enable: true, speed: 1, sync: false },
            },
            size: { value: { min: 3, max: 8 }, animation: { enable: true, speed: 2, sync: false } },
            move: {
              enable: true,
              direction: "bottom",
              gravity: { enable: true, acceleration: 15 },
              outModes: { default: "destroy" },
              speed: { min: 10, max: 25 },
            },
          },
        };

      case "stars":
        return {
          fullScreen: { enable: false },
          particles: {
            number: { value: Math.floor(count * 0.6), density: { enable: true } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: {
              value: { min: 0.3, max: 0.8 },
              animation: { enable: true, speed: 0.5, sync: false },
            },
            size: { value: { min: 1, max: 3 } },
            move: { enable: true, direction: "none", speed: 0.3, outModes: { default: "bounce" } },
          },
        };

      case "snow":
        return {
          fullScreen: { enable: false },
          particles: {
            number: { value: count, density: { enable: true } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: { min: 0.5, max: 1 } },
            size: { value: { min: 2, max: 6 } },
            move: {
              enable: true,
              direction: "bottom",
              gravity: { enable: true, acceleration: 5 },
              outModes: { default: "out" },
              speed: { min: 1, max: 3 },
            },
          },
        };

      case "fireflies":
        return {
          fullScreen: { enable: false },
          particles: {
            number: { value: Math.floor(count * 0.4), density: { enable: true } },
            color: { value: ["#ffff99", "#ffcc66", "#ffaa00", "#ffffff"] },
            shape: { type: "circle" },
            opacity: {
              value: { min: 0.2, max: 0.9 },
              animation: { enable: true, speed: 1, sync: false },
            },
            size: { value: { min: 2, max: 5 }, animation: { enable: true, speed: 2, sync: false } },
            move: {
              enable: true,
              direction: "none",
              speed: 0.5,
              outModes: { default: "out" },
            },
          },
        };

      case "floating":
      default:
        return {
          fullScreen: { enable: false },
          particles: {
            number: { value: count, density: { enable: true, area: 800 } },
            color: { value: color },
            shape: { type: "circle" },
            opacity: {
              value: { min: 0.1, max: 0.4 },
              animation: { enable: true, speed: 0.5, sync: false },
            },
            size: { value: { min: 20, max: 80 } },
            move: {
              enable: true,
              direction: "none",
              speed: 0.5,
              outModes: { default: "out" },
            },
          },
        };
    }
  }, [variant, count, color]);

  return (
    <Particles
      id={`particles-${variant}`}
      options={options}
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}

// ============================================
// PRESET CONFIGURATIONS FOR COMMON USE CASES
// ============================================

export const particlePresets = {
  /** Для hero секции главной страницы */
  hero: {
    variant: "floating" as const,
    count: 30,
    color: "#d4a574",
  },

  /** Для свадебных страниц */
  wedding: {
    variant: "fireflies" as const,
    count: 25,
    color: "#ffd700",
  },

  /** Для новогодних/зимних событий */
  winter: {
    variant: "snow" as const,
    count: 60,
    color: "#ffffff",
  },

  /** Для страницы "Спасибо" / успеха */
  celebration: {
    variant: "confetti" as const,
    count: 80,
    color: "#d4a574",
  },

  /** Для премиальных/роскошных страниц */
  luxury: {
    variant: "stars" as const,
    count: 40,
    color: "#d4a574",
  },
};
