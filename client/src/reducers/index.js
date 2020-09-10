import { combineReducers } from 'redux';
// wire up the redux-form library reducer (in the library it's called generic "reducer" so may want to rename)
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';


// reminder: these property names are the names of the state properties
export default combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamReducer
});