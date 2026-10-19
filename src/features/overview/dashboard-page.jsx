import {
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FolderKanban,
  Plus,
  Waypoints,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../app/auth';
import { useWorkspace } from '../../app/workspace';
import { encode, list, useData } from '../../lib/api';
import { dateLabel, statusCategory } from '../../lib/format';
import {
  Badge,
  EmptyState,
  ErrorNotice,
  PageHeader,
  QueryState,
  TextLink,
} from '../../components/ui';

function Metric({ icon: Icon, label, value, detail, tone = 'blue' }) {
  return (
    <article className="metric-card">
      <div className="metric-top">
        <span>{label}</span>
        <span className={`metric-icon ${tone}`}>
          <Icon size={19} />
        </span>
      </div>
      <strong>{value}</strong>
      <span className="metric-detail">{detail}</span>
    </article>
  );
}

export default function DashboardPage() {
  const { account, role } = useAuth();
  const { projects, project, query: workspaceQuery } = useWorkspace();
  const tasks = useData(project ? `/tasks/getmine/${encode(project.ProjectId)}` : null);
  const requirements = useData(
    project ? `/requirements/getRequirements/${encode(project.ProjectId)}` : null,
  );
  const deliverables = useData(
    project ? `/deliverables/getmine/${encode(project.ProjectId)}` : null,
  );
  const schedule = useData('/schedule/getAll');
  const announcements = useData('/announcementA/getall');
  const name = (account.student_name || account.name || '').split(' ')[0];
  const taskRows = list(tasks.data);
  const requirementRows = list(requirements.data);
  const done = taskRows.filter((task) => statusCategory(task.status) === 'success').length;
  const open = taskRows.filter((task) => statusCategory(task.status) !== 'success');
  const progress = taskRows.length ? Math.round((done / taskRows.length) * 100) : 0;
  const due = [...list(deliverables.data)]
    .filter((item) => item.deadline && statusCategory(item.status) !== 'success')
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  const upcoming = list(schedule.data)
    .filter((item) => new Date(item.end) >= new Date())
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 3);
  const missing = (query) => (query.isPending ? '…' : query.error ? '—' : null);
  return (
    <>
      <PageHeader
        eyebrow="YOUR WORKSPACE, AT A GLANCE"
        title={`Welcome back${name ? `, ${name}` : ''}.`}
        description="A little clarity for everything you’re building."
        action={
          <Link
            className="button button-primary"
            to={role === 'student' && !project ? '/proposal' : '/tasks'}
          >
            <Plus size={17} />
            {role === 'student' && !project ? 'Start a proposal' : 'Manage tasks'}
          </Link>
        }
      />
      <QueryState query={workspaceQuery}>
        <div className="dashboard-grid">
          <section className="welcome-banner">
            <div>
              <span className="banner-tag">LET’S KEEP THINGS MOVING</span>
              <h2>
                {project ? 'Good ideas deserve a clear plan.' : 'Make room for your next big idea.'}
              </h2>
              <p>
                {project ? (
                  <>
                    Your workspace for <strong>{project.ProjectId}</strong> is ready. Bring your
                    next milestone a little closer.
                  </>
                ) : (
                  'Bring your project, people, and milestones together in one place.'
                )}
              </p>
              <Link
                className="banner-link"
                to={project ? '/projects' : role === 'student' ? '/proposal' : '/projects'}
              >
                {project ? 'Open your project' : 'Explore your workspace'}
                <ArrowUpRight size={17} />
              </Link>
            </div>
            <div className="banner-art" aria-hidden="true">
              <div className="art-card art-back">
                <span />
                <span />
                <span />
              </div>
              <div className="art-card art-front">
                <div className="art-check">
                  <Check size={22} />
                </div>
                <i />
                <i />
                <div className="art-progress">
                  <b />
                </div>
              </div>
              <div className="art-spark spark-one">✦</div>
              <div className="art-spark spark-two">✦</div>
            </div>
          </section>
          <section className="focus-card">
            <div className="section-label">
              <span className="tiny-dot" />
              PROJECT PULSE
            </div>
            <div className="pulse-main">
              <div className="progress-ring" style={{ '--progress': `${progress}%` }}>
                <span>
                  {project && !tasks.error ? `${progress}%` : '—'}
                  <small>complete</small>
                </span>
              </div>
              <div>
                <strong>{project ? project.ProjectId : 'No project selected'}</strong>
                <p>
                  {project
                    ? `${done} of ${taskRows.length} tasks completed`
                    : 'Your project progress appears here.'}
                </p>
              </div>
            </div>
            <Link to="/tasks" className="pulse-link">
              View project tasks
              <ChevronRight size={16} />
            </Link>
          </section>
        </div>
        <section className="metrics-grid">
          <Metric
            icon={FolderKanban}
            label={role === 'student' ? 'Your projects' : 'Active projects'}
            value={projects.length}
            detail="In your workspace"
          />
          <Metric
            icon={ClipboardList}
            label="Open tasks"
            value={project ? (missing(tasks) ?? open.length) : '—'}
            detail="Ready for your next step"
            tone="violet"
          />
          <Metric
            icon={CheckCircle2}
            label="Completed tasks"
            value={project ? (missing(tasks) ?? done) : '—'}
            detail="Progress worth celebrating"
            tone="green"
          />
          <Metric
            icon={Waypoints}
            label="Requirements"
            value={project ? (missing(requirements) ?? requirementRows.length) : '—'}
            detail="The plan behind your project"
            tone="amber"
          />
        </section>
        <div className="dashboard-content">
          <section className="panel">
            <div className="panel-heading">
              <div>
                <h2>Your next steps</h2>
                <p>Small steps. Steady progress.</p>
              </div>
              <TextLink to="/tasks">View tasks</TextLink>
            </div>
            {tasks.error ? (
              <ErrorNotice error={tasks.error} retry={tasks.refetch} />
            ) : !project || !open.length ? (
              <EmptyState
                title={project ? 'You’re all caught up' : 'A fresh start'}
                description={
                  project
                    ? 'No open tasks for this project. Add your next step when you’re ready.'
                    : 'Choose a project or create a proposal to start planning.'
                }
              />
            ) : (
              <div className="task-preview-list">
                {open.slice(0, 5).map((task) => (
                  <Link key={task._id} to="/tasks" className="task-preview">
                    <span className="task-check" />
                    <div>
                      <strong>{task.summary}</strong>
                      <small>{task.assignee || 'Unassigned'}</small>
                    </div>
                    <Badge>{task.status}</Badge>
                    <ChevronRight size={16} />
                  </Link>
                ))}
              </div>
            )}
            <div className="panel-bottom">
              <span className="muted">{project?.ProjectId || 'Your project workspace'}</span>
              <Link to="/requirements" className="text-link">
                View requirements
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </section>
          <section className="panel">
            <div className="panel-heading">
              <div>
                <h2>On the horizon</h2>
                <p>Keep your next milestone in sight.</p>
              </div>
              <CalendarDays size={18} className="muted" />
            </div>
            {schedule.error ? (
              <ErrorNotice error={schedule.error} retry={schedule.refetch} />
            ) : !upcoming.length && !due.length ? (
              <EmptyState
                icon={CalendarDays}
                title="Room to plan ahead"
                description="Upcoming schedules and deliverable deadlines appear here."
              />
            ) : (
              <div className="upcoming-list">
                {due.slice(0, 2).map((item) => (
                  <Link to="/deliverables" key={item._id} className="upcoming-item">
                    <span className="date-tile">
                      <b>{new Date(item.deadline).getDate()}</b>
                      <small>{dateLabel(item.deadline, { month: 'short', day: undefined })}</small>
                    </span>
                    <div>
                      <strong>{item.name}</strong>
                      <small>Deliverable deadline</small>
                    </div>
                    <Badge>{item.status}</Badge>
                  </Link>
                ))}
                {upcoming.map((item) => (
                  <Link to="/calendar" key={item._id} className="upcoming-item">
                    <span className="event-icon">
                      <CalendarDays size={19} />
                    </span>
                    <div>
                      <strong>{item.content}</strong>
                      <small>{dateLabel(item.start, { hour: 'numeric', minute: '2-digit' })}</small>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            <div className="panel-bottom">
              <TextLink to="/calendar">Open calendar</TextLink>
            </div>
          </section>
          <section className="panel dashboard-announcements">
            <div className="panel-heading">
              <div>
                <h2>From your department</h2>
                <p>Updates that keep everyone connected.</p>
              </div>
              <TextLink to="/announcements">All announcements</TextLink>
            </div>
            {announcements.error ? (
              <ErrorNotice error={announcements.error} retry={announcements.refetch} />
            ) : !list(announcements.data).length ? (
              <EmptyState
                title="No new announcements"
                description="Department updates will appear here."
              />
            ) : (
              <div className="announcement-preview-grid">
                {list(announcements.data)
                  .slice(-3)
                  .reverse()
                  .map((item) => (
                    <Link to="/announcements" key={item._id} className="announcement-preview">
                      <span className="eyebrow">DEPARTMENT UPDATE</span>
                      <h3>{item.title}</h3>
                      <span>
                        {dateLabel(item.date)}
                        <ArrowUpRight size={17} />
                      </span>
                    </Link>
                  ))}
              </div>
            )}
          </section>
        </div>
      </QueryState>
    </>
  );
}
