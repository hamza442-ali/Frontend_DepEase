import { Component, Suspense, lazy, useEffect } from 'react';
import { Link, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { AlertTriangle, LoaderCircle, LockKeyhole } from 'lucide-react';
import { useAuth } from './auth';
import { WorkspaceProvider } from './workspace';
import { AppShell } from './shell';
import { Button, EmptyState } from '../components/ui';
import LoginPage from '../features/auth/login-page';

const Dashboard = lazy(() => import('../features/overview/dashboard-page'));
const Projects = lazy(() => import('../features/projects/projects-page'));
const Proposal = lazy(() => import('../features/projects/proposal-page'));
const Team = lazy(() => import('../features/projects/team-page'));
const Tasks = lazy(() => import('../features/work/tasks-page'));
const Requirements = lazy(() => import('../features/work/requirements-page'));
const Deliverables = lazy(() => import('../features/work/deliverables-page'));
const Documents = lazy(() => import('../features/work/documents-page'));
const Calendar = lazy(() => import('../features/planning/calendar-page'));
const Announcements = lazy(() => import('../features/communication/announcements-page'));
const Messages = lazy(() => import('../features/communication/messages-page'));
const Ideas = lazy(() => import('../features/communication/ideas-page'));
const People = lazy(() => import('../features/administration/people-page'));
const Resources = lazy(() => import('../features/administration/resources-page'));
const Panels = lazy(() => import('../features/administration/panels-page'));
const Evaluations = lazy(() => import('../features/administration/evaluations-page'));
const Deployments = lazy(() => import('../features/deployments/deployments-page'));
const Profile = lazy(() => import('../features/auth/profile-page'));

function ProtectedWorkspace() {
  const { session, account } = useAuth();
  const location = useLocation();
  if (!session) return <Navigate to="/signin" replace state={{ from: location }} />;
  return (
    <WorkspaceProvider key={account._id}>
      <AppShell />
    </WorkspaceProvider>
  );
}

function Roles({ allowed, children }) {
  const { role } = useAuth();
  return allowed.includes(role) ? (
    children
  ) : (
    <section className="panel">
      <EmptyState
        icon={LockKeyhole}
        title="This page belongs to another workspace"
        description="Your account’s available pages are listed in the navigation."
        action={
          <Link to="/dashboard" className="button button-primary">
            Back to dashboard
          </Link>
        }
      />
    </section>
  );
}

function LegacyProject({ to }) {
  const params = useParams();
  return (
    <Navigate replace to={`${to}?project=${encodeURIComponent(params.projectId || params.id)}`} />
  );
}
function Logout() {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, [logout]);
  return <Navigate to="/signin" replace />;
}

export class AppErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    return this.state.error ? (
      <div className="fatal-error">
        <EmptyState
          icon={AlertTriangle}
          title="The workspace could not be displayed"
          description="Reload the page to recover. Your saved project records are still on the server."
          action={<Button onClick={() => window.location.reload()}>Reload workspace</Button>}
        />
      </div>
    ) : (
      this.props.children
    );
  }
}

const legacy = {
  '/home': '/dashboard',
  '/userProfile': '/profile',
  '/fypPanel/add': '/panels',
  '/fypPanel/display': '/panels',
  '/fypPanel/assign': '/panels',
  '/scheduling/add': '/calendar',
  '/announcement/add': '/announcements',
  '/users/addTeacher': '/people?tab=teachers',
  '/users/addStudent': '/people?tab=students',
  '/fypProject/add': '/projects',
  '/eval/calculate': '/evaluations',
  '/eval/add': '/evaluations',
  '/eval/view': '/evaluations',
  '/grid': '/projects',
  '/manageContainers': '/deployments',
  '/resource/requestApproval': '/resources',
  '/announce': '/announcements',
  '/fyppanels': '/panels',
  '/resourceApprove': '/resources',
  '/projectsManage': '/projects',
  '/email': '/messages',
  '/scheduler': '/calendar',
  '/ProjectIdeas': '/ideas',
  '/createFrontendPipeline': '/deployments',
  '/createBackendPipeline': '/deployments',
  '/detail': '/projects',
  '/evaluation': '/evaluations',
  '/deliverable': '/deliverables',
  '/board': '/tasks',
  '/resourceForm': '/resources',
  '/doc': '/documents',
  '/requirement/display': '/requirements',
  '/requirement/add': '/requirements',
  '/resourceManage': '/resources',
  '/login': '/signin',
};

export default function App() {
  return (
    <AppErrorBoundary>
      <Suspense
        fallback={
          <div className="loading-state page-loading" role="status">
            <LoaderCircle className="spin" size={24} />
            Opening your workspace…
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          {Object.entries(legacy).map(([path, to]) => (
            <Route key={path} path={path} element={<Navigate to={to} replace />} />
          ))}
          {[
            ['/project/:projectId', '/projects'],
            ['/pipeline/:projectId', '/deployments'],
            ['/deliverables/:id', '/deliverables'],
            ['/progress/:id', '/dashboard'],
            ['/evaluation/:id', '/evaluations'],
            ['/addEvaluation/:projectId', '/evaluations'],
          ].map(([path, to]) => (
            <Route key={path} path={path} element={<LegacyProject to={to} />} />
          ))}
          <Route element={<ProtectedWorkspace />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/requirements" element={<Requirements />} />
            <Route path="/deliverables" element={<Deliverables />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/team" element={<Team />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/ideas" element={<Ideas />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/proposal"
              element={
                <Roles allowed={['student']}>
                  <Proposal />
                </Roles>
              }
            />
            <Route
              path="/people"
              element={
                <Roles allowed={['admin']}>
                  <People />
                </Roles>
              }
            />
            <Route
              path="/panels"
              element={
                <Roles allowed={['admin', 'teacher']}>
                  <Panels />
                </Roles>
              }
            />
            <Route
              path="/evaluations"
              element={
                <Roles allowed={['admin', 'teacher']}>
                  <Evaluations />
                </Roles>
              }
            />
            <Route
              path="/deployments"
              element={
                <Roles allowed={['admin', 'teacher']}>
                  <Deployments />
                </Roles>
              }
            />
            <Route
              path="*"
              element={
                <section className="panel">
                  <EmptyState
                    title="We couldn’t find that page"
                    description="Use the navigation to get back to your workspace."
                    action={
                      <Link className="button button-primary" to="/dashboard">
                        Back to dashboard
                      </Link>
                    }
                  />
                </section>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </AppErrorBoundary>
  );
}
