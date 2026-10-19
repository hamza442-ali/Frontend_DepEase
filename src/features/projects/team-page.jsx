import { useState } from 'react';
import { ClipboardList, UserCog } from 'lucide-react';
import { useWorkspace } from '../../app/workspace';
import { ProjectGate } from '../../components/project-gate';
import { EntityForm, ResourcePage } from '../../components/resource-page';
import { Badge, Button, ErrorNotice, Modal, QueryState } from '../../components/ui';
import { api, encode, list, useAction, useData } from '../../lib/api';

export default function TeamPage() {
  return (
    <ProjectGate>
      <Team />
    </ProjectGate>
  );
}
function Team() {
  const { project, canManageProject } = useWorkspace();
  const group = useData(`/group/getmine/${encode(project.group)}`);
  const [roleEditor, setRoleEditor] = useState(null);
  const [assignment, setAssignment] = useState(null);
  const fields = [
    { key: 'student_id', label: 'Registration number' },
    { key: 'student_name', label: 'Full name' },
    { key: 'student_email', label: 'Email address', type: 'email' },
    {
      key: 'student_status',
      label: 'Status',
      type: 'select',
      options: ['Active', 'Inactive'],
      default: 'Active',
    },
    { key: 'student_role', label: 'Project role', default: 'Member' },
  ];
  return (
    <>
      <QueryState query={group}>
        <div className="info-notice">
          <strong>Registered group</strong>
          <span>
            Lead: {group.data?.teamLeadId} · {group.data?.teammate1Id} · {group.data?.teammate2Id}
          </span>
        </div>
      </QueryState>
      <ResourcePage
        title="Team members"
        description="Bring your project contributors together and make responsibilities clear."
        url={`/teamMember/getMembers/${encode(project.ProjectId)}`}
        fields={fields}
        columns={[
          { key: 'student_name', label: 'Name' },
          { key: 'student_id', label: 'Registration' },
          { key: 'student_email', label: 'Email' },
          { key: 'student_role', label: 'Role' },
          {
            key: 'student_status',
            label: 'Status',
            render: (row) => <Badge>{row.student_status}</Badge>,
          },
        ]}
        createUrl="/teamMember/addMember"
        canCreate={canManageProject && Boolean(group.data)}
        canDelete={canManageProject}
        canEdit={false}
        deleteUrl={(row) =>
          `/teamMember/deleteMember/${encode(project.ProjectId)}/${encode(row.student_id)}`
        }
        makePayload={(data) => ({
          ...data,
          team_lead_id: group.data.teamLeadId,
          projectid: project.ProjectId,
          requirements: [],
        })}
        extraActions={
          canManageProject
            ? (row) => (
                <>
                  <button
                    className="icon-button"
                    aria-label={`Change role for ${row.student_name}`}
                    onClick={() => setRoleEditor(row)}
                  >
                    <UserCog size={16} />
                  </button>
                  <button
                    className="icon-button"
                    aria-label={`Assign requirements to ${row.student_name}`}
                    onClick={() => setAssignment(row)}
                  >
                    <ClipboardList size={16} />
                  </button>
                </>
              )
            : undefined
        }
      />
      {roleEditor && (
        <EntityForm
          title="Change project role"
          fields={[{ key: 'student_role', label: 'Role' }]}
          record={roleEditor}
          onClose={() => setRoleEditor(null)}
          onSave={(data) => api.patch(`/teamMember/assignRole/${encode(roleEditor._id)}`, data)}
        />
      )}
      {assignment && (
        <RequirementAssignment record={assignment} onClose={() => setAssignment(null)} />
      )}
    </>
  );
}

function RequirementAssignment({ record, onClose }) {
  const { project } = useWorkspace();
  const query = useData(`/requirements/getRequirements/${encode(project.ProjectId)}`);
  const [selected, setSelected] = useState(
    list(record.requirements).map((item) => (typeof item === 'string' ? item : item._id)),
  );
  const save = useAction(() =>
    api.patch(`/teamMember/assignReq/${encode(record._id)}`, { requirements: selected }),
  );
  return (
    <Modal
      title="Assign requirements"
      description={record.student_name}
      onClose={() => {
        if (!save.isPending) onClose();
      }}
    >
      <QueryState query={query}>
        <div className="checklist">
          {list(query.data).map((item) => (
            <label className="check-option" key={item._id}>
              <input
                type="checkbox"
                checked={selected.includes(item._id)}
                onChange={(event) =>
                  setSelected(
                    event.target.checked
                      ? [...selected, item._id]
                      : selected.filter((id) => id !== item._id),
                  )
                }
              />
              <span>
                <strong>{item.title}</strong>
                <small>{item.status}</small>
              </span>
            </label>
          ))}
          {!list(query.data).length && (
            <p className="muted">Create requirements before assigning them.</p>
          )}
        </div>
      </QueryState>
      <ErrorNotice error={save.error} />
      <div className="form-actions">
        <Button
          busy={save.isPending}
          disabled={!query.isSuccess}
          onClick={async () => {
            try {
              await save.mutateAsync();
              onClose();
            } catch {
              /* Keep selection. */
            }
          }}
        >
          Save assignments
        </Button>
      </div>
    </Modal>
  );
}
