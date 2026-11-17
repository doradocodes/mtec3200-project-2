# AGENTS.md

Instructions the AI follows for every task in this project.

## Project overview

[One or two sentences describing the product. Full details are in `PRD.md`.]

Read `PRD.md` before starting any task.

## Tech stack

Keep only the section for your platform.

**Web**

- Next.js (App Router)
- Tailwind CSS
- shadcn/ui
- [Supabase, if data storage is required]
- Deployed on Vercel

**Native app**

- Expo (React Native)
- Runs in Expo Go
- [Component library, if any]
- [Data storage, such as AsyncStorage]

**ESP32 device**

- ESP32 board
- Arduino IDE
- [Libraries, such as Adafruit SSD1306]
- [Inputs and outputs, such as a button and an OLED screen]

## Commands

- **Run the app:** [Such as `npm run dev` or `npx expo start`]
- **Build:** [Such as `npm run build`]
- **Install a package:** [Such as `npm install` or `npx expo install`]

## Project structure

- `docs/`: research, design, and testing files. Do not edit
- [Main code folders, such as `app/`, `components/`, or `firmware/`]

## Working rules

- Work on one screen or feature at a time
- Stop after each step so I can test before you continue
- Explain every change in plain language, including which files changed and why
- Ask before adding a new dependency
- Do not change files unrelated to the current task
- Do not add features that are not in `PRD.md`
- Keep the code simple. Choose the clearest solution over the most advanced one
- Never put API keys or passwords in code. Use `.env.local`
- After every code change, add a dated entry to `PROGRESS.md` describing what changed

## Platform rules

Keep only the section for your platform.

**Web**

- Design for phone width first
- Use shadcn/ui components before building new ones

**Native app**

- Use only libraries that work in Expo Go
- Do not use custom native code or development builds
- Do not use features that require a paid developer account

**ESP32 device**

- Comment every pin assignment
- The device must run without a laptop connected

## Code style

- Add short comments explaining what each section of code does
- Use clear, descriptive names for files, functions, and variables
- [Any other preferences]

## Out of scope

[Copy the out of scope list from `PRD.md`]