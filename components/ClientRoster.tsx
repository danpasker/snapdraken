import Image from "next/image";
import { MotionReveal } from "./MotionReveal";

export interface ClientMark {
  name: string;
  logoSrc?: string;
  logoSurface?: "light" | "dark";
  logoWidth?: number;
  logoHeight?: number;
}

export const SELECTED_CLIENTS: readonly ClientMark[] = [
  {
    name: "Disney",
    logoSrc: "/brands/clients/disney-wordmark.svg",
    logoWidth: 469,
    logoHeight: 135,
  },
  { name: "Universal Studios", logoSrc: "/brands/clients/universal-studios.png" },
  {
    name: "MrBeast",
    logoSrc: "/brands/clients/mrbeast-horizontal.png",
    logoWidth: 1200,
    logoHeight: 255,
  },
  { name: "Netflix", logoSrc: "/brands/clients/netflix.png" },
  { name: "SeaWorld", logoSrc: "/brands/clients/seaworld.svg" },
  {
    name: "Freeman",
    logoSrc: "/brands/clients/freeman-logo-white.svg",
    logoSurface: "dark",
  },
  { name: "Xibitz", logoSrc: "/brands/clients/xibitz-logo-grey.png" },
  {
    name: "Orlando Science Center",
    logoSrc: "/brands/clients/orlando-science-center-logo.svg",
  },
  { name: "Praxis Exhibits", logoSrc: "/brands/clients/praxis-exhibits-logo.webp" },
] as const;

export interface ClientRosterProps {
  clients?: readonly ClientMark[];
}

export function ClientRoster({ clients = SELECTED_CLIENTS }: ClientRosterProps) {
  return (
    <section className="client-roster" id="clients" aria-labelledby="clients-title">
      <MotionReveal className="client-roster__inner">
        <h2 className="client-roster__label" id="clients-title">
          Selected Clients &amp; Productions
        </h2>
        <ul className="client-roster__list" aria-label="Selected clients">
          {clients.map((client) => (
            <li key={client.name}>
              {client.logoSrc ? (
                <span
                  className={`client-roster__logo-surface client-roster__logo-surface--${client.logoSurface ?? "light"}`}
                  aria-hidden="true"
                >
                  <Image
                    className="client-roster__logo"
                    src={client.logoSrc}
                    alt=""
                    width={client.logoWidth ?? 220}
                    height={client.logoHeight ?? 80}
                    sizes="(max-width: 720px) 35vw, 10rem"
                    unoptimized
                  />
                </span>
              ) : null}
              <span className="client-roster__name">{client.name}</span>
              <span className="client-roster__diamond" aria-hidden="true">
                ◆
              </span>
            </li>
          ))}
        </ul>
      </MotionReveal>
    </section>
  );
}
