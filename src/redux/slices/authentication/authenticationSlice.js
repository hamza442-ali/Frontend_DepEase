
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    username: '',
    password: '',
    email: '',
    // other attributes...
  }
  

  export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setUsername: (state, action) => {
        state.username = action.payload;
      },
      setPassword: (state, action) => {
        state.password = action.payload;
      },
      setEmail: (state, action) => {
        state.email = action.payload;
      },
      // add other reducers as needed...
    },
  });
  
  export const { setUsername, setPassword, setEmail } = authSlice.actions;
  export default authSlice.reducer;




  // this will be the part of when using it

//   import { useDispatch } from 'react-redux';
// import { setUsername, setPassword, setEmail } from './authSlice';

// function LoginForm() {
//   const dispatch = useDispatch();

//   const handleUsernameChange = (event) => {
//     dispatch(setUsername(event.target.value));
//   };

//   const handlePasswordChange = (event) => {
//     dispatch(setPassword(event.target.value));
//   };

//   const handleEmailChange = (event) => {
//     dispatch(setEmail(event.target.value));
//   };

//   // Render input fields and attach event handlers...
// }



// To access attribute values in your components, you can use the useSelector hook. For example, to access the username:


// import { useSelector } from 'react-redux';

// function DisplayUsername() {
//   const username = useSelector((state) => state.auth.username);
//   return <div>Username: {username}</div>;
// }
