import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from './auth';
import { useWorkspace } from './workspace';
import { navigation, roleLabel } from './navigation';
import { dateLabel, initials } from '../lib/format';

export function Brand({ compact = false }) {
  return (
    <Link to="/" className="brand" aria-label="DepEase home">
      <span className="brand-mark">
        <img src="/brand-mark.png" alt="" />
      </span>
      {!compact && (
        <span>
          Dep<span className="brand-accent">Ease</span>
          <small>PROJECT WORKSPACE</small>
        </span>
      )}
    </Link>
  );
}

export function AppShell() {
  const { account, role, logout } = useAuth();
  const { projects, project, selectProject } = useWorkspace();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 760px)').matches);
  const sidebar = useRef(null);
  const visible = navigation.filter((item) => !item.roles || item.roles.includes(role));
  const current = visible.find((item) => location.pathname.startsWith(item.path));
  const name = account.student_name || account.name || 'Your account';
  useEffect(() => {
    setOpen(false);
    document.title = `${current?.label || 'Workspace'} · DepEase`;
  }, [location.pathname, current?.label]);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 761px)');
    const resize = () => {
      setMobile(!desktop.matches);
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener('change', resize);
    return () => desktop.removeEventListener('change', resize);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    sidebar.current.querySelector('a, button')?.focus();
    const keyboard = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const targets = [...sidebar.current.querySelectorAll('a, button')].filter(
        (element) => element.getClientRects().length,
      );
      const first = targets[0];
      const last = targets[targets.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', keyboard);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', keyboard);
      previous?.focus();
    };
  }, [open]);
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      {open && (
        <button
          className="sidebar-scrim"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        ref={sidebar}
        id="workspace-navigation"
        className={`sidebar ${open ? 'is-open' : ''}`}
        inert={mobile && !open ? '' : undefined}
        aria-hidden={(mobile && !open) || undefined}
      >
        <div className="sidebar-brand">
          <Brand />
          <button
            className="icon-button mobile-only"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        <div className="workspace-tag">
          <span className="workspace-initial">D</span>
          <div>
            <strong>DepEase workspace</strong>
            <small>{roleLabel[role]} portal</small>
          </div>
        </div>
        <nav aria-label="Main navigation">
          {[...new Set(visible.map((item) => item.group))].map((group) => (
            <div className="nav-group" key={group}>
              <p>{group}</p>
              {visible
                .filter((item) => item.group === group)
                .map(({ label, path, icon: Icon }) => (
                  <NavLink key={path} to={path} onClick={() => setOpen(false)}>
                    <Icon size={18} />
                    <span>{label}</span>
                  </NavLink>
                ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="workspace-tip">
            <span className="tip-dot" />
            <div>
              <strong>One team. One workspace.</strong>
              <p>Keep your project moving, together.</p>
            </div>
          </div>
          <div className="sidebar-account">
            <Link to="/profile" className="account-link">
              <span className="avatar">{initials(name)}</span>
              <span>
                <strong>{name}</strong>
                <small>{roleLabel[role]}</small>
              </span>
            </Link>
            <button
              className="icon-button"
              aria-label="Sign out"
              title="Sign out"
              onClick={() => logout()}
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </aside>
      <div className="main-shell" inert={open ? '' : undefined}>
        <header className="topbar">
          <div className="breadcrumb">
            <button
              className="icon-button mobile-only"
              aria-label="Open navigation"
              aria-expanded={open}
              aria-controls="workspace-navigation"
              onClick={() => setOpen(true)}
            >
              <Menu size={21} />
            </button>
            <span>Workspace</span>
            <ChevronRight size={14} />
            <strong>{current?.label || 'Project workspace'}</strong>
          </div>
          <div className="topbar-right">
            <span className="today-label">{dateLabel(new Date(), { weekday: 'short' })}</span>
            <span className="topbar-divider" />
            <Link to="/profile" className="profile-button" aria-label="Open profile">
              <span className="avatar avatar-small">{initials(name)}</span>
              <ChevronDown size={13} />
            </Link>
          </div>
        </header>
        <div className="project-bar">
          <span className="project-context">
            <span className="project-dot" />
            {roleLabel[role]} workspace
          </span>
          <label className="project-select">
            <span>Current project</span>
            <select
              aria-label="Current project"
              value={project?._id || ''}
              onChange={(event) => selectProject(event.target.value)}
            >
              {!project && (
                <option value="">
                  {projects.length ? 'Choose a project' : 'No project assigned'}
                </option>
              )}
              {projects.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.ProjectId}
                </option>
              ))}
            </select>
            <ChevronDown size={14} />
          </label>
        </div>
        <main id="main-content" tabIndex={-1}>
          <Outlet key={project?._id || 'no-project'} />
        </main>
        <footer className="app-footer">
          <span>DepEase · Built for your next milestone.</span>
          <span>{roleLabel[role]} workspace</span>
        </footer>
      </div>
    </div>
  );
}
