## Context

The current Phaser implementation centers on bouncing circle entities with physics behavior encapsulated in a `Bouncer` base class. The new requirement introduces a non-circle, animated sprite entity (`Dodecahedron`) that should still reuse shared bounce behavior while rendering from a project-local spritesheet in `assets/`.

## Goals / Non-Goals

**Goals:**
- Add a `Dodecahedron` class that extends `Bouncer` and can participate in existing bounce behavior.
- Load the new dodecahedron spritesheet from `assets/` via the scene preload flow.
- Define an animation that advances one spritesheet frame every 200 milliseconds and loops continuously.
- Spawn exactly 4 dodecahedron entities in the simulation.
- Configure `Dodecahedron` speed as 50 pixels/second.
- Set `Dodecahedron` collision mass to 2x `Circle` mass for custom collision resolution.
- Keep implementation aligned with static-hosted Phaser conventions and no-build workflow.

**Non-Goals:**
- Changing existing circle class physics contracts unless needed for compatibility.
- Introducing external asset pipelines or runtime tooling.
- Adding UI controls or HUD elements for animation debugging.

## Decisions

1. **Inheritance: `Dodecahedron` extends `Bouncer` directly**
   - Rationale: The entity is sprite-sheet driven and not a circle-rendered primitive, so inheriting from `Circle` would add unnecessary texture-generation assumptions.
   - Alternative considered: extend `Circle`. Rejected because `Circle` is specialized around generated circular textures and class-specific color logic.

2. **Asset loading in scene preload with fixed key**
   - Rationale: Scene-managed preload is the standard Phaser pattern and keeps animation setup deterministic.
   - Alternative considered: lazy loading during entity creation. Rejected due to runtime timing complexity and possible missing-texture race.

3. **Animation cadence by frameRate mapping**
   - Rationale: 200ms per frame maps to 5 frames per second (`1000 / 200`), making cadence explicit and stable.
   - Alternative considered: timer-driven `setFrame` loop. Rejected in favor of native Phaser animation system.

4. **Shared animation key reuse**
   - Rationale: Register one animation key globally and reuse across all dodecahedron instances to avoid duplicate animation registration overhead.
   - Alternative considered: per-instance animation definitions. Rejected for inefficiency and key collision risk.

5. **Dodecahedron simulation defaults**
   - Rationale: Treat `Dodecahedron` as a first-class simulation entity with explicit defaults: 4 instances, 50 px/s movement speed, and relative mass 2x `Circle`.
   - Alternative considered: deriving values from generic scene config at runtime. Rejected for weaker acceptance verifiability.

## Risks / Trade-offs

- **[Spritesheet frame dimensions mismatched in config]** -> Mitigation: define explicit frame width/height in preload and verify animation frame count at startup.
- **[Animation key duplicate registration on scene restarts]** -> Mitigation: guard with `anims.exists(key)` before creating animation.
- **[Bouncer collision body shape not matching sprite art]** -> Mitigation: set and document pragmatic collision body sizing for gameplay consistency.
- **[Asset path issues under subpath hosting]** -> Mitigation: use relative `assets/` references consistent with current static deployment constraints.
