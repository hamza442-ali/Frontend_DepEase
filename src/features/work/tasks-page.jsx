import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../../app/auth';
import { useWorkspace } from '../../app/workspace';
import { ProjectGate } from '../../components/project-gate';
import { EntityForm } from '../../components/resource-page';
import {
  Badge,
  Button,
  ConfirmDialog,
  ErrorNotice,
  PageHeader,
  QueryState,
  SearchBox,
} from '../../components/ui';
import { api, encode, list, useAction, useData } from '../../lib/api';
import { PRIORITY_OPTIONS, STATUS_OPTIONS, initials, statusCategory } from '../../lib/format';

export default function TasksPage() {
  return (
    <ProjectGate>
      <TaskBoard />
    </ProjectGate>
  );
}

function TaskBoard() {
  const { project } = useWorkspace();
  const { account } = useAuth();
  const query = useData(`/tasks/getmine/${encode(project.ProjectId)}`);
  const [search, setSearch] = useState('');
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const move = useAction(({ id, status }) => api.put(`/tasks/update/${encode(id)}`, { status }));
  const remove = useAction((task) => api.delete(`/tasks/delete/${encode(task._id)}`));
  const rows = list(query.data).filter((task) =>
    `${task.summary} ${task.assignee}`.toLowerCase().includes(search.toLowerCase()),
  );
  const fields = [
    { key: 'summary', label: 'Task summary' },
    { key: 'assignee', label: 'Assignee' },
    { key: 'reporter', label: 'Reporter', default: account.student_name || account.name },
    {
      key: 'priority',
      label: 'Priority',
      type: 'select',
      options: PRIORITY_OPTIONS,
      default: 'Medium',
    },
    { key: 'status', label: 'Status', type: 'select', options: STATUS_OPTIONS, default: 'Pending' },
  ];
  return (
    <>
      <PageHeader
        eyebrow="Project workspace"
        title="Task board"
        description="Give every next step a clear owner and a place to move forward."
        action={
          <Button onClick={() => setAdding(true)}>
            <Plus size={17} />
            New task
          </Button>
        }
      />
      <div className="section-toolbar">
        <span className="muted">{rows.length} tasks in this project</span>
        <SearchBox value={search} onChange={setSearch} placeholder="Search tasks or assignees…" />
      </div>
      <ErrorNotice error={move.error} />
      <QueryState query={query}>
        <div className="board-grid">
          {STATUS_OPTIONS.map((status) => {
            const tasks = rows.filter(
              (task) =>
                (statusCategory(task.status) === 'success'
                  ? 'Completed'
                  : statusCategory(task.status) === 'info'
                    ? 'In Progress'
                    : 'Pending') === status,
            );
            return (
              <section className="board-column" key={status}>
                <header>
                  <Badge>{status}</Badge>
                  <span>{tasks.length}</span>
                </header>
                <div className="board-tasks">
                  {tasks.map((task) => (
                    <article className="task-card" key={task._id}>
                      <div className="task-card-top">
                        <Badge>{task.priority}</Badge>
                        <button
                          className="icon-button"
                          aria-label={`Delete task: ${task.summary}`}
                          onClick={() => {
                            remove.reset();
                            setDeleting(task);
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <h3>{task.summary}</h3>
                      <p>Reported by {task.reporter}</p>
                      <footer>
                        <span className="assignee">
                          <span className="avatar avatar-tiny">{initials(task.assignee)}</span>
                          {task.assignee}
                        </span>
                        <select
                          aria-label={`Status for ${task.summary}`}
                          value={STATUS_OPTIONS.includes(task.status) ? task.status : status}
                          disabled={move.isPending}
                          onChange={(event) =>
                            move.mutate({ id: task._id, status: event.target.value })
                          }
                        >
                          {STATUS_OPTIONS.map((value) => (
                            <option key={value}>{value}</option>
                          ))}
                        </select>
                      </footer>
                    </article>
                  ))}
                  {!tasks.length && (
                    <p className="column-empty">
                      {search ? 'No matching tasks' : 'No tasks here yet'}
                    </p>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </QueryState>
      {adding && (
        <EntityForm
          title="Create task"
          fields={fields}
          onClose={() => setAdding(false)}
          onSave={(data) => api.post('/tasks/add', { ...data, projectid: project.ProjectId })}
          submitLabel="Create task"
        />
      )}
      {deleting && (
        <ConfirmDialog
          title="Delete this task?"
          description={deleting.summary}
          busy={remove.isPending}
          error={remove.error}
          onClose={() => {
            if (!remove.isPending) setDeleting(null);
          }}
          onConfirm={async () => {
            try {
              await remove.mutateAsync(deleting);
              setDeleting(null);
            } catch {
              /* Mutation error stays visible. */
            }
          }}
        />
      )}
    </>
  );
}
