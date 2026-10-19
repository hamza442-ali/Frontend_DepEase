import { useEffect, useState } from 'react';
import { ArrowRight, Check, Eye, EyeOff, GraduationCap, Layers3 } from 'lucide-react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../app/auth';
import { Brand } from '../../app/shell';
import { Button, ErrorNotice, Field } from '../../components/ui';

export default function LoginPage() {
  const { session, login, expired } = useAuth();
  const location = useLocation();
  useEffect(() => {
    document.title = 'Sign in | DepEase';
  }, []);
  const [kind, setKind] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  if (session) return <Navigate to={location.state?.from || '/dashboard'} replace />;
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await login(kind, email.trim(), password);
    } catch (failure) {
      setError(failure);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="auth-page">
      <aside className="auth-story">
        <Brand />
        <div className="auth-story-content">
          <div className="auth-tag">
            <span />
            YOUR NEXT BIG IDEA STARTS HERE
          </div>
          <h1>
            Less managing.
            <br />
            More <em>making.</em>
          </h1>
          <p>
            A calmer way to bring your final-year project from the first idea to the final
            deployment.
          </p>
          <div className="journey-visual" aria-hidden="true">
            <div className="journey-line" />
            <div className="journey-node done">
              <Check size={18} />
              <span>The idea</span>
            </div>
            <div className="journey-node done">
              <Check size={18} />
              <span>The plan</span>
            </div>
            <div className="journey-node active">
              <Layers3 size={18} />
              <span>The build</span>
            </div>
            <div className="journey-node">
              <GraduationCap size={18} />
              <span>The milestone</span>
            </div>
          </div>
          <div className="auth-benefits">
            <span>
              <Check size={15} />
              Every milestone in one place
            </span>
            <span>
              <Check size={15} />
              Your team, always in the loop
            </span>
            <span>
              <Check size={15} />
              From proposal to deployment
            </span>
          </div>
        </div>
        <div className="auth-footer">
          A shared space for students, supervisors, and administrators.
        </div>
      </aside>
      <main className="auth-main">
        <div className="mobile-auth-brand">
          <Brand />
        </div>
        <div className="login-card">
          <span className="eyebrow">WELCOME TO DEPEASE</span>
          <h2>Your workspace awaits.</h2>
          <p>Sign in to pick up where your team left off.</p>
          <div className="login-role-tabs" role="group" aria-label="Account type">
            {[
              { value: 'student', label: 'Student' },
              { value: 'teacher', label: 'Teacher' },
              { value: 'admin', label: 'Administrator' },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={kind === item.value}
                className={kind === item.value ? 'active' : ''}
                disabled={busy}
                onClick={() => {
                  setKind(item.value);
                  setError(null);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          {expired && (
            <div className="info-notice" role="status">
              Your session has expired. Sign in again to continue.
            </div>
          )}
          <form onSubmit={submit}>
            <Field
              label="Email address"
              type="email"
              autoComplete="username"
              placeholder="you@university.edu"
              required
              value={email}
              disabled={busy}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Field label="Password" required>
              {(id) => (
                <div className="password-input">
                  <input
                    id={id}
                    type={visible ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    disabled={busy}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="icon-button"
                    aria-label={visible ? 'Hide password' : 'Show password'}
                    aria-pressed={visible}
                    onClick={() => setVisible(!visible)}
                  >
                    {visible ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              )}
            </Field>
            <ErrorNotice error={error} />
            <Button className="button-full" type="submit" busy={busy}>
              Sign in to your workspace
              <ArrowRight size={17} />
            </Button>
          </form>
          <p className="login-help">
            Need an account or a password reset?
            <br />
            Contact your department administrator.
          </p>
        </div>
        <footer>Organize your work. Focus on what matters.</footer>
      </main>
    </div>
  );
}
