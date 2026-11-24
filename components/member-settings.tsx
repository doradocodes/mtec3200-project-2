"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import type { Member } from "@/lib/sample-data";

type MemberSettingsProps = {
  members: Member[];
  onAdd: (name: string) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
};

export function MemberSettings({ members, onAdd, onDelete, onBack }: MemberSettingsProps) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  function submitMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Enter a member name.");
      return;
    }
    if (members.some((member) => member.displayName.toLocaleLowerCase() === trimmedName.toLocaleLowerCase())) {
      setError("A member with this name already exists.");
      return;
    }
    onAdd(trimmedName);
    setName("");
    setError("");
    setAdding(false);
  }

  return (
    <section className="flex flex-1 flex-col pt-10" aria-labelledby="settings-heading">
      <h1 id="settings-heading" className="text-2xl font-semibold">Settings</h1>
      <p className="mt-2 text-sm text-neutral-600">Members for this meeting</p>
      {members.length === 0 ? (
        <p className="mt-6 text-sm text-neutral-600">No members yet. Add a member to assign tasks.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {members.map((member) => (
            <li key={member.id}>
              <div className="flex flex-wrap items-center gap-2">
                <span aria-hidden="true" className="size-6 shrink-0 rounded-full border-2 border-neutral-900" />
                <span className="min-w-0 flex-1 break-words">{member.displayName}</span>
                <Button type="button" variant="outline" disabled aria-label={`Copy link for ${member.displayName}`} aria-describedby="member-link-unavailable">
                  Copy link
                </Button>
                <Button type="button" variant="outline" aria-label={`Delete ${member.displayName}`} onClick={() => setPendingDelete(member.id)}>
                  Delete
                </Button>
              </div>
              {pendingDelete === member.id && (
                <div className="mt-2 rounded-lg border border-neutral-300 p-3">
                  <p className="text-sm">Delete {member.displayName}? Their tasks will become unassigned.</p>
                  <div className="mt-3 flex gap-2">
                    <Button type="button" variant="destructive" onClick={() => { onDelete(member.id); setPendingDelete(null); }}>
                      Confirm delete
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setPendingDelete(null)}>Cancel</Button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      <p id="member-link-unavailable" className="mt-4 text-xs text-neutral-600">
        Member links will be available when meeting pages are saved.
      </p>

      {adding ? (
        <form className="mt-6 space-y-3" onSubmit={submitMember}>
          <label htmlFor="member-name" className="block text-sm font-semibold">Member name</label>
          <input
            id="member-name"
            value={name}
            onChange={(event) => { setName(event.target.value); setError(""); }}
            maxLength={80}
            required
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "member-name-error" : undefined}
            className="h-12 w-full rounded-lg border border-neutral-400 px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
          />
          {error && <p id="member-name-error" role="alert" className="text-sm text-red-700">{error}</p>}
          <div className="flex gap-2">
            <Button type="submit">Save member</Button>
            <Button type="button" variant="outline" onClick={() => { setAdding(false); setName(""); setError(""); }}>Cancel</Button>
          </div>
        </form>
      ) : (
        <Button type="button" variant="outline" className="mt-6 h-11 w-fit rounded-lg border-2 border-neutral-900 px-6" onClick={() => setAdding(true)}>
          Add<span className="sr-only"> member</span>
        </Button>
      )}
      <p className="mt-5 text-xs text-neutral-600">Changes are temporary and will be lost on refresh.</p>
      <Button type="button" variant="outline" className="mt-auto h-12 w-full rounded-lg border-2 border-neutral-900" onClick={onBack}>
        Back to meeting
      </Button>
    </section>
  );
}
