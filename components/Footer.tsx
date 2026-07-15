import Image from "next/image";
import Link from "next/link";

export interface FooterProps {
  instagramUrl?: string;
  linkedInUrl?: string;
}

export function Footer({ instagramUrl, linkedInUrl }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Link className="site-footer__brand" href="/" aria-label="Snapdraken home">
          <Image
            src="/logo/snapdraken-dragon.svg"
            alt=""
            width={650}
            height={305}
          />
        </Link>

        <div className="site-footer__meta">
          <p>© {year} Snapdraken LLC</p>
          <p className="site-footer__badge">TEA Member</p>
        </div>

        {(instagramUrl || linkedInUrl) && (
          <div className="site-footer__social" aria-label="Social links">
            {instagramUrl && (
              <a href={instagramUrl} rel="noreferrer" target="_blank">
                Instagram
              </a>
            )}
            {linkedInUrl && (
              <a href={linkedInUrl} rel="noreferrer" target="_blank">
                LinkedIn
              </a>
            )}
          </div>
        )}
      </div>
      <p className="site-footer__handmade">Made by hand in La Grange, NC</p>
    </footer>
  );
}
