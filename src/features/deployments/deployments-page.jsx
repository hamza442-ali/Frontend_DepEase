import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  CheckCircle2,
  Download,
  ExternalLink,
  Play,
  RefreshCw,
  Rocket,
  Square,
  Trash2,
} from 'lucide-react';
import { useAuth } from '../../app/auth';
import { useWorkspace } from '../../app/workspace';
import { ProjectGate } from '../../components/project-gate';
import { EntityForm } from '../../components/resource-page';
import {
  Badge,
  Button,
  ConfirmDialog,
  EmptyState,
  ErrorNotice,
  PageHeader,
  QueryState,
  SuccessNotice,
  Tabs,
} from '../../components/ui';
import { api, encode, list, useAction, useData } from '../../lib/api';
import { dateLabel, safeUrl } from '../../lib/format';

const TOOL_OPTIONS = { Frontend: ['ReactJs'], Backend: ['Node/Express js', 'Flask'] };
const TEMPLATE = { ReactJs: 'react', 'Node/Express js': 'node', Flask: 'flask' };
const LABELS = {
  SUBMITTING: 'Submitting',
  QUEUED: 'Queued',
  RUNNING: 'Running',
  SUCCESS: 'Succeeded',
  FAILURE: 'Failed',
  ABORTED: 'Cancelled',
  UNSTABLE: 'Unstable',
  NOT_BUILT: 'Not built',
  UNKNOWN: 'Needs confirmation',
};
const tone = (status) =>
  status === 'SUCCESS'
    ? 'success'
    : ['FAILURE', 'ABORTED', 'UNSTABLE'].includes(status)
      ? 'danger'
      : 'info';

export default function DeploymentsPage() {
  const { role } = useAuth();
  const connection = useData('/jenkins/status', { refetchInterval: 30000, retry: false });
  return (
    <>
      <PageHeader
        eyebrow="Build & ship"
        title="Deployments"
        description="Connect a repository, run a build, and follow its progress in one place."
      />
      <section className="panel jenkins-connection">
        <div className="jenkins-connection-heading">
          <span className="project-icon">
            <Rocket size={24} />
          </span>
          <div>
            <h2>Jenkins connection</h2>
            <p className="muted">
              {connection.isPending
                ? 'Checking your build service?'
                : connection.data?.message || 'The connection could not be checked.'}
            </p>
          </div>
          <Badge tone={connection.data?.connected ? 'success' : 'warning'}>
            {connection.data?.connected
              ? 'Connected'
              : connection.isPending
                ? 'Checking'
                : 'Not connected'}
          </Badge>
        </div>
        <ErrorNotice error={connection.error} />
        {connection.data?.connected && (
          <p className="muted">
            <CheckCircle2 size={15} /> {connection.data.availableExecutors || 0} build executor(s)
            online. Builds keep their history when you leave this page.
          </p>
        )}
        {!connection.data?.connected && role === 'admin' && (
          <div className="info-notice">
            For local development, run <code>scripts/start-local.ps1 -WithJenkins</code> in the
            backend directory. It prepares Jenkins, a build agent, and private credentials
            automatically.
          </div>
        )}
        <Button
          variant="secondary"
          disabled={connection.isFetching}
          onClick={() => connection.refetch()}
        >
          <RefreshCw size={15} /> Check connection
        </Button>
      </section>
      <ProjectGate>
        <Pipelines connected={connection.data?.connected === true} />
      </ProjectGate>
    </>
  );
}

function Pipelines({ connected }) {
  const { project, canManageProject } = useWorkspace();
  const [type, setType] = useState('Frontend');
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [notice, setNotice] = useState('');
  const pendingRequest = useRef(null);
  const query = useQuery({
    queryKey: ['pipeline', project.ProjectId, type],
    queryFn: async ({ signal }) => {
      try {
        return (
          await api.post(
            '/jenkins/getDeploymentLink',
            { ProjectId: project.ProjectId, Type: type },
            { signal, timeout: 55000 },
          )
        ).data;
      } catch (error) {
        if (error.response?.status === 404) return null;
        throw error;
      }
    },
    refetchInterval: (query) =>
      list(query.state.data?.builds).some((build) => build.active) ? 3000 : false,
    retry: false,
  });
  const pipeline = query.data;
  const active = list(pipeline?.builds).find((build) => build.active);
  const build = useAction(async () => {
    pendingRequest.current ||= crypto.randomUUID();
    const response = await api.post(
      '/jenkins/buildPipline',
      { job_name: pipeline.job_name, requestId: pendingRequest.current },
      { timeout: 55000 },
    );
    pendingRequest.current = null;
    setNotice(
      response.data.status === 'UNKNOWN'
        ? 'The request is saved but Jenkins has not confirmed it. Refresh its status before retrying.'
        : response.data.active
          ? 'Build queued. Progress will update automatically.'
          : 'This build request is already recorded.',
    );
  });
  const cancel = useAction(async () => {
    const response = await api.post(
      `/jenkins/pipelines/${encode(pipeline._id)}/builds/${encode(active._id)}/cancel`,
      {},
      { timeout: 55000 },
    );
    setNotice(
      response.data.active
        ? response.data.cancelRequested
          ? 'Cancellation requested. Waiting for Jenkins to confirm.'
          : 'Jenkins could not confirm an active run. Refresh status or open Jenkins to check.'
        : `Build ${LABELS[response.data.status]?.toLowerCase() || 'updated'}.`,
    );
  });
  const remove = useAction(() =>
    api.delete('/jenkins/deletePipline', {
      params: { ProjectId: project.ProjectId, job_name: pipeline.job_name },
      timeout: 55000,
    }),
  );
  const retrySetup = useAction(async () => {
    const result = await api.post(
      '/jenkins/createPipelineJob',
      {
        ProjectId: project.ProjectId,
        Type: type,
        githubLink: pipeline.git_repo_url,
        selectedTool: pipeline.selectedTool,
        jobname: pipeline.job_name,
        branch: pipeline.branch,
        scriptPath: pipeline.scriptPath,
      },
      { timeout: 55000 },
    );
    setNotice(result.data.message);
  });
  return (
    <>
      <div className="section-toolbar">
        <Tabs
          value={type}
          disabled={build.isPending || cancel.isPending}
          onChange={(value) => {
            setType(value);
            setNotice('');
            pendingRequest.current = null;
            build.reset();
          }}
          items={[
            { value: 'Frontend', label: 'Frontend application' },
            { value: 'Backend', label: 'Backend service' },
          ]}
        />
        <Button variant="secondary" disabled={query.isFetching} onClick={() => query.refetch()}>
          <RefreshCw size={15} /> Refresh
        </Button>
      </div>
      {!canManageProject && (
        <div className="info-notice">
          You can review this project's builds. Its supervisor manages pipelines and build actions.
        </div>
      )}
      {notice && <SuccessNotice>{notice}</SuccessNotice>}
      <ErrorNotice error={build.error || cancel.error || retrySetup.error} />
      <QueryState query={query}>
        <section className="panel deployment-panel">
          {pipeline ? (
            <>
              <header>
                <span className="project-icon">
                  <Rocket size={25} />
                </span>
                <div>
                  <p className="eyebrow">{type.toUpperCase()} PIPELINE</p>
                  <h2>{pipeline.job_name}</h2>
                </div>
                <Badge tone={pipeline.state === 'READY' ? 'success' : 'warning'}>
                  {pipeline.state === 'READY'
                    ? 'Ready'
                    : pipeline.state === 'DELETING'
                      ? 'Removal pending'
                      : 'Setup pending'}
                </Badge>
              </header>
              {pipeline.lastError && <div className="info-notice">{pipeline.lastError}</div>}
              <dl className="details-list">
                <div>
                  <dt>Repository</dt>
                  <dd>
                    <SafeLink href={pipeline.git_repo_url}>{pipeline.git_repo_url}</SafeLink>
                  </dd>
                </div>
                <div>
                  <dt>Branch</dt>
                  <dd>{pipeline.branch || 'main'}</dd>
                </div>
                <div>
                  <dt>Pipeline file</dt>
                  <dd>{pipeline.scriptPath || 'Jenkinsfile'}</dd>
                </div>
                <div>
                  <dt>Build tool</dt>
                  <dd>{pipeline.selectedTool}</dd>
                </div>
                <div>
                  <dt>Published application</dt>
                  <dd>
                    {safeUrl(pipeline.deploymentLink) ? (
                      <SafeLink href={pipeline.deploymentLink}>
                        Open last published application
                      </SafeLink>
                    ) : (
                      'No application URL has been published. A successful build does not publish an application by itself.'
                    )}
                  </dd>
                </div>
              </dl>
              <div className="jenkins-actions">
                <a
                  className="button button-secondary"
                  href={`/jenkinsfiles/${TEMPLATE[pipeline.selectedTool] || 'node'}.Jenkinsfile`}
                  download="Jenkinsfile"
                >
                  <Download size={15} /> Starter Jenkinsfile
                </a>
                {pipeline.jobUrl && <SafeLink href={pipeline.jobUrl}>Open in Jenkins</SafeLink>}
                {canManageProject && (
                  <>
                    <Button
                      variant="danger"
                      disabled={
                        Boolean(active) ||
                        build.isPending ||
                        retrySetup.isPending ||
                        pipeline.state === 'CREATING'
                      }
                      onClick={() => {
                        remove.reset();
                        setDeleting(true);
                      }}
                    >
                      <Trash2 size={15} /> Remove pipeline
                    </Button>
                    {pipeline.state === 'ERROR' || pipeline.state === 'CREATING' ? (
                      <Button
                        busy={retrySetup.isPending}
                        disabled={!connected}
                        onClick={() => retrySetup.mutate()}
                      >
                        Retry setup
                      </Button>
                    ) : (
                      <Button
                        busy={build.isPending}
                        disabled={!connected || Boolean(active) || pipeline.state === 'DELETING'}
                        onClick={() => build.mutate()}
                      >
                        <Play size={15} /> {active ? 'Build in progress' : 'Run build'}
                      </Button>
                    )}
                  </>
                )}
              </div>
            </>
          ) : (
            <EmptyState
              icon={Rocket}
              title={`Connect your ${type.toLowerCase()} repository`}
              description="Choose a repository and branch. DepEase creates the Jenkins job and tracks each build for you."
              action={
                canManageProject && (
                  <Button disabled={!connected} onClick={() => setCreating(true)}>
                    Connect repository
                  </Button>
                )
              }
            />
          )}
        </section>
        {pipeline && (
          <section className="panel build-history">
            <div className="panel-toolbar">
              <div>
                <h2>Build history</h2>
                <p className="muted">
                  The 20 most recent runs. Active builds refresh automatically.
                </p>
              </div>
              {active && canManageProject && (
                <Button
                  variant="secondary"
                  busy={cancel.isPending}
                  disabled={active.cancelRequested || active.status === 'SUBMITTING' || !connected}
                  onClick={() => cancel.mutate()}
                >
                  <Square size={14} /> {active.cancelRequested ? 'Cancelling?' : 'Cancel build'}
                </Button>
              )}
            </div>
            {list(pipeline.builds).length ? (
              <ol className="build-runs">
                {pipeline.builds.map((run) => (
                  <li key={run._id}>
                    <div className="build-run-title">
                      <strong>
                        {run.buildNumber
                          ? `Build #${run.buildNumber}`
                          : run.queueId
                            ? `Queue #${run.queueId}`
                            : 'Build request'}
                      </strong>
                      <Badge tone={tone(run.status)}>{LABELS[run.status] || run.status}</Badge>
                    </div>
                    <p className="muted">
                      {dateLabel(run.createdAt, {
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                      {run.durationMs ? ` ? ${Math.round(run.durationMs / 1000)} seconds` : ''}
                    </p>
                    {run.message && <p>{run.message}</p>}
                    {run.status === 'SUCCESS' && !run.deploymentLink && (
                      <p className="muted">
                        Build passed. This run did not publish an application URL.
                      </p>
                    )}
                    {run.deploymentLink && (
                      <SafeLink href={run.deploymentLink}>
                        Open application from this build
                      </SafeLink>
                    )}
                  </li>
                ))}
              </ol>
            ) : (
              <EmptyState
                title="Your first build starts here"
                description="Run the pipeline to see queued, running, completed and cancelled builds."
              />
            )}
          </section>
        )}
      </QueryState>
      {creating && (
        <EntityForm
          title={`Connect ${type.toLowerCase()} repository`}
          fields={[
            {
              key: 'githubLink',
              label: 'Repository URL',
              type: 'url',
              hint: 'HTTPS GitHub, GitLab or Bitbucket repository.',
            },
            {
              key: 'selectedTool',
              label: 'Build tool',
              type: 'select',
              options: TOOL_OPTIONS[type],
              default: TOOL_OPTIONS[type][0],
            },
            {
              key: 'branch',
              label: 'Git branch',
              default: 'main',
              hint: 'The branch containing your application.',
            },
            {
              key: 'scriptPath',
              label: 'Jenkinsfile location',
              default: 'Jenkinsfile',
              hint: 'Relative to the repository, for example .ci/Jenkinsfile.',
            },
          ]}
          onClose={() => setCreating(false)}
          onSave={async (data) => {
            const response = await api.post(
              '/jenkins/createPipelineJob',
              { ...data, ProjectId: project.ProjectId, Type: type },
              { timeout: 55000 },
            );
            setNotice(response.data.message);
          }}
          submitLabel="Connect repository"
        />
      )}
      {deleting && (
        <ConfirmDialog
          title="Remove this pipeline?"
          description="Remove its Jenkins job and saved build history. This does not run a teardown or remove your deployed application. Finish or cancel active builds first."
          busy={remove.isPending}
          error={remove.error}
          onClose={() => {
            if (!remove.isPending) setDeleting(false);
          }}
          onConfirm={async () => {
            try {
              await remove.mutateAsync();
              setDeleting(false);
              setNotice('Pipeline removed.');
            } catch {
              /* Retain the dialog. */
            }
          }}
        />
      )}
    </>
  );
}

function SafeLink({ href, children }) {
  const url = safeUrl(href);
  return url ? (
    <a className="text-link" href={url} target="_blank" rel="noreferrer">
      {children}
      <ExternalLink size={14} />
    </a>
  ) : (
    <span>{children}</span>
  );
}
