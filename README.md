# DepEase frontend

One React application for student, supervisor, and administrator workflows. The contributions from `abdullah`, `mahad`, and `hamza` are consolidated into shared navigation, authentication, API access, forms, dialogs, and feature modules. The original branches remain available.

## Run locally

Use Node.js 22.13 or newer.

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:5173`. Configure `VITE_API_URL` in `.env.local` to point at the consolidated backend; the development default is `http://localhost:3001`. The backend must allow the frontend origin in its CORS configuration. Variables prefixed with `VITE_` become public build output: never put credentials in them.

Sign in with an existing department account. Student and staff sign-in use their respective backend endpoints; the server determines the administrator role. Provision initial accounts through the backend's documented administrator setup.

## Structure

```text
src/app/          Authentication, project context, navigation, routing, shell
src/components/  Shared controls, forms, tables, project guards
src/features/    Projects, work tracking, communication, administration, deployment
src/lib/         API/query helpers, session handling, display formatting
src/styles/      Shared responsive design and semantic component styles
```

The API client attaches the current bearer token on every protected request. React Query owns server state and refreshes views after successful writes. Changing accounts clears the query cache. Session expiry and unauthorized responses return the user to sign-in. Client role guards organize the UI; authorization remains the backend's responsibility.

Feature routes load separately to keep the first page light. Common legacy branch URLs redirect to their consolidated equivalents. Project selection uses database IDs internally; project-scoped APIs retain their existing business identifiers.

## Workflows

- Students: proposals and group creation, project details, task board, requirements with comments and attachments, deliverables/modules, documents, team responsibilities, resources, messages, announcements, calendar, and ideas.
- Supervisors: assigned projects and shared workflows, project announcements, resource decisions, panels, evaluation templates/marks, project scheduling, and deployment pipelines.
- Administrators: department projects and people, panels and project assignments, department announcements, scheduling, evaluations, resource decisions, and deployments.

Document uploads require the backend's Cloudinary configuration. Outgoing messages require SMTP. Pipelines require Jenkins and expose the integration's ReactJs, Node/Express js, and Flask tools. The UI reports missing-service errors without substituting simulated results. The old container screen used dummy state; its URL now opens the real deployment workflow.

Linked deliverable modules are stored as snapshots. Relink a module to refresh it after changes. Evaluation corrections create a new record after deletion because the legacy update endpoint identifies only the project and cannot distinguish multiple evaluations. Proposal creation consists of three backend writes; completed IDs and drafts are retained in this tab's session storage so a later step can be retried. Closing the tab ends that recovery window. Atomic creation and network-ambiguous retries require a future backend transaction/idempotency contract.

## Quality checks and build

```powershell
npm run check
npm run format:check
npm run build
npm run preview
```

`check` runs ESLint (including React Hooks rules) and validates source syntax, relative import paths/casing, centralized API origins, and accidental debug logging. `build` produces `dist/`. Functional verification with the database and external services is a separate final project phase, as requested; a production build does not establish end-to-end correctness. See [the verification checklist](docs/verification.md).

## Deploy

Set `VITE_API_URL` when building. Serve `dist/` with a fallback to `index.html` for application routes. The included Dockerfile builds with Node 22 and serves with Nginx:

```powershell
docker build --build-arg VITE_API_URL=https://api.example.edu -t depease-frontend .
docker run --rm -p 8080:80 depease-frontend
```

Use HTTPS in deployed environments. Tokens currently use the backend's bearer-token contract and browser local storage; an HTTP-only cookie session requires a coordinated backend change.
