// rootReducer.js
import { combineReducers } from 'redux';
import studentReducer from './slices/student/studentSlice';
import projectReducer from './slices/project/projectSlice';
import groupReducer from './slices/group/groupSlice';

const rootReducer = combineReducers({
  student: studentReducer,
  project: projectReducer,
  group: groupReducer,
});

export default rootReducer;
