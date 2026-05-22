## ADDED Requirements

### Requirement: Mixed Circle Population Composition
The system SHALL run the simulation with two circle entity populations: exactly 16 `Circle` instances and exactly 32 `SmallCircle` instances.

#### Scenario: Population initialization
- **WHEN** the simulation starts
- **THEN** the active entities include 16 circles of the base class and 32 circles of the small class

### Requirement: Circle Class Defaults
The system SHALL configure each `Circle` instance with a 50-pixel diameter and 100 pixels/second initial speed.

#### Scenario: Circle initialization defaults
- **WHEN** a `Circle` is created during startup
- **THEN** its diameter is 50 pixels and its initial velocity magnitude is 100 pixels/second

### Requirement: SmallCircle Class Defaults
The system SHALL define `SmallCircle` as a distinct class extending `Circle`, with a 25-pixel diameter and 200 pixels/second initial speed.

#### Scenario: SmallCircle initialization defaults
- **WHEN** a `SmallCircle` is created during startup
- **THEN** it uses `Circle` inheritance and initializes with 25-pixel diameter and 200 pixels/second initial speed

### Requirement: Class-Specific Random Color Profiles
The system SHALL assign random colors by class profile, with `Circle` colors constrained to pastel output and `SmallCircle` colors constrained to saturated output.

#### Scenario: Color profile assignment
- **WHEN** entities are created for a session
- **THEN** each `Circle` receives a random pastel color and each `SmallCircle` receives a random saturated color
