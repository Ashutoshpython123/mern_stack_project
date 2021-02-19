import React, { useState, useContext } from 'react'
import { GlobalState } from './GlobalState'
import { Link } from 'react-router-dom'

import './Header.css';

function Header() {
    const value = useContext(GlobalState)
    return (
        <div className="header">
            <Link to="/Dashboard"><h2 className="header__brand">Ashutosh</h2></Link>

            <div className="header__nav">
                <Link to="/Login"><span className="header__login">Sign In</span></Link>
                <Link to="/"><span className="header__register">Sign Up</span></Link>
            </div>
        </div>
    )
}

export default Header
