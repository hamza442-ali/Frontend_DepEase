import { useState } from 'react';
import { CalendarDays, Pencil, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../../app/auth';
import { useWorkspace } from '../../app/workspace';
import { EntityForm } from '../../components/resource-page';
import {
  Badge,
  Button,
  ConfirmDialog,
  EmptyState,
  PageHeader,
  QueryState,
  Tabs,
} from '../../components/ui';
import { api, encode, list, useAction, useData } from '../../lib/api';
import { dateLabel } from '../../lib/format';

export default function CalendarPage() {
  const { role } = useAuth();
  const { projects } = useWorkspace();
  const [tab, setTab] = useState('department');
  const [editor, setEditor] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const department = tab === 'department';
  const query = useData(department ? '/schedule/getAll' : '/scheduler/scheduler');
  const remove = useAction((item) =>
    department
      ? api.delete('/schedule/delete', { data: { ids: [item._id] } })
      : api.delete(`/scheduler/scheduler/${encode(item._id)}`),
  );
  const fields = [
    { key: 'start', label: 'Starts', type: 'datetime-local' },
    { key: 'end', label: 'Ends', type: 'datetime-local' },
    ...(department
      ? [
          { key: 'content', label: 'Event title' },
          {
            key: 'type',
            label: 'Status',
            type: 'select',
            options: ['Pending', 'Scheduled', 'Completed', 'Cancelled'],
            default: 'Pending',
          },
        ]
      : [
          {
            key: 'Project',
            label: 'Project',
            type: 'select',
            options: projects.map((project) => ({ value: project._id, label: project.ProjectId })),
          },
          { key: 'type', label: 'Event type', default: 'Project review' },
        ]),
  ];
  const rows = [...list(query.data)].sort((a, b) => new Date(a.start) - new Date(b.start));
  return (
    <>
      <PageHeader
        eyebrow="Plan ahead"
        title="Calendar"
        description="Make space for reviews, milestones, and the moments that matter."
        action={
          role !== 'student' && (
            <Button onClick={() => setEditor({})}>
              <Plus size={17} />
              Schedule event
            </Button>
          )
        }
      />
      {role !== 'student' && (
        <Tabs
          value={tab}
          onChange={setTab}
          items={[
            { value: 'department', label: 'Department schedule' },
            { value: 'projects', label: 'Project reviews' },
          ]}
        />
      )}
      <QueryState query={query}>
        <section className="panel">
          {rows.length ? (
            rows.map((item) => (
              <article className="calendar-event" key={item._id}>
                <div className="calendar-date">
                  <strong>{new Date(item.start).getDate()}</strong>
                  <span>{dateLabel(item.start, { day: undefined, month: 'short' })}</span>
                </div>
                <div className="calendar-event-content">
                  <h3>
                    {department
                      ? item.content
                      : `${projects.find((project) => project._id === (item.Project?._id || item.Project))?.ProjectId || item.Project?.ProjectId || 'Project review'} · ${item.type}`}
                  </h3>
                  <p>
                    {dateLabel(item.start, { year: 'numeric', hour: '2-digit', minute: '2-digit' })}{' '}
                    — {dateLabel(item.end, { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <Badge>{item.type}</Badge>
                {role !== 'student' && (
                  <div className="row-actions">
                    <button
                      className="icon-button"
                      aria-label="Edit event"
                      onClick={() =>
                        setEditor({ ...item, Project: item.Project?._id || item.Project })
                      }
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="icon-button text-danger"
                      aria-label="Delete event"
                      onClick={() => {
                        remove.reset();
                        setDeleting(item);
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </article>
            ))
          ) : (
            <EmptyState
              title="A little room in your calendar"
              description="Scheduled events will appear here in date order."
              icon={CalendarDays}
            />
          )}
        </section>
      </QueryState>
      {editor && (
        <EntityForm
          title={editor._id ? 'Edit event' : 'Schedule event'}
          record={editor}
          fields={fields}
          onClose={() => setEditor(null)}
          onSave={(data) => {
            if (new Date(data.end) <= new Date(data.start))
              throw new Error('The event must end after it starts.');
            const start = new Date(data.start);
            const payload = {
              ...data,
              start: start.toISOString(),
              end: new Date(data.end).toISOString(),
              ...(department
                ? {
                    date: start.toISOString(),
                    day: start.toLocaleDateString('en', { weekday: 'long' }),
                  }
                : { id: editor.id || crypto.randomUUID() }),
            };
            return editor._id
              ? api.put(
                  department
                    ? `/schedule/update/${encode(editor._id)}`
                    : `/scheduler/scheduler/${encode(editor._id)}`,
                  payload,
                )
              : api.post(department ? '/schedule/create' : '/scheduler/scheduler', payload);
          }}
        />
      )}
      {deleting && (
        <ConfirmDialog
          title="Delete this event?"
          description="This will remove it from the schedule."
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
              /* Keep dialog open. */
            }
          }}
        />
      )}
    </>
  );
}
