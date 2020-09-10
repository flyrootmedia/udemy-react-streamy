import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import GoogleAuth from './GoogleAuth';

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">
                Streamer
            </Link>

            <div className="right menu">
                <NavLink exact to="/" className="item">
                    All Streams
                </NavLink>

                <GoogleAuth />

            </div>
        </div>
    );
};

export default Header;