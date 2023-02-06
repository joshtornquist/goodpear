import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 
'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Homepage from './components/Homepage';
import Results from './components/Results';
import MyApp from './components/test';
import Navbar from './components/Navbar';
import Login from './components/Login';



function App() {
  return (
    <>
    <Router>
    <Navbar/> 
      <Routes>
      <Route exact path='/' element={<Homepage/>}/>
      <Route path='/home' element={<Homepage/>}/>
      <Route path='/pairings' element={<Results/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/test' element={<MyApp/>}/>
      </Routes>
      </Router>
     </> 

  );
}

export default App;
