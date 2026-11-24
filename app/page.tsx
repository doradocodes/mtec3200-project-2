"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AddTaskForm } from "@/components/add-task-form";
import { sampleMeeting, sampleMembers, sampleTasks, type Task } from "@/lib/sample-data";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function ClipboardIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 5.25h6M9.75 3h4.5a1.5 1.5 0 0 1 1.5 1.5V6h1.5A1.75 1.75 0 0 1 19 7.75v11.5A1.75 1.75 0 0 1 17.25 21H6.75A1.75 1.75 0 0 1 5 19.25V7.75A1.75 1.75 0 0 1 6.75 6h1.5V4.5A1.5 1.5 0 0 1 9.75 3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="m8 12 2 2 5-5" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="m10 13.75 4-4M7.75 16.25l-1 1a3.182 3.182 0 0 1-4.5-4.5l3-3a3.182 3.182 0 0 1 4.5 0M16.25 7.75l1-1a3.182 3.182 0 0 1 4.5 4.5l-3 3a3.182 3.182 0 0 1-4.5 0" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14M5 12h14" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="m6 12 4 4 8-8" />
    </svg>
  );
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const members = sampleMembers.filter((member) => member.meetingId === sampleMeeting.id);
  const completedTasks = tasks.filter((task) => task.status === "done").length;
  const progress = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;

  function toggleTask(id: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, status: task.status === "done" ? "open" : "done", updatedAt: new Date().toISOString() } : task,
      ),
    );
  }

  function addTask(task: { title: string; ownerId: string; dueDate: string }) {
    const now = new Date().toISOString();
    setTasks((currentTasks) => [...currentTasks, {
      ...task,
      id: crypto.randomUUID(),
      meetingId: sampleMeeting.id,
      status: "open",
      createdAt: now,
      updatedAt: now,
    }]);
    setIsAddingTask(false);
  }

  return (
    <main className="min-h-screen bg-[#f7f8f5] text-[#24352f]">
      <div className="mx-auto min-h-screen max-w-7xl px-5 pb-12 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between border-b border-[#dfe5df] py-5">
          <Link className="flex items-center gap-2.5" href="/" aria-label="Studio Commitments home">
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#2f6555] text-white shadow-sm">
              <span className="size-5">
                <ClipboardIcon />
              </span>
            </span>
            <span className="text-[15px] font-semibold tracking-[-0.02em]">Studio Commitments</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-[#6d7b74]">
            <span className="hidden sm:inline">Organizer view</span>
            <span className="flex size-9 items-center justify-center rounded-full bg-[#e6ede8] text-xs font-semibold text-[#2f6555]">AR</span>
          </div>
        </header>

        {isAddingTask ? (
          <AddTaskForm members={members} onCancel={() => setIsAddingTask(false)} onSave={addTask} />
        ) : (
        <div className="grid gap-8 pt-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12 lg:pt-12">
          <section>
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#718078]">
                  <span className="size-2 rounded-full bg-[#e6a14a]" />
                  Upcoming studio event
                </div>
                <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[#24352f] sm:text-4xl">
                  {sampleMeeting.title}
                </h1>
                {sampleMeeting.eventDate && <p className="mt-2 text-sm text-[#718078]">{formatDate(sampleMeeting.eventDate)}</p>}
              </div>
              <Button variant="outline" className="h-11 gap-2 rounded-xl border-[#cfdad2] bg-white px-4 text-[#36564b] shadow-sm hover:border-[#9db6a8] hover:bg-[#f4f8f5]">
                <span className="size-4"><LinkIcon /></span>
                Share meeting link
              </Button>
            </div>

            <div className="mb-7 rounded-2xl border border-[#d9e3dc] bg-[#edf4ee] p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#315d4e]">Meeting commitments</p>
                  <p className="mt-1 text-sm text-[#587066]">
                    {completedTasks} of {tasks.length} tasks complete
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:min-w-56">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#d5e2d8]">
                    <div className="h-full rounded-full bg-[#3e7a61] transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="text-sm font-semibold text-[#315d4e]">{progress}%</span>
                </div>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold tracking-[-0.02em]">All tasks</h2>
                <p className="mt-1 text-sm text-[#718078]">Everyone can see what still needs doing.</p>
              </div>
              <Button size="icon" className="size-10 rounded-xl bg-[#2f6555] text-white shadow-sm hover:bg-[#245345]" aria-label="Add task" onClick={() => setIsAddingTask(true)}>
                <span className="size-5"><PlusIcon /></span>
              </Button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#e0e5e1] bg-white shadow-[0_8px_30px_rgba(47,76,61,0.04)]">
              <div className="hidden grid-cols-[minmax(0,1fr)_140px_112px_40px] gap-4 border-b border-[#edf0ed] bg-[#fbfcfb] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#8a9790] sm:grid">
                <span>Task</span>
                <span>Owner</span>
                <span>Due</span>
                <span />
              </div>
              <ul>
                {tasks.map((task) => (
                  <li className="border-b border-[#edf0ed] last:border-0" key={task.id}>
                    <div className="grid gap-3 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_140px_112px_40px] sm:items-center sm:gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className={`size-6 rounded-lg ${task.status === "done" ? "border-[#3e7a61] bg-[#3e7a61] text-white hover:bg-[#3e7a61] hover:text-white" : "border-[#b8c7bd] bg-white text-transparent hover:border-[#3e7a61] hover:bg-white hover:text-transparent"}`}
                          onClick={() => toggleTask(task.id)}
                          aria-label={`${task.status === "done" ? "Mark open" : "Complete"} ${task.title}`}
                          aria-pressed={task.status === "done"}
                        >
                          <span className="size-4"><CheckIcon /></span>
                        </Button>
                        <span className={`truncate text-sm font-medium ${task.status === "done" ? "text-[#92a098] line-through" : "text-[#2e4138]"}`}>{task.title}</span>
                      </div>
                      <div className="flex items-center gap-2 pl-9 text-sm text-[#63736b] sm:pl-0">
                        <span>{members.find((member) => member.id === task.ownerId)?.displayName ?? "Unknown member"}</span>
                      </div>
                      <div className={`pl-9 text-xs sm:pl-0 ${task.status === "done" ? "text-[#8b9991]" : "text-[#718078]"}`}>
                        <span className="sm:hidden">Due · </span>{formatDate(task.dueDate)}
                      </div>
                      <span className={`hidden text-right text-xs sm:block ${task.status === "done" ? "text-[#3e7a61]" : "text-[#9aa69f]"}`}>
                        {task.status === "done" ? "Done" : "Open"}
                      </span>
                    </div>
                    <p className={`pl-14 pb-3 text-xs sm:hidden ${task.status === "done" ? "text-[#3e7a61]" : "text-[#9aa69f]"}`}>{task.status === "done" ? "Done" : "Open"}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <aside className="lg:pt-2">
            <div className="mb-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold tracking-[-0.02em]">Members</h2>
                  <p className="mt-1 text-sm text-[#718078]">{members.length} people on this page</p>
                </div>
                <Button variant="outline" size="icon" className="size-9 rounded-xl border-[#cfdad2] bg-white text-[#477362] hover:bg-[#f4f8f5]" aria-label="Add member">
                  <span className="size-4"><PlusIcon /></span>
                </Button>
              </div>
              <div className="space-y-2">
                {members.map((member) => (
                  <div className="flex items-center justify-between rounded-xl border border-[#e0e5e1] bg-white px-4 py-3" key={member.id}>
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-full bg-[#e6ede8] text-xs font-semibold text-[#36564b]">{member.displayName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}</span>
                      <span className="text-sm font-medium text-[#35473e]">{member.displayName}</span>
                    </div>
                    <span className="text-xs text-[#8a9790]">{tasks.filter((task) => task.ownerId === member.id).length} {tasks.filter((task) => task.ownerId === member.id).length === 1 ? "task" : "tasks"}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#e3e8e4] bg-white p-5">
              <div className="mb-3 flex size-9 items-center justify-center rounded-xl bg-[#f7eee2] text-[#bd7834]">
                <span className="text-lg">↗</span>
              </div>
              <h3 className="text-sm font-semibold text-[#35473e]">Keep everyone in the loop</h3>
              <p className="mt-2 text-sm leading-6 text-[#718078]">Send each member their link so they can open their tasks directly.</p>
              <Button variant="link" className="mt-4 h-auto p-0 text-sm font-semibold text-[#2f6555] underline decoration-[#b6cdbd] underline-offset-4 hover:text-[#245345]">Copy member links</Button>
            </div>
          </aside>
        </div>
        )}
      </div>
    </main>
  );
}
