import { useState } from 'react';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import { api, encode, list, useAction, useData } from '../lib/api';
import { dateLabel, textValue } from '../lib/format';
import {
  Button,
  ConfirmDialog,
  EmptyState,
  ErrorNotice,
  Field,
  Modal,
  PageHeader,
  QueryState,
  SearchBox,
  SelectField,
  Table,
} from './ui';

function initialValue(field, record) {
  const value = record?.[field.key] ?? field.default ?? '';
  if (field.type === 'lines') return Array.isArray(value) ? value.join('\n') : value;
  if (field.type === 'date') return value ? String(value).slice(0, 10) : '';
  if (field.type === 'datetime-local') {
    const date = new Date(value);
    return value && !Number.isNaN(date.getTime())
      ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
      : '';
  }
  return value;
}

export function EntityForm({
  title,
  fields,
  record,
  onClose,
  onSave,
  submitLabel = 'Save changes',
}) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(fields.map((field) => [field.key, initialValue(field, record)])),
  );
  const [validation, setValidation] = useState(null);
  const save = useAction(onSave);
  async function submit(event) {
    event.preventDefault();
    setValidation(null);
    const payload = {};
    for (const field of fields) {
      const value = values[field.key];
      if (
        field.required !== false &&
        (value === '' || (typeof value === 'string' && !value.trim()))
      ) {
        setValidation(new Error(`${field.label} is required.`));
        return;
      }
      payload[field.key] =
        field.type === 'number'
          ? value === ''
            ? undefined
            : Number(value)
          : field.type === 'lines'
            ? String(value)
                .split('\n')
                .map((line) => line.trim())
                .filter(Boolean)
            : value;
    }
    try {
      await save.mutateAsync(payload);
      onClose();
    } catch {
      /* Show the mutation error without clearing the form. */
    }
  }
  const close = () => {
    if (!save.isPending) onClose();
  };
  return (
    <Modal
      title={title}
      description="Fields marked with * are required."
      onClose={close}
      wide={fields.length > 6}
    >
      <form onSubmit={submit}>
        <div className="form-grid">
          {fields.map((field) => {
            const props = {
              value: values[field.key],
              onChange: (event) => setValues({ ...values, [field.key]: event.target.value }),
              required: field.required !== false,
              disabled: save.isPending,
              autoComplete: field.autoComplete || 'off',
            };
            return (
              <div
                key={field.key}
                className={field.type === 'textarea' || field.type === 'lines' ? 'full-width' : ''}
              >
                {field.type === 'select' ? (
                  <SelectField label={field.label} options={field.options || []} {...props} />
                ) : (
                  <Field
                    label={field.label}
                    type={field.type === 'lines' ? 'textarea' : field.type || 'text'}
                    min={field.min}
                    max={field.max}
                    minLength={field.minLength}
                    maxLength={field.maxLength || 10000}
                    step={field.step}
                    hint={field.hint}
                    {...props}
                  />
                )}
              </div>
            );
          })}
        </div>
        <ErrorNotice error={validation || save.error} />
        <div className="form-actions">
          <Button variant="secondary" onClick={close} disabled={save.isPending}>
            Cancel
          </Button>
          <Button type="submit" busy={save.isPending}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export function RecordDetails({ title, record, fields, onClose }) {
  return (
    <Modal title={title} onClose={onClose}>
      <dl className="details-list">
        {fields.map((field) => (
          <div key={field.key}>
            <dt>{field.label}</dt>
            <dd>
              {field.type === 'date'
                ? dateLabel(record[field.key], { year: 'numeric' })
                : textValue(record[field.key])}
            </dd>
          </div>
        ))}
      </dl>
    </Modal>
  );
}

export function ResourcePage({
  title,
  description,
  eyebrow = 'Workspace',
  url,
  fields,
  detailFields = fields,
  columns,
  createUrl,
  updateUrl,
  deleteUrl,
  makePayload = (data) => data,
  idKey = '_id',
  canCreate = true,
  canEdit = true,
  canDelete = true,
  extraActions,
  headerAction,
  getRows = list,
  showHeading = true,
}) {
  const query = useData(url);
  const [search, setSearch] = useState('');
  const [editor, setEditor] = useState(null);
  const [details, setDetails] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const remove = useAction((record) =>
    api.delete(
      typeof deleteUrl === 'function' ? deleteUrl(record) : `${deleteUrl}/${encode(record[idKey])}`,
    ),
  );
  const rows = getRows(query.data).filter(
    (record) =>
      !search ||
      columns.some((column) =>
        String(record[column.key] ?? '')
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
  );
  const actions = (
    <>
      {headerAction}
      {canCreate && createUrl && (
        <Button onClick={() => setEditor({})}>
          <Plus size={17} />
          Add {title.toLowerCase().replace(/ies$/, 'y').replace(/s$/, '')}
        </Button>
      )}
    </>
  );
  const tableColumns = [
    ...columns,
    {
      key: '_actions',
      label: 'Actions',
      render: (record) => (
        <div className="row-actions">
          {extraActions?.(record)}
          <button
            className="icon-button"
            aria-label={`View ${title.toLowerCase()} details`}
            onClick={() => setDetails(record)}
          >
            <Eye size={16} />
          </button>
          {canEdit && updateUrl && (
            <button
              className="icon-button"
              aria-label="Edit record"
              onClick={() => setEditor(record)}
            >
              <Pencil size={16} />
            </button>
          )}
          {canDelete && deleteUrl && (
            <button
              className="icon-button text-danger"
              aria-label="Delete record"
              onClick={() => {
                remove.reset();
                setDeleting(record);
              }}
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      ),
    },
  ];
  async function save(data) {
    const payload = makePayload(data, editor);
    if (editor._id && updateUrl)
      return api.put(
        typeof updateUrl === 'function'
          ? updateUrl(editor)
          : `${updateUrl}/${encode(editor[idKey])}`,
        payload,
      );
    return api.post(createUrl, payload);
  }
  return (
    <>
      {showHeading && (
        <PageHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          action={<div className="heading-actions">{actions}</div>}
        />
      )}
      <section className="panel">
        <div className="panel-toolbar">
          <div>
            <h2>{title}</h2>
            <span className="muted">{query.data ? getRows(query.data).length : '—'} records</span>
          </div>
          <SearchBox
            value={search}
            onChange={setSearch}
            placeholder={`Search ${title.toLowerCase()}…`}
          />
          {!showHeading && <div className="heading-actions">{actions}</div>}
        </div>
        <QueryState query={query}>
          <Table
            columns={tableColumns}
            rows={rows}
            empty={
              <EmptyState
                title={search ? 'No matching results' : `No ${title.toLowerCase()} yet`}
                description={search ? 'Try a different search.' : 'New records will appear here.'}
              />
            }
          />
        </QueryState>
      </section>
      {editor && (
        <EntityForm
          key={editor._id || 'new'}
          title={editor._id ? `Edit ${title.toLowerCase()}` : `Add ${title.toLowerCase()}`}
          fields={fields.filter((field) => !editor._id || !field.createOnly)}
          record={editor}
          onClose={() => setEditor(null)}
          onSave={save}
          submitLabel={editor._id ? 'Save changes' : 'Create'}
        />
      )}
      {details && (
        <RecordDetails
          title={`${title} details`}
          fields={detailFields.filter((field) => field.type !== 'password')}
          record={details}
          onClose={() => setDetails(null)}
        />
      )}
      {deleting && (
        <ConfirmDialog
          title="Delete this record?"
          description="This action cannot be undone."
          busy={remove.isPending}
          error={remove.error}
          onClose={() => {
            if (!remove.isPending) setDeleting(null);
          }}
          onConfirm={async () => {
            try {
              await remove.mutateAsync(deleting);
              setDeleting(null);
            } catch {
              /* Keep confirmation open on failure. */
            }
          }}
        />
      )}
    </>
  );
}
