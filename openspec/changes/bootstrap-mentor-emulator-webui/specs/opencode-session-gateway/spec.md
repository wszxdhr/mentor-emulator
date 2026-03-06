## ADDED Requirements

### Requirement: Backend SHALL provide latest session list endpoint

The system SHALL expose a backend API endpoint that returns the latest OpenCode sessions with a default limit of 10 items.

#### Scenario: Default latest sessions response

- **WHEN** the client requests the session list endpoint without custom limit
- **THEN** the backend returns at most 10 sessions sorted by most recently updated

#### Scenario: Session fields are normalized for UI consumption

- **WHEN** the backend receives session objects from OpenCode
- **THEN** the backend response includes stable fields for each item, including session id, title, created time, updated time, and directory

### Requirement: Backend SHALL provide session status in list payload

The system SHALL enrich each returned session with its current status by combining session list and session status sources.

#### Scenario: Status available for session

- **WHEN** a session has status information from OpenCode
- **THEN** the backend includes that status value in the corresponding session item

#### Scenario: Status missing for session

- **WHEN** a session does not have status information in the current status snapshot
- **THEN** the backend returns a safe fallback status value that the UI can render deterministically

### Requirement: Backend SHALL fail gracefully on OpenCode errors

The system SHALL return structured error responses when OpenCode is unreachable, misconfigured, or returns invalid data.

#### Scenario: OpenCode unavailable

- **WHEN** backend calls to OpenCode fail due to connectivity or startup issues
- **THEN** the backend returns an error response with machine-readable code and human-readable message

#### Scenario: Partial aggregation failure

- **WHEN** session list retrieval succeeds but status retrieval fails
- **THEN** the backend still returns session list data and applies fallback status values
