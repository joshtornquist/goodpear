import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import logo from './images/real-logo.png';
import './Navbar.css';


function Navbar() {
    


    return (
        <>
        <nav className="navbar">
            <Link to="/home" className="navbar-logo">
            <img alt="logo" className="navbar-logo" src={logo} />
            </Link>

            {/* <Link to="/login">
            <button className='logInButton'>Upgrade</button>
            </Link> */}

            


        </nav>
        </>  
        
    )
}

export default Navbar
