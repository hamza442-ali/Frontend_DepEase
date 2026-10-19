import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from './auth';
import { api, encode, list } from '../lib/api';

const WorkspaceContext = createContext(null);

export function WorkspaceProvider({ children }) {
  const { account, role } = useAuth();
  const [params, setParams] = useSearchParams();
  const storageKey = `depease.project.${account._id}`;
  const [selectedId, setSelectedId] = useState(() => localStorage.getItem(storageKey) || '');
  const query = useQuery({
    queryKey: ['workspace', role, account._id],
    queryFn: async ({ signal }) => {
      if (role !== 'student') {
        const path =
          role === 'admin'
            ? '/projects/getall'
            : `/projects/getallmine/${encode(account.employeeId)}`;
        return list((await api.get(path, { signal })).data);
      }
      let group;
      try {
        group = (await api.get(`/group/getone/${encode(account.registration_number)}`, { signal }))
          .data;
      } catch (error) {
        if (error.response?.status === 404) return [];
        throw error;
      }
      return list((await api.get(`/projects/getone/${encode(group._id)}`, { signal })).data);
    },
  });
  const projects = query.data || [];
  const requested = params.get('project');
  const matched = projects.find(
    (item) =>
      item._id === (requested || selectedId) || item.ProjectId === (requested || selectedId),
  );
  const project = requested ? matched || null : matched || projects[0] || null;

  function selectProject(id) {
    setSelectedId(id);
    localStorage.setItem(storageKey, id);
    if (params.has('project'))
      setParams(
        (previous) => {
          previous.set('project', id);
          return previous;
        },
        { replace: true },
      );
  }

  const projectId = project?._id;
  useEffect(() => {
    if (projectId) {
      setSelectedId(projectId);
      localStorage.setItem(storageKey, projectId);
    }
  }, [projectId, storageKey]);
  return (
    <WorkspaceContext.Provider value={{ projects, project, selectProject, query }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export const useWorkspace = () => useContext(WorkspaceContext);
