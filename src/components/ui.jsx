import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  FolderOpen,
  LoaderCircle,
  Search,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { errorMessage } from '../lib/api';
import { statusCategory } from '../lib/format';

export function Button({
  children,
  variant = 'primary',
  className = '',
  busy,
  disabled,
  type = 'button',
  ...props
}) {
  return (
    <button
      {...props}
      type={type}
      className={`button button-${variant} ${className}`}
      disabled={busy || disabled}
      aria-busy={busy || undefined}
    >
      {busy && <LoaderCircle size={16} className="spin" />}
      {children}
    </button>
  );
}

export function Badge({ children, tone }) {
  return (
    <span className={`badge badge-${tone || statusCategory(children)}`}>
      <span />
      {children}
    </span>
  );
}

export function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="page-description">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({
  title = 'Nothing here yet',
  description,
  action,
  icon: Icon = FolderOpen,
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <Icon size={26} />
      </div>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action}
    </div>
  );
}

export function ErrorNotice({ error, retry }) {
  if (!error) return null;
  return (
    <div className="error-notice" role="alert">
      <AlertCircle size={18} />
      <div>
        <strong>Something needs attention</strong>
        <p>{errorMessage(error)}</p>
      </div>
      {retry && (
        <Button variant="ghost" onClick={retry}>
          Try again
        </Button>
      )}
    </div>
  );
}

export function QueryState({ query, children }) {
  if (query.isPending)
    return (
      <div className="loading-state" role="status">
        <LoaderCircle className="spin" size={22} />
        <span>Loading your workspace…</span>
      </div>
    );
  if (query.error) return <ErrorNotice error={query.error} retry={query.refetch} />;
  return children;
}

export function Field({ label, hint, children, className = '', ...props }) {
  const id = useId();
  return (
    <div className={`field ${className}`}>
      <label htmlFor={id}>
        {label}
        {props.required && <span aria-label="required"> *</span>}
      </label>
      {children ? (
        children(id)
      ) : props.type === 'textarea' ? (
        <textarea id={id} rows={4} {...props} />
      ) : (
        <input id={id} {...props} />
      )}
      {hint && <small>{hint}</small>}
    </div>
  );
}

export function SelectField({ label, options = [], placeholder = 'Choose an option', ...props }) {
  return (
    <Field label={label} required={props.required}>
      {(id) => (
        <select id={id} {...props}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value ?? option} value={option.value ?? option}>
              {option.label ?? option}
            </option>
          ))}
        </select>
      )}
    </Field>
  );
}

export function SearchBox({ value, onChange, placeholder = 'Search…' }) {
  return (
    <label className="search-box">
      <Search size={17} />
      <span className="sr-only">{placeholder}</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

export function Modal({ title, description, onClose, children, wide = false }) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const titleId = useId();
  useEffect(() => {
    const previous = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.focus();
    const keydown = (event) => {
      if (event.key === 'Escape') closeRef.current();
      if (event.key !== 'Tab') return;
      const elements = [
        ...ref.current.querySelectorAll(
          'button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]',
        ),
      ];
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (
        event.shiftKey &&
        (document.activeElement === first || document.activeElement === ref.current)
      ) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', keydown);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener('keydown', keydown);
      previous?.focus();
    };
  }, []);
  return createPortal(
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={ref}
        tabIndex={-1}
        className={`modal ${wide ? 'modal-wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header>
          <div>
            <h2 id={titleId}>{title}</h2>
            {description && <p>{description}</p>}
          </div>
          <button className="icon-button" type="button" aria-label="Close dialog" onClick={onClose}>
            <X size={20} />
          </button>
        </header>
        {children}
      </section>
    </div>,
    document.body,
  );
}

export function ConfirmDialog({ title, description, busy, error, onConfirm, onClose }) {
  return (
    <Modal title={title} description={description} onClose={onClose}>
      <ErrorNotice error={error} />
      <div className="form-actions">
        <Button variant="secondary" onClick={onClose} disabled={busy}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} busy={busy}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}

export function Tabs({ items, value, onChange }) {
  return (
    <div className="tabs" role="tablist">
      {items.map((item) => (
        <button
          type="button"
          key={item.value}
          role="tab"
          aria-selected={item.value === value}
          className={value === item.value ? 'active' : ''}
          onClick={() => onChange(item.value)}
        >
          {item.label}
          {item.count != null && <span>{item.count}</span>}
        </button>
      ))}
    </div>
  );
}

export function Table({ columns, rows, rowKey = '_id', empty }) {
  if (!rows.length) return empty || <EmptyState />;
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[rowKey]}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render ? column.render(row) : (row[column.key] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SuccessNotice({ children }) {
  return (
    <div className="success-notice" role="status">
      <CheckCircle2 size={18} />
      {children}
    </div>
  );
}

export function TextLink({ to, children }) {
  return (
    <Link className="text-link" to={to}>
      {children}
      <ArrowRight size={16} />
    </Link>
  );
}
