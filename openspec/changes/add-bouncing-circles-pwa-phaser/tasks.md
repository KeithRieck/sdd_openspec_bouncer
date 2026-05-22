## 1. App Shell and Phaser Bootstrap

- [ ] 1.1 Create/update root `index.html` to load a pinned Phaser 3.x CDN script and the ES module app entrypoint.
- [ ] 1.2 Implement `src/main.js` game bootstrap with full-viewport Phaser config, `BootScene` as first scene, and resize wiring.
- [ ] 1.3 Add/verify service worker registration in `src/main.js` using subpath-safe relative URL behavior.

## 2. Scene Flow and Simulation Setup

- [ ] 2.1 Implement `BootScene` to perform startup handoff and start `PlayScene` as the final action in `create()`.
- [ ] 2.2 Implement `PlayScene` world initialization with viewport-sized physics bounds and no HUD/overlay UI elements.
- [ ] 2.3 Add spawn orchestration for exactly 64 circles with random positions, random headings, and capped-retry best-effort non-overlap placement.

## 3. Object-Oriented Bouncing Entities

- [ ] 3.1 Implement `Bouncer` class extending Phaser arcade sprite with shared body setup, heading initialization, velocity normalization, and bounds clamping behavior.
- [ ] 3.2 Implement `Circle` class extending `Bouncer` with fixed 50px diameter, radius-based collision body, and fixed per-instance random color.
- [ ] 3.3 Integrate `Circle` instances into `PlayScene` using scene-level colliders while keeping movement logic encapsulated in entity classes.

## 4. Physics Behavior and Runtime Invariants

- [ ] 4.1 Configure elastic boundary bounce behavior and keep all circle centers at least 25px from each viewport edge.
- [ ] 4.2 Configure equal-mass elastic circle-circle collisions and preserve active motion after impacts.
- [ ] 4.3 Enforce the 200 px/s constant speed invariant during runtime to correct collision/drift-induced magnitude changes.

## 5. PWA Assets and Static Hosting Compatibility

- [ ] 5.1 Create/update `manifest.webmanifest` for installable app metadata and correct static-host paths.
- [ ] 5.2 Create/update `sw.js` to cache app shell/core assets for repeat loads and offline-friendly behavior.
- [ ] 5.3 Validate that asset/module/service-worker paths remain compatible with repository subpath deployment.

## 6. Validation and Readiness

- [ ] 6.1 Manually verify acceptance behavior: 64 circles, 50px diameter visuals, random fixed colors, and automatic simulation start.
- [ ] 6.2 Manually verify responsive resizing and bounds updates across desktop and mobile-sized viewports.
- [ ] 6.3 Manually verify PWA behavior (manifest discovery, service worker registration, and offline/repeat-load expectations).
