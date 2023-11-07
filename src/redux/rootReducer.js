// rootReducer.js
import { combineReducers } from 'redux';
import counterReducer from './slices/counter/counterSlice';
import darkModeReducer from './slices/theme/themeSlice';
import studentReducer from './slices/student/studentSlice';
import projectReducer from './slices/project/projectSlice';


const rootReducer = combineReducers({
  counter: counterReducer,
  darkMode: darkModeReducer,
  student: studentReducer,
  project: projectReducer,
});

export default rootReducer;
