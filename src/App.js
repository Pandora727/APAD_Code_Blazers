import './App.css';
import React, { useState } from 'react';
function App() {
  const [count, setCount] = useState(0)
  const [fruit, setFruit] = useState(0)
  function handleClick() {

    const requestOptions = {
      method: 'GET'
    }
    fetch('/api/getter', requestOptions)
      .then(response => response.json())
      .then(data => setFruit(data.data_from_backend))

  
}


  return (
    <div className="App">
      <p>response:</p>
      <p>how much fruit:{fruit}</p>
      <button onClick={handleClick}>click to get</button>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>click</button>
      <form>
        <label>
          username: 
          <input type="text" name="name"></input>
        </label>
      </form>

    </div>
  );
}

export default App;
