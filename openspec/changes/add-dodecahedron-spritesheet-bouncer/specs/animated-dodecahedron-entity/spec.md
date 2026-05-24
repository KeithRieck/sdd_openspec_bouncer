## ADDED Requirements

### Requirement: Dodecahedron Entity Class
The system SHALL define a `Dodecahedron` gameplay entity class that extends `Bouncer`.

#### Scenario: Inheritance model
- **WHEN** the dodecahedron entity is instantiated
- **THEN** it is represented by a class whose inheritance chain includes `Bouncer`

### Requirement: Dodecahedron Simulation Participation
The system SHALL include exactly 4 bouncing `Dodecahedron` entities in the active simulation.

#### Scenario: Dodecahedron spawn count
- **WHEN** simulation entities are initialized
- **THEN** exactly 4 dodecahedron entities are created and active

### Requirement: Dodecahedron Motion Defaults
The system SHALL configure each `Dodecahedron` with a movement speed of 50 pixels per second.

#### Scenario: Dodecahedron startup speed
- **WHEN** a dodecahedron entity is initialized
- **THEN** its initial velocity magnitude is set to 50 pixels per second

### Requirement: Dodecahedron Collision Mass
The system SHALL assign each `Dodecahedron` a collision mass equal to twice the mass of a `Circle`.

#### Scenario: Relative mass lookup
- **WHEN** collision resolution requires class mass values
- **THEN** each dodecahedron contributes mass `2 * Circle.mass`

### Requirement: Spritesheet-Driven Rendering
The system SHALL render `Dodecahedron` instances using frames from the configured dodecahedron spritesheet asset.

#### Scenario: Spritesheet frame usage
- **WHEN** a `Dodecahedron` is created
- **THEN** its displayed texture is sourced from the dodecahedron spritesheet key

### Requirement: Continuous Frame-Cycle Animation
The system SHALL play a looping dodecahedron animation that advances to the next spritesheet frame every 200 milliseconds.

#### Scenario: Animation cadence
- **WHEN** dodecahedron animation is running
- **THEN** the active frame advances at 200-millisecond intervals and loops when the final frame is reached
