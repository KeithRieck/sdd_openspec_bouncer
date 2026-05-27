# phaser-pwa-shell Specification

## Purpose
TBD - created by archiving change add-bouncing-circles-pwa-phaser. Update Purpose after archive.
## Requirements
### Requirement: Pinned Phaser Runtime Source
The system SHALL load Phaser from a pinned 4.0 CDN version reference and SHALL NOT use a floating latest tag.

#### Scenario: Engine script loading
- **WHEN** the application HTML is loaded
- **THEN** Phaser is requested from an explicit pinned 4.0 CDN URL

### Requirement: Modular Phaser Game Structure
The system SHALL organize gameplay code using repository Phaser conventions with `BootScene` as the initial scene and object-oriented game entities implemented as `Bouncer` and `Circle` modules.

#### Scenario: Scene handoff and object model
- **WHEN** the game initializes
- **THEN** `BootScene` starts first, transitions into gameplay, and circle entities are represented by a `Circle` class that extends a `Bouncer` base class

### Requirement: Progressive Web App Shell
The system SHALL include and register a web app manifest and service worker so the app remains installable and repeat/offline-friendly under static hosting.

#### Scenario: PWA shell availability
- **WHEN** the user accesses the application with service worker support
- **THEN** the manifest is discoverable and the service worker registers successfully for the app scope

### Requirement: Static Hosting and Subpath Safety
The system SHALL operate as static files with browser ES modules and SHALL use path-safe resource references compatible with repository subpath deployments.

#### Scenario: Subpath deployment compatibility
- **WHEN** the app is served from a non-root static hosting subpath
- **THEN** core resources (module entrypoint, manifest, and service worker registration pathing) resolve without requiring backend rewrites

