export const STATUS_OPTIONS = ['Pending', 'In Progress', 'Completed'];
export const PRIORITY_OPTIONS = ['Low', 'Medium', 'High'];

export function dateLabel(value, options = {}) {
  if (!value || Number.isNaN(new Date(value).getTime())) return 'No date set';
  return new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short', ...options }).format(
    new Date(value),
  );
}

export function statusCategory(value) {
  const status = String(value || '')
    .toLowerCase()
    .replace(/[-_]/g, ' ');
  if (['done', 'complete', 'completed', 'approved', 'success'].includes(status)) return 'success';
  if (['in progress', 'inprogress', 'running', 'active'].includes(status)) return 'info';
  if (['rejected', 'failed', 'high', 'overdue'].includes(status)) return 'danger';
  return 'warning';
}

export function initials(value = '') {
  return (
    value
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join('')
      .toUpperCase() || 'D'
  );
}

export function safeUrl(value) {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

export function textValue(value) {
  if (value == null || value === '') return '—';
  if (Array.isArray(value))
    return value
      .map((item) =>
        typeof item === 'object'
          ? item.name || item.student_name || item.content || 'Assigned member'
          : item,
      )
      .join(', ');
  return typeof value === 'object' ? value.name || value.title || '—' : String(value);
}
