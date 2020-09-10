import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamEdit = ({ match, fetchStream, editStream, stream }) => {

    console.log('stream', stream);

    useEffect(() => {
        console.log('StreamEdit componentDidMount');
        // need to load the list of streams into state for full page refreshes,
        // or "stream" will be undefined
        fetchStream(match.params.id);
    },[fetchStream, match.params.id]);

    const onSubmit = (formValues) => {
        console.log('Edited stream with formValues:', formValues);
        editStream(match.params.id, formValues);
    };

    if (!stream) {
        return (
            <div>Loading...</div>
        );
    }

    // "initialValues" is a property specific to redux-form
    // pass an object and the properties must match the "name" attributes
    // of the fields in the form in order for it to grab the values
    // NOTE: only pass in the properties you are trying to change so that you 
    // don't pass immutable properties to the "put" request (e.g. ID)
    // using _.pick from lodash for this case
    return (
        <div>
            <h1>Edit "{stream.title}"</h1>
            <StreamForm 
                initialValues={_.pick(stream, 'title', 'description')}
                onSubmit={onSubmit} 
            />
        </div>
    );
};

// ownProps.match.params.id comes from the react router props 
const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id]}
};

export default connect(
    mapStateToProps,
    { 
        fetchStream,
        editStream
    }
)(StreamEdit);