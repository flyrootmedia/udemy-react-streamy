import React, { useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

const GoogleAuth = ({ signIn, signOut, isSignedIn }) => {
    const authEl = useRef();

    const onAuthChange = useCallback((isSignedIn) => {
        // these are the redux action creators, not the gapi methods
        if (isSignedIn) {
            // this arg is the gapi method to get the current user's google ID
            signIn(authEl.current.auth.currentUser.get().getId());
        } else {
            signOut();
        }
    }, [signIn, signOut]);

    // componentDidMount
    useEffect(() => {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '380480394925-e311pquuklp4vj7id4r90gi9p2q9jg8e.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                // assign the google auth instance to the current component ref
                authEl.current.auth = window.gapi.auth2.getAuthInstance();

                // immediately set the current signed in state
                onAuthChange(authEl.current.auth.isSignedIn.get());

                // wait for the gapi listen callback to update the signed in status
                authEl.current.auth.isSignedIn.listen(onAuthChange);
            });
        });
    },[onAuthChange]);

    const onSignInClick = () => {
        // call the signIn method of the gapi
        authEl.current.auth.signIn();
    };

    const onSignOutClick = () => {
        // call the signOut method of the gapi
        authEl.current.auth.signOut();
    };

    const renderAuthButton = () => {
        if (isSignedIn === null) {
            return null;
        } else if (isSignedIn) {
            return (
                <button 
                    type="button" 
                    className="ui red google button"
                    onClick={onSignOutClick}
                >
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button 
                    type="button" 
                    className="ui red google button"
                    onClick={onSignInClick}
                >
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
    };

    return (
        <div ref={authEl}>
            {renderAuthButton()}
        </div>
    );
};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
};

export default connect(
    mapStateToProps, 
    { signIn, signOut }
)
(GoogleAuth);