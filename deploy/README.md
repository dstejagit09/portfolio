# saitejadasari.com: dual portfolio (Robotics + Signal Integrity)

`deploy-dual/` is the **complete, deploy-ready** site: plain static HTML/CSS/JS, no framework, no build step.
It is a full copy of the current `deploy/` folder (every video, photo, 3D model, texture, PDF and the
3D warehouse) plus the new pages. Repo: `github.com/dstejagit09/portfolio`.

## Files

```
deploy-dual/
├── index.html                  NEW entry: landing chooser + Signal Integrity portfolio + Robotics view
├── robotics-frame.html         Robotics portfolio (the old deploy/index.html, with the edits below)
├── robotics-warehouse-sim.html 3D warehouse (only change: its exit returns to /#robotics instead of /)
├── portfolio.html              old link, now redirects to /#robotics
├── Saiteja-Dasari-SI-Resume.pdf NEW: SI resume (linked from the Signal Integrity side)
├── Saiteja-Dasari-Resume.pdf, resume.pdf   robotics resume (unchanged)
├── favicon.svg, favicon-32.png, apple-touch-icon.png
├── vercel.json                 unchanged
└── uploads/                    unchanged (videos, photos, .glb models, textures, cursors)
```

## What changed vs. the live site
- `/` is now a landing page: name + two cards (Robotics, Signal Integrity), LinkedIn top right.
- Signal Integrity portfolio (inside `index.html`): 7 cards, same size as the Robotics cards:
  Profile, Education, Projects (popup per project), Experience, Skills, Certifications, Contact & Socials.
- Robotics (`robotics-frame.html`) = old `deploy/index.html` with only these edits:
  header name, subtitle and divider line removed (3D invite box moved up); card descriptions justified;
  Contact: location card removed, Download CV card made plain; warehouse links open full page
  (`target="_top"`); deep links read from `?path=` so old shared links keep working.
- URLs: `/` landing · `/#robotics` or `/robotics` · `/#signal-integrity` or `/signal-integrity`.
  Old links like `/projects/fault-tolerant`, `/build-log/honeywell`, `/skills` open Robotics at that card.

---

## Prompt for Claude Code

Open Claude Code in `C:\Users\sdas8\Downloads\portfolio` and paste:

> My site saitejadasari.com is a static site in the `deploy/` folder of this repo, hosted on Vercel.
> The new version of the site is in `deploy-dual/` and is final. Read `deploy-dual/README.md` first.
>
> 1. Find out how Vercel deploys this site (project settings / `.vercel` / Root Directory, git-connected or
>    CLI) and tell me before changing anything.
> 2. Make the live site serve exactly the contents of `deploy-dual/`. Preferred: copy every file from
>    `deploy-dual/` into `deploy/` (overwriting `index.html`, `robotics-warehouse-sim.html`,
>    `portfolio.html`, `README.md`, and adding `robotics-frame.html` and `Saiteja-Dasari-SI-Resume.pdf`),
>    so the Vercel Root Directory stays `deploy`. Do not delete anything else in `deploy/`.
> 3. Do NOT edit, rename, reformat, minify, re-encode or "optimize" any of these files, and do not add a
>    framework, bundler or build step. Keep `vercel.json` exactly as it is. Static files are served
>    before its rewrite, so `/robotics-frame` and `/robotics-warehouse-sim` still resolve.
> 4. Do not commit `deploy-dual/` or `dual-portfolio-mockup/` to the repo (they are working copies;
>    add them to `.gitignore`).
> 5. Test locally first (`node static-server.mjs` or `npx serve deploy`) and check:
>    - `/` shows the name and the two cards; both cards open their portfolio
>    - `/#signal-integrity`: 7 cards, arrow buttons work, each project opens its popup,
>      SI Resume and Contact links work, `Saiteja-Dasari-SI-Resume.pdf` opens
>    - `/#robotics`: robotics portfolio fills the screen, all 7 sections, videos and photos load
>    - "Enter the warehouse" opens the 3D warehouse full page and its exit returns to `/#robotics`
>    - `/projects/fault-tolerant` opens Robotics on that project; `/resume.pdf` loads
>    - "All portfolios" returns to the landing page; layout works at phone width
> 6. Show me the diff summary, then wait. Only commit, push and deploy when I say "deploy".
>    Commit message: "feat: dual portfolio (robotics + signal integrity)".
> 7. After deploying, re-run the checks in step 5 on https://saitejadasari.com and report the results.
