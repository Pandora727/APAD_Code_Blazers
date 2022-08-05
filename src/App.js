import ExistProject from './components/ExistProject';
import Create_Project from './components/Create_Project';
import Hardware_Management from './components/Hardware_Management';
import Navbar from './components/Navbar';
import Home from './components/Home';
import User from './components/User';
import Login from './components/Login';
import DirectBack from './components/DirectBack';

import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (  
    <Router>
      <div className="App">
      <Navbar />
        <div className="content">
          <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/loginrequest' element={<Login />}/>
          <Route path="/signup" element={<User />}/>
          <Route exact path="/projects" element={<ExistProject/>} />
          <Route path="/projects/create_new_project" element={<Create_Project/>} />
          <Route path="/projects/hardware_management_page" element={<Hardware_Management />} />
          <Route path="/home/" element={<ExistProject/>} />
          <Route path='/redirect' element={<DirectBack />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


