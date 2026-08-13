"use client";

/**
 * 3D TILT CARD
 *
 * Создаёт эффект 3D наклона карточки при наведении мыши
 * Как на сайтах Apple, Stripe, Linear - мирового уровня!
 */

import { useRef, useCallback } from "react";
import Tilt from "react-parallax-tilt";

interface TiltCardProps {
  children: React.ReactNode;
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
  scale?: number;
  transitionSpeed?: number;
  glareEnable?: boolean;
  glareMaxOpacity?: number;
  glareColor?: string;
  className?: string;
  perspective?: number;
}

export function TiltCard({
  children,
  tiltMaxAngleX = 10,
  tiltMaxAngleY = 10,
  scale = 1.02,
  transitionSpeed = 1000,
  glareEnable = true,
  glareMaxOpacity = 0.15,
  glareColor = "#d4a574",
  className = "",
  perspective = 1000,
}: TiltCardProps) {
  return (
    <Tilt
      tiltMaxAngleX={tiltMaxAngleX}
      tiltMaxAngleY={tiltMaxAngleY}
      scale={scale}
      transitionSpeed={transitionSpeed}
      glareEnable={glareEnable}
      glareMaxOpacity={glareMaxOpacity}
      glareColor={glareColor}
      perspective={perspective}
      gyroscope={true}
      className={`tilt-card ${className}`}
    >
      {children}
    </Tilt>
  );
}

// ============================================
// PRESET CONFIGURATIONS
// ============================================

/** Карточка меню с лёгким эффектом */
export function MenuTiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <TiltCard
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      scale={1.03}
      glareColor="#c9a227"
      className={`menu-tilt-card ${className}`}
    >
      {children}
    </TiltCard>
  );
}

/** Карточка мероприятия с драматичным эффектом */
export function EventTiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <TiltCard
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      scale={1.05}
      glareEnable={true}
      glareMaxOpacity={0.2}
      className={`event-tilt-card ${className}`}
    >
      {children}
    </TiltCard>
  );
}

/** Карточка отзыва с мягким эффектом */
export function ReviewTiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <TiltCard
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      scale={1.01}
      glareEnable={false}
      className={`review-tilt-card ${className}`}
    >
      {children}
    </TiltCard>
  );
}

// ============================================
// MAGNETIC WRAPPER (альтернатива GSAP)
// ============================================

interface MagneticWrapperProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticWrapper({ children, strength = 30, className = "" }: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      el.style.transform = `translate(${(x * strength) / 100}px, ${(y * strength) / 100}px)`;
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
    el.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
  }, []);

  const handleMouseEnter = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.1s linear";
  }, []);

  return (
    <div
      ref={ref}
      className={`magnetic-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </div>
  );
}
