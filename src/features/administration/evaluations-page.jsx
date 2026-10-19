import { useState } from 'react';
import { ClipboardCheck, Pencil, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../../app/auth';
import { useWorkspace } from '../../app/workspace';
import {
  Badge,
  Button,
  ConfirmDialog,
  EmptyState,
  ErrorNotice,
  Field,
  Modal,
  PageHeader,
  QueryState,
  SelectField,
  Table,
  Tabs,
} from '../../components/ui';
import { api, encode, list, useAction, useData } from '../../lib/api';
import { dateLabel } from '../../lib/format';

export default function EvaluationsPage() {
  const { account, role } = useAuth();
  const { project } = useWorkspace();
  const [tab, setTab] = useState('marks');
  const templates = useData('/evaluation/getAll');
  const marks = useData(project ? `/addMarks/getmine/${encode(project.ProjectId)}` : null);
  const [editor, setEditor] = useState(null);
  const [marking, setMarking] = useState(false);
  const [details, setDetails] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const remove = useAction(({ item, type }) =>
    api.delete(
      type === 'template'
        ? `/evaluation/deleteEvaluation/${encode(item._id)}`
        : `/addMarks/delete/${encode(item._id)}`,
    ),
  );
  return (
    <>
      <PageHeader
        eyebrow="Review & reflect"
        title="Evaluations"
        description="Clear criteria, thoughtful feedback, and a consistent picture of progress."
        action={
          <div className="heading-actions">
            <Button variant="secondary" onClick={() => setEditor({})}>
              <Plus size={16} />
              New template
            </Button>
            <Button
              onClick={() => setMarking(true)}
              disabled={!project || !list(templates.data).length}
            >
              <ClipboardCheck size={17} />
              Evaluate project
            </Button>
          </div>
        }
      />
      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { value: 'marks', label: 'Project evaluations' },
          { value: 'templates', label: 'Evaluation templates' },
        ]}
      />
      {tab === 'marks' ? (
        !project ? (
          <section className="panel">
            <EmptyState
              title="Choose a project to review"
              description="Select a current project from the top of the workspace."
            />
          </section>
        ) : (
          <section className="panel">
            <QueryState query={marks}>
              <Table
                columns={[
                  { key: 'evaluationType', label: 'Evaluation' },
                  { key: 'TeacherId', label: 'Evaluator' },
                  { key: 'Date', label: 'Recorded', render: (row) => dateLabel(row.Date) },
                  {
                    key: 'obtainedMarks',
                    label: 'Score',
                    render: (row) => (
                      <Badge tone="info">
                        {row.obtainedMarks} / {row.totalWeightage}
                      </Badge>
                    ),
                  },
                  {
                    key: 'actions',
                    label: 'Actions',
                    render: (row) => (
                      <div className="row-actions">
                        <Button variant="ghost" onClick={() => setDetails(row)}>
                          View feedback
                        </Button>
                        {(role === 'admin' || row.TeacherId === account.employeeId) && (
                          <button
                            className="icon-button text-danger"
                            aria-label="Delete evaluation"
                            onClick={() => {
                              remove.reset();
                              setDeleting({ item: row, type: 'marks' });
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ),
                  },
                ]}
                rows={list(marks.data)}
                empty={
                  <EmptyState
                    title="Ready for your first review"
                    description="Choose a template to record marks and feedback for this project."
                  />
                }
              />
            </QueryState>
          </section>
        )
      ) : (
        <QueryState query={templates}>
          {list(templates.data).length ? (
            <div className="card-grid">
              {list(templates.data).map((template) => (
                <article className="panel evaluation-card" key={template._id}>
                  <header>
                    <ClipboardCheck size={23} />
                    <Badge tone="info">{template.totalWeightage} marks</Badge>
                  </header>
                  <h2>{template.evaluationType}</h2>
                  <dl>
                    {list(template.fields).map((field, index) => (
                      <div key={field._id || index}>
                        <dt>{field.name}</dt>
                        <dd>{field.weightage}</dd>
                      </div>
                    ))}
                  </dl>
                  <footer>
                    <Button variant="secondary" onClick={() => setEditor(template)}>
                      <Pencil size={15} />
                      Edit criteria
                    </Button>
                    <button
                      className="icon-button text-danger"
                      aria-label={`Delete ${template.evaluationType}`}
                      onClick={() => {
                        remove.reset();
                        setDeleting({ item: template, type: 'template' });
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </footer>
                </article>
              ))}
            </div>
          ) : (
            <section className="panel">
              <EmptyState
                title="Start with clear criteria"
                description="Create a template to define the areas and marks for each review."
              />
            </section>
          )}
        </QueryState>
      )}
      {editor && <TemplateForm record={editor} onClose={() => setEditor(null)} />}
      {marking && (
        <MarkForm
          templates={list(templates.data)}
          project={project}
          account={account}
          onClose={() => setMarking(false)}
        />
      )}
      {details && (
        <Modal
          title={details.evaluationType}
          description={`${details.ProjectId} · ${details.TeacherId} · ${dateLabel(details.Date)}`}
          onClose={() => setDetails(null)}
        >
          <dl className="details-list">
            {list(details.fields).map((field, index) => (
              <div key={index}>
                <dt>{field.name}</dt>
                <dd>
                  {field.Subobtain} / {field.weightage}
                </dd>
              </div>
            ))}
          </dl>
          <div className="score-total">
            <span>Total</span>
            <strong>
              {details.obtainedMarks} / {details.totalWeightage}
            </strong>
          </div>
          <h3>Feedback</h3>
          <p className="preserve-lines">{details.comments}</p>
        </Modal>
      )}
      {deleting && (
        <ConfirmDialog
          title={
            deleting.type === 'template'
              ? 'Delete this evaluation template?'
              : 'Delete these marks?'
          }
          description={
            deleting.type === 'template'
              ? 'Previously recorded evaluations retain their criteria and marks.'
              : 'To correct marks, delete this record and submit a new evaluation.'
          }
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
              /* Retain dialog. */
            }
          }}
        />
      )}
    </>
  );
}

function TemplateForm({ record, onClose }) {
  const [name, setName] = useState(record.evaluationType || '');
  const [fields, setFields] = useState(() =>
    list(record.fields).length
      ? record.fields.map((field) => ({
          key: crypto.randomUUID(),
          name: field.name,
          weightage: field.weightage,
        }))
      : [{ key: crypto.randomUUID(), name: '', weightage: 10 }],
  );
  const total = fields.reduce((sum, field) => sum + Number(field.weightage || 0), 0);
  const save = useAction(() => {
    if (
      !fields.length ||
      fields.some((field) => !field.name.trim() || Number(field.weightage) <= 0) ||
      new Set(fields.map((field) => field.name.trim().toLowerCase())).size !== fields.length
    )
      throw new Error('Give each criterion a unique name and a positive mark limit.');
    const payload = {
      evaluationType: name.trim(),
      totalWeightage: total,
      fields: fields.map(({ name: title, weightage }) => ({
        name: title.trim(),
        weightage: Number(weightage),
      })),
    };
    return record._id
      ? api.put(`/evaluation/updateEvaluation/${encode(record._id)}`, payload)
      : api.post('/evaluation/create', payload);
  });
  function update(index, key, value) {
    setFields(
      fields.map((field, position) => (position === index ? { ...field, [key]: value } : field)),
    );
  }
  return (
    <Modal
      title={record._id ? 'Edit evaluation template' : 'Create evaluation template'}
      onClose={() => {
        if (!save.isPending) onClose();
      }}
    >
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            await save.mutateAsync();
            onClose();
          } catch {
            /* Retain criteria. */
          }
        }}
      >
        <Field
          label="Evaluation name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        {fields.map((field, index) => (
          <div className="score-row" key={field.key}>
            <Field
              label={`Criterion ${index + 1}`}
              required
              value={field.name}
              onChange={(event) => update(index, 'name', event.target.value)}
            />
            <Field
              label="Maximum marks"
              type="number"
              min={0.01}
              max={10000}
              step="any"
              required
              value={field.weightage}
              onChange={(event) => update(index, 'weightage', event.target.value)}
            />
            <button
              type="button"
              className="icon-button text-danger"
              disabled={fields.length === 1}
              aria-label={`Remove criterion ${index + 1}`}
              onClick={() => setFields(fields.filter((item) => item.key !== field.key))}
            >
              <Trash2 size={17} />
            </button>
          </div>
        ))}
        <Button
          variant="ghost"
          onClick={() =>
            setFields([...fields, { key: crypto.randomUUID(), name: '', weightage: 10 }])
          }
        >
          <Plus size={16} />
          Add criterion
        </Button>
        <div className="score-total">
          <span>Total available marks</span>
          <strong>{total}</strong>
        </div>
        <ErrorNotice error={save.error} />
        <div className="form-actions">
          <Button type="submit" busy={save.isPending}>
            Save template
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function MarkForm({ templates, project, account, onClose }) {
  const [templateId, setTemplateId] = useState('');
  const template = templates.find((item) => item._id === templateId);
  const [scores, setScores] = useState({});
  const [comments, setComments] = useState('');
  const total = list(template?.fields).reduce(
    (sum, field, index) => sum + Number(scores[index] || 0),
    0,
  );
  const save = useAction(() => {
    if (!template) throw new Error('Choose an evaluation template.');
    const fields = list(template.fields).map((field, index) => ({
      name: field.name,
      weightage: Number(field.weightage),
      Subobtain: Number(scores[index]),
    }));
    if (
      !fields.length ||
      fields.some(
        (field, index) =>
          scores[index] === undefined ||
          scores[index] === '' ||
          !Number.isFinite(field.Subobtain) ||
          field.Subobtain < 0 ||
          field.Subobtain > field.weightage,
      )
    )
      throw new Error('Enter marks within the limit for every criterion.');
    return api.post('/addMarks/add', {
      ProjectId: project.ProjectId,
      evalFormId: template._id,
      TeacherId: account.employeeId,
      totalWeightage: template.totalWeightage,
      evaluationType: template.evaluationType,
      fields,
      obtainedMarks: total,
      comments: comments.trim(),
    });
  });
  return (
    <Modal
      title="Evaluate project"
      description={project.ProjectId}
      onClose={() => {
        if (!save.isPending) onClose();
      }}
    >
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            await save.mutateAsync();
            onClose();
          } catch {
            /* Retain marks. */
          }
        }}
      >
        <SelectField
          label="Evaluation template"
          required
          value={templateId}
          onChange={(event) => {
            setTemplateId(event.target.value);
            setScores({});
          }}
          options={templates.map((item) => ({ value: item._id, label: item.evaluationType }))}
        />
        {list(template?.fields).map((field, index) => (
          <Field
            key={`${templateId}-${index}`}
            label={`${field.name} (out of ${field.weightage})`}
            type="number"
            min={0}
            max={field.weightage}
            step="any"
            value={scores[index] ?? ''}
            required
            onChange={(event) => setScores({ ...scores, [index]: event.target.value })}
          />
        ))}
        {template && (
          <div className="score-total">
            <span>Total marks</span>
            <strong>
              {total} / {template.totalWeightage}
            </strong>
          </div>
        )}
        <Field
          label="Feedback"
          type="textarea"
          required
          value={comments}
          maxLength={10000}
          onChange={(event) => setComments(event.target.value)}
        />
        <ErrorNotice error={save.error} />
        <div className="form-actions">
          <Button type="submit" busy={save.isPending} disabled={!template}>
            Record evaluation
          </Button>
        </div>
      </form>
    </Modal>
  );
}
