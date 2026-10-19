import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ExternalLink, Play, RefreshCw, Rocket, Trash2 } from 'lucide-react';
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
import { api, useAction } from '../../lib/api';
import { safeUrl } from '../../lib/format';

export default function DeploymentsPage() {
  return (
    <ProjectGate>
      <Deployments />
    </ProjectGate>
  );
}

function Deployments() {
  const { project } = useWorkspace();
  const [type, setType] = useState('Frontend');
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [notice, setNotice] = useState('');
  const query = useQuery({
    queryKey: ['pipeline', project.ProjectId, type],
    queryFn: async ({ signal }) => {
      try {
        return (
          await api.post(
            '/jenkins/getDeploymentLink',
            { ProjectId: project.ProjectId, Type: type },
            { signal, timeout: 140000 },
          )
        ).data;
      } catch (error) {
        if (error.response?.status === 404) return null;
        throw error;
      }
    },
  });
  const pipeline = query.data;
  const build = useAction(async () => {
    const response = await api.post(
      '/jenkins/buildPipline',
      { job_name: pipeline.job_name },
      { timeout: 140000 },
    );
    setNotice(
      response.status === 202
        ? 'The build is queued or still running. Refresh the deployment details later to check for a published link.'
        : response.data.message || 'Build completed.',
    );
    return response;
  });
  const remove = useAction(() =>
    api.delete('/jenkins/deletePipline', {
      params: { ProjectId: project.ProjectId, job_name: pipeline.job_name },
      timeout: 280000,
    }),
  );
  const fields = [
    {
      key: 'githubLink',
      label: 'Git repository URL',
      type: 'url',
      hint: 'Use an HTTPS repository on GitHub, GitLab, or Bitbucket.',
    },
    {
      key: 'selectedTool',
      label: 'Build tool',
      type: 'select',
      options: type === 'Frontend' ? ['ReactJs'] : ['Node/Express js', 'Flask'],
    },
    {
      key: 'jobname',
      label: 'Pipeline job name',
      default: `${project.ProjectId}-${type}`.replace(/[^a-zA-Z0-9_-]/g, '-'),
    },
  ];
  return (
    <>
      <PageHeader
        eyebrow="Build & ship"
        title="Deployments"
        description="Manage your project’s Jenkins pipelines and published application links."
        action={
          <Button variant="secondary" onClick={() => query.refetch()} disabled={query.isFetching}>
            <RefreshCw size={16} />
            Refresh details
          </Button>
        }
      />
      <Tabs
        value={type}
        onChange={(value) => {
          setType(value);
          setNotice('');
          build.reset();
        }}
        items={[
          { value: 'Frontend', label: 'Frontend application' },
          { value: 'Backend', label: 'Backend service' },
        ]}
      />
      <div className="info-notice">
        Deployments use your department’s configured Jenkins service. Builds may stay queued while
        an agent becomes available.
      </div>
      {notice && <SuccessNotice>{notice}</SuccessNotice>}
      <ErrorNotice error={build.error} />
      <QueryState query={query}>
        <section className="panel deployment-panel">
          {pipeline ? (
            <>
              <header>
                <span className="project-icon">
                  <Rocket size={26} />
                </span>
                <div>
                  <p className="eyebrow">{type.toUpperCase()} PIPELINE</p>
                  <h2>{pipeline.job_name}</h2>
                </div>
                <Badge tone="info">Configured</Badge>
              </header>
              <dl className="details-list">
                <div>
                  <dt>Repository</dt>
                  <dd>
                    {safeUrl(pipeline.git_repo_url) ? (
                      <a
                        className="text-link"
                        href={safeUrl(pipeline.git_repo_url)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {pipeline.git_repo_url}
                        <ExternalLink size={15} />
                      </a>
                    ) : (
                      pipeline.git_repo_url
                    )}
                  </dd>
                </div>
                <div>
                  <dt>Build tool</dt>
                  <dd>{pipeline.selectedTool}</dd>
                </div>
                <div>
                  <dt>Deployment</dt>
                  <dd>
                    {safeUrl(pipeline.deploymentLink) ? (
                      <a
                        className="text-link"
                        href={safeUrl(pipeline.deploymentLink)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open application
                        <ExternalLink size={15} />
                      </a>
                    ) : (
                      'No application link has been published yet.'
                    )}
                  </dd>
                </div>
              </dl>
              <div className="form-actions">
                <Button
                  variant="danger"
                  disabled={build.isPending}
                  onClick={() => {
                    remove.reset();
                    setDeleting(true);
                  }}
                >
                  <Trash2 size={16} />
                  Delete pipeline
                </Button>
                <Button
                  busy={build.isPending}
                  onClick={() => {
                    setNotice('');
                    build.mutate();
                  }}
                >
                  <Play size={16} />
                  Run build
                </Button>
              </div>
            </>
          ) : (
            <EmptyState
              icon={Rocket}
              title={`Ready to deploy your ${type.toLowerCase()}?`}
              description="Connect your repository to create a real build pipeline."
              action={<Button onClick={() => setCreating(true)}>Create pipeline</Button>}
            />
          )}
        </section>
      </QueryState>
      {creating && (
        <EntityForm
          title={`Create ${type.toLowerCase()} pipeline`}
          fields={fields}
          onClose={() => setCreating(false)}
          onSave={async (data) => {
            const url = safeUrl(data.githubLink);
            if (
              !url ||
              new URL(url).protocol !== 'https:' ||
              !['github.com', 'gitlab.com', 'bitbucket.org'].includes(new URL(url).hostname)
            )
              throw new Error('Use an HTTPS GitHub, GitLab, or Bitbucket repository URL.');
            if (!/^[a-zA-Z0-9_-]+$/.test(data.jobname))
              throw new Error(
                'Use only letters, numbers, hyphens, and underscores in the job name.',
              );
            const response = await api.post(
              '/jenkins/createPipelineJob',
              { ...data, ProjectId: project.ProjectId, Type: type },
              { timeout: 140000 },
            );
            setNotice(
              response.status === 202
                ? 'Pipeline created. Its first build is queued or running.'
                : response.data.message || 'Pipeline created.',
            );
          }}
          submitLabel="Create pipeline"
        />
      )}
      {deleting && (
        <ConfirmDialog
          title="Delete this pipeline?"
          description="This removes the Jenkins job and its saved deployment record."
          error={remove.error}
          busy={remove.isPending}
          onClose={() => {
            if (!remove.isPending) setDeleting(false);
          }}
          onConfirm={async () => {
            try {
              await remove.mutateAsync();
              setDeleting(false);
              setNotice('Pipeline deleted.');
            } catch {
              /* Retain dialog. */
            }
          }}
        />
      )}
    </>
  );
}
