# bouncing-circles-simulation Specification

## Purpose
TBD - created by archiving change add-bouncing-circles-pwa-phaser. Update Purpose after archive.
## Requirements
### Requirement: Simulation Starts With Exactly Sixty-Four Circles
The system SHALL automatically start the simulation on page load and initialize exactly 48 circles in motion, composed of 16 `Circle` entities and 32 `SmallCircle` entities.

#### Scenario: Auto-start on initial load
- **WHEN** the user opens the application page in a supported browser
- **THEN** the simulation starts without user interaction and activates the required mixed populations

### Requirement: Circle Shape and Visual Identity
The system SHALL render each circle as a solid disc with a 50-pixel diameter and assign a random color that remains fixed for that circle during the session.

#### Scenario: Fixed diameter and persistent per-circle color
- **WHEN** circles are created for a simulation session
- **THEN** each circle is rendered as a 50-pixel solid disc and keeps its assigned color until the session ends

### Requirement: Constant Velocity Magnitude
The system SHALL set class-specific initial speeds at startup (100 pixels/second for `Circle`, 200 pixels/second for `SmallCircle`) and SHALL preserve mass-based post-collision results without renormalizing back to class targets.

#### Scenario: Speed policy during runtime
- **WHEN** entities are initialized and later experience collisions
- **THEN** startup speeds follow class defaults and post-collision magnitudes follow custom collision outputs without forced target-speed resets

### Requirement: Elastic Boundary and Circle Collisions
The system SHALL resolve boundary impacts and circle-circle contacts as elastic collisions while keeping each circle fully visible within viewport bounds.

#### Scenario: Boundary collision response
- **WHEN** a circle reaches any viewport boundary
- **THEN** the system applies an elastic bounce and clamps the circle center to remain at least 25 pixels from each edge

#### Scenario: Circle-circle collision response
- **WHEN** two circles collide
- **THEN** the system resolves the interaction as an equal-mass elastic collision and both circles remain in active motion

### Requirement: Best-Effort Non-Overlap Spawning
The system SHALL attempt non-overlapping random initial placement for all circles using capped retries per circle, and SHALL continue startup even if strict non-overlap is not achievable.

#### Scenario: Constrained viewport spawn fallback
- **WHEN** viewport dimensions cannot accommodate 64 non-overlapping circles at 50-pixel diameter
- **THEN** the system applies capped-retry placement attempts and continues simulation startup with best-effort positions

### Requirement: Responsive Viewport and Physics Bounds
The system SHALL resize the game canvas to fill the viewport and update physics bounds whenever viewport dimensions change.

#### Scenario: Resize handling
- **WHEN** the browser viewport size changes
- **THEN** the canvas size and active physics world bounds update to match the new viewport

