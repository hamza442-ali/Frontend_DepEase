// rootReducer.js
import { combineReducers } from 'redux';
import counterReducer from './slices/counter/counterSlice';
import darkModeReducer from './slices/theme/themeSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  darkMode: darkModeReducer,
});

export default rootReducer;
