import React, { useState} from 'react';
import Popup from './Popup';
import {useNavigate, Link } from 'react-router-dom';


function Login() {
    const [inputName, setinputName] = useState('');
    const [inputPass, setinputPass] = useState('');
    const [popup_open, setpopup_open] = useState(false);
    const [request_state, setRequest] = useState(0);
    const navigate = useNavigate();



    const togglePopup = () => {
        setpopup_open(!popup_open);
        setRequest(0);

    }

    //Function to handle submitting the textbox
    function handleLogin(event) {
        //To prevent the infinite loop error
        event.preventDefault();
        // var user = inputName.current.value
        // var pass = inputPass.current.value

        //Input Validation, prevent proceed if both fields are not filled out
        if (inputName === '' || inputPass === '') {
            //Print error message
            setRequest(1);
            setpopup_open(!popup_open);
        }

        else {
            console.log("reach here")
            //Send to login request to backend
            fetch('/loginrequest',
                {
                    method: ['POST'],
                    headers:
                    {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ "username": inputName, "password": inputPass })
                }
            )
                .then(response => response.json())

                // TODO: CHANGE THE NAVIGATE TO EXISTING PROJECT
                .then(data => (data.state !== 0) ? [setpopup_open(!popup_open), setRequest(data.state)] : navigate('/projects', {replace:true, state:{'username': inputName}}))
        }

    }

    return (
        <div className="container">
            <header >
                <form onSubmit={handleLogin}>
                    <h1>Welcome!</h1>
                    <h3>Code_Blazers</h3>
                    <br></br>
                    <h4>Existing User Login </h4>
                    Username:
                    <br></br>
                    <input type="text" value={inputName} onChange={(e) => setinputName(e.target.value)}/>
                    <br></br>
                    Password:
                    <br></br>
                    <input type="Password" value={inputPass} onChange={(e) => setinputPass(e.target.value)} />
                    <br></br>
                    <Link to="/signup" > New User? Sign up </Link>
                    <br />
                    <button type="submit" class="btn btn-primary"> Login </button>
                    {request_state === 1 && popup_open && <Popup
                        content={<>
                            <p>Please fill out both the username and password </p>
                        </>} handleClose={togglePopup} />}
                    {request_state === 2 && popup_open && <Popup
                        content={<>
                            <p> Incorrect password </p>
                        </>} handleClose={togglePopup} />}

                    {request_state === 3 && popup_open && <Popup
                        content={<>
                            <p> UserID doesn't exist </p>
                        </>} handleClose={togglePopup} />}

                </form>
                <p>

                </p>
            </header>
        </div>
    );
}
export default Login;