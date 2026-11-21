# Portfolio — Kouamé KONAN

Personal site, deployed on Vercel: https://portfolio-kouame.vercel.app

Vite + React + TypeScript, single page, French and English. All texts live in
`src/content.ts`; a project result that has not been checked against a report or a run is
left empty and shown as "to be completed".

```bash
npm install
npm run dev      # local development
npm run build    # type check + production build in dist/
```

The CV source is `cv/cv.html`. To regenerate the PDF served by the site:

```bash
msedge --headless=new --no-pdf-header-footer --print-to-pdf=public/Kouame-KONAN-CV.pdf cv/cv.html
```
