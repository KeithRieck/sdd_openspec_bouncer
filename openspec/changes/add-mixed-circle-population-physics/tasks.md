## 1. Mixed Population Refactor

- [x] 1.1 Update simulation spawn logic to create exactly 16 `Circle` instances and 32 `SmallCircle` instances.
- [x] 1.2 Add and wire a new `SmallCircle` class that extends `Circle` with default diameter 25 and default initial speed 200.
- [x] 1.3 Update `Circle` defaults to diameter 50 and initial speed 100 while preserving existing base behavior integration.

## 2. Class-Specific Color Profiles

- [x] 2.1 Implement pastel random color generation for `Circle` instances.
- [x] 2.2 Implement saturated random color generation for `SmallCircle` instances.
- [x] 2.3 Verify texture generation/caching remains stable with mixed color profiles and class sizes.

## 3. Mass-Weighted Collision System

- [x] 3.1 Implement custom 2D elastic collision resolver with class-based masses (`Circle=4`, `SmallCircle=1`).
- [x] 3.2 Integrate the custom resolver into runtime collision handling for all circle-pair interactions.
- [x] 3.3 Add overlap-separation safeguards and zero-distance guards to prevent unstable collision artifacts.

## 4. Physics-First Runtime Policy

- [x] 4.1 Remove post-collision speed renormalization that forces class speed targets after impacts.
- [x] 4.2 Keep class speed values as startup defaults only, preserving collision-generated velocity outcomes thereafter.
- [x] 4.3 Confirm world-bounds bounce behavior still works correctly for both radius sizes.

## 5. Validation and Acceptance

- [x] 5.1 Validate mixed population counts and class-specific sizes/speeds at startup.
- [x] 5.2 Validate visual constraints: `Circle` colors appear pastel and `SmallCircle` colors appear saturated.
- [x] 5.3 Validate mass-weighted collisions qualitatively show heavier `Circle` and lighter `SmallCircle` response differences without post-collision speed locking.
