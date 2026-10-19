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
    const profile = response.data.student || response.data.teacher;
    // Persist only the fields the workspace displays, never credentials returned by a server.
    const account =
      profile &&
      Object.fromEntries(
        [
          '_id',
          'student_name',
          'registration_number',
          'email_address',
          'phone_number',
          'department',
          'batch',
          'semester',
          'name',
          'employeeId',
          'email',
          'mobile',
          'Designation',
          'profilePicture',
        ]
          .filter((key) => profile[key] !== undefined)
          .map((key) => [key, profile[key]]),
      );
    const next = { token: response.data.token, role: response.data.role, account };
    if (!account?._id || !next.token || !['student', 'teacher', 'admin'].includes(next.role))
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
