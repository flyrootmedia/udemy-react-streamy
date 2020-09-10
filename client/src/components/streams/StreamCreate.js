import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamCreate = ({ createStream }) => {

    const onSubmit = (formValues) => {
        console.log('Created new stream with formValues:', formValues);
        createStream(formValues);
    };

    return (
        <div>
            <h1>Create a Stream</h1>
            <StreamForm onSubmit={onSubmit} />
        </div>
    );
};

// refactored to extract form to its own reusable component. See below for previous states
// where we had to wrap up the export in reduxForm
export default connect(
    null,
    { createStream }
)(StreamCreate);

// wire up reduxForm to the component, which will then pass a bunch of props by default,
// along with connect

// export default reduxForm({
//     form: 'streamCreate',
//     validate: validate
// })(StreamCreate);

// const formWrapped = reduxForm({
//     form: 'streamCreate',
//     validate: validate
// })(StreamCreate);

// export default connect(
//     null,
//     { createStream }
// )(formWrapped);