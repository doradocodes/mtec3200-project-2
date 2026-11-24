"use client";

import { useState } from "react";
import { AddTaskForm } from "@/components/add-task-form";
import { MemberSettings } from "@/components/member-settings";
import { Button } from "@/components/ui/button";
import {
  sampleMeeting,
  sampleMembers,
  sampleTasks,
  type Task,
} from "@/lib/sample-data";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [assignmentError, setAssignmentError] = useState("");
  const [members, setMembers] = useState(
    () => sampleMembers.filter((member) => member.meetingId === sampleMeeting.id),
  );

  function addMember(displayName: string) {
    setMembers((current) => [...current, {
      id: crypto.randomUUID(),
      displayName,
      meetingId: sampleMeeting.id,
    }]);
  }

  function deleteMember(id: string) {
    const updatedAt = new Date().toISOString();
    setMembers((current) => current.filter((member) => member.id !== id));
    setTasks((current) => current.map((task) =>
      task.ownerId === id ? { ...task, ownerId: null, updatedAt } : task,
    ));
  }

  function assignTask(taskId: string, ownerId: string) {
    if (!members.some((member) => member.id === ownerId)) {
      setAssignmentError("Select an existing member to assign this task.");
      return;
    }
    setAssignmentError("");
    const updatedAt = new Date().toISOString();
    setTasks((current) => current.map((task) =>
      task.id === taskId ? { ...task, ownerId, updatedAt } : task,
    ));
  }

  function toggleTask(id: string) {
    const updatedAt = new Date().toISOString();
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "done" ? "open" : "done",
              updatedAt,
            }
          : task,
      ),
    );
  }

  function addTask(task: { title: string; ownerId: string; dueDate: string }) {
    const now = new Date().toISOString();
    setTasks((currentTasks) => [
      ...currentTasks,
      {
        ...task,
        id: crypto.randomUUID(),
        meetingId: sampleMeeting.id,
        status: "open",
        createdAt: now,
        updatedAt: now,
      },
    ]);
    setIsAddingTask(false);
  }

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-6 pb-6 pt-8">
        <header className="flex items-center justify-between text-xl font-bold tracking-tight">
          <span aria-label="Studio Commitments">src</span>
          {!isSettingsOpen && !isAddingTask && (
            <Button type="button" variant="outline" onClick={() => setIsSettingsOpen(true)}>
              Settings
            </Button>
          )}
        </header>

        {isSettingsOpen ? (
          <MemberSettings members={members} onAdd={addMember} onDelete={deleteMember} onBack={() => setIsSettingsOpen(false)} />
        ) : isAddingTask ? (
          <AddTaskForm
            members={members}
            onCancel={() => setIsAddingTask(false)}
            onSave={addTask}
          />
        ) : (
          <section className="flex flex-1 flex-col pt-10" aria-labelledby="meeting-title">
            <h1 id="meeting-title" className="text-2xl font-semibold">
              Event: {sampleMeeting.title}
            </h1>
            {sampleMeeting.eventDate && (
              <p className="mt-1 text-sm text-neutral-600">
                {formatDate(sampleMeeting.eventDate)}
              </p>
            )}

            {tasks.length === 0 ? (
              <p className="mt-6 text-sm text-neutral-600">No tasks yet.</p>
            ) : (
              <ul className="mt-6 space-y-5">
                {tasks.map((task) => {
                  const owner = members.find((member) => member.id === task.ownerId);

                  return (
                    <li key={task.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                      <div className="flex min-w-0 items-start gap-3">
                        <input
                          id={`task-${task.id}`}
                          type="checkbox"
                          checked={task.status === "done"}
                          onChange={() => toggleTask(task.id)}
                          aria-label={`Mark ${task.title} as done`}
                          className="mt-1 size-6 shrink-0 cursor-pointer accent-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
                        />
                        <div className="min-w-0">
                          <label htmlFor={`task-${task.id}`} className="cursor-pointer text-base font-medium">
                            {task.title}
                          </label>
                          <p className="mt-1 text-xs text-neutral-600">
                            Due {formatDate(task.dueDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex min-w-0 items-center gap-2 pt-1 text-sm">
                        {members.length > 0 ? (
                          <select
                            id={`assign-${task.id}`}
                            aria-label={`Assign ${task.title}`}
                            value={owner?.id ?? ""}
                            onChange={(event) => assignTask(task.id, event.target.value)}
                            className="h-10 w-36 max-w-[40vw] rounded-lg border border-neutral-400 bg-white px-2 text-sm"
                          >
                            <option value="" disabled>{task.ownerId === null ? "Select a member" : "Unknown member"}</option>
                            {members.map((member) => <option key={member.id} value={member.id}>{member.displayName}</option>)}
                          </select>
                        ) : (
                          <>
                            <span aria-hidden="true" className="size-6 shrink-0 rounded-full border-2 border-neutral-900" />
                            <span>{owner?.displayName ?? (task.ownerId === null ? "Unassigned" : "Unknown member")}</span>
                          </>
                        )}
                      </div>
                      {assignmentError && <p role="alert" className="mt-3 text-sm text-red-700">{assignmentError}</p>}
                    </li>
                  );
                })}
              </ul>
            )}

            <Button
              type="button"
              variant="outline"
              className="mt-7 h-11 w-fit rounded-lg border-2 border-neutral-900 bg-white px-6 text-neutral-950"
              onClick={() => setIsAddingTask(true)}
              disabled={members.length === 0}
              aria-describedby={members.length === 0 ? "add-member-first" : undefined}
            >
              Add task
              <span className="sr-only"> task</span>
            </Button>
            {members.length === 0 && <p id="add-member-first" className="mt-2 text-sm text-neutral-600">Add a member in Settings before adding a task.</p>}

            <div className="mt-auto pt-12">
              <p id="share-unavailable" className="mb-2 text-center text-xs text-neutral-600">
                Sharing will be available when meeting pages are saved.
              </p>
              <Button
                type="button"
                variant="outline"
                className="h-12 w-full rounded-lg border-2 border-neutral-900 bg-white text-neutral-950"
                disabled
                aria-describedby="share-unavailable"
              >
                Share link
              </Button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
