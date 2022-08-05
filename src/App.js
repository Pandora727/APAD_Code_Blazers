import './App.css';
import User from './components/User';
import DirectBack from './components/DirectBack';
import Login from './components/Login';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <div className='content'>
          <Routes>
            <Route path='/' element={<Login />}/>
            <Route path='/loginrequest' element={<Login />}/>
            <Route path='/redirect' element={<DirectBack />} />
            <Route path="/signup" element={<User />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
