# Angular Dashboard

## Project Overview

A high-performance, enterprise-ready Angular application providing a comprehensive dashboard interface. This system is architected utilizing modern Angular (v21) paradigms, the PrimeNG component library, and TailwindCSS utility styling. The project emphasizes scalability, maintainability, and advanced reactive state management.

## Key Features & Capabilities

*   **Signal-Driven Architecture:** Implements a highly reactive and performant state management system utilizing Angular Signals to minimize reactivity overhead and ensure predictable data flows.
*   **Dynamic Data Simulation:** Incorporates a robust mock API layer capable of simulating real-world server responses, including network latency, complex dataset generation, server-side pagination, and complex data mutations.
*   **Analytics Interface:** Features interactive, highly customizable data visualizations integrated via Chart.js.
*   **Advanced Data Management:** Comprehensive PrimeNG data tables supporting server-side pagination simulations, advanced filtering, bulk actions, and integrated activity tracking for detailed record views.
*   **Modular Feature Sets:** Architected into dedicated feature modules encompassing Overview, Projects, Users, Tickets, Inbox, Notifications, and Settings.
*   **Scalable Design System:** Utilizes a unified CSS variable system working in tandem with TailwindCSS to provide consistent styling and seamless theme management.

## Technology Stack

*   **Core Framework:** Angular 21
*   **Component Library:** PrimeNG 21
*   **Styling Engine:** TailwindCSS 4
*   **Data Visualization:** Chart.js
*   **Testing Framework:** Vitest
*   **Data Mocking:** Faker.js

## Architecture Overview

### State Management
The application's core state is handled through a localized, signal-based approach. Rather than relying on monolithic global stores, state is scoped to individual feature modules (e.g., Tickets, Users, Projects). This localized store pattern reduces coupling, improves testing isolation, and simplifies the developer experience while ensuring high performance.

### Data Mocking Strategy
To enable rapid UI/UX development and comprehensive component testing independent of backend availability, the project utilizes a sophisticated mock service layer. Leveraging `@faker-js/faker`, it provides structurally accurate mock data that simulates the exact contracts expected from production APIs.

## Directory Structure

```text
src/app/
├── core/           # Application-wide singletons, interceptors, and core services
├── features/       # Independent feature modules (Analytics, Dashboard, Projects, etc.)
│   ├── tickets/    # Standard feature module implementation
│   │   ├── components/
│   │   ├── services/
│   │   └── store/  # Signal-based localized state store
├── layout/         # Structural layout components (Sidebar, Topbar)
├── shared/         # Reusable UI components, directives, and custom pipes
└── store/          # Cross-cutting global state management
```

## Environment Setup

### Prerequisites
*   Node.js (v18.0.0 or later recommended)
*   npm (v10.0.0 or later)

### Installation Instructions

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd angular-dashboard
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
The application will be accessible at `http://localhost:4200/` and will automatically recompile and reload upon saving modifications to the source files.

## Testing Strategy

Execute the unit test suite utilizing the Vitest runner:
```bash
npm run test
```

## Build & Deployment

Compile the application for production deployment:
```bash
npm run build
```
This command generates an optimized, minified production build located in the `dist/` directory, ready to be served by any static file server or web hosting platform.

## License
This project is licensed under the MIT License.
