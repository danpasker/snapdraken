"use client";

import type { ReactNode } from "react";
import { LayoutGroup } from "framer-motion";

export function MotionShell({ children }: { children: ReactNode }) {
  return <LayoutGroup id="snapdraken-projects">{children}</LayoutGroup>;
}
