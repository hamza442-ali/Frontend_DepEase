import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectId: '',
  batch: '',
  semester: '',
  teacher: '',
  group: '',
  projectProposal: '',
};

const projectSlice = createSlice({
  name: 'project',
  initialState: initialState,
  reducers: {
    setProjectData: (state, action) => {
      // Merge the action payload with the current state to update the project data
      return { ...state, ...action.payload };
    },
  },
});

export const { setProjectData } = projectSlice.actions;
export default projectSlice.reducer;
