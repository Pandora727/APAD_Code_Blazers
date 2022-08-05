import './App.css';
import User from './components/User';
// import Home from './components/Home';
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
            <Route path="/signup" element={<User />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
