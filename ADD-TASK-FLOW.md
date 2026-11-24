# Add task flow

This describes the current path from the home screen to an added task. Line
numbers may change as the code evolves.

1. [app/page.tsx, line 175](./app/page.tsx#L175) - The **Add task** button is
   disabled if the meeting has no members.
2. [app/page.tsx, line 179](./app/page.tsx#L179) - Tapping the button sets
   `isAddingTask` to `true`.
3. [app/page.tsx, line 105](./app/page.tsx#L105) - React replaces the meeting
   board with `AddTaskForm`, passing the current members and save/cancel
   callbacks.
4. [components/add-task-form.tsx, line 45](./components/add-task-form.tsx#L45)
   - The form displays required fields for a task name, assigned member, and
   due date.
5. [components/add-task-form.tsx, line 82](./components/add-task-form.tsx#L82)
   - Tapping the form's **Add task** button submits it after the browser
   checks the required fields.
6. [components/add-task-form.tsx, line 20](./components/add-task-form.tsx#L20)
   - `handleSubmit` prevents a page reload, reads the fields, and trims the
   task name.
7. [components/add-task-form.tsx, line 27](./components/add-task-form.tsx#L27)
   - The handler rejects a blank or whitespace-only name and checks that the
   selected owner is a current meeting member.
8. [components/add-task-form.tsx, line 37](./components/add-task-form.tsx#L37)
   - If validation passes, the form calls `onSave` with the title, owner ID,
   and due date.
9. [app/page.tsx, line 75](./app/page.tsx#L75) - `addTask` adds a task to React
   state with a generated ID, the sample meeting ID, an `open` status, and
   timestamps.
10. [app/page.tsx, line 88](./app/page.tsx#L88) - It closes the form, returning
    the user to the meeting board.
11. [app/page.tsx, line 126](./app/page.tsx#L126) - The board renders the
    updated task list, including the new task, owner, and due date.

Alternatively, [Cancel](./components/add-task-form.tsx#L81) returns to the
board without adding a task.

**Storage:** Tasks are held only in React state, so changes disappear on
refresh; no database request is made.
