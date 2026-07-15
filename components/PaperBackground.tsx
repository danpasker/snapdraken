import type { ReactNode } from "react";

export interface PaperBackgroundProps {
  children?: ReactNode;
  className?: string;
}

export function PaperBackground({ children, className }: PaperBackgroundProps) {
  return (
    <div className={`paper-background${className ? ` ${className}` : ""}`}>
      <div className="paper-background__tone" aria-hidden="true" />
      <div className="paper-background__fiber" aria-hidden="true" />
      {children !== undefined && (
        <div className="paper-background__content">{children}</div>
      )}
    </div>
  );
}
