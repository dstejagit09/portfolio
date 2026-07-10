# saitejadasari.com — new site (static)

This folder is the **complete, deploy-ready** version of the new site. It is a plain
static site: HTML + CSS + JavaScript, **no framework and no build step**.

## Structure

```
deploy/
├── index.html          ← landing experience (interactive 3D robotics-warehouse scene)
├── portfolio.html      ← card-stack portfolio (opened from index.html)
├── Saiteja-Dasari-Resume.pdf
├── resume.pdf          ← same CV, served at /resume.pdf (a portfolio link points here)
├── vercel.json         ← static caching headers for /uploads
└── uploads/            ← 3D models (.glb), textures, custom cursors — loaded at runtime
    ├── cursor-hud.png
    ├── cursor-hud-grab.png
    ├── humanoid_compressed.glb
    ├── robot-dog-unitree-go1/    (source/go1.glb + textures)
    ├── dcd190f5-.../             (base_basic_pbr.glb)
    └── aaa5e5e4-.../             (hero-rover textures)
```

`index.html` is the entry point. "Skip the ride" and the holographic station open
`portfolio.html`; the portfolio's "← Warehouse" button returns to `index.html`.

## Important
- **Keep `uploads/` and its subfolders exactly as-is.** The paths are hardcoded in
  `index.html` (e.g. `uploads/robot-dog-unitree-go1/source/go1.glb`). Remove or rename a
  file and the 3D scene breaks.
- The site needs internet at runtime — it pulls **Google Fonts** and **Three.js** from
  their CDNs. That's normal; no action needed.
- Works on desktop and touch (phones/iPads): the intro and on-screen controls adapt
  automatically to the device.

## Deploy option A — drag & drop (fastest)
1. Go to vercel.com → your saitejadasari.com project → **Deployments** → drag this whole
   `deploy/` folder in. (Or `npm i -g vercel && vercel --prod` from inside this folder.)
2. Confirm the **Production Domain** is still `saitejadasari.com` (and `www`).

## Deploy option B — hand it to Claude Code
Open Claude Code in your site's repo, drop this `deploy/` folder in, and paste the prompt
below.

---

### Prompt for Claude Code

> I have a new version of my personal site (**saitejadasari.com**) as a **static site** in
> the `deploy/` folder — plain HTML/CSS/JS, **no framework, no build step**. Deploy it to my
> existing Vercel project for saitejadasari.com, fully replacing whatever is there now, and
> keep the custom domain pointed at it.
>
> Structure:
> - `index.html` — the landing experience (interactive 3D robotics-warehouse scene, Three.js from CDN)
> - `portfolio.html` — the card-stack portfolio, reached from `index.html`
> - `uploads/` — 3D models (`.glb`), textures, and custom cursors that `index.html` loads at runtime
> - `Saiteja-Dasari-Resume.pdf` and `resume.pdf` — the CV, linked from the portfolio
> - `vercel.json` — static caching headers
>
> Requirements:
> 1. Deploy as a **static site**. Do NOT add a framework, bundler, or build command. The
>    root/output directory is this folder and `index.html` is the entry.
> 2. Preserve the `uploads/` folder and every subfolder **exactly** — the asset paths are
>    hardcoded in `index.html` (e.g. `uploads/robot-dog-unitree-go1/source/go1.glb`). A
>    missing file breaks the 3D scene.
> 3. Replace the current site content entirely, but keep the `saitejadasari.com` (and `www`)
>    domain attached to this deployment.
> 4. The site loads Google Fonts and Three.js from their CDNs at runtime — that's expected;
>    don't vendor them unless I ask.
> 5. After deploying, give me the URL and confirm: `index.html` loads, the 3D models appear,
>    "Skip the ride" opens `portfolio.html`, and the portfolio "← Warehouse" button returns
>    to `index.html`.
>
> If my current site is a git repo connected to Vercel, commit these files (removing the old
> ones) and push. If it's a drag-and-drop Vercel project, deploy this folder directly.
