## Why

We need a concrete, spec-backed implementation for a static browser experience that demonstrates Phaser physics behavior while remaining installable and offline-capable as a Progressive Web App. Defining this now aligns product expectations (64 circles, strict motion rules, responsive behavior) with maintainable project conventions before implementation begins.

## What Changes

- Add a full-viewport Phaser web app that auto-starts with exactly 64 bouncing circles.
- Enforce simulation constraints: 50px circle diameter, fixed 200 px/s movement, elastic wall and circle-circle collisions, and no HUD/controls.
- Implement object-oriented game entities with a reusable `Bouncer` class extending Phaser sprite behavior and a `Circle` class extending `Bouncer`.
- Preserve static-site and no-build-step operation using browser ES modules and pinned Phaser 3.x CDN loading.
- Treat the app as a PWA by including/maintaining manifest and service worker behavior for installability and repeat/offline-friendly usage.
- Support viewport resize handling so canvas and physics bounds stay aligned on desktop and mobile.

## Capabilities

### New Capabilities
- `bouncing-circles-simulation`: Defines gameplay/runtime requirements for spawning, movement invariants, collisions, visuals, and responsive viewport behavior.
- `phaser-pwa-shell`: Defines static app shell requirements for pinned Phaser loading, modular scene/object structure, and PWA manifest/service-worker behavior.

### Modified Capabilities
- None.

## Impact

- Affected code: `index.html`, `src/main.js`, `src/scenes/`, `src/game/`, `sw.js`, `manifest.webmanifest`.
- Runtime dependencies: pinned Phaser 3.x CDN script.
- Delivery model: static hosting compatibility (including repository subpaths) remains required.
- Development flow: implementation follows repository `phaser-game` conventions with `BootScene` as the first loaded scene.
