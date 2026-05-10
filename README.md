# NexaDesk

## Project Overview

NexaDesk is a fully-featured, production-grade IT Service Management (ITSM) frontend application built with modern Angular (v21+) and PrimeNG. Designed to replicate the complexity of real enterprise platforms like ServiceNow and Jira, it demonstrates advanced Angular architecture, state management, real-time UI patterns, and enterprise-level component design — all powered by a robust mock API with zero backend dependency.

## Key Features & Capabilities

*   **Enterprise-Grade ITSM Interface:** A meticulously crafted, scalable user interface designed for handling complex IT service workflows, ticketing, and project tracking.
*   **Zero Backend Dependency:** Fully operational frontend utilizing a sophisticated data mocking layer (`@faker-js/faker`) to simulate real-world API interactions, latency, and pagination without requiring a live server.
*   **Advanced State Management:** Employs a highly reactive, Signal-driven state architecture. Localized store patterns ensure predictable data flows, reduced reactivity overhead, and strict testing isolation across features.
*   **Real-Time UI Patterns:** Implements seamless user experiences with dynamic updates, interactive dashboards using Chart.js, and complex PrimeNG data tables supporting server-side simulation for filtering, sorting, and bulk actions.
*   **Modular Architecture:** Structured into strictly separated feature modules encompassing Ticketing, Projects, Users, Analytics, Notifications, and Configuration Settings.
*   **Scalable Design System:** Utilizes a unified CSS variable architecture integrated with TailwindCSS 4, ensuring absolute design consistency, ease of maintenance, and readiness for complex theming requirements.

## Technology Stack

*   **Core Framework:** Angular 21
*   **Component Library:** PrimeNG 21
*   **Styling Engine:** TailwindCSS 4
*   **Data Visualization:** Chart.js
*   **Testing Framework:** Vitest
*   **Data Simulation:** Faker.js

## Architecture Overview

### State Management Strategy
The application entirely moves away from monolithic global stores, adopting a localized, signal-based approach. State is scoped explicitly to individual feature modules (e.g., the Ticketing module exclusively manages ticket-related state). This pattern guarantees low coupling, simplifies developer onboarding, and maximizes runtime performance.

### Mock API & Data Simulation
To empower rapid, unblocked UI/UX iteration, NexaDesk relies on a sophisticated mock service layer. This layer meticulously replicates production API behaviors, providing structurally accurate data contracts, enforcing validation rules, and simulating network conditions to ensure the frontend is resilient and production-ready from day one.

## Directory Structure

```text
src/app/
├── core/           # Application-wide singletons, interceptors, and overarching core services
├── features/       # Independent, deeply isolated feature modules (Tickets, Projects, Analytics, etc.)
│   ├── tickets/    # Example: ITSM Ticketing module
│   │   ├── components/ # Presentation and container components
│   │   ├── services/   # Mock data services and API contracts
│   │   └── store/      # Localized, Signal-driven state store
├── layout/         # Structural layout components mapping to enterprise application shells (Sidebar, Topbar)
├── shared/         # Universally reusable UI components, structural directives, and custom pipes
└── store/          # Cross-cutting global state management (strictly limited to global context)
```

## Environment Setup

### Prerequisites
*   Node.js (v18.0.0 or later recommended)
*   npm (v10.0.0 or later)

### Installation Instructions

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd nexadesk
    ```

2.  Install project dependencies:
    ```bash
    npm install
    ```

## Development Commands

Start the local development server:
```bash
npm run start
```
NexaDesk will initialize at `http://localhost:4200/`. The server will automatically recompile and perform hot module replacement upon file modifications.

## Testing Strategy

Execute the comprehensive unit test suite utilizing the Vitest runner:
```bash
npm run test
```

## Build & Deployment

Compile NexaDesk for production deployment:
```bash
npm run build
```
This process generates an optimized, tree-shaken, and minified production build located in the `dist/` directory, prepared for deployment to any enterprise static hosting infrastructure.

## License
This project is licensed under the MIT License.
