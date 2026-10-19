import { useState } from 'react';
import { MessageSquare, Paperclip } from 'lucide-react';
import { useAuth } from '../../app/auth';
import { useWorkspace } from '../../app/workspace';
import { ProjectGate } from '../../components/project-gate';
import { ResourcePage } from '../../components/resource-page';
import {
  Badge,
  Button,
  EmptyState,
  ErrorNotice,
  Field,
  Modal,
  QueryState,
} from '../../components/ui';
import { api, encode, list, useAction, useData } from '../../lib/api';
import { dateLabel, PRIORITY_OPTIONS, safeUrl, STATUS_OPTIONS } from '../../lib/format';

export default function RequirementsPage() {
  return (
    <ProjectGate>
      <Requirements />
    </ProjectGate>
  );
}

function Requirements() {
  const { project } = useWorkspace();
  const { account } = useAuth();
  const [discussion, setDiscussion] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const fields = [
    { key: 'title', label: 'Title' },
    {
      key: 'priority',
      label: 'Priority',
      type: 'select',
      options: PRIORITY_OPTIONS,
      default: 'Medium',
    },
    { key: 'status', label: 'Status', type: 'select', options: STATUS_OPTIONS, default: 'Pending' },
    { key: 'deadline', label: 'Deadline', type: 'date' },
    { key: 'description', label: 'Description', type: 'textarea' },
    {
      key: 'assignedTo',
      label: 'Assignees',
      type: 'lines',
      required: false,
      hint: 'One name or registration number per line.',
    },
  ];
  const columns = [
    { key: 'title', label: 'Requirement' },
    { key: 'priority', label: 'Priority', render: (row) => <Badge>{row.priority}</Badge> },
    { key: 'status', label: 'Status', render: (row) => <Badge>{row.status}</Badge> },
    { key: 'deadline', label: 'Deadline', render: (row) => dateLabel(row.deadline) },
  ];
  return (
    <>
      <ResourcePage
        key={project._id}
        title="Requirements"
        description="Turn your project scope into clear, trackable requirements."
        url={`/requirements/getRequirements/${encode(project.ProjectId)}`}
        fields={fields}
        columns={columns}
        createUrl="/requirements/createRequirement"
        updateUrl="/requirements/updateRequirement"
        deleteUrl="/requirements/deleteRequirement"
        makePayload={(data, record) => ({
          ...data,
          projectid: project.ProjectId,
          ...(!record._id && {
            writtenby: account.registration_number || account.employeeId,
            attachments: [],
            comments: [],
          }),
        })}
        extraActions={(record) => (
          <>
            <button
              className="icon-button"
              aria-label={`Comments on ${record.title}`}
              onClick={() => setDiscussion(record)}
            >
              <MessageSquare size={16} />
            </button>
            <button
              className="icon-button"
              aria-label={`Attachments for ${record.title}`}
              onClick={() => setAttachment(record)}
            >
              <Paperclip size={16} />
            </button>
          </>
        )}
      />
      {discussion && (
        <RequirementDiscussion record={discussion} onClose={() => setDiscussion(null)} />
      )}
      {attachment && (
        <RequirementAttachments record={attachment} onClose={() => setAttachment(null)} />
      )}
    </>
  );
}

function RequirementDiscussion({ record, onClose }) {
  const query = useData(`/requirements/getComments/${encode(record._id)}`);
  const [content, setContent] = useState('');
  const send = useAction(() =>
    api.post(`/requirements/addComment/${encode(record._id)}`, { content: content.trim() }),
  );
  return (
    <Modal title="Requirement discussion" description={record.title} onClose={onClose}>
      <QueryState query={query}>
        <div className="content-stack">
          {list(query.data).map((comment, index) => (
            <article className="list-card" key={comment._id || index}>
              <p className="preserve-lines">{comment.content}</p>
              <small>
                {comment.createdBy} · {dateLabel(comment.createdAt)}
              </small>
            </article>
          ))}
          {!list(query.data).length && (
            <EmptyState
              title="Start the conversation"
              description="Share context, questions, or progress with the team."
            />
          )}
        </div>
      </QueryState>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (!content.trim()) return;
          try {
            await send.mutateAsync();
            setContent('');
          } catch {
            /* Retain the draft. */
          }
        }}
      >
        <Field
          label="Comment"
          type="textarea"
          required
          value={content}
          maxLength={5000}
          onChange={(event) => setContent(event.target.value)}
        />
        <ErrorNotice error={send.error} />
        <div className="form-actions">
          <Button type="submit" busy={send.isPending}>
            Post comment
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function RequirementAttachments({ record, onClose }) {
  const query = useData(`/requirements/findRequirement/${encode(record._id)}`);
  const [url, setUrl] = useState('');
  const add = useAction(() => {
    if (!safeUrl(url)) throw new Error('Enter a valid HTTP or HTTPS URL.');
    return api.post(`/requirements/uploadAttachment/${encode(record._id)}`, {
      attachment: url.trim(),
    });
  });
  return (
    <Modal title="Attachments" description={record.title} onClose={onClose}>
      <QueryState query={query}>
        <div className="content-stack">
          {list(query.data?.attachments).map((item, index) => (
            <div className="file-link" key={index}>
              <Paperclip size={17} />
              {safeUrl(item) ? (
                <a href={safeUrl(item)} target="_blank" rel="noreferrer">
                  {item}
                </a>
              ) : (
                <span>Unavailable link</span>
              )}
            </div>
          ))}
          {!list(query.data?.attachments).length && <p className="muted">No attachments yet.</p>}
        </div>
      </QueryState>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            await add.mutateAsync();
            setUrl('');
          } catch {
            /* Show validation or request error. */
          }
        }}
      >
        <Field
          label="Attachment URL"
          type="url"
          value={url}
          required
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://…"
        />
        <ErrorNotice error={add.error} />
        <div className="form-actions">
          <Button type="submit" busy={add.isPending}>
            Add attachment
          </Button>
        </div>
      </form>
    </Modal>
  );
}
