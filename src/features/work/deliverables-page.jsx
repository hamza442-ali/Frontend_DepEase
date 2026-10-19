import { useState } from 'react';
import { Link2, Unlink } from 'lucide-react';
import { useWorkspace } from '../../app/workspace';
import { ProjectGate } from '../../components/project-gate';
import { ResourcePage } from '../../components/resource-page';
import {
  Badge,
  Button,
  ErrorNotice,
  Modal,
  QueryState,
  SelectField,
  Tabs,
} from '../../components/ui';
import { api, encode, list, useAction, useData } from '../../lib/api';
import { dateLabel, STATUS_OPTIONS } from '../../lib/format';

export default function DeliverablesPage() {
  return (
    <ProjectGate>
      <Deliverables />
    </ProjectGate>
  );
}

function Deliverables() {
  const { project, canManageProject } = useWorkspace();
  const [tab, setTab] = useState('deliverables');
  const [linking, setLinking] = useState(null);
  const shared = [
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status', type: 'select', options: STATUS_OPTIONS, default: 'Pending' },
  ];
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status', render: (row) => <Badge>{row.status}</Badge> },
  ];
  const isModule = tab === 'modules';
  return (
    <>
      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { value: 'deliverables', label: 'Deliverables' },
          { value: 'modules', label: 'Modules' },
        ]}
      />
      <ResourcePage
        canCreate={canManageProject}
        canEdit={canManageProject}
        canDelete={canManageProject}
        key={`${project._id}-${tab}`}
        title={isModule ? 'Modules' : 'Deliverables'}
        description={
          isModule
            ? 'Define the building blocks of your project.'
            : 'Keep milestones, deadlines, and linked modules in one place.'
        }
        url={`/${tab}/getmine/${encode(project.ProjectId)}`}
        fields={[
          ...shared,
          isModule
            ? { key: 'details', label: 'Details', type: 'textarea' }
            : { key: 'deadline', label: 'Deadline', type: 'date' },
        ]}
        columns={[
          ...columns,
          isModule
            ? { key: 'details', label: 'Details' }
            : { key: 'deadline', label: 'Deadline', render: (row) => dateLabel(row.deadline) },
          ...(!isModule
            ? [
                {
                  key: 'modules',
                  label: 'Modules',
                  render: (row) => `${list(row.modules).length} linked`,
                },
              ]
            : []),
        ]}
        createUrl={`/${tab}/add`}
        updateUrl={`/${tab}/update`}
        deleteUrl={`/${tab}/delete`}
        makePayload={(data) => ({ ...data, projectId: project.ProjectId })}
        extraActions={
          !isModule && canManageProject
            ? (record) => (
                <button
                  className="icon-button"
                  aria-label={`Manage modules for ${record.name}`}
                  onClick={() => setLinking(record)}
                >
                  <Link2 size={16} />
                </button>
              )
            : undefined
        }
      />
      {linking && <ModuleLinks record={linking} onClose={() => setLinking(null)} />}
    </>
  );
}

function ModuleLinks({ record, onClose }) {
  const { project } = useWorkspace();
  const [moduleId, setModuleId] = useState('');
  const query = useData(`/deliverables/getmine/${encode(project.ProjectId)}`);
  const modules = useData(`/modules/getmine/${encode(project.ProjectId)}`);
  const current = list(query.data).find((item) => item._id === record._id) || record;
  const linked = list(current.modules);
  const action = useAction(({ id, remove }) =>
    remove
      ? api.delete(`/deliverables/removeModuleFromDeliverable/${encode(id)}/${encode(record._id)}`)
      : api.post('/deliverables/addModuleToDeliverable', {
          moduleId: id,
          deliverableId: record._id,
        }),
  );
  return (
    <Modal title="Linked modules" description={record.name} onClose={onClose}>
      <QueryState query={query}>
        <div className="content-stack">
          {linked.map((module) => (
            <div className="list-card list-card-inline" key={module._id}>
              <div>
                <strong>{module.name}</strong>
                <p>{module.details}</p>
              </div>
              <Button
                variant="ghost"
                busy={action.isPending}
                onClick={() => action.mutate({ id: module._id, remove: true })}
              >
                <Unlink size={15} />
                Unlink
              </Button>
            </div>
          ))}
          {!linked.length && <p className="muted">This deliverable has no modules yet.</p>}
        </div>
      </QueryState>
      <QueryState query={modules}>
        <SelectField
          label="Available modules"
          value={moduleId}
          onChange={(event) => setModuleId(event.target.value)}
          options={list(modules.data)
            .filter((module) => !linked.some((item) => item._id === module._id))
            .map((module) => ({ value: module._id, label: module.name }))}
        />
        <div className="form-actions">
          <Button
            disabled={!moduleId}
            busy={action.isPending}
            onClick={async () => {
              try {
                await action.mutateAsync({ id: moduleId });
                setModuleId('');
              } catch {
                /* Keep selection on error. */
              }
            }}
          >
            Link module
          </Button>
        </div>
      </QueryState>
      <ErrorNotice error={action.error} />
      <p className="muted">
        Linked modules are saved as snapshots. Unlink and link a module again after changing its
        details.
      </p>
    </Modal>
  );
}
