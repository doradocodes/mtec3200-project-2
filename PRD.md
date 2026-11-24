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
- **Context:** They may be on a phone between work shifts or at home. The
  organizer adds them during the meeting and sends them a link that opens
  directly to their assigned tasks.

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
   member and task with an owner and due date.
2. The organizer copies a member-specific link and sends it to that member.
3. The member opens the link and lands on their assigned task(s) in the shared
   list.
4. The member marks a task done, and the updated status is visible to
   everyone. If the task needs to change, the member contacts the organizer
   directly.

## Screens

**Meeting page / shared task board**

- **User type:** Studio organizer and studio member
- **Purpose:** Provide one visible source of truth for a meeting's commitments.
- **Elements:** Meeting or event title; member list; task list; task name;
  owner; due date; open or done status; add-member and add-task controls for
  the organizer; member-specific share-link controls.
- **Main action:** Review the task list and, for an assigned task, mark it done.
- **Leads to:** The member task view or the updated shared task board.

**Add task form**

- **User type:** Studio organizer
- **Purpose:** Record a commitment immediately after the meeting.
- **Elements:** Task name field; owner selector from the meeting's member list;
  due date; save action; cancel action.
- **Main action:** Add a task to the meeting page.
- **Leads to:** The updated meeting page.

**Member settings**

- **User type:** Studio organizer
- **Purpose:** Maintain the meeting's member list and access member links.
- **Elements:** Members, add and delete actions, and a copy-link action for
  each member.
- **Main action:** Add or remove a meeting member.
- **Leads to:** The updated member list or the meeting page.

**Member task view**

- **User type:** Studio member
- **Purpose:** Reduce scanning by showing the member the work specifically
  assigned to them.
- **Elements:** Member name; assigned task list; task status controls; due
  dates; link back to the full public meeting page; organizer contact
  information or instructions for assignment changes.
- **Main action:** Mark an assigned task done.
- **Leads to:** The updated member task view and shared meeting page.

## Features

**Must-have (MVP):**

- Create a page for a meeting or upcoming studio event.
- Add members during the meeting so they can be assigned tasks.
- Allow an organizer to remove a member; their tasks remain and become
  unassigned until another member is selected.
- Add tasks with a task name, owner, and due date.
- Display all tasks and their open or done status on the shared page.
- Provide one public meeting link and member-specific links that open directly
  to each member's assigned tasks.
- Let a member mark their task done and persist the updated status.
- Show members their assigned tasks clearly.

**Nice to have, but not MVP:**

- Automated reminders or notifications for open tasks.
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

- **Meeting page:** Unique identifier, title, optional event date, creator,
  public shareable link, and organizer contact information.
- **Task:** Unique identifier, meeting page, title, owner (or unassigned after
  member removal), due date, status
  (`open` or `done`), and created/updated timestamps.
- **Member:** Unique identifier, display name, meeting page, and optional
  contact information. Authentication and full profiles are not required for
  the MVP.

The app sends member, task, and status updates to the server and returns the
current shared task list to viewers. Member-specific URLs may use a query
parameter to select the member's task view.

## Technical requirements

- Responsive web interface designed for phone width first and usable on
  desktop.
- Next.js with the App Router, using the existing project setup.
- Use Supabase for database storage when persistence is required.
- Persist meeting pages, members, and task records so updates are visible
  across devices.
- Provide one public URL per meeting and member-specific task links using a
  query parameter or equivalent URL state.
- Support organizer actions of creating a page, adding members, adding tasks,
  and sharing links, plus the member action of updating task status.
- Use clear open, loading, and error states for page loading and task updates.
- All meeting pages are public for the MVP. Do not require account creation
  or authentication to open a page or member task link.

## Success criteria

- A person outside the team completes the core flow without help.
- In a usability test, at least four of five participants can open a shared
  page, find their assigned task, and mark it done without facilitator
  intervention.
- A newly added task and a status change remain visible after refreshing the
  page and are visible from another device or browser session.
- An organizer can identify all open tasks for a meeting without searching a
  group chat or messaging members individually.
- A member-specific link opens directly to that member's assigned tasks.

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

- **What gets built:** Meeting-page creation, add-member form, and add-task
  form with task name, owner, and due date fields.
- **Done when:** An organizer can create a page, add a member, and add a task
  that appears in the list with the correct owner and due date.

**Milestone 3: Persistence and sharing**

- **What gets built:** Supabase-backed meeting, member, and task records,
  stable public meeting URLs, member-specific task URLs, and share-link
  actions.
- **Done when:** An organizer can copy the public meeting link or a
  member-specific link, and another browser can open it and see the expected
  page or assigned tasks after a refresh.

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
- Organizer-sent text messages are sufficient to get members to open their
  member-specific links for the MVP.
- Public pages are acceptable for initial use. Anyone with a link can view the
  meeting and task information, so sensitive information should not be stored.

## Open questions

- Should public viewers be able to mark any task done, or should the MVP use
  the member-specific link only as a lightweight ownership convention?
- What organizer contact detail should appear when a member needs to request
  an assignment change?
- Should the MVP include a simple copy-link button only, or direct integration
  with the phone's text-message composer?
