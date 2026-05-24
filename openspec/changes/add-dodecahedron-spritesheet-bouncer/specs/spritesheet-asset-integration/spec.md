## ADDED Requirements

### Requirement: Local Asset Path Integration
The system SHALL load the dodecahedron spritesheet from the project `assets/` directory using static-host-compatible relative paths.

#### Scenario: Asset resolution
- **WHEN** the game preload flow runs
- **THEN** the dodecahedron spritesheet is requested from the configured `assets/` location without backend path rewriting

### Requirement: Animation Definition Registration
The system SHALL register a named Phaser animation for the dodecahedron spritesheet with frame timing equivalent to 200 milliseconds per frame.

#### Scenario: Animation registration behavior
- **WHEN** animation definitions are initialized
- **THEN** the dodecahedron animation key is available and mapped to spritesheet frames at 5 frames per second

### Requirement: Animation Playback on Entity Spawn
The system SHALL start the dodecahedron animation when each `Dodecahedron` instance is initialized.

#### Scenario: Spawn playback
- **WHEN** a `Dodecahedron` instance enters the scene
- **THEN** it begins playing the registered looping animation without requiring user interaction
