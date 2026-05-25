## MODIFIED Requirements

### Requirement: Simulation Starts With Exactly Sixty-Four Circles
The system SHALL automatically start the simulation on page load and initialize exactly 48 circles in motion, composed of 16 `Circle` entities and 32 `SmallCircle` entities.

#### Scenario: Auto-start on initial load
- **WHEN** the user opens the application page in a supported browser
- **THEN** the simulation starts without user interaction and activates the required mixed populations

### Requirement: Constant Velocity Magnitude
The system SHALL set class-specific initial speeds at startup (100 pixels/second for `Circle`, 200 pixels/second for `SmallCircle`) and SHALL preserve mass-based post-collision results without renormalizing back to class targets.

#### Scenario: Speed policy during runtime
- **WHEN** entities are initialized and later experience collisions
- **THEN** startup speeds follow class defaults and post-collision magnitudes follow custom collision outputs without forced target-speed resets
