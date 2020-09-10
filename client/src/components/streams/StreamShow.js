import React, { useEffect, useRef, useCallback } from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';


const StreamShow = ({ fetchStream, match, stream }) => {

    const videoEl = useRef();
    // if using a class component:
    // this.videoEl = React.createRef();

    const buildPlayer = useCallback((id, stream, currentVideoEl) => {
        if ((currentVideoEl && currentVideoEl.flvPlayer) || !stream) {
            return;
        }

        currentVideoEl.flvPlayer = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });

        currentVideoEl.flvPlayer.attachMediaElement(currentVideoEl);
        currentVideoEl.flvPlayer.load();
    }, []);

    // NOTE: using separate effects here because need to make sure we only call fetchStream once.
    // if I combined the buildPlayer call into the same effect and passed it the "stream" dependency,
    // it got into an endless loop because stream would update and it would then keep calling fetchStream, 
    // which would cause it to update again (at least I believe that's what was happening)

    // componentDidMount
    useEffect(() => {
        const { id } = match.params;
        fetchStream(id);
    }, [fetchStream, match.params]);

    // componentDidUpdate
    useEffect(() => {
        const { id } = match.params;
        let currentVideoEl = videoEl.current;

        buildPlayer(id, stream, currentVideoEl);

        return () => {
            if (currentVideoEl && currentVideoEl.flvPlayer) {
                currentVideoEl.flvPlayer.destroy();

                // this is another slight departure from the course which may be a quirk of using functional 
                // components and useEffect. Even after calling the destroy() method, the flvPlayer was 
                // still defined on the current ref, so it wouldn't get re-built after a cleanup when you'd 
                // navigate to the stream from the list page (it WOULD work if you refreshed the stream page)
                currentVideoEl.flvPlayer = undefined;
            }
        };
    },[match.params, buildPlayer, stream]);

    if (!stream) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <div>
            <video 
                ref={videoEl}
                style={{ width: '100%' }}
                controls
            />
            <h1>{stream.title}</h1>
            <h5>{stream.description}</h5>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
};

export default connect(
    mapStateToProps,
    { fetchStream }
)(StreamShow);