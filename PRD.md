# PRD: Studio Commitments

## Summary

Studio Commitments is a lightweight web app for members and organizers of shared
creative studios. It turns commitments made in meetings into one shared,
link-based task page so members can see what they own and the whole group can
see what is complete.

## Problem

**Problem statement:**

Members of shared studios agree to tasks and events in person, but those
commitments are tracked in places members do not check. As a result, the work
falls to the few people who notice, and those people burn out.

**How might we:**

How might we keep shared commitments visible after a meeting ends?

## Research

- **Participants:** Three people: two members of shared ceramics and printmaking
  studios and one co-founder/organizer of a shared art and design studio. All
  participants were outside the team's immediate circle.
- **Key findings:**
  - Commitments are made in meetings, then disappear into group chats, phone
    notes, or lists that members do not revisit.
  - Members want to help, but cannot tell what is still open, who owns it, or
    who to contact when they can no longer follow through.
  - Organizers compensate by sending individual messages and completing
    unclaimed work themselves.
  - A dedicated tool must be easy to open and require less effort than a
    general project-management tool; one participant reported abandoning
    Trello after a week.
- **What surprised us:** Participants did not describe the problem as people
  being unreliable. They saw it as a visibility problem: people are willing to
  help when the commitment is right in front of them.

Supporting files: interviews, synthesis, journey map, storyboard, affinity
wall, stakeholder map, and comparative analysis in `docs/`.

## Users

**Studio member**

- **Who they are:** A member of a shared creative studio or collective who
  agrees to help with recurring work or an upcoming event.
- **Goal:** Quickly find the tasks assigned to them, understand what is due,
  and mark work complete.
- **Context:** They may be on a phone between work shifts or at home, and are
  unlikely to search through a long group chat or open a complex project
  management tool.

**Studio organizer**

- **Who they are:** A founder, meeting facilitator, or member who coordinates
  the studio's shared work.
- **Goal:** Capture meeting commitments, make ownership visible, and confirm
  what remains before an event without individually chasing everyone.
- **Context:** They create or update the page after a meeting on a laptop or
  phone and share one link with the group.

## Platform

- **Platform:** Web app
- **Why:** The research and wireframes describe a page that can be opened from
  a shared link on a phone or laptop. A web page avoids requiring every studio
  member to install an app and supports the comparative-analysis goal of having
  one link for the group's work.

## Core flow

The one flow that must work from start to finish.

1. After a studio meeting, the organizer creates a meeting page and adds each
   task with an owner and due date.
2. The organizer copies and shares the page link with members.
3. A member opens the link and finds their assigned task(s) in the shared
   list.
4. The member marks a task done, and the updated status is visible to
   everyone.

## Screens

**Meeting page / shared task board**

- **User type:** Studio organizer and studio member
- **Purpose:** Provide one visible source of truth for a meeting's commitments.
- **Elements:** Meeting or event title; task list; task name; owner; due date;
  open or done status; add-task control for the organizer; share-link control.
- **Main action:** Review the task list and, for an assigned task, mark it done.
- **Leads to:** The member task view or the updated shared task board.

**Add task form**

- **User type:** Studio organizer
- **Purpose:** Record a commitment immediately after the meeting.
- **Elements:** Task name field; owner selector or owner name; due date; save
  action; cancel action.
- **Main action:** Add a task to the meeting page.
- **Leads to:** The updated meeting page.

**Member task view**

- **User type:** Studio member
- **Purpose:** Reduce scanning by showing the member the work specifically
  assigned to them.
- **Elements:** Member name; assigned task list; task status controls; due
  dates; link back to the full meeting page.
- **Main action:** Mark an assigned task done.
- **Leads to:** The updated member task view and shared meeting page.

## Features

**Must-have (MVP):**

- Create a page for a meeting or upcoming studio event.
- Add tasks with a task name, owner, and due date.
- Display all tasks and their open or done status on the shared page.
- Provide a shareable link that members can open without installing an app.
- Let a member mark their task done and persist the updated status.
- Show members their assigned tasks clearly.

**Nice to have, but not MVP:**

- Reminders or notifications for open tasks.
- Member profiles and reusable studio rosters.
- Task history or an audit trail.
- Quick replies or reactions, inspired by group chat.

**Out of scope:**

- Full event planning or event ticketing.
- Payments, dues, or expense tracking.
- Chat or a replacement for the studio's group conversation.
- Calendar integrations.
- Gamification or leaderboards.

## Data

What the app stores or sends.

- **Meeting page:** Unique identifier, title, optional event date, creator, and
  shareable link.
- **Task:** Unique identifier, meeting page, title, owner, due date, status
  (`open` or `done`), and created/updated timestamps.
- **Member:** Display name associated with assigned tasks. Authentication and
  full profiles are not required for the MVP.

The app sends task creation and status updates to the server and returns the
current shared task list to viewers.

## Technical requirements

- Responsive web interface designed for phone width first and usable on
  desktop.
- Next.js with the App Router, using the existing project setup.
- Persist meeting pages and task records in a database so updates are visible
  across devices.
- Provide stable, shareable URLs for meeting pages.
- Support the organizer actions of creating a page and adding tasks, and the
  member action of updating task status.
- Use clear open, loading, and error states for page loading and task updates.
- Do not require account creation for a member to open a shared page; access
  control and authentication can be evaluated after the MVP.

## Success criteria

- A person outside the team completes the core flow without help.
- In a usability test, at least four of five participants can open a shared
  page, find their assigned task, and mark it done without facilitator
  intervention.
- A newly added task and a status change remain visible after refreshing the
  page and are visible from another device or browser session.
- An organizer can identify all open tasks for a meeting without searching a
  group chat or messaging members individually.

## Milestones

The milestones build the must-have features in small, testable increments. The
first milestone is the home screen / initial meeting-page experience.

**Milestone 1: Shared meeting page**

- **What gets built:** Responsive meeting-page layout with a title, task list,
  owner labels, due dates, and open/done presentation using representative
  data.
- **Done when:** A tester can understand the page, distinguish open from done
  tasks, and identify which tasks belong to each member.

**Milestone 2: Create and add tasks**

- **What gets built:** Meeting-page creation and add-task form with task name,
  owner, and due date fields.
- **Done when:** An organizer can create a page and add a task that appears in
  the list with the correct owner and due date.

**Milestone 3: Persistence and sharing**

- **What gets built:** Database-backed meeting and task records, stable page
  URLs, and share-link action.
- **Done when:** An organizer can copy one link, and another browser can open
  that link and see the same page and tasks after a refresh.

**Milestone 4: Member completion**

- **What gets built:** Member task view and status update control with saved
  open/done state.
- **Done when:** A member can find an assigned task, mark it done, and all
  viewers see the updated status.

**Milestone 5: MVP usability check**

- **What gets built:** Mobile polish, empty/loading/error states, and a short
  usability test of the complete flow.
- **Done when:** The success criteria are measured and any blocking usability
  issues are fixed without adding out-of-scope features.

## Assumptions and risks

- **Riskiest assumption:** Members will open the shared page without being
  reminded.
- Members will prefer a focused task page to a general-purpose tool if the
  page is easy to open and requires little maintenance.
- Organizers will consistently enter meeting commitments after meetings.
- A shareable link is sufficient for the first release, even without
  authentication or role-based permissions.
- Without reminders, tasks may again become invisible; reminder delivery is a
  key post-MVP risk to validate.
- Shared links may expose studio task information to anyone who receives the
  link; access controls should be addressed before using the product for
  sensitive information.

## Open questions

- Should meeting pages be private by default, or should anyone with the link
  be able to view and update tasks?
- How should a member identify themselves when opening a shared link?
- Should an owner be allowed to change or decline an assignment after the
  meeting?
- What reminder channel would members actually use: email, text, or an
  in-app reminder?
- Should one studio have multiple meeting pages and a home/index page, or is
  one link per meeting sufficient for the MVP?
- What exact database and deployment configuration is required by the Project 2
  brief?
