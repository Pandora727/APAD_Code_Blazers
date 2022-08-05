import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Popup from './Popup';

const User = () => {

    // user setup
    const securityQs = [
        { label: 'What is your hometown city?', value: 'hometown' },
        { label: 'What is the name of your pet?', value: 'pet' },
        { label: 'What was your favorite sport in high school?', value: 'sport' },
        { label: 'What was the first exam you failed?', value: 'exam' }
    ];

    const [username, setUsename] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPW, setconfirmedPW] = useState('')
    const [securityA, setSecurityA] = useState('')
    const [securityQ, setSecurityQ] = useState('hometown')
    const [popup_open, setpopup_open] = useState(false)
    const [registerState, setRegisterstate] = useState(0)
    const navigate = useNavigate();

    const [existingUsername, setexistingUsername] = useState(0)


    const togglePopup = () => {
        setpopup_open(!popup_open);
        setRegisterstate(0);

    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("You click the submit button")

        if (username.trim() === '' || password.trim() === '' || confirmedPW.trim() === '' || securityA.trim() === '') {
            //Print error message
            setRegisterstate(1);
            setpopup_open(!popup_open);
        }

        // username
        else if ((!username > 3 && !username < 25)) {
            // popup -- "the username should be between 0 and 15 and should contain only upper and lowercase letters, numbers, and underscores "
            // toggle 
            setRegisterstate(2);
            setpopup_open(!popup_open);
        }

        // confirmedpw
        else if (confirmedPW !== password) {
            // popup -- "Passwords does not match. Please try again"
            setRegisterstate(4);
            setpopup_open(!popup_open);
        }

        // password
        else if (password.length < 6 || password.length >= 20) {
            // popup -- "the password should be between 6 and 20"
            setRegisterstate(3);
            setpopup_open(!popup_open);
        }


        // securityA
        else if (securityA.length <= 0 || securityA.length > 20) {
            // popup -- "The security answer should be between 0 and 20 characters"
            setRegisterstate(5);
            setpopup_open(!popup_open);
        }

        else {

            fetch('/signup', {
                method: ['POST'],
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({
                    "username": username,
                    "password": password,
                    "security_question": securityQ,
                    "security_answer": securityA,
                    "projects_access": []
                })
            })
                .then(response => response.json())
                .then(data => (data.state !== 0) ? [setpopup_open(!popup_open), setexistingUsername(1)] : navigate('/redirect'))
            setUsename('')
            setPassword('')
            setconfirmedPW('')
            setSecurityQ('')
            setSecurityA('')
        }

    }


    return (

        <form align="center">
            <title>SignUp</title>
            <div>
                <div className='container' >
                    <h2>Create your account</h2>
                    <br></br>
                    <label>Username:    </label>
                    <input name="username" value={username}
                        onChange={(e) => setUsename(e.target.value)
                        } required />
                    <br /><br />
                    <label>Password: </label>
                    <input type="password" name="password" value={password}
                        onChange={(e) => setPassword(e.target.value)} required />
                    <br /><br />
                    <label>Confirm Password: </label>
                    <input type="password" name="confirmedPW" value={confirmedPW}
                        onChange={(e) => setconfirmedPW(e.target.value)} required />
                    <br /><br />
                    <label>Select a Security Question:  </label>
                    <select value={securityQ} onChange={(e) => setSecurityQ(e.target.value)}>
                        {securityQs.map((securityQ) => (<option value={securityQ.value}>{securityQ.label}</option>))}
                    </select>
                    <br /><br />
                    <label>Security Answer:     </label>
                    <input name="securityA" value={securityA}
                        onChange={(e) => setSecurityA(e.target.value)} required />
                    <br /><br />
                    <button onClick={handleSubmit} type="submit" class="btn btn-primary"> Create  </button>
                    <br />
                    <Link to="/loginrequest" > Existing user? Login here</Link>
                </div>
                <br />

                {existingUsername === 1 && popup_open && <Popup content={
                    <>
                        <p>Username already existed. Try other names</p>

                    </>} handleClose={togglePopup} />}
                {registerState === 1 && popup_open && <Popup content={
                    <>
                        <p>* All fields are required</p>

                    </>} handleClose={togglePopup} />}

                {registerState === 2 && popup_open && <Popup
                    content={<>
                        <p> * Username should be between 3 and 25  </p>
                    </>} handleClose={togglePopup} />}


                {registerState === 3 && popup_open && <Popup
                    content={<>
                        <p> * Password should be between 6 and 20</p>
                    </>} handleClose={togglePopup} />}

                {registerState === 4 && popup_open && <Popup
                    content={<>
                        <p> * Passwords does not match. Please try again</p>
                    </>} handleClose={togglePopup} />}

                {registerState === 5 && popup_open && <Popup
                    content={<>
                        <p> * The security answer should be between 0 and 20 characters</p>
                    </>} handleClose={togglePopup} />}

            </div>
        </form>

    )
}
export default User