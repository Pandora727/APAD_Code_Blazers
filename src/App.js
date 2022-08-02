import ExistProject from './components/ExistProject';
import Create_Project from './components/Create_Project';
import Hardware_Management from './components/Hardware_Management';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (  
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
          <Route exact path="/" element={<ExistProject/>} />
          <Route path="/home/create_new_project" element={<Create_Project/>} />
          <Route path="/home/hardware_management_page" element={<Hardware_Management />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


