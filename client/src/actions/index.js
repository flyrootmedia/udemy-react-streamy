import { 
    SIGN_IN, 
    SIGN_OUT, 
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from './types';
import streams from '../apis/streams';
import history from '../history';

// Call on successful sign in
export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

// Call on successful sign out
export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

// Call to create a new stream
export const createStream = formValues => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await streams.post('/streams', { ...formValues, userId });
    dispatch({ type: CREATE_STREAM, payload: response.data });

    // navigate to streams list on successful create
    history.push('/');
};

// Call to get a list of all streams
export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');
    dispatch({ type: FETCH_STREAMS, payload: response.data });
};

// Call to get a single stream
export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({ type: FETCH_STREAM, payload: response.data });
};

// Call to update a single stream
export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formValues);
    dispatch({ type: EDIT_STREAM, payload: response.data });

    // navigate to streams list on successful create
    history.push('/');
};

// Call to delete a single stream
export const deleteStream = (id) => async dispatch => {
    await streams.delete(`/streams/${id}`);
    dispatch({ type: DELETE_STREAM, payload: id });

    // navigate to streams list on successful create
    history.push('/');
}