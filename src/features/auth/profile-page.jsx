import { LogOut, UserRound } from 'lucide-react';
import { useAuth } from '../../app/auth';
import { roleLabel } from '../../app/navigation';
import { Badge, Button, PageHeader } from '../../components/ui';
import { initials } from '../../lib/format';

export default function ProfilePage() {
  const { account, role, logout } = useAuth();
  const name = account.student_name || account.name;
  const fields =
    role === 'student'
      ? [
          ['Email', account.email_address],
          ['Registration number', account.registration_number],
          ['Phone', account.phone_number],
          ['Department', account.department],
          ['Batch', account.batch],
          ['Semester', account.semester],
        ]
      : [
          ['Email', account.email],
          ['Employee ID', account.employeeId],
          ['Phone', account.mobile],
          ['Designation', account.Designation],
        ];
  return (
    <>
      <PageHeader
        eyebrow="Your account"
        title="Profile"
        description="Your department account and workspace details."
      />
      <section className="panel profile-panel">
        <header>
          <span className="avatar avatar-large">{initials(name)}</span>
          <div>
            <h2>{name}</h2>
            <Badge tone="info">{roleLabel[role]}</Badge>
          </div>
        </header>
        <dl className="details-list">
          {fields.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value || 'Not provided'}</dd>
            </div>
          ))}
        </dl>
        <div className="info-notice">
          <UserRound size={19} />
          Contact your department administrator to update your account details.
        </div>
        <div className="form-actions">
          <Button variant="secondary" onClick={() => logout()}>
            <LogOut size={16} />
            Sign out
          </Button>
        </div>
      </section>
    </>
  );
}
