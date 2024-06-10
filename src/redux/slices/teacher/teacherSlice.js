import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  employeeId: '',
  Designation:'',
  email: '',
  mobile:'',
  isSelected:false,
  profilePicture: '',
  passoword:''
};



const teacherSlice = createSlice({
  name: 'teacher',
  initialState: initialState, // Set the initial state with default values
  reducers: {
    setTeacherData: (state, action) => {
      // Merge the action payload with the current state to update the student data
      return { ...state, ...action.payload };
    },
    
    resetTeacherData: () => {
      return initialState;
    }
  },
  
});

export const { setTeacherData,resetTeacherData } = teacherSlice.actions;
export default teacherSlice.reducer;
