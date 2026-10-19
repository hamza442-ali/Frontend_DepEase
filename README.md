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

For the complete Docker product, run `scripts/start-local.ps1` from the sibling backend repository and open `http://localhost:8080`. Select **Administrator** and use `admin@hamza.com` with the generated password in the backend's ignored `.local/credentials.local.json`. Other teachers use **Teacher** and cannot access admin pages or APIs. Student and staff sign-in use their respective backend endpoints; the server determines the role. Provision initial accounts through the backend's documented administrator setup.

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

Documents default to protected local storage and authenticated downloads. Internal messages between registered users work without SMTP; external email requires SMTP configuration. Pipelines require a configured Jenkins bridge, and the deployment page explains when it has not been connected.

For local Jenkins in Docker, run `scripts/start-local.ps1 -WithJenkins` from the backend. Jenkins opens at **http://localhost:8082**; its operator credentials stay in the backend's ignored `.local/jenkins-credentials.local.json`. Subsequent starts include Jenkins automatically.

Deployments shows connection health, generated job names, repository branch/Jenkinsfile settings, and the last 20 builds. Runs return immediately and refresh automatically; reopening the page resumes saved progress. Supervisors and administrators can cancel active builds, while panel members can inspect history. Downloadable starter Jenkinsfiles cover React, Node and Flask. Both application repositories also include a root Jenkinsfile; select `fix/usable-product` until the PRs merge, then `main`.

A successful build does not imply a published application. Add a publishing stage for your host and archive `depease-deployment.json` with its actual `url` to display the application link. See the backend's [Jenkins operations guide](https://github.com/hamza442-ali/backend_DepEase/blob/fix/usable-product/docs/JENKINS.md).

Proposal submission uses a transactional backend operation and stable request key. Draft fields and the request key survive page refreshes in this tab's session storage; retries do not duplicate a completed project. Evaluations can be corrected through their record IDs while preserving the evaluator and historical criteria. Panel members can review assigned workspaces and grade them, while management controls are limited to the supervisor. Project archival closes its workspace and reserves the identifier to protect retained data.

Linked deliverable modules remain snapshots. Relink a module to refresh it after changes.

## Quality checks and build

```powershell
npm run check
npm run format:check
npm run build
npm run preview
```

`check` runs ESLint (including React Hooks rules) and validates source syntax, relative import paths/casing, centralized API origins, and accidental debug logging. `build` produces `dist/`. MongoDB integration regressions live in the backend repository. Browser verification exercises the built frontend against the local stack; real external service connectivity must be configured and verified separately. See [the verification checklist](docs/verification.md).

## Deploy

Set `VITE_API_URL` when building. Serve `dist/` with a fallback to `index.html` for application routes. The included Dockerfile builds with Node 22 and serves with Nginx:

```powershell
docker build --build-arg VITE_API_URL=https://api.example.edu -t depease-frontend .
docker run --rm -p 8080:80 depease-frontend
```

Use HTTPS in deployed environments. Tokens currently use the backend's bearer-token contract and browser local storage; an HTTP-only cookie session requires a coordinated backend change.
