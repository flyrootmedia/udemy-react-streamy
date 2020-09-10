import React, { useEffect } from 'react';
import Modal from '../Modal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions';
import history from '../../history';

const StreamDelete = ({ match, fetchStream, deleteStream, stream }) => {

    useEffect(() => {
        console.log('StreamDelete componentDidMount');
        // need to load the list of streams into state for full page refreshes,
        // or "stream" will be undefined
        fetchStream(match.params.id);
    },[fetchStream, match.params.id]);

    const renderedActions = (
        <React.Fragment>
            <button 
                onClick={() => deleteStream(match.params.id)} 
                className="ui button negative">
                    Delete
            </button>

            <Link to="/" className="ui button">
                Cancel
            </Link>
        </React.Fragment>
    );

    const renderContent = () => {
        if (!stream) {
            return 'Are you sure you want to delete this stream?'
        }

        return `Are you sure you want to delete "${stream.title}"?`
    };

    return (
        <Modal 
            title="Delete Stream"
            content={renderContent()}
            actions={renderedActions} 
            onDismiss={() => history.push('/')}
        />
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
        deleteStream
    }
) (StreamDelete);