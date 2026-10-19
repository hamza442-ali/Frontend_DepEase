import { useEffect, useRef, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../app/auth';
import { useWorkspace } from '../../app/workspace';
import {
  Button,
  EmptyState,
  ErrorNotice,
  Field,
  PageHeader,
  QueryState,
  SelectField,
} from '../../components/ui';
import { api, list, useData } from '../../lib/api';

const STEPS = ['Project idea', 'Scope & plan', 'Your group'];
const lines = (value) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

export default function ProposalPage() {
  const { account } = useAuth();
  const { projects, query } = useWorkspace();
  const client = useQueryClient();
  const teachers = useData('/teacher/getall');
  const draftKey = `depease.proposal.${account._id}`;
  const [draft] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem(draftKey)) || {};
    } catch {
      return {};
    }
  });
  const [values, setValues] = useState(() => ({
    title: '',
    ProjectType: 'Development',
    supervisor: '',
    problemStatement: '',
    problemSolution: '',
    scope: '',
    timeline: '',
    technologyUsed: '',
    modules: '',
    teamLeadId: account.registration_number,
    teammate1Id: '',
    teammate2Id: '',
    ProjectId: `FYP-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    batch: account.batch || new Date().getFullYear(),
    semester: account.semester || 7,
    ...draft.values,
  }));
  const [completed, setCompleted] = useState(draft.completed || {});
  const [step, setStep] = useState(draft.completed?.proposalId ? 2 : 0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);
  const request = useRef(null);
  useEffect(() => () => request.current?.abort(), []);
  function update(key, value) {
    const next = { ...values, [key]: value };
    setValues(next);
    sessionStorage.setItem(draftKey, JSON.stringify({ values: next, completed }));
  }
  function remember(next) {
    setCompleted(next);
    sessionStorage.setItem(draftKey, JSON.stringify({ values, completed: next }));
  }
  async function submit(event) {
    event.preventDefault();
    setError(null);
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    const members = [values.teamLeadId, values.teammate1Id, values.teammate2Id].map((value) =>
      value.trim(),
    );
    if (new Set(members).size !== 3) {
      setError(new Error('Enter three different registration numbers.'));
      return;
    }
    setBusy(true);
    request.current = new AbortController();
    const config = { signal: request.current.signal };
    let progress = { ...completed };
    try {
      if (!progress.proposalId) {
        const { data } = await api.post(
          '/proposals/add',
          {
            title: values.title.trim(),
            ProjectType: values.ProjectType,
            supervisor: values.supervisor,
            problemStatement: values.problemStatement.trim(),
            problemSolution: values.problemSolution.trim(),
            scope: values.scope.trim(),
            timeline: lines(values.timeline),
            technologyUsed: values.technologyUsed.trim(),
            modules: lines(values.modules),
          },
          config,
        );
        progress.proposalId = data._id;
        remember({ ...progress });
      }
      if (!progress.groupId) {
        const { data } = await api.post(
          '/group/add',
          {
            teamLeadId: members[0],
            teammate1Id: members[1],
            teammate2Id: members[2],
          },
          config,
        );
        progress.groupId = data._id;
        remember({ ...progress });
      }
      await api.post(
        '/projects/add',
        {
          ProjectId: values.ProjectId.trim(),
          batch: Number(values.batch),
          semester: Number(values.semester),
          teacher: values.supervisor,
          group: progress.groupId,
          projectProposal: progress.proposalId,
        },
        config,
      );
      sessionStorage.removeItem(draftKey);
      setDone(true);
      await client.invalidateQueries();
    } catch (failure) {
      setError(failure);
    } finally {
      setBusy(false);
    }
  }
  function input(key, label, options = {}) {
    return (
      <Field
        key={key}
        label={label}
        value={values[key]}
        onChange={(event) => update(key, event.target.value)}
        required
        disabled={
          busy ||
          (Boolean(completed.proposalId) && !['ProjectId', 'batch', 'semester'].includes(key))
        }
        maxLength={10000}
        {...options}
      />
    );
  }
  if (done)
    return (
      <>
        <PageHeader title="Your project is ready" />
        <section className="panel">
          <EmptyState
            title="A new beginning for your team"
            description="Your proposal, group, and project workspace have been created."
            action={
              <Link className="button button-primary" to="/dashboard">
                Open workspace
              </Link>
            }
            icon={Check}
          />
        </section>
      </>
    );
  return (
    <>
      <PageHeader
        eyebrow="Get started"
        title="Project proposal"
        description="Shape your idea, plan the work, and bring your team together."
      />
      <QueryState query={query}>
        {projects.length ? (
          <section className="panel">
            <EmptyState
              title="Your project is already set up"
              description="You can review and edit its proposal from the Projects page."
              action={
                <Link className="button button-primary" to="/projects">
                  View project
                </Link>
              }
            />
          </section>
        ) : (
          <section className="panel proposal-panel">
            <ol className="step-indicator">
              {STEPS.map((label, index) => (
                <li
                  key={label}
                  className={index === step ? 'active' : index < step ? 'complete' : ''}
                >
                  <span>{index < step ? <Check size={15} /> : index + 1}</span>
                  <strong>{label}</strong>
                </li>
              ))}
            </ol>
            {completed.proposalId && (
              <div className="info-notice">
                Your proposal has been saved. Continue to finish creating the project; completed
                steps will be reused.
              </div>
            )}
            <form onSubmit={submit}>
              <div className="proposal-form">
                <h2>{STEPS[step]}</h2>
                <div className="form-grid">
                  {step === 0 && (
                    <>
                      {input('title', 'Project title')}
                      <SelectField
                        label="Project type"
                        value={values.ProjectType}
                        disabled={Boolean(completed.proposalId)}
                        required
                        onChange={(event) => update('ProjectType', event.target.value)}
                        options={['Development', 'Research', 'Research & Development']}
                      />
                      <QueryState query={teachers}>
                        <SelectField
                          label="Supervisor"
                          value={values.supervisor}
                          required
                          disabled={Boolean(completed.proposalId)}
                          onChange={(event) => update('supervisor', event.target.value)}
                          options={list(teachers.data?.data).map((teacher) => ({
                            value: teacher.employeeId,
                            label: `${teacher.name} · ${teacher.employeeId}`,
                          }))}
                        />
                      </QueryState>
                      {input('technologyUsed', 'Technology stack')}
                      <div className="full-width">
                        {input('problemStatement', 'Problem statement', { type: 'textarea' })}
                      </div>
                      <div className="full-width">
                        {input('problemSolution', 'Proposed solution', { type: 'textarea' })}
                      </div>
                    </>
                  )}
                  {step === 1 && (
                    <>
                      <div className="full-width">
                        {input('scope', 'Project scope', { type: 'textarea' })}
                      </div>
                      <div className="full-width">
                        {input('timeline', 'Timeline', {
                          type: 'textarea',
                          hint: 'One milestone and target date per line.',
                        })}
                      </div>
                      <div className="full-width">
                        {input('modules', 'Planned modules', {
                          type: 'textarea',
                          hint: 'One module per line.',
                        })}
                      </div>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      {input('teamLeadId', 'Team lead registration', { readOnly: true })}
                      {input('teammate1Id', 'First teammate registration')}
                      {input('teammate2Id', 'Second teammate registration')}
                      {input('ProjectId', 'Project identifier')}
                      {input('batch', 'Batch', { type: 'number', min: 2000, max: 2100 })}
                      {input('semester', 'Semester', { type: 'number', min: 1, max: 16 })}
                    </>
                  )}
                </div>
                <ErrorNotice error={error} />
                <div className="form-actions">
                  {step > 0 && (
                    <Button
                      variant="secondary"
                      disabled={busy || Boolean(completed.proposalId)}
                      onClick={() => setStep(step - 1)}
                    >
                      <ChevronLeft size={16} />
                      Back
                    </Button>
                  )}
                  <Button type="submit" busy={busy} disabled={step === 0 && !teachers.isSuccess}>
                    {step === 2 ? (
                      <>
                        <Send size={16} />
                        Create project
                      </>
                    ) : (
                      <>
                        Continue
                        <ChevronRight size={16} />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </section>
        )}
      </QueryState>
    </>
  );
}
