<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

Instructions the AI follows for every task in this project.

## Project overview

Studio Commitments is a lightweight public web app for shared creative
studios. It turns meeting commitments into a shared task page so organizers
can assign members and tasks, while members can open a direct link to their
assigned tasks and mark them complete.

Read `PRD.md` before starting any task.

## Tech stack

**Web**

- Next.js 16.4.6 with the App Router
- React 19.3.0 and React DOM 19.3.0
- Tailwind CSS 4.3.3
- TypeScript 5.9.3
- ESLint 9.39.5 with `eslint-config-next` 16.4.6
- `@tailwindcss/turbopack` 4.3.3
- Next.js `next/font` with Geist fonts
- Supabase is the planned database for persisted meeting, member, and task
  records, but it is not installed yet
- shadcn/ui 4.23.0 with the Base UI preset
- Deployment target: Vercel

## Commands

- **Run the app:** `npm run dev`
- **Lint:** `npm run lint`
- **Build:** `npm run build`
- **Start the production build:** `npm run start`
- **Install a package:** `npm install <package-name>`
- **Install a development package:** `npm install --save-dev <package-name>`

Ask before adding a dependency. Keep `package.json` and `package-lock.json`
in sync when a dependency is approved.

## Project structure

- `app/`: Next.js App Router pages, layouts, global styles, and route logic
- `public/`: Static assets served from the site root
- `docs/`: Research, design, and testing files. Do not edit.
- `PRD.md`: Product requirements and MVP scope. Read before implementation.
- `package.json`: Scripts and declared dependencies
- `next.config.ts`: Next.js configuration
- `tsconfig.json`: TypeScript configuration
- `eslint.config.mjs`: ESLint configuration
- `.env.local`: Local secrets and environment variables; never commit it

## Working rules

- Work on one screen or feature at a time.
- Stop after each step so I can test before you continue.
- Explain every change in plain language, including which files changed and why.
- Ask before adding a new dependency.
- Do not change files unrelated to the current task.
- Do not add features that are not in `PRD.md`.
- Keep the code simple. Choose the clearest solution over the most advanced one.
- Never put API keys, passwords, or Supabase credentials in code. Use
  `.env.local`.
- Do not edit files in `docs/`; treat them as source research and design
  artifacts.
- Keep all meeting pages public for the MVP; do not add authentication unless
  the PRD is updated.
- Use one public URL per meeting. Member-specific task links may use a query
  parameter to open the member's assigned tasks.
- Members contact the organizer directly about declining or changing a task.
- Automated reminders are nice-to-have only; the MVP assumes the organizer
  sends links and reminders by text.
- After every code change, add a dated entry to `PROGRESS.md` describing what
  changed.
- Create code comments that allows to search my codebase quickly using keywords.

## Platform rules

**Web**

- Design for phone width first, then ensure the layout works on desktop.
- Use the existing Next.js App Router conventions.
- Use Tailwind CSS for styling and follow the existing global styles.
- Use shadcn/ui components from `components/ui/` before building custom
  replacements.
- Provide clear loading, empty, and error states for data-driven screens.
- Preserve accessible labels, keyboard interaction, and sufficient color
  contrast.

## Code style

- Use clear, descriptive names for files, functions, variables, and components.
- Prefer typed props and domain types over untyped objects or unnecessary casts.
- Keep components focused and reuse shared helpers when behavior is repeated.
- Add short comments only when they explain non-obvious logic.
- Follow the repository's existing formatting and import conventions.
- Use ASCII by default unless existing content or the product requires
  Unicode.

## Out of scope

- Full event planning or event ticketing
- Payments, dues, or expense tracking
- Chat or a replacement for the studio's group conversation
- Calendar integrations
- Gamification or leaderboards
