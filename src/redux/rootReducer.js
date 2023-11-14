// rootReducer.js
import { combineReducers } from 'redux';
import counterReducer from './slices/counter/counterSlice';
import darkModeReducer from './slices/theme/themeSlice';
import studentReducer from './slices/student/studentSlice';
import projectReducer from './slices/project/projectSlice';
import groupReducer from './slices/group/groupSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  darkMode: darkModeReducer,
  student: studentReducer,
  project: projectReducer,
  group: groupReducer,
});

export default rootReducer;
