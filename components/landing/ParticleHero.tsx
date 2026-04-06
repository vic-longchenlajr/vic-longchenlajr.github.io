"use client";

import { ParticleTextEffect } from "@/components/ui/particle-text-effect";

interface ParticleHeroProps {
  paused?: boolean;
}

export default function ParticleHero({ paused = false }: ParticleHeroProps) {
  return (
    <div className="relative w-screen h-screen bg-black">
      <ParticleTextEffect paused={paused} />
    </div>
  );
}
