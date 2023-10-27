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

const studentSlice = createSlice({
  name: 'student',
  initialState: initialState, // Set the initial state with default values
  reducers: {
    setStudentData: (state, action) => {
      // Merge the action payload with the current state to update the student data
      return { ...state, ...action.payload };

    //   state.studentData = action.payload;
    },
  },
});

export const { setStudentData } = studentSlice.actions;
export default studentSlice.reducer;
