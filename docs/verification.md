# Final functional verification

Run these with the consolidated backend, a disposable database, and configured services during the final testing phase. Do not use production accounts or send real email during these checks.

- Authenticate as student, supervisor, and allowlisted administrator. Refresh a deep route, expire a token, sign out in another tab, and sign in as another account. Confirm previous-account data is absent and restricted routes remain unavailable.
- Create a proposal and three-person group. Confirm project identifier, supervisor employee ID, and proposal/group database IDs. Fail a later step and resume in the same tab. Review partial records after network-ambiguous timeouts.
- Switch projects from normal routes and legacy URLs with `?project=`. Confirm forms, rows, totals, and mutation targets follow the current project.
- Add students and supervisors as administrator. Confirm passwords never return or persist in the frontend profile, and deletion uses registration/employee identifiers.
- Create/edit/delete requirements and modules. Add comments and attachments; check escaped content and unsafe links. Create a task and move it through every status.
- Link/unlink modules to deliverables, including duplicate and wrong-project attempts. Confirm snapshot behavior before changing linked modules.
- Add team members, change roles, and assign requirements. Check duplicate-email errors retain entered data.
- Upload a document below 10 MB, reject oversized files, open and delete a stored file. Confirm unconfigured Cloudinary produces a visible error.
- Create/edit/delete department and project events across time zones. Validate end dates and student read-only access.
- Publish announcements with permitted accounts. Confirm old rich text is sanitized and new text preserves line breaks.
- Review inbox/sent mail and send only to a controlled test recipient. Check SMTP failure/loading states.
- Request resources and approve/reject as supervisor and administrator. Verify independent status and feedback fields.
- Create/rename/delete panels, choose a head, and assign project business IDs. Confirm supervisor membership views. Review orphaned assignments after panel deletion, which the backend does not cascade.
- Create/edit evaluation templates, record bounded marks, and review feedback. Record two evaluations for one project and confirm deletion targets a record ID.
- Exercise supported pipeline types/tools with a disposable Jenkins job. Create, build, refresh deployment links, and delete. HTTP 202 must appear queued/running; no job should appear deployed without a real URL.
- Review desktop/mobile widths, keyboard navigation, dialog focus/escape/return focus, long content, empty states, and network/permission errors.
- Build the Docker image and open a nested route directly. Verify static caching, API origin, and CORS. The Docker build and external-service checks are not covered by the Vite build.

Backend project ownership, atomic multi-record operations, and service configuration remain separate backend concerns; frontend route guards do not provide those guarantees.
