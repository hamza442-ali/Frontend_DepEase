import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { readSession, saveSession, SESSION_KEY } from '../lib/session';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession);
  const [expired, setExpired] = useState(false);
  const client = useQueryClient();

  const logout = useCallback(
    (isExpired = false) => {
      saveSession(null);
      setSession(null);
      setExpired(isExpired);
      client.clear();
    },
    [client],
  );

  useEffect(() => {
    const expire = () => logout(true);
    const sync = (event) => {
      if (event.key !== null && event.key !== SESSION_KEY) return;
      setSession(readSession());
      client.clear();
    };
    window.addEventListener('depease:session-expired', expire);
    window.addEventListener('storage', sync);
    const timer = window.setInterval(() => {
      if (session && !readSession()) expire();
    }, 30000);
    return () => {
      window.removeEventListener('depease:session-expired', expire);
      window.removeEventListener('storage', sync);
      window.clearInterval(timer);
    };
  }, [session, client, logout]);

  async function login(kind, email, password) {
    const response = await api.post(
      kind === 'student' ? '/login' : '/loginT',
      kind === 'student' ? { email_address: email, password } : { email, password },
    );
    const account = response.data.student || response.data.teacher;
    const next = { token: response.data.token, role: response.data.role, account };
    if (!account || !['student', 'teacher', 'admin'].includes(next.role))
      throw new Error('The server returned an invalid session.');
    client.clear();
    saveSession(next);
    setSession(next);
    setExpired(false);
  }

  const value = { session, account: session?.account, role: session?.role, login, logout, expired };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
