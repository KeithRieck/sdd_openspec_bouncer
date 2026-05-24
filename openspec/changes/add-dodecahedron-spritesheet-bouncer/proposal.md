## Why

The simulation currently focuses on circle entities and lacks a reusable animated sprite-based bouncer type. Adding a `Dodecahedron` class introduces a richer animated entity pattern while preserving the existing object-oriented `Bouncer` foundation.

## What Changes

- Add a new `Dodecahedron` class that extends `Bouncer`.
- Load and use a dodecahedron spritesheet from the `assets/` directory for this entity.
- Add a sprite animation that advances to the next spritesheet frame every 200 milliseconds.
- Integrate exactly 4 bouncing `Dodecahedron` entities into the active simulation.
- Set `Dodecahedron` movement speed to 50 pixels/second.
- Use class-based collision mass where each `Dodecahedron` has twice the mass of a `Circle`.

## Capabilities

### New Capabilities
- `animated-dodecahedron-entity`: Defines requirements for a `Dodecahedron` bouncer entity using spritesheet-driven animation timing.
- `spritesheet-asset-integration`: Defines requirements for loading and wiring spritesheet assets from project-local `assets/` paths for gameplay entities.

### Modified Capabilities
- None.

## Impact

- Affected code: `src/game/` class modules, scene setup/loading in `src/scenes/`, and potentially `src/main.js` wiring if asset preload flow changes.
- Affected assets: new dodecahedron spritesheet under `assets/`.
- Runtime behavior: adds continuous frame-cycling animation at 200ms cadence, 4 active dodecahedron entities, and mass-aware collision participation.
