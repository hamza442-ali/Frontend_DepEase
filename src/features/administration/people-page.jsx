import { useSearchParams } from 'react-router-dom';
import { ResourcePage } from '../../components/resource-page';
import { Tabs } from '../../components/ui';

export default function PeoplePage() {
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') === 'teachers' ? 'teachers' : 'students';
  const student = tab === 'students';
  const fields = student
    ? [
        { key: 'student_name', label: 'Full name' },
        { key: 'registration_number', label: 'Registration number' },
        { key: 'email_address', label: 'Email address', type: 'email' },
        { key: 'phone_number', label: 'Phone number', type: 'tel' },
        { key: 'department', label: 'Department' },
        { key: 'batch', label: 'Batch', type: 'number', min: 2000, max: 2100 },
        { key: 'semester', label: 'Semester', type: 'number', min: 1, max: 16 },
        {
          key: 'password',
          label: 'Initial password',
          type: 'password',
          minLength: 8,
          autoComplete: 'new-password',
        },
      ]
    : [
        { key: 'name', label: 'Full name' },
        { key: 'employeeId', label: 'Employee ID' },
        { key: 'email', label: 'Email address', type: 'email' },
        { key: 'mobile', label: 'Phone number', type: 'tel' },
        { key: 'Designation', label: 'Designation' },
        {
          key: 'password',
          label: 'Initial password',
          type: 'password',
          minLength: 8,
          autoComplete: 'new-password',
        },
      ];
  return (
    <>
      <Tabs
        value={tab}
        onChange={(value) => setParams({ tab: value })}
        items={[
          { value: 'students', label: 'Students' },
          { value: 'teachers', label: 'Supervisors' },
        ]}
      />
      <ResourcePage
        key={tab}
        eyebrow="Department administration"
        title={student ? 'Students' : 'Supervisors'}
        description="Manage the people who make your department’s projects possible."
        url={student ? '/student/getAllStudents' : '/teacher/getAll'}
        fields={fields}
        columns={
          student
            ? [
                { key: 'student_name', label: 'Name' },
                { key: 'registration_number', label: 'Registration' },
                { key: 'email_address', label: 'Email' },
                { key: 'department', label: 'Department' },
                { key: 'batch', label: 'Batch' },
              ]
            : [
                { key: 'name', label: 'Name' },
                { key: 'employeeId', label: 'Employee ID' },
                { key: 'email', label: 'Email' },
                { key: 'Designation', label: 'Designation' },
              ]
        }
        createUrl={student ? '/student/create' : '/teacher/create'}
        canEdit={false}
        deleteUrl={student ? '/student/delete' : '/teacher/delete'}
        idKey={student ? 'registration_number' : 'employeeId'}
      />
    </>
  );
}
