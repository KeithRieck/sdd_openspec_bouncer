## Why

We need a new simulation profile that mixes differently sized circle entities, distinct visual styles, and mass-aware collision behavior to support richer motion dynamics than the original single-population setup. Capturing this as a separate change keeps prior baseline work stable while introducing a clearly defined physics upgrade.

## What Changes

- Change simulation population from a single 64-circle set to mixed populations: 16 `Circle` entities and 32 `SmallCircle` entities.
- Update `Circle` behavior to use 50px diameter, 100 px/s initial speed, and random pastel coloring.
- Add a new `SmallCircle` class with 25px diameter, 200 px/s initial speed, and random saturated coloring.
- Implement custom elastic circle-circle collision resolution using explicit masses where `Circle` has four times the mass of `SmallCircle`.
- Adopt a physics-first collision policy: preserve custom mass-based collision results without post-collision speed renormalization.

## Capabilities

### New Capabilities
- `mixed-circle-entities`: Defines requirements for mixed `Circle` and `SmallCircle` populations, per-class size/speed defaults, and color-style constraints.
- `mass-weighted-collision-resolution`: Defines custom elastic collision behavior with class-based mass ratios and physics-first post-collision handling.

### Modified Capabilities
- `bouncing-circles-simulation`: Updates baseline simulation requirements for population counts, speed targets, and color constraints to support mixed entity behavior.

## Impact

- Affected code: `src/scenes/PlayScene.js`, `src/game/Circle.js`, new `src/game/SmallCircle.js`, and shared physics logic in `src/game/Bouncer.js` or scene-level resolver modules.
- Behavior impact: collision outcomes become mass-dependent and no longer enforce class speed locks after collision events.
- Validation impact: acceptance checks must verify mixed population counts, class-specific visuals, and custom collision response semantics.
