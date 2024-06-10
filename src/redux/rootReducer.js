// rootReducer.js
import { combineReducers } from 'redux';
import teacherReducer from './slices/teacher/teacherSlice';


const rootReducer = combineReducers({
  teacher: teacherReducer,
});

export default rootReducer;
