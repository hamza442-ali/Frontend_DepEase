import { useState } from 'react';
import { ArrowUpRight, FolderKanban, Pencil, Plus, Trash2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  SearchBox,
} from '../../components/ui';
import { api, encode, list, useAction, useData } from '../../lib/api';

export default function ProjectsPage() {
  const { role } = useAuth();
  const { project, projects, query, selectProject } = useWorkspace();
  const [search, setSearch] = useState('');
  const [editor, setEditor] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const teachers = useData('/teacher/getall');
  const groups = useData(role === 'admin' ? '/group/getall' : null);
  const proposals = useData(role === 'admin' ? '/proposals/getall' : null);
  const remove = useAction((record) => api.delete(`/projects/delete/${encode(record._id)}`));
  const fields = [
    { key: 'ProjectId', label: 'Project identifier' },
    { key: 'batch', label: 'Batch', type: 'number', min: 2000, max: 2100 },
    { key: 'semester', label: 'Semester', type: 'number', min: 1, max: 16 },
    {
      key: 'teacher',
      label: 'Supervisor',
      type: 'select',
      options: list(teachers.data?.data).map((teacher) => ({
        value: teacher.employeeId,
        label: `${teacher.name} · ${teacher.employeeId}`,
      })),
    },
    {
      key: 'group',
      label: 'Student group',
      type: 'select',
      options: list(groups.data).map((group) => ({
        value: group._id,
        label: `${group.teamLeadId} / ${group.teammate1Id} / ${group.teammate2Id}`,
      })),
    },
    {
      key: 'projectProposal',
      label: 'Proposal',
      type: 'select',
      options: list(proposals.data).map((proposal) => ({
        value: proposal._id,
        label: proposal.title,
      })),
    },
  ];
  const rows = projects.filter((item) =>
    `${item.ProjectId} ${item.batch} ${item.teacher}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <PageHeader
        eyebrow="Project workspace"
        title="Projects"
        description="The people, plans, and progress behind your department’s projects."
        action={
          role === 'admin' ? (
            <Button onClick={() => setEditor({})}>
              <Plus size={17} />
              Add project
            </Button>
          ) : role === 'student' && !projects.length ? (
            <Link className="button button-primary" to="/proposal">
              Create proposal
            </Link>
          ) : undefined
        }
      />
      <div className="section-toolbar">
        <span className="muted">
          {projects.length} {projects.length === 1 ? 'project' : 'projects'} available
        </span>
        <SearchBox value={search} onChange={setSearch} placeholder="Search projects…" />
      </div>
      <QueryState query={query}>
        {rows.length ? (
          <div className="card-grid">
            {rows.map((item) => (
              <article
                key={item._id}
                className={`panel project-card ${project?._id === item._id ? 'project-card-active' : ''}`}
              >
                <div className="project-card-top">
                  <span className="project-icon">
                    <FolderKanban size={22} />
                  </span>
                  <Badge tone={project?._id === item._id ? 'info' : 'neutral'}>
                    {project?._id === item._id ? 'Current project' : `Batch ${item.batch}`}
                  </Badge>
                </div>
                <h2>{item.ProjectId}</h2>
                <p>
                  Supervisor:{' '}
                  {list(teachers.data?.data).find((teacher) => teacher.employeeId === item.teacher)
                    ?.name || item.teacher}
                </p>
                <div className="project-card-meta">
                  <span>
                    <Users size={15} />
                    Semester {item.semester || '—'}
                  </span>
                  <span>Batch {item.batch}</span>
                </div>
                <footer>
                  <Button variant="secondary" onClick={() => selectProject(item._id)}>
                    Open project
                    <ArrowUpRight size={15} />
                  </Button>
                  {role === 'admin' && (
                    <div className="row-actions">
                      <button
                        className="icon-button"
                        aria-label={`Edit ${item.ProjectId}`}
                        onClick={() => setEditor(item)}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="icon-button text-danger"
                        aria-label={`Delete ${item.ProjectId}`}
                        onClick={() => {
                          remove.reset();
                          setDeleting(item);
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </footer>
              </article>
            ))}
          </div>
        ) : (
          <section className="panel">
            <EmptyState
              title={search ? 'No matching projects' : 'Your next project starts here'}
              description={
                role === 'student'
                  ? 'Submit a proposal with your group to create your project workspace.'
                  : 'Projects assigned to you will appear here.'
              }
            />
          </section>
        )}
      </QueryState>
      {project && <ProjectDetails key={project._id} project={project} />}
      {editor && (
        <EntityForm
          title={editor._id ? 'Edit project' : 'Create project'}
          fields={fields}
          record={editor}
          onClose={() => setEditor(null)}
          onSave={(data) =>
            editor._id
              ? api.put(`/projects/update/${encode(editor._id)}`, data)
              : api.post('/projects/add', data)
          }
        />
      )}
      {deleting && (
        <ConfirmDialog
          title="Delete this project?"
          description={`Remove ${deleting.ProjectId}. Related project records are not automatically removed.`}
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

function ProjectDetails({ project }) {
  const [editing, setEditing] = useState(false);
  const proposal = useData(`/proposals/getmine/${encode(project.projectProposal)}`);
  const group = useData(`/group/getmine/${encode(project.group)}`);
  const fields = [
    { key: 'title', label: 'Title' },
    { key: 'ProjectType', label: 'Project type' },
    { key: 'supervisor', label: 'Supervisor employee ID' },
    { key: 'technologyUsed', label: 'Technology stack' },
    { key: 'problemStatement', label: 'Problem statement', type: 'textarea' },
    { key: 'problemSolution', label: 'Proposed solution', type: 'textarea' },
    { key: 'scope', label: 'Scope', type: 'textarea' },
    { key: 'timeline', label: 'Timeline', type: 'lines' },
    { key: 'modules', label: 'Modules', type: 'lines' },
  ];
  return (
    <section className="panel project-details">
      <div className="panel-toolbar">
        <div>
          <p className="eyebrow">Current project</p>
          <h2>Project overview</h2>
        </div>
        <Button variant="ghost" onClick={() => setEditing(true)} disabled={!proposal.data}>
          <Pencil size={15} />
          Edit proposal
        </Button>
      </div>
      <QueryState query={proposal}>
        <div className="project-detail-body">
          <div className="proposal-heading">
            <h2>{proposal.data?.title}</h2>
            <Badge tone="info">{proposal.data?.ProjectType}</Badge>
          </div>
          <dl className="details-list">
            {fields
              .filter((field) => !['title', 'ProjectType', 'supervisor'].includes(field.key))
              .map((field) => (
                <div key={field.key}>
                  <dt>{field.label}</dt>
                  <dd className="preserve-lines">
                    {Array.isArray(proposal.data?.[field.key])
                      ? proposal.data[field.key].join('\n')
                      : proposal.data?.[field.key]}
                  </dd>
                </div>
              ))}
          </dl>
        </div>
      </QueryState>
      <QueryState query={group}>
        <div className="team-summary">
          <Users size={18} />
          <strong>Group</strong>
          <span>Lead: {group.data?.teamLeadId}</span>
          <span>{group.data?.teammate1Id}</span>
          <span>{group.data?.teammate2Id}</span>
          <Link className="text-link" to="/team">
            Manage team
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </QueryState>
      {editing && (
        <EntityForm
          title="Edit proposal"
          fields={fields}
          record={proposal.data}
          onClose={() => setEditing(false)}
          onSave={(data) => api.put(`/proposals/proposals/${encode(proposal.data._id)}`, data)}
        />
      )}
    </section>
  );
}
