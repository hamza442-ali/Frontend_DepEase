import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    student_name: '',
    email_address: '',
    phone_number: '',
    batch: '',
    semester: '',
    registration_number: '',
    isTeamLead: false,
    password: '',
    isSelected: false,
 
};

const groupSlice = createSlice({
  name: 'group',
  initialState: initialState, // Set the initial state with default values
  reducers: {
    setGroupData: (state, action) => {
      // Merge the action payload with the current state to update the student data
      return { ...state, ...action.payload };
    },
  },
});

export const { setGroupData } = groupSlice.actions;
export default groupSlice.reducer;
