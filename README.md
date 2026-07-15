# Snapdraken portfolio

Production portfolio for Travis Crumbaker and Snapdraken LLC. The site is built with the patched Next.js 15.5 App Router line, TypeScript, Tailwind CSS, MDX, Framer Motion, GSAP, Lottie, and Resend. The original brief named Next.js 14, but every 14.x App Router release is now covered by unpatched security advisories; 15.5 preserves the requested architecture without shipping those known issues.

## Local setup

Requirements: Node.js 18.17 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Before a release, run:

```bash
npm run typecheck
npm run lint
npm run build
```

## Project media

All production paths are local. There are no placeholder-image services.

- Case-study media lives in `public/media/case-studies/`.
- The About portrait and workshop image live in `public/media/about/`.
- Logo vectors live in `public/logo/`.
- The paper scan and divider textures live in `public/textures/`.
- The social share card is `public/og.jpg` (with the original generated PNG retained alongside it).

Each case study currently uses a 16:9 hero, a 4:5 poster, and three gallery images. The supplied archive contains still photography but no video, so hover and project-reel video fields are intentionally omitted. High-resolution JPEG masters are retained locally; the pages reference compact WebP derivatives for faster delivery. Keep the existing filenames to swap files without editing code. For the best results:

- retain hero masters at 1800×1013 or larger and export the site WebP at 1000×563;
- retain poster masters at 1200×1500 or larger and export the site WebP at 600×750;
- retain gallery masters at 1600×1067 or larger and export site WebPs at 1000×563 for the first image and 800×533 for the remaining images;
- when real footage becomes available, export muted WebM loops at 720×900, 3–6 seconds, with no audio, then add the optional `video` frontmatter field;
- keep the Travis portrait at a 4:5 ratio.

The current derivatives come from the supplied Snapdraken photo archive. Original-filename provenance and the editorial grouping caveat are recorded in `content/media-sources.md`; confirm the client-specific grouping with Travis before making the portfolio public.

## Edit case studies

There is one MDX file per project in `content/case-studies/`. Frontmatter controls the card and project page:

```yaml
order: 1
title: "Project title"
client: "Client"
year: "2026"
role: "Design and fabrication lead"
scope:
  - "Scenic fabrication"
hero_image: "/media/case-studies/project-hero.webp"
poster_image: "/media/case-studies/project-poster.webp"
gallery:
  - src: "/media/case-studies/project-gallery-01.webp"
    alt: "Specific description of the image"
excerpt: "One concrete sentence about the build."
# Optional when real footage is supplied:
video: "/media/case-studies/project-hover.webm"
```

Write the project narrative below the frontmatter with normal Markdown headings and paragraphs. The build validates required fields and rejects unsafe slugs. The About page content lives in `content/about.mdx`.

## Configure the contact form

Create a Resend account, verify the sending domain, and set these values in `.env.local` and in the Vercel project settings:

```bash
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL="Snapdraken Project Desk <projects@snapdraken.com>"
CONTACT_TO_EMAIL=travis@snapdraken.com
CONTACT_BCC_EMAIL=
```

`CONTACT_BCC_EMAIL` is optional. The API route initializes Resend only when a form is submitted, so missing mail credentials do not break the production build. Update the displayed email or add a phone number in `components/Contact.tsx`.

Optional social links use:

```bash
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_LINKEDIN_URL=
```

## Deploy to Vercel

1. Push the project to a Git provider.
2. Import the repository at Vercel and keep the detected framework preset as Next.js.
3. Add the environment variables above for Production and Preview.
4. Deploy. Vercel will run `npm run build` automatically.

For a direct CLI deployment:

```bash
npx vercel
npx vercel --prod
```

## Point the custom domain

In Vercel, open Project Settings → Domains and add `snapdraken.com` or `crumbaker.studio`. Vercel will show the exact DNS record to add at the domain registrar. After DNS is verified, set:

```bash
NEXT_PUBLIC_SITE_URL=https://snapdraken.com
```

Redeploy so canonical and social metadata use the final hostname.
