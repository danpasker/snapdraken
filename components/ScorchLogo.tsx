"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";

const Lottie = dynamic(
  () => import("lottie-react").then((module) => module.default),
  { ssr: false },
);

type LottieData = Record<string, unknown>;

export interface ScorchLogoProps {
  className?: string;
  priority?: boolean;
}

export function ScorchLogo({ className, priority = true }: ScorchLogoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dragonRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const heatOneRef = useRef<HTMLSpanElement>(null);
  const heatTwoRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const [heroVisible, setHeroVisible] = useState(true);
  const [smokeAnimation, setSmokeAnimation] = useState<LottieData | null>(null);
  const [emberAnimation, setEmberAnimation] = useState<LottieData | null>(null);
  const [dragonSource, setDragonSource] = useState("/logo/snapdraken-dragon.svg");
  const [wordmarkSource, setWordmarkSource] = useState(
    "/logo/snapdraken-wordmark.svg",
  );

  useEffect(() => {
    const root = rootRef.current;

    if (!root || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    let cancelled = false;

    const loadAnimation = async (src: string, setter: (data: LottieData) => void) => {
      try {
        const response = await fetch(src);
        if (!response.ok) return;
        const data = (await response.json()) as LottieData;
        if (!cancelled) setter(data);
      } catch {
        // CSS smoke and heat remain as a complete fallback while assets are swapped.
      }
    };

    void loadAnimation("/lottie/smoke-wisp.json", setSmokeAnimation);
    void loadAnimation("/lottie/ember-drift.json", setEmberAnimation);

    return () => {
      cancelled = true;
    };
  }, [reduceMotion]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const dragon = dragonRef.current;
    const wordmark = wordmarkRef.current;
    const heatOne = heatOneRef.current;
    const heatTwo = heatTwoRef.current;

    if (!root || !dragon || !wordmark || !heatOne || !heatTwo || reduceMotion) {
      return;
    }

    const context = gsap.context(() => {
      gsap.set([dragon, wordmark], {
        autoAlpha: 0,
        y: 7,
        filter: "blur(5px)",
      });
      gsap.set([heatOne, heatTwo], { autoAlpha: 0.08, scale: 0.9 });

      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .to(dragon, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.15 })
        .to(
          wordmark,
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.05 },
          0.28,
        )
        .to([heatOne, heatTwo], { autoAlpha: 0.5, scale: 1, duration: 1.35 }, 0.15);

      gsap.to(heatOne, {
        autoAlpha: 0.22,
        scale: 1.08,
        duration: 3.2,
        delay: 1.1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(heatTwo, {
        autoAlpha: 0.14,
        scale: 1.12,
        duration: 4.1,
        delay: 0.35,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, root);

    return () => context.revert();
  }, [reduceMotion]);

  const showAtmosphere = heroVisible && !reduceMotion;

  return (
    <div
      ref={rootRef}
      className={`scorch-logo${className ? ` ${className}` : ""}`}
      role="img"
      aria-label="Snapdraken"
    >
      <span ref={heatOneRef} className="scorch-logo__heat scorch-logo__heat--one" aria-hidden="true" />
      <span ref={heatTwoRef} className="scorch-logo__heat scorch-logo__heat--two" aria-hidden="true" />

      <div ref={dragonRef} className="scorch-logo__dragon">
        <Image
          src={dragonSource}
          alt=""
          width={650}
          height={305}
          sizes="(max-width: 640px) 86vw, 680px"
          priority={priority}
          draggable={false}
          onError={() => setDragonSource("/media/source/snapdraken-dragon-mark.webp")}
        />
      </div>

      <div ref={wordmarkRef} className="scorch-logo__wordmark">
        <Image
          className={
            wordmarkSource.includes("business-card")
              ? "scorch-logo__wordmark-fallback"
              : undefined
          }
          src={wordmarkSource}
          alt=""
          width={590}
          height={120}
          sizes="(max-width: 640px) 90vw, 720px"
          priority={priority}
          draggable={false}
          onError={() =>
            setWordmarkSource("/media/source/snapdraken-business-card.webp")
          }
        />
      </div>

      {showAtmosphere ? (
        <div className="scorch-logo__atmosphere" aria-hidden="true">
          <span className="scorch-logo__wisp scorch-logo__wisp--one">
            {smokeAnimation ? (
              <Lottie animationData={smokeAnimation} autoplay loop />
            ) : (
              <span className="scorch-logo__wisp-fallback" />
            )}
          </span>
          <span className="scorch-logo__wisp scorch-logo__wisp--two">
            {smokeAnimation ? (
              <Lottie animationData={smokeAnimation} autoplay loop />
            ) : (
              <span className="scorch-logo__wisp-fallback" />
            )}
          </span>
          <span className="scorch-logo__embers">
            {emberAnimation ? (
              <Lottie animationData={emberAnimation} autoplay loop />
            ) : null}
          </span>
        </div>
      ) : null}
    </div>
  );
}
