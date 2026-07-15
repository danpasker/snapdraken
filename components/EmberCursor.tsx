"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, video, [role='button'], [data-ember-cursor]";

export function EmberCursor() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const x = useSpring(pointerX, { stiffness: 700, damping: 48, mass: 0.12 });
  const y = useSpring(pointerY, { stiffness: 700, damping: 48, mass: 0.12 });
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const syncPointerCapability = () => setEnabled(finePointer.matches);
    syncPointerCapability();
    finePointer.addEventListener("change", syncPointerCapability);

    return () => finePointer.removeEventListener("change", syncPointerCapability);
  }, []);

  useEffect(() => {
    if (!enabled || reduceMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setVisible(true);
      setActive(
        event.target instanceof Element &&
          Boolean(event.target.closest(INTERACTIVE_SELECTOR)),
      );
    };

    const handlePointerLeave = () => setVisible(false);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [enabled, pointerX, pointerY, reduceMotion]);

  if (!enabled || reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className={`ember-cursor${active ? " ember-cursor--active" : ""}`}
      style={{ x, y }}
      animate={{ opacity: visible ? 1 : 0, scale: active ? 3.2 : 1 }}
      transition={{ opacity: { duration: 0.15 }, scale: { duration: 0.2 } }}
    />
  );
}

