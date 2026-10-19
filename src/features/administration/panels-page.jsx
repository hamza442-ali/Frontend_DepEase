import { useState } from 'react';
import { ClipboardPlus, Pencil, Plus, Trash2, Users } from 'lucide-react';
import { useAuth } from '../../app/auth';
import { useWorkspace } from '../../app/workspace';
import { EntityForm } from '../../components/resource-page';
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
} from '../../components/ui';
import { api, encode, list, useAction, useData } from '../../lib/api';

export default function PanelsPage() {
  const { account, role } = useAuth();
  const admin = role === 'admin';
  const query = useData(
    admin ? '/panel/getAllPanels' : `/fypPanel/getall/${encode(account.employeeId)}`,
  );
  const assignments = useData('/assignmentPanel/getall');
  const [adding, setAdding] = useState(false);
  const [renaming, setRenaming] = useState(null);
  const [assigning, setAssigning] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const remove = useAction((panel) => api.delete(`/panel/deletePanelbyID/${encode(panel.id)}`));
  return (
    <>
      <PageHeader
        eyebrow="Department coordination"
        title="Evaluation panels"
        description="Bring supervisors and project groups together for a thoughtful review."
        action={
          admin && (
            <Button onClick={() => setAdding(true)}>
              <Plus size={17} />
              Create panel
            </Button>
          )
        }
      />
      <QueryState query={query}>
        {list(query.data).length ? (
          <div className="card-grid">
            {list(query.data).map((panel) => (
              <article className="panel panel-card" key={panel._id}>
                <header>
                  <span className="project-icon">
                    <Users size={23} />
                  </span>
                  <div>
                    <span className="eyebrow">EVALUATION PANEL</span>
                    <h2>{panel.id}</h2>
                  </div>
                  {admin && (
                    <div className="row-actions">
                      <button
                        className="icon-button"
                        aria-label={`Rename ${panel.id}`}
                        onClick={() => setRenaming(panel)}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="icon-button text-danger"
                        aria-label={`Delete ${panel.id}`}
                        onClick={() => {
                          remove.reset();
                          setDeleting(panel);
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </header>
                <div className="panel-members">
                  {list(panel.teachers).map((teacher) => (
                    <div key={teacher.employeeId}>
                      <span>{teacher.name || teacher.employeeId}</span>
                      {teacher.panelHead && <Badge tone="info">Panel head</Badge>}
                    </div>
                  ))}
                </div>
                <QueryState query={assignments}>
                  <div className="panel-projects">
                    <strong>Assigned projects</strong>
                    {list(assignments.data)
                      .filter((assignment) => assignment.panelId === panel.id)
                      .flatMap((assignment) => assignment.studentIds)
                      .map((id, index) => (
                        <Badge key={`${id}-${index}`} tone="neutral">
                          {id}
                        </Badge>
                      ))}
                    {!list(assignments.data).some(
                      (assignment) => assignment.panelId === panel.id,
                    ) && <p className="muted">No projects assigned yet.</p>}
                  </div>
                </QueryState>
                {admin && (
                  <footer>
                    <Button variant="secondary" onClick={() => setAssigning(panel)}>
                      <ClipboardPlus size={16} />
                      Assign projects
                    </Button>
                  </footer>
                )}
              </article>
            ))}
          </div>
        ) : (
          <section className="panel">
            <EmptyState
              title="No panels yet"
              description={
                admin
                  ? 'Create a panel and assign its supervisors and project groups.'
                  : 'Panels you belong to will appear here.'
              }
            />
          </section>
        )}
      </QueryState>
      {adding && <PanelForm onClose={() => setAdding(false)} />}
      {assigning && (
        <PanelAssignments
          panel={assigning}
          assignments={list(assignments.data)}
          onClose={() => setAssigning(null)}
        />
      )}
      {renaming && (
        <EntityForm
          title="Rename panel"
          fields={[{ key: 'newPanelId', label: 'Panel identifier', default: renaming.id }]}
          onClose={() => setRenaming(null)}
          onSave={(data) => api.put(`/panel/editPanelId/${encode(renaming.id)}`, data)}
        />
      )}
      {deleting && (
        <ConfirmDialog
          title="Delete this panel?"
          description={`Remove panel ${deleting.id}. Its existing assignment records are retained by the backend.`}
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
              /* Keep confirmation open. */
            }
          }}
        />
      )}
    </>
  );
}

function PanelForm({ onClose }) {
  const query = useData('/teacher/getall');
  const [id, setId] = useState('');
  const [selected, setSelected] = useState([]);
  const [head, setHead] = useState('');
  const save = useAction(() => {
    if (!selected.length || !selected.includes(head))
      throw new Error('Select panel members and choose one panel head.');
    return api.post('/panel/createPanel', {
      id: id.trim(),
      teachers: list(query.data?.data)
        .filter((teacher) => selected.includes(teacher.employeeId))
        .map((teacher) => ({
          employeeId: teacher.employeeId,
          name: teacher.name,
          panelHead: teacher.employeeId === head,
        })),
    });
  });
  return (
    <Modal
      title="Create evaluation panel"
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
            /* Retain values. */
          }
        }}
      >
        <Field
          label="Panel identifier"
          value={id}
          required
          onChange={(event) => setId(event.target.value)}
        />
        <QueryState query={query}>
          <div className="checklist">
            {list(query.data?.data).map((teacher) => (
              <label className="check-option" key={teacher.employeeId}>
                <input
                  type="checkbox"
                  checked={selected.includes(teacher.employeeId)}
                  onChange={(event) =>
                    setSelected(
                      event.target.checked
                        ? [...selected, teacher.employeeId]
                        : selected.filter((value) => value !== teacher.employeeId),
                    )
                  }
                />
                <span>
                  <strong>{teacher.name}</strong>
                  <small>{teacher.employeeId}</small>
                </span>
              </label>
            ))}
          </div>
          <SelectField
            label="Panel head"
            required
            value={head}
            onChange={(event) => setHead(event.target.value)}
            options={list(query.data?.data)
              .filter((teacher) => selected.includes(teacher.employeeId))
              .map((teacher) => ({ value: teacher.employeeId, label: teacher.name }))}
          />
        </QueryState>
        <ErrorNotice error={save.error} />
        <div className="form-actions">
          <Button type="submit" disabled={!query.isSuccess} busy={save.isPending}>
            Create panel
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function PanelAssignments({ panel, assignments, onClose }) {
  const { projects, query } = useWorkspace();
  const [selected, setSelected] = useState([]);
  const already = assignments
    .filter((item) => item.panelId === panel.id)
    .flatMap((item) => item.studentIds);
  const save = useAction(() =>
    api.post('/panel/assignPanel', { panelId: panel.id, studentIds: selected }),
  );
  return (
    <Modal
      title="Assign projects"
      description={`Panel ${panel.id}`}
      onClose={() => {
        if (!save.isPending) onClose();
      }}
    >
      <QueryState query={query}>
        <div className="checklist">
          {projects.map((project) => (
            <label className="check-option" key={project._id}>
              <input
                type="checkbox"
                disabled={already.includes(project.ProjectId)}
                checked={
                  already.includes(project.ProjectId) || selected.includes(project.ProjectId)
                }
                onChange={(event) =>
                  setSelected(
                    event.target.checked
                      ? [...selected, project.ProjectId]
                      : selected.filter((id) => id !== project.ProjectId),
                  )
                }
              />
              <span>
                <strong>{project.ProjectId}</strong>
                <small>
                  {already.includes(project.ProjectId)
                    ? 'Already assigned'
                    : `Batch ${project.batch}`}
                </small>
              </span>
            </label>
          ))}
        </div>
      </QueryState>
      <ErrorNotice error={save.error} />
      <div className="form-actions">
        <Button
          disabled={!selected.length}
          busy={save.isPending}
          onClick={async () => {
            try {
              await save.mutateAsync();
              onClose();
            } catch {
              /* Retain selection. */
            }
          }}
        >
          Assign projects
        </Button>
      </div>
    </Modal>
  );
}
