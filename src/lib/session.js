export const SESSION_KEY = 'depease.session.v1';
const ROLES = ['student', 'teacher', 'admin'];

export function readSession() {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY));
    if (!session?.token || !session.account || !ROLES.includes(session.role)) return null;
    const part = session.token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const claims = JSON.parse(atob(part.padEnd(Math.ceil(part.length / 4) * 4, '=')));
    if (!claims.exp || claims.exp * 1000 <= Date.now() || claims.role !== session.role) return null;
    return session;
  } catch {
    return null;
  }
}

export function saveSession(session) {
  if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  else localStorage.removeItem(SESSION_KEY);
  // Remove the old applications' separate token and persisted account state.
  localStorage.removeItem('token');
  localStorage.removeItem('persist:root');
}
