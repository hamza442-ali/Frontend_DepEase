import { useState } from 'react';
import DOMPurify from 'dompurify';
import { Megaphone, Plus, Trash2 } from 'lucide-react';
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

export default function AnnouncementsPage() {
  const { role, account } = useAuth();
  const { project } = useWorkspace();
  const [tab, setTab] = useState('department');
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const query = useData(
    tab === 'department'
      ? '/announcementA/getall'
      : project
        ? `/announcementS/getmine/${encode(project.ProjectId)}`
        : null,
  );
  const remove = useAction((item) => api.delete(`/announcement/delete/${encode(item._id)}`));
  const canPublish = tab === 'department' ? role === 'admin' : role !== 'student' && project;
  return (
    <>
      <PageHeader
        eyebrow="Stay connected"
        title="Announcements"
        description="The latest from your department and project supervisor."
        action={
          canPublish && (
            <Button onClick={() => setAdding(true)}>
              <Plus size={17} />
              Publish update
            </Button>
          )
        }
      />
      <Tabs
        items={[
          { value: 'department', label: 'Department' },
          { value: 'project', label: 'Your project' },
        ]}
        value={tab}
        onChange={setTab}
      />
      {tab === 'project' && !project ? (
        <section className="panel">
          <EmptyState
            title="Choose a project first"
            description="Project announcements appear once a project is assigned."
          />
        </section>
      ) : (
        <QueryState query={query}>
          <div className="content-stack">
            {[...list(query.data)].reverse().map((item) => (
              <article className="panel announcement-card" key={item._id}>
                <header>
                  <span className="announcement-symbol">
                    <Megaphone size={20} />
                  </span>
                  <div>
                    <Badge tone="info">
                      {tab === 'department' ? 'Department' : project.ProjectId}
                    </Badge>
                    <small>{dateLabel(item.date)}</small>
                  </div>
                  {tab === 'department' && role === 'admin' && (
                    <button
                      className="icon-button text-danger"
                      aria-label={`Delete ${item.title}`}
                      onClick={() => {
                        remove.reset();
                        setDeleting(item);
                      }}
                    >
                      <Trash2 size={17} />
                    </button>
                  )}
                </header>
                <h2>{item.title}</h2>
                {tab === 'department' ? (
                  <div
                    className="rich-content"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(item.richText || '', {
                        USE_PROFILES: { html: true },
                      }),
                    }}
                  />
                ) : (
                  <p className="preserve-lines">{item.content}</p>
                )}
              </article>
            ))}
            {!list(query.data).length && (
              <section className="panel">
                <EmptyState
                  title="All quiet for now"
                  description="New announcements will appear here."
                  icon={Megaphone}
                />
              </section>
            )}
          </div>
        </QueryState>
      )}
      {adding && (
        <EntityForm
          title="Publish announcement"
          fields={[
            { key: 'title', label: 'Title' },
            { key: 'content', label: 'Announcement', type: 'textarea' },
          ]}
          onClose={() => setAdding(false)}
          onSave={(data) =>
            tab === 'department'
              ? api.post('/announcement/add', {
                  title: data.title,
                  richText: data.content
                    .replaceAll('&', '&amp;')
                    .replaceAll('<', '&lt;')
                    .replaceAll('>', '&gt;')
                    .replaceAll('\n', '<br>'),
                })
              : api.post('/announcementS/add', {
                  ...data,
                  TeacherId: account.employeeId,
                  ProjectId: project.ProjectId,
                })
          }
          submitLabel="Publish"
        />
      )}
      {deleting && (
        <ConfirmDialog
          title="Delete this announcement?"
          description={deleting.title}
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
