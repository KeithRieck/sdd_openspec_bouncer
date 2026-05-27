## Context

This change introduces a static, browser-only Phaser application that renders a full-viewport simulation of 64 bouncing circles with strict runtime constraints (fixed size, fixed speed, elastic collisions, and no overlays). The repository convention favors plain ES modules, no build step, and PWA compatibility using a manifest and service worker. The user additionally requested an object-oriented model with `Bouncer` and `Circle` classes, and alignment with local `phaser-game` conventions that require `BootScene` as first scene and path-safe static hosting behavior.

## Goals / Non-Goals

**Goals:**
- Deliver a Phaser 4.0 simulation that starts automatically on page load with exactly 64 circles.
- Enforce circle invariants: 50px diameter and 200 px/s constant speed across runtime drift and collisions.
- Implement reusable OOP movement behavior in `Bouncer` (extends Phaser sprite) and concrete `Circle` entities (extends `Bouncer`).
- Support responsive full-viewport rendering and physics-bound updates on resize.
- Preserve PWA shell behavior (manifest + service worker + static hosting compatibility).

**Non-Goals:**
- Adding scoring, HUD, controls, menus, or text overlays.
- Introducing backend services, persistence, auth, or multiplayer.
- Introducing build tooling, framework migration, or runtime dependency beyond pinned Phaser CDN.
- Defining a deterministic seeded RNG mode.

## Decisions

1. **Scene lifecycle uses `BootScene` -> `PlayScene`**
   - Rationale: Matches repository conventions and keeps startup responsibilities explicit.
   - Alternative considered: single-scene startup. Rejected due to reduced clarity and convention mismatch.

2. **Use Arcade Physics with elastic response and post-collision normalization**
   - Rationale: Arcade Physics provides fast native collision handling for 64 moving bodies; explicit normalization enforces strict 200 px/s requirement after numeric drift.
   - Alternative considered: custom collision solver. Rejected due to complexity with little benefit for this scale.

3. **`Bouncer` base class encapsulates shared kinetic behavior**
   - Rationale: Centralizes velocity heading, speed normalization, clamp-to-bounds logic, and shared physics body setup to avoid scene-level duplication.
   - Alternative considered: keeping all movement logic in `PlayScene`. Rejected due to poor extensibility and weaker OOP separation.

4. **`Circle` subclass owns visual/shape concerns**
   - Rationale: `Circle` constrains diameter/radius and fixed per-instance random color while inheriting movement behavior from `Bouncer`.
   - Alternative considered: generic `Bouncer` with color/size configuration only. Rejected to preserve clear intent and domain-specific type.

5. **Best-effort spawn with capped retries for overlap avoidance**
   - Rationale: Satisfies requirement to continue startup even when perfect packing is impossible on small viewports.
   - Alternative considered: hard-fail startup if overlap-free placement fails. Rejected because it violates expected startup behavior.

6. **Pinned Phaser 4.0 CDN script in `index.html` plus modular local ES files**
   - Rationale: Meets static/no-build constraint and explicit pinning requirement while preserving maintainable module structure.
   - Alternative considered: npm/bundled Phaser. Rejected by project constraints.

7. **Keep relative URL semantics for PWA resources and service worker registration**
   - Rationale: Preserves deployability under repository subpaths and static hosts.
   - Alternative considered: absolute-root paths. Rejected due to subpath break risk.

## Risks / Trade-offs

- **[Physics drift under repeated collisions]** -> Mitigate by re-normalizing velocity magnitude for all circles during update ticks.
- **[High overlap on very small screens]** -> Mitigate with capped retries and fallback placement; document that initial overlap may occur in constrained viewports.
- **[PWA offline gaps with CDN-hosted Phaser]** -> Mitigate by caching app shell locally and documenting CDN dependency behavior; optionally evaluate local vendoring later.
- **[Resize edge cases trapping bodies near walls]** -> Mitigate by updating world bounds and clamping all circle centers within padded bounds after resize.
- **[Texture proliferation if every color is unique]** -> Mitigate by generating one texture per circle at startup only (64 max), acceptable for current scope.
