## ADDED Requirements

### Requirement: Project SHALL be initialized with TypeScript React frontend and Koa backend

The system SHALL provide a runnable workspace containing a React frontend and a Koa backend, both using TypeScript.

#### Scenario: Repository structure after bootstrap

- **WHEN** project bootstrap is completed
- **THEN** the repository contains dedicated frontend and backend application directories with TypeScript configurations

#### Scenario: Local development startup

- **WHEN** a developer runs the workspace development command
- **THEN** frontend and backend development processes start successfully for local integration

### Requirement: Frontend SHALL use Vite and SCSS

The system SHALL configure the frontend build and development workflow with Vite and enable SCSS stylesheets.

#### Scenario: SCSS import support

- **WHEN** frontend code imports an `.scss` file
- **THEN** the development server compiles and applies styles without additional manual setup

#### Scenario: API proxy for local development

- **WHEN** frontend sends API requests during local development
- **THEN** Vite proxy forwards API requests to the Koa backend to avoid browser cross-origin issues

### Requirement: Project SHALL include ESLint and Prettier baseline configuration

The system SHALL include linting and formatting tooling with scripts for consistent code quality.

#### Scenario: Lint script availability

- **WHEN** a developer runs the lint command
- **THEN** ESLint executes against both frontend and backend source code

#### Scenario: Format script availability

- **WHEN** a developer runs the format command
- **THEN** Prettier formats supported files according to repository rules
