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
  "mt-2 h-12 w-full rounded-xl border border-[#cfdad2] bg-white px-3 text-sm text-[#24352f] outline-none focus-visible:border-[#2f6555] focus-visible:ring-2 focus-visible:ring-[#a9c7b5]";

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
    <section className="mx-auto w-full max-w-xl py-8 sm:py-12" aria-labelledby="add-task-heading">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#718078]">Meeting commitments</p>
      <h1 id="add-task-heading" className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Add a task</h1>
      <p className="mt-2 text-sm text-[#718078]">Record what needs doing and who will take care of it.</p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-5 rounded-2xl border border-[#e0e5e1] bg-white p-5 shadow-[0_8px_30px_rgba(47,76,61,0.04)] sm:p-7">
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

        <p className="text-xs leading-5 text-[#718078]">This sample meeting is temporary. Changes are lost when you refresh.</p>
        <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" className="h-11 rounded-xl border-[#cfdad2] bg-white px-5 text-[#36564b]" onClick={onCancel}>Cancel</Button>
          <Button type="submit" className="h-11 rounded-xl bg-[#2f6555] px-5 text-white hover:bg-[#245345]">Add task</Button>
        </div>
      </form>
    </section>
  );
}
