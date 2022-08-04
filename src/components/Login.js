import React, {useState, useRef} from 'react';
import Popup from './Popup';
import {useNavigate} from 'react-router-dom';


function Login() {
  const inputName = useRef(null)
  const inputPass = useRef(null)
  const [popup_open, setpopup_open]  = useState(false);
  const [request_state, setRequest] = useState(0);

  //Function to handle submitting the textbox
  function handleLogin(event)
  {
	//To prevent the infinite loop error
    event.preventDefault();
    var user=inputName.current.value
	var pass=inputPass.current.value
	
	//Input Validation, prevent proceed if both fields are not filled out
	if (user === '' || pass === '')
	{
		//Print error message
		setStatevar(request_state + 1);
		setpopup_open(!popup_open);
	}

	if (request_state === 0)
	{
		//Send to login request to backend
		fetch('/loginrequest',
		{'method' : 'POST',
		  headers:
		  {
			'Content-Type':'application/json',
			'Accept':'application/json'
		  },
		//body: JSON.stringify("user_Name": user,"pass_Word": pass)
		}
		)
		.then(response => response.json())
		
		//If failure then respond with error message
		//.then(response => setLastName(response['correct']))
		
		//Success go to next page
		//.then(data => (data.state !==0) ? setpopup_open(!popup_open): navigate('/home'))
	}
	
  }

  return (
    <div className="App">
      <header className="App-header">
    <form onSubmit={handleLogin}>
      <p>
        Login:
      </p>
		Username:
		<br></br>
      <input type="text" ref={inputName} />
	  <br></br>
	  Password:
		<br></br>
	  <input type="Password" ref={inputPass} />
	  <br></br>
      <button type="submit"> Submit </button>
	  {request_state === 0 && popup_open &&<Popup
        content={<>
          <p> Please fill out both the username and password </p>
        </>}
    </form>
    <p>
        
      </p>
      </header>
    </div>
  );
}
export default Login;









