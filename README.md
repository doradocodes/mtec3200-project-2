# Studio Commitments

Studio Commitments is a lightweight web app for members and organizers of
shared creative studios.

## Problem

Members agree to tasks during studio meetings, but commitments are often
tracked in group chats, phone notes, or lists that people do not revisit. The
work then falls to the few people who notice what remains, which can lead to
organizer burnout.

## Solution

Studio Commitments turns meeting commitments into a shared, public task page.
An organizer adds members and assigns tasks with due dates, then sends each
member a link that opens directly to their assigned tasks. Members can mark
tasks done, and the updated status is visible to everyone.

The MVP uses one public link per meeting. Members do not need an account;
member-specific task views can use a query parameter in the URL. Members
contact the organizer directly if an assignment needs to change.

## Platform

This is a responsive web app designed for phone width first and usable on
desktop. It is deployed to [Vercel](https://vercel.com/).

## Tech Stack

- [Next.js 16.4.6](https://nextjs.org/) with the App Router
- [React 19.3.0](https://react.dev/) and React DOM 19.3.0
- [Tailwind CSS 4.3.3](https://tailwindcss.com/)
- [TypeScript 5.9.3](https://www.typescriptlang.org/)
- [ESLint 9.39.5](https://eslint.org/) with `eslint-config-next`
- `@tailwindcss/turbopack` 4.3.3
- Next.js `next/font` with Geist fonts
- Supabase is planned for persisted meeting, member, and task records but is
  not installed yet
- shadcn/ui is not installed yet

## Getting Started

Install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see
the result.

You can start editing the page by modifying
[`app/page.tsx`](./app/page.tsx). The page updates automatically while the
development server is running.

Run the linter:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Start the production build:

```bash
npm run start
```

This project uses [`next/font`](https://nextjs.org/docs/app/api-reference/components/font)
to automatically optimize and load [Geist](https://vercel.com/font), a new
font family for Vercel.

## Learn More

Read [`PRD.md`](./PRD.md) for the product requirements, MVP scope, research,
and implementation milestones. Read [`AGENTS.md`](./AGENTS.md) for project
instructions and development conventions.

To learn more about the technologies used in this project, see:

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Learn](https://nextjs.org/learn)
- [React Documentation](https://react.dev/learn)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js)
for more information.

## Deploy on Vercel

The app is intended to deploy on the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app).
Use the Vercel dashboard or the Vercel CLI to connect this repository and
deploy the production build.

See the
[Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)
for more details.
