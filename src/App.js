import './App.css';
import User from './components/User';
import Home from './components/Home';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path="/signup" element={<User />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
