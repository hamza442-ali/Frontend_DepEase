# Final functional verification

Run these with the consolidated backend, a disposable database, and configured services during the final testing phase. Do not use production accounts or send real email during these checks.

- Authenticate as student, supervisor, and allowlisted administrator. Refresh a deep route, expire a token, sign out in another tab, and sign in as another account. Confirm previous-account data is absent and restricted routes remain unavailable.
- Create a proposal and three-person group. Confirm project identifier, supervisor employee ID, and proposal/group database IDs. Force a conflict and verify that no group/proposal records remain. Retry the same request and verify that only one project exists; change the payload with the same key and expect 409.
- Switch projects from normal routes and legacy URLs with `?project=`. Confirm forms, rows, totals, and mutation targets follow the current project.
- Add students and supervisors as administrator. Confirm passwords never return or persist in the frontend profile, and deletion uses registration/employee identifiers.
- Create/edit/delete requirements and modules. Add comments and attachments; check escaped content and unsafe links. Create a task and move it through every status.
- Link/unlink modules to deliverables, including duplicate and wrong-project attempts. Confirm snapshot behavior before changing linked modules.
- Add team members, change roles, and assign requirements. Check duplicate-email errors retain entered data.
- Upload a document below 10 MB, reject oversized files, open and delete a stored file. Verify authenticated download bytes and cross-project rejection. Check local persistence after API container recreation; test Cloudinary separately when selected.
- Create/edit/delete department and project events across time zones. Validate end dates and student read-only access.
- Publish announcements with permitted accounts. Confirm old rich text is sanitized and new text preserves line breaks.
- Review inbox/sent mail and send only to a controlled test recipient. Check in-app delivery without SMTP, private mailbox access, and SMTP failure/loading states.
- Request resources and approve/reject as supervisor and administrator. Verify independent status and feedback fields.
- Create/rename/delete panels, choose a head, and assign project business IDs. Confirm supervisor membership views. Verify panel rename/delete updates assignments transactionally and revokes removed panel access.
- Create/edit evaluation templates, record bounded marks, and review feedback. Record two evaluations for one project, edit one by record ID without changing its evaluator/historical criteria, and confirm deletion targets a record ID.
- Start Docker Jenkins with the backend's `scripts/start-local.ps1 -WithJenkins`. Verify connection health before selecting a project. Connect a public repository with its branch/Jenkinsfile, build and cancel a disposable job, and confirm HTTP 202 appears queued/running. Recreate the API while a run is active, reload, and confirm the same run resumes without another submission. Retrying a request and concurrent clicks must not enqueue duplicates. Check history while Jenkins is unavailable, setup retries after outages, and panel read-only access. Removing a pipeline must never start a teardown build. No job should appear deployed without a real URL; test the bounded `depease-deployment.json` publication artifact separately from a successful build.
- Review desktop/mobile widths, keyboard navigation, dialog focus/escape/return focus, long content, empty states, and network/permission errors.
- Build the Docker image and open a nested route directly. Verify static caching, API origin, and CORS. The Docker build and external-service checks are not covered by the Vite build.

Backend integration regressions enforce project ownership, immutable foreign keys, atomic submission, panel cleanup, historical identifier reservation, private documents, and message delivery. Frontend route guards organize the interface; server checks remain authoritative. Administrator sign-in must reject a teacher account, direct teacher navigation to `/people` must be blocked, and only the configured `admin@hamza.com` account may use administrator APIs.
