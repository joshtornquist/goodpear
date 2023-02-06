import ReactDOM from 'react-dom/client';
import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Route, Routes } from 
'react-router-dom';
import { useState, useEffect } from 'react';
import "./Login.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, query, getDocs, docs, collectionId, listCollections } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

function Login() {
    return (
        <>
        <div className='logInContainer'>
            <form>
                <input className="loginInput" placeholder='Email'/>
                <input className="loginInput" placeholder='Password'/>
                <button type="submit">Submit</button>
            </form>

            <div className='valueProp'>Get access to unlimited pairings!</div>
            <div>Only $1.99 / month</div>
            <p>At Goodpear, we want to make pairing simple</p>
        </div>
        </>
    );
}


export default Login;