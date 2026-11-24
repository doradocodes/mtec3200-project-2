// Fictional examples for local development; these do not represent real people
// or live meeting links.

export type Meeting = {
  /** Unique identifier used to associate members and tasks with this meeting. */
  id: string;
  /** Name shown on the shared meeting page. */
  title: string;
  /** Optional event date in YYYY-MM-DD format. */
  eventDate?: string;
  /** Display name of the person who created the meeting page. */
  creator: string;
  /** Example public path for sharing the meeting; not an implemented route. */
  shareableLink: string;
  /** Instructions for contacting the organizer about an assignment. */
  organizerContact: string;
};

export type Member = {
  /** Unique identifier used when assigning a task or selecting a member view. */
  id: string;
  /** Fictional display name shown on the meeting page. */
  displayName: string;
  /** Identifier of the meeting this member belongs to. */
  meetingId: string;
  /** Optional contact information; omitted from these public examples. */
  contactInformation?: string;
};

export type Task = {
  /** Unique identifier for this task. */
  id: string;
  /** Identifier of the meeting this task belongs to. */
  meetingId: string;
  /** Short description of the work to be done. */
  title: string;
  /** Identifier of the meeting member responsible for the task. */
  ownerId: string;
  /** Date the task is due, in YYYY-MM-DD format. */
  dueDate: string;
  /** Whether the task is still open or has been completed. */
  status: "open" | "done";
  /** Time the task was created, expressed as an ISO 8601 UTC timestamp. */
  createdAt: string;
  /** Time the task was last changed, expressed as an ISO 8601 UTC timestamp. */
  updatedAt: string;
};

export const sampleMeeting: Meeting = {
  id: "meeting-example-1",
  title: "Community Open Studio",
  eventDate: "2026-12-12",
  creator: "Studio organizer",
  shareableLink: "/meetings/example-open-studio",
  organizerContact: "Contact the organizer through the studio group chat.",
};

export const sampleMembers: Member[] = [
  { id: "member-example-1", displayName: "Member A", meetingId: sampleMeeting.id },
  { id: "member-example-2", displayName: "Member B", meetingId: sampleMeeting.id },
  { id: "member-example-3", displayName: "Member C", meetingId: sampleMeeting.id },
];

export const sampleTasks: Task[] = [
  {
    id: "task-example-1",
    meetingId: sampleMeeting.id,
    title: "Bring tables for the open studio",
    ownerId: "member-example-1",
    dueDate: "2026-12-11",
    status: "open",
    createdAt: "2026-11-24T15:00:00Z",
    updatedAt: "2026-11-24T15:00:00Z",
  },
  {
    id: "task-example-2",
    meetingId: sampleMeeting.id,
    title: "Print and post event flyers",
    ownerId: "member-example-2",
    dueDate: "2026-12-05",
    status: "done",
    createdAt: "2026-11-24T15:00:00Z",
    updatedAt: "2026-11-25T18:30:00Z",
  },
  {
    id: "task-example-3",
    meetingId: sampleMeeting.id,
    title: "Restock ink for the shared printing station",
    ownerId: "member-example-3",
    dueDate: "2026-12-10",
    status: "open",
    createdAt: "2026-11-24T15:00:00Z",
    updatedAt: "2026-11-24T15:00:00Z",
  },
];
