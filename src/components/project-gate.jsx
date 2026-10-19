import { useAuth } from '../app/auth';
import { useWorkspace } from '../app/workspace';
import { EmptyState, QueryState, TextLink } from './ui';

export function ProjectGate({ children }) {
  const { query, project } = useWorkspace();
  const { role } = useAuth();
  return (
    <QueryState query={query}>
      {project ? (
        children
      ) : (
        <section className="panel">
          <EmptyState
            title="Your next project starts here"
            description={
              role === 'student'
                ? 'Submit a proposal to create your team and project workspace.'
                : 'Once a project is assigned to you, its work will be available here.'
            }
            action={
              <TextLink to={role === 'student' ? '/proposal' : '/projects'}>
                {role === 'student' ? 'Create a proposal' : 'View projects'}
              </TextLink>
            }
          />
        </section>
      )}
    </QueryState>
  );
}
