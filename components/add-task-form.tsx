"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import type { Member } from "@/lib/sample-data";

type AddTaskFormProps = {
  members: Member[];
  onCancel: () => void;
  onSave: (task: { title: string; ownerId: string; dueDate: string }) => void;
};

const fieldClassName =
  "mt-2 h-12 w-full rounded-lg border border-neutral-400 bg-white px-3 text-sm text-neutral-950 outline-none focus-visible:border-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-400";

export function AddTaskForm({ members, onCancel, onSave }: AddTaskFormProps) {
  const [titleError, setTitleError] = useState("");
  const [ownerError, setOwnerError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const ownerId = String(formData.get("ownerId") ?? "");
    const dueDate = String(formData.get("dueDate") ?? "");

    if (!title) {
      setTitleError("Enter a task name.");
      return;
    }

    if (!members.some((member) => member.id === ownerId)) {
      setOwnerError("Select a member from this meeting.");
      return;
    }

    onSave({ title, ownerId, dueDate });
  }

  return (
    <section className="w-full pt-10" aria-labelledby="add-task-heading">
      <h1 id="add-task-heading" className="text-2xl font-semibold">Add a task</h1>
      <p className="mt-2 text-sm text-neutral-600">Record what needs doing and who will take care of it.</p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-5">
        <div>
          <label htmlFor="task-title" className="text-sm font-semibold">Task name</label>
          <input
            id="task-title"
            name="title"
            type="text"
            required
            maxLength={120}
            placeholder="e.g. Bring tables"
            className={fieldClassName}
            aria-invalid={Boolean(titleError)}
            aria-describedby={titleError ? "task-title-error" : undefined}
            onChange={() => setTitleError("")}
          />
          {titleError && <p id="task-title-error" role="alert" className="mt-2 text-sm text-red-700">{titleError}</p>}
        </div>

        <div>
          <label htmlFor="task-owner" className="text-sm font-semibold">Assigned to</label>
          <select id="task-owner" name="ownerId" required defaultValue="" className={fieldClassName} aria-invalid={Boolean(ownerError)} aria-describedby={ownerError ? "task-owner-error" : undefined} onChange={() => setOwnerError("")}>
            <option value="" disabled>Select a member</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>{member.displayName}</option>
            ))}
          </select>
          {ownerError && <p id="task-owner-error" role="alert" className="mt-2 text-sm text-red-700">{ownerError}</p>}
        </div>

        <div>
          <label htmlFor="task-due-date" className="text-sm font-semibold">Due date</label>
          <input id="task-due-date" name="dueDate" type="date" required className={fieldClassName} />
        </div>

        <p className="text-xs leading-5 text-neutral-600">This sample meeting is temporary. Changes are lost when you refresh.</p>
        <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" className="h-11 rounded-lg border-2 border-neutral-900 bg-white px-5 text-neutral-950" onClick={onCancel}>Cancel</Button>
          <Button type="submit" className="h-11 rounded-lg bg-neutral-900 px-5 text-white hover:bg-neutral-700">Add task</Button>
        </div>
      </form>
    </section>
  );
}
