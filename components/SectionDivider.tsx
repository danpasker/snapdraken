import Image from "next/image";

export interface SectionDividerProps {
  variant?: "scorch" | "torn";
  className?: string;
  flip?: boolean;
}

export function SectionDivider({
  variant = "scorch",
  className,
  flip = false,
}: SectionDividerProps) {
  return (
    <div
      className={`section-divider section-divider--${variant}${
        flip ? " section-divider--flipped" : ""
      }${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      <Image
        className="section-divider__image"
        src="/textures/scorch-edge.svg"
        alt=""
        width={1600}
        height={48}
        sizes="100vw"
      />
    </div>
  );
}

