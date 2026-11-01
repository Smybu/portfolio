"use client";
import useFloat from "@/hooks/useFloat";
import useParallaxTilt from "@/hooks/useParallaxTilt";
import useRoleSwitcher from "@/hooks/useRoleSwitcher";
import { getDictionary } from "@/lib/i18n";
import { useI18n } from "@/lib/i18nProvider";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { HeroImage } from "../../utils/images";

export const FLOATING_CHIPS = [
  {
    label: "</>",
    position: "top-2 left-0 sm:-left-2",
    depth: 30,
    amplitude: 10,
    duration: 3600,
    delay: 0,
  },
  {
    label: "{ }",
    position: "bottom-12 right-0 sm:-right-2",
    depth: 44,
    amplitude: 14,
    duration: 4200,
    delay: 600,
  },
  {
    label: ">_",
    position: "bottom-2 left-6",
    depth: 22,
    amplitude: 8,
    duration: 3000,
    delay: 1200,
  },
];

interface FloatingChipProps {
  label: string;
  position: string;
  depth: number;
  amplitude: number;
  duration: number;
  delay: number;
  visible: boolean;
}

const FloatingChip: FC<FloatingChipProps> = ({
  label,
  position,
  depth,
  amplitude,
  duration,
  delay,
  visible,
}) => {
  const floatRef = useFloat<HTMLDivElement>({ amplitude, duration, delay });

  return (
    <div
      aria-hidden="true"
      className={`absolute ${position} motion-safe:transition-opacity motion-safe:duration-1000 ${
        visible ? "opacity-100" : "motion-safe:opacity-0"
      }`}
      style={{
        transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px), 0)`,
        transitionDelay: visible ? `${delay + 400}ms` : "0ms",
      }}
    >
      <div
        ref={floatRef}
        className="bg-secondary/70 border-border text-accent rounded-xl border px-3 py-1.5 font-mono text-sm font-semibold shadow-lg shadow-black/20 backdrop-blur-md"
      >
        {label}
      </div>
    </div>
  );
};

export default FloatingChip;
