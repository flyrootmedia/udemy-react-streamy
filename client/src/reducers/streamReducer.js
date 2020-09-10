import _ from 'lodash';
import {
    FETCH_STREAM,
    FETCH_STREAMS,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from '../actions/types';

// for this example, we're returning an object for the stream state instead of an array
export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            // using mapKeys from lodash. SEE notes > Dev Stuff > Lodash for example
            // note we're spreading both in order to add all the new keys from mapKeys into state
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_STREAM:
            // the "[action.payload.id]" syntax below is "key interpolation"
            // this compact statement is the same as getting the payload from state at
            // the key of action.payload.id and assigning the value of action.payload
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            // note the action creator for deleteStream dispatches just the id in the payload,
            // not the entire stream object, so that's why the key we're passing here is simply
            // action.payload. using _.omit from lodash rather than just setting the key to a null value
            return _.omit(state, [action.payload]);
        default:
            return state;
    }
}