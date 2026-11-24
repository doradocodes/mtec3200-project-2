---
name: supabase-database
description: "Design, implement, query, migrate, and review Supabase persistence for Studio Commitments. Use when working with meetings, members, tasks, public pages, task status updates, database schema, Row Level Security, Supabase clients, migrations, or environment variables."
argument-hint: "Describe the Supabase schema, query, migration, or data workflow to implement."
---

# Supabase Database

## Purpose

Implement reliable Supabase persistence for the Studio Commitments MVP while
keeping the data model small, public-page behavior explicit, and secrets out of
the client.

Read `PRD.md` before making database changes. Follow `AGENTS.md` for project
commands, dependency approval, scope, and progress-entry requirements.

## Project data model

The MVP stores:

- **Meeting page:** unique ID, title, optional event date, creator or organizer
  details, and a public shareable slug or identifier.
- **Member:** unique ID, meeting ID, display name, and optional contact
  information.
- **Task:** unique ID, meeting ID, title, member owner, optional due date,
  status (`open` or `done`), and created/updated timestamps.

Use foreign keys from members and tasks to their meeting. Use a foreign key
from tasks to members when every task must have an owner; otherwise make the
owner relationship nullable only when the UI and PRD explicitly support
unassigned tasks.

Member-specific links may use a query parameter to select a member's view.
The query parameter is a view filter, not an authorization mechanism.

## When to use

- Create or change the meetings, members, or tasks schema.
- Add Supabase reads, inserts, updates, or deletes.
- Persist task completion across browsers or devices.
- Add a Supabase client or server-side data access helper.
- Configure environment variables, migrations, indexes, or constraints.
- Review public access, Row Level Security, or data exposure.
- Debug loading, mutation, or persistence errors.

## Current dependency state

Supabase is planned but is not currently installed. Before writing imports,
ask for approval to add the required package and update both `package.json` and
`package-lock.json`. Do not assume that `@supabase/ssr`,
`@supabase/supabase-js`, or Supabase CLI is available.

## Procedure

### 1. Confirm the requirement

1. Read the relevant section of `PRD.md`.
2. Identify whether the change affects a meeting page, member, task, or
   cross-cutting behavior.
3. Keep the implementation within the MVP:
   public pages, organizer-added members, member-specific task links, and
   persisted open/done task status.
4. Do not add authentication, automated reminders, chat, payments, calendars,
   or other out-of-scope behavior unless the PRD is updated first.

### 2. Plan the schema

Before editing code, define:

- Table names and columns
- Required versus nullable fields
- Primary and foreign keys
- Unique constraints
- Status values and defaults
- Indexes for public meeting lookup and member task lookup
- Which operations are allowed for public viewers and organizers

Prefer database constraints over relying only on UI validation. Use explicit
status values rather than free-form strings. Store timestamps in Supabase's
timezone-aware timestamp type and let the database set creation and update
defaults where practical.

For the MVP, a useful baseline is:

- `meetings`: public meeting metadata and organizer contact information
- `members`: meeting members, indexed by `meeting_id`
- `tasks`: meeting tasks, indexed by `meeting_id` and `member_id`

Use a non-guessable public identifier or slug for meeting URLs. Do not expose
service-role keys or use an internal database ID as a security boundary.

### 3. Handle public access deliberately

The PRD says meeting pages are public and do not require accounts. Treat this
as a product decision, not as permission to expose credentials.

- Use only the public Supabase URL and anon/publishable key in browser code.
- Never send the service-role key to the browser or commit it to source.
- Store local credentials in `.env.local`; document required variable names
  without documenting their values.
- Configure RLS policies intentionally and test them from an anonymous client.
- Limit public reads to the meeting, member, and task fields the UI needs.
- Limit public writes to the MVP's intended task-status behavior.
- Do not treat `?member=<id>` as proof of identity.
- Avoid storing sensitive member contact information in publicly readable
  tables unless the product requirement explicitly needs it.

If public anonymous updates make it possible for anyone with the meeting link
to change any task, call that limitation out explicitly. Do not silently claim
ownership validation that the MVP does not provide.

### 4. Implement data access

Keep Supabase calls in a small, typed data-access layer rather than scattering
queries throughout presentational components.

- Use server-side access for page data when possible.
- Use a client component only for interactive mutations or browser-only state.
- Validate form input before sending it to Supabase.
- Select only the columns needed by the screen.
- Filter member-specific views by the meeting and member identifiers.
- Check both returned data and returned errors after every mutation.
- Refresh or revalidate the visible data after a successful status update.
- Show loading, empty, and error states; never turn a failed request into an
  empty success state.

Use typed domain models for `Meeting`, `Member`, and `Task`. Avoid `any` and
unnecessary type assertions.

### 5. Migrate and seed safely

When adding schema:

1. Create a versioned migration or use the project's approved Supabase
   migration workflow.
2. Make the migration rerunnable or clearly document that it is one-time.
3. Add constraints, indexes, and RLS policies in the same coherent change.
4. Add minimal non-sensitive seed data only if it helps local testing.
5. Never include real phone numbers, emails, API keys, or credentials in seed
   data.
6. Document how to apply the migration and verify it.

Do not edit production data manually as part of a feature implementation.

### 6. Verify the behavior

Run the smallest relevant checks:

- `npm run lint`
- `npm run build`
- A focused test or local manual flow for creating a meeting, adding a member,
  adding a task, opening a member-specific link, marking a task done, and
  refreshing from another browser session

Verify at minimum:

- A public meeting can be loaded by its public URL.
- A member-specific query parameter filters to the expected member.
- Task status changes persist after refresh.
- Missing meetings and missing members produce clear not-found or error states.
- Invalid task input is rejected.
- Anonymous access follows the intended RLS policies.
- No secret appears in client bundles, logs, seed data, or committed files.

Report database, migration, or policy failures explicitly. Do not hide them
behind fallback data.

## Review checklist

- [ ] The change traces to a requirement in `PRD.md`.
- [ ] Schema fields, relationships, defaults, and constraints are explicit.
- [ ] Queries select only needed fields and filter by the relevant meeting.
- [ ] Public access and RLS policies match the MVP decision.
- [ ] Query parameters are treated as view filters, not authentication.
- [ ] Service-role credentials are server-only and absent from the repository.
- [ ] Input and Supabase errors are surfaced to the user.
- [ ] Loading, empty, and error states are implemented.
- [ ] Task status updates are persisted and visible after refresh.
- [ ] Approved dependencies and lockfiles are synchronized.
- [ ] `PROGRESS.md` is updated after code changes as required by `AGENTS.md`.
