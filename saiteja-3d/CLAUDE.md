# saiteja-3d — Interactive 3D Portfolio

## Concept

A robot the user free-roams around a large open grass meadow (like a video game).
Four colored **file-folder** zones — **Projects** (red), **Experience** (orange),
**Education** (blue), **Skills** (violet) — are spread across the meadow; walking
up to one shows "Press E to open ___" and entering opens that section's full-screen
overlay. A top-left hamburger menu also lists the four sections (recruiter path) plus
GitHub / LinkedIn / Contact. A persistent **Resume** button is always visible.

## Environment / zones

- `world/Atmosphere.tsx` — drei `<Sky>` + `<Environment preset="park">` HDRI (IBL),
  a warm directional sun with a soft PCF shadow (`shadow-radius`), hemisphere/ambient
  fill, and a few clouds. NOTE: do **not** use drei `<SoftShadows>` — its PCSS shader
  patch is incompatible with three r0.185 and breaks every standard material.
- `world/Terrain.tsx` + `noise.ts` — large displaced grass plane; flat across the
  whole play area (`FLAT_RADIUS`), hills only beyond it for the far horizon. Procedural
  PBR grass textures (`grassTextures.ts`, max anisotropy). `world/GrassField.tsx` =
  instanced wind-swept blades over the roam disc (count from the quality store);
  `world/Scatter.tsx` = instanced meadow wildflowers/rocks. Both keep a clear patch
  around each folder base.
- `world/FolderZone.tsx` — the four zones: a chunky two-tone file folder (drei
  `<Outlines>`), a flat black-outlined SVG icon rendered to a texture on the front
  (rocket/briefcase/cap/gear), a tall billboard name, and a drei `<Html>` "Press E"
  hint. Lifts/opens/glows when active. Config (positions/colors/routes) in `zones.ts`.
- `world/ZoneField.tsx` — per-frame proximity (`FOLDER_PROX`) → nearby zone in store.
- `world/CameraRig.tsx` — SMOOTH FOLLOW camera (lerps to robot + offset, keeps the
  downward tilt + a sky band). `world/Robot.tsx` free-roams, clamped only at a large
  radius (`MAX_RADIUS`). The robot model/scale/movement/facing/shadow are unchanged.

## Stack

- **Vite + React + TypeScript** — build tooling and app shell.
- **@react-three/fiber + @react-three/drei** — the 3D world (robot, floor, zones, camera).
- **react-router-dom** — section routes.
- **zustand** — global state: player position, which zone is nearby, whether an
  overlay is open, and which one.
- **framer-motion** — card and overlay animation (open/close transitions, deck
  advancement).

## Robot model

The mascot is an OBJ + PBR texture set in `public/models/robot/` (`base.obj` +
`texture_diffuse/normal/roughness/metallic.png`), loaded at runtime by
`world/RobotModel.tsx` (OBJLoader + a MeshStandardMaterial). If it fails to
load, `world/ModelErrorBoundary.tsx` falls back to the capsule placeholder.
The model's facing is controlled by `MODEL_FORWARD_YAW` in RobotModel.tsx — flip
it to `Math.PI` if the robot ever drives backward.

## Routing & overlays

The world (`<Scene>`) and `<HUD>` are always mounted in `App.tsx`, outside
`<Routes>`. Section routes (`/projects`, `/experience`, `/education`, `/skills`,
`/contact`) render only a `<SectionOverlay>` on top of the (blurred) world — so
the robot keeps its position when an overlay opens/closes. `AnimatePresence`
(sync mode, keyed on `location.pathname`) drives enter/exit. Entering a zone
calls `enterZone`, which `App` overrides to `navigate(\`/\${zone}\`)`. While any
overlay is open, `overlayOpen` is set in the store and `Robot` freezes movement.
Esc or the close button navigates back to `/`.

Reusable `<CardStack>` (`ui/CardStack.tsx`) is the advancing deck used by section
routes: fixed cover card + a deck that auto-advances (~3s), with prev/next, dots,
and touch swipe. It takes a generic `CardItem[]`; `Project`/`Experience`/`Education`
map to that shape. `CardItem.badge` renders a small type pill (used by Experience).
Skills/Contact are bespoke section components, not card stacks.

Section components are **lazy-loaded** (`React.lazy` in `App.tsx`, Suspense inside
`SectionOverlay`) so each ships as its own chunk. The hamburger menu lists all four
sections plus Contact so the site is fully navigable without driving the robot.

## Deploy (Vercel)

Static Vite SPA. `vercel.json` rewrites all paths to `/index.html` (so deep links
like `/projects` work) and long-caches `/models` + `/assets`. Build: `npm run build`
→ `dist/`. Sharing metadata (title, description, OG/Twitter, `public/og-image.png`,
`public/favicon.svg`) lives in `index.html`; OG/canonical URLs point at
`https://saitejadasari.com`. NOTE: the robot is OBJ + PNG (there is no GLB); the OBJ
is text and is served gzip/brotli-compressed by Vercel (~1.45MB → ~455KB).

Note: `vite.config.ts` dedupes `react`/`react-dom` (not just `three`) — without
it, framer-motion resolves a second React instance and throws "Invalid hook
call" on every motion component.

## Post-processing & quality

The zones are the **folder** objects described under "Environment / zones" above.
(An earlier iteration used stone-bordered water ponds; all pond code — `Pond*`,
`pondShape`, `pondConstants`, `pbr`, `rockGeometry`, `Signpost`, `Bench`, `PondLife`
— and the `public/textures/{rock,gravel,mulch}` PBR sets were removed when it changed
to folders. The grass onBeforeCompile note below still applies.)

- `GrassField.tsx` — instanced blades with wind sway. The material is a
  `MeshStandardMaterial` patched via `onBeforeCompile` (NOT a raw ShaderMaterial —
  raw shaders that `#include` three's tonemapping/colorspace *pars* double-define
  functions → "already has a body" compile errors). Count from `GRASS_COUNTS`.
- `PostFX.tsx` — `@react-three/postprocessing` EffectComposer: N8AO, Bloom, ACES
  `ToneMapping`, HueSaturation + BrightnessContrast (moody grade), SMAA, optional
  DoF. IMPORTANT: the composer forces the renderer's tone mapping off, so ACES must
  live in the pipeline (`ToneMapping` effect); a `ToneMappingController` `useFrame`
  deterministically sets renderer→NoToneMapping while the composer is on (else ACES)
  to avoid a double tone-map. Exposure ~0.85 for a moodier look. Ground textures use
  `gl.capabilities.getMaxAnisotropy()`, dpr capped at 2.
- Quality UI: `ui/QualityPanel.tsx` (bottom-right gear). Perf-cut order: grass
  count → DoF → reflections.

## Data

Content lives in `src/data/` as hand-authored files (not generated by Claude,
do not overwrite): `types.ts`, `profile.ts`, `projects.ts`, `experience.ts`,
`education.ts`, `skills.ts`. Read these to understand the shapes and import from
them everywhere instead of hardcoding content in components.

## Folder layout

```
src/
  world/      3D scene: floor, zones, robot, camera, lighting
  controls/   input handling — keyboard driving now, joystick later
  ui/         hamburger menu, resume button, HUD chrome
  sections/   overlay content for Projects / Experience / Education / Skills
  data/       hand-authored content files (see above)
  store/      zustand stores
  styles/     global/shared CSS
```

## Feel

- Camera is a tilted smooth **follow-cam** tracking the robot as it free-roams the
  open meadow, keeping a sky band at the top.
- Sections open as full-screen overlays on top of the 3D world.
- Projects / Experience / Education render as an **advancing card stack**: a fixed
  cover card on the left, and a deck on the right that advances one card at a time.
- Skills render as pill badges, not cards.

## Roadmap / constraints

- **PC first.** Mobile is a later, dedicated phase.
- Movement input must stay abstracted behind a single input vector (e.g.
  `{ x, y }` in `controls/`) so that swapping keyboard input for an on-screen
  joystick later doesn't touch the world/camera/player logic at all.
- Don't build mobile-specific UI (joystick, touch zones) until asked.
