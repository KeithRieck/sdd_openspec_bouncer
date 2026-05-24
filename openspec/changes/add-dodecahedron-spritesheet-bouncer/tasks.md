## 1. Dodecahedron Entity Foundation

- [x] 1.1 Add a `Dodecahedron` class module in `src/game/` that extends `Bouncer`.
- [x] 1.2 Define constructor defaults and sprite setup for the dodecahedron texture key, including default speed 50 px/s.
- [x] 1.3 Ensure collision body and shared bounce behavior remain compatible with existing `Bouncer` integration.
- [x] 1.4 Assign `Dodecahedron` collision mass to be exactly twice `Circle` mass.

## 2. Spritesheet Asset Wiring

- [x] 2.1 Add the dodecahedron spritesheet file under `assets/` with documented frame dimensions.
- [x] 2.2 Load the dodecahedron spritesheet in the appropriate preload flow using static-host-safe relative asset paths.
- [x] 2.3 Verify spritesheet key availability before dodecahedron entity creation.

## 3. Animation Registration and Playback

- [x] 3.1 Create a reusable Phaser animation key for dodecahedron frames with 5 FPS timing (200ms per frame).
- [x] 3.2 Guard animation registration against duplicate key creation during scene reload/restart.
- [x] 3.3 Start looping dodecahedron animation automatically when each `Dodecahedron` instance is initialized.

## 4. Scene Integration

- [x] 4.1 Integrate `Dodecahedron` entity creation into the relevant scene/entity orchestration path with exactly 4 spawned instances.
- [x] 4.2 Confirm dodecahedron entities render and animate while participating in movement/collision updates.
- [x] 4.3 Validate no regressions to existing circle entity behavior from shared scene changes.

## 5. Validation and Acceptance

- [x] 5.1 Validate dodecahedron spritesheet loads from `assets/` in standard static hosting.
- [x] 5.2 Validate animation visibly advances one frame every 200ms and loops continuously.
- [x] 5.3 Validate dodecahedron count is exactly 4 and movement speed is 50 px/s at startup.
- [x] 5.4 Validate `Dodecahedron` inherits and exhibits `Bouncer` movement behavior in runtime.
- [x] 5.5 Validate dodecahedron collisions use mass contribution equal to twice `Circle` mass.
