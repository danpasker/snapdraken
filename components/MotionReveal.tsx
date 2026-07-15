"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface MotionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  once?: boolean;
}

/**
 * A small client-side island for the site's shared in-view reveal. Content
 * remains visible when JavaScript is unavailable and motion is removed for
 * visitors who request it.
 */
export function MotionReveal({
  children,
  className,
  delay = 0,
  amount = 0.18,
  once = true,
}: MotionRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        delay,
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

