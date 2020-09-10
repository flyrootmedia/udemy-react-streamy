import React, { useCallback } from 'react';
import { Field, reduxForm } from 'redux-form';

const StreamForm = ({ onSubmit, handleSubmit }) => {

    const renderError = ({ error, touched }) => {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    };

    // I put this in a useCallback because otherwise it was running twice for each component on the 
    // initial render, and was causing a weird issue where after typing one character the field
    // would lose focus. Note that the course has StreamCreate in a class based component so things 
    // were getting called a bit differently.
    const renderInput = useCallback(({ input, label, meta }) => {
        // whenever you add a prop to the Field component, it gets passed back to the
        // "component" prop so you can destructure it and use it here
        return (
            // <input 
            //     onChange={formProps.input.onChange}
            //     value={formProps.input.value}
            // />
            // this syntax takes all the formProps.input props and passes them
            // (input was destructured from formProps)
            <div className={`field ${meta.error && meta.touched ? 'error' : ''}`}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {renderError(meta)}
            </div>
        );
    }, []);

    // const onSubmit = (formValues) => {
    //     console.log('Created new stream with formValues:', formValues);
    //     onSubmit(formValues);
    // };

    return (
        // handleSubmit comes from redux form props. pass it your callback
        // (it handles the preventDefault part)
        <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="ui form error"
        >
            <Field 
                name="title"
                component={renderInput}
                label="Enter Title"
            />

            <Field
                name="description"
                component={renderInput}
                label="Enter Description"
            />

            <button className="ui button primary">Submit</button>
        </form>
    );
};

const validate = (formValues) => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'You must enter a title.';
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description.';
    }

    return errors;
};

// wire up with Redux Form
export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm);