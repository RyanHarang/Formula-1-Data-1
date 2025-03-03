import { combineReducers } from 'redux';
import  authReducer  from './auth/authReducer.js';
import  userReducer  from './user/userReducer.js';

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
    // Add more reducers here as needed
    auth: authReducer,
    user: userReducer
});

export default rootReducer;