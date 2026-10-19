import { useState } from 'react';
import { ClipboardCheck } from 'lucide-react';
import { useAuth } from '../../app/auth';
import { useWorkspace } from '../../app/workspace';
import { ProjectGate } from '../../components/project-gate';
import { EntityForm, ResourcePage } from '../../components/resource-page';
import { Badge } from '../../components/ui';
import { api, encode } from '../../lib/api';
import { dateLabel } from '../../lib/format';

export default function ResourcesPage() {
  const { role } = useAuth();
  return role === 'student' ? (
    <ProjectGate>
      <Resources />
    </ProjectGate>
  ) : (
    <Resources />
  );
}
function Resources() {
  const { account, role } = useAuth();
  const { project } = useWorkspace();
  const [approval, setApproval] = useState(null);
  const student = role === 'student';
  const fields = [
    { key: 'projectTitle', label: 'Project title' },
    { key: 'requestType', label: 'Resource type' },
    { key: 'requestReason', label: 'Reason for request', type: 'textarea' },
    { key: 'startDate', label: 'Start date', type: 'date' },
    { key: 'endDate', label: 'End date', type: 'date' },
    {
      key: 'phoneNumber',
      label: 'Contact number',
      type: 'tel',
      default: account.phone_number || '',
    },
    {
      key: 'email',
      label: 'Email address',
      type: 'email',
      default: account.email_address || account.email,
    },
  ];
  const statusKey = role === 'admin' ? 'adminStatus' : 'supervisorStatus';
  const reasonKey = role === 'admin' ? 'rejectionReason_S' : 'rejectionReason_T';
  return (
    <>
      <ResourcePage
        title="Resource requests"
        description={
          student
            ? 'Ask for the resources your project needs, and follow each approval.'
            : 'Review project needs and keep resource approvals moving.'
        }
        url={
          student
            ? `/resource/getmine/${encode(project.ProjectId)}`
            : role === 'admin'
              ? '/resource/getall'
              : `/resource/getbyteacherId/${encode(account.employeeId)}`
        }
        fields={fields}
        detailFields={[
          ...fields,
          { key: 'adminStatus', label: 'Admin decision', required: false },
          { key: 'supervisorStatus', label: 'Supervisor decision', required: false },
          { key: 'rejectionReason_T', label: 'Supervisor feedback', required: false },
          { key: 'rejectionReason_S', label: 'Admin feedback', required: false },
        ]}
        columns={[
          { key: 'projectTitle', label: 'Project' },
          { key: 'requestType', label: 'Request' },
          { key: 'startDate', label: 'From', render: (row) => dateLabel(row.startDate) },
          { key: 'adminStatus', label: 'Admin', render: (row) => <Badge>{row.adminStatus}</Badge> },
          {
            key: 'supervisorStatus',
            label: 'Supervisor',
            render: (row) => <Badge>{row.supervisorStatus}</Badge>,
          },
        ]}
        createUrl={student ? '/resource/add' : undefined}
        canEdit={false}
        canDelete={student}
        deleteUrl="/resource/delete"
        makePayload={(data) => {
          if (new Date(data.endDate) <= new Date(data.startDate))
            throw new Error('End date must be after the start date.');
          return {
            ...data,
            studentId: account.registration_number,
            projectId: project.ProjectId,
            TeacherId: project.teacher,
          };
        }}
        extraActions={
          !student
            ? (row) => (
                <button
                  className="icon-button"
                  aria-label={`Review request for ${row.projectTitle}`}
                  onClick={() => setApproval(row)}
                >
                  <ClipboardCheck size={17} />
                </button>
              )
            : undefined
        }
      />
      {approval && (
        <EntityForm
          title="Review resource request"
          record={approval}
          fields={[
            {
              key: statusKey,
              label: 'Decision',
              type: 'select',
              options: ['Pending', 'Approved', 'Rejected'],
            },
            { key: reasonKey, label: 'Feedback', type: 'textarea', required: false },
          ]}
          onClose={() => setApproval(null)}
          onSave={(data) => {
            if (data[statusKey] === 'Rejected' && !data[reasonKey]?.trim())
              throw new Error('Please explain why this request was rejected.');
            return api.put(`/resource/update/${encode(approval._id)}`, data);
          }}
        />
      )}
    </>
  );
}
