## Context

The current in-progress Phaser simulation change is built around one circle class and uniform collision handling. The new requirement introduces mixed entity populations (`Circle` and `SmallCircle`) with different diameters, initial speeds, and color profiles, plus a custom mass-based collision resolver where `Circle` mass is 4x `SmallCircle` mass. The collision policy is physics-first, which means post-collision velocities from the custom resolver must be preserved rather than normalized back to class speed targets.

## Goals / Non-Goals

**Goals:**
- Support simultaneous simulation of 16 `Circle` entities and 32 `SmallCircle` entities.
- Keep `SmallCircle` object-oriented by extending existing circle behavior where sensible.
- Apply class-specific visual rules: pastel random colors for `Circle`, saturated random colors for `SmallCircle`.
- Replace generic/equal-response circle collision handling with custom elastic 2D collision resolution using mass ratio `Circle=4`, `SmallCircle=1`.
- Preserve static hosting and existing PWA shell expectations.

**Non-Goals:**
- Introducing non-elastic collision behavior, drag, or gravity.
- Adding HUD, controls, or gameplay scoring systems.
- Replacing Phaser runtime or adding build tooling.

## Decisions

1. **`SmallCircle` extends `Circle`**
   - Rationale: Reuses texture-generation and disc rendering behavior while specializing defaults (diameter/speed/color profile).
   - Alternative considered: `SmallCircle` extends `Bouncer`. Rejected because it duplicates circle rendering behavior.

2. **Split spawn populations in `PlayScene`**
   - Rationale: explicit class counts (16 and 32) are easier to verify and maintain than one generic pooled spawn routine.
   - Alternative considered: one parameterized loop with entity descriptors. Rejected for reduced readability during initial rollout.

3. **Custom 2D elastic resolver with class masses**
   - Rationale: required to enforce mass asymmetry (4:1) and produce physically meaningful outcomes for mixed classes.
   - Alternative considered: Phaser default collider response. Rejected because it does not encode class mass requirement directly.

4. **Physics-first post-collision policy**
   - Rationale: explicit user decision; no speed renormalization after collisions so mass-based energy/momentum transfer is preserved.
   - Alternative considered: hybrid re-normalization. Rejected due to conflict with chosen policy.

5. **Color generation by HSL profiles**
   - Rationale: gives predictable style buckets for pastel vs saturated random colors while keeping randomness high.
   - Alternative considered: fixed palettes. Rejected for lower variation and repetitive visuals.

## Risks / Trade-offs

- **[Custom collision math instability at high overlap]** -> Mitigation: add positional separation and guard against divide-by-zero normals.
- **[Physics-first speeds diverge from initial class speeds over time]** -> Mitigation: document this as intentional behavior in specs and validation.
- **[Pastel/saturated thresholds may look inconsistent across displays]** -> Mitigation: tune HSL ranges and keep deterministic conversion logic per class.
- **[Mixed-size collisions increase edge-case complexity near world bounds]** -> Mitigation: continue per-entity bounds clamping using class radius.
