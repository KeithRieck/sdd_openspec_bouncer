## ADDED Requirements

### Requirement: Class-Based Mass Assignment
The system SHALL model `Circle` entities with relative mass 4 and `SmallCircle` entities with relative mass 1 for collision resolution.

#### Scenario: Mixed-class collision mass lookup
- **WHEN** a collision is resolved between a `Circle` and a `SmallCircle`
- **THEN** the resolver uses masses 4 and 1 respectively

### Requirement: Custom Elastic Collision Resolver
The system SHALL resolve circle-circle impacts using a custom 2D equal-restitution elastic collision algorithm rather than relying solely on default engine response.

#### Scenario: Custom resolver invocation
- **WHEN** any two circle entities collide
- **THEN** the system applies the custom elastic resolver to compute post-collision velocities

### Requirement: Physics-First Post-Collision Velocity Policy
The system SHALL preserve post-collision velocities computed by the mass-based resolver and SHALL NOT renormalize entities back to class target speeds after collision.

#### Scenario: No post-collision speed lock
- **WHEN** a collision has been resolved
- **THEN** entity speed magnitudes remain as produced by the collision math without class-target rescaling
