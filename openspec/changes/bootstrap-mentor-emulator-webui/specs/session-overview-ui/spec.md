## ADDED Requirements

### Requirement: UI SHALL display latest 10 sessions on initial load

The system SHALL render a session overview page that requests and displays the latest 10 sessions during initial page load.

#### Scenario: Initial page load success

- **WHEN** the user opens the application root page
- **THEN** the UI requests the backend session overview endpoint and renders up to 10 sessions

#### Scenario: Empty session list

- **WHEN** the backend returns an empty session list
- **THEN** the UI displays an explicit empty-state message instead of blank content

### Requirement: UI SHALL present session status clearly

The system SHALL show each session status using visual markers and readable text labels.

#### Scenario: Busy session rendering

- **WHEN** a session has busy status
- **THEN** the UI displays a distinct status indicator and label for busy

#### Scenario: Idle session rendering

- **WHEN** a session has idle status
- **THEN** the UI displays a distinct status indicator and label for idle

#### Scenario: Retry session rendering

- **WHEN** a session has retry status
- **THEN** the UI displays retry state details sufficient to differentiate it from idle and busy

### Requirement: UI SHALL use lightweight game-themed styling with CSS/SCSS

The system SHALL apply a game-inspired visual style implemented via CSS/SCSS without introducing any game engine dependency.

#### Scenario: Style implementation technology

- **WHEN** styles are implemented for the overview page
- **THEN** all visual effects are achieved through standard CSS/SCSS and React component structure

#### Scenario: Readability preserved under themed styling

- **WHEN** session cards and status badges are rendered
- **THEN** text and status remain readable and visually distinguishable
