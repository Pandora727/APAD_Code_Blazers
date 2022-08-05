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


    const togglePopup = () => {
        setpopup_open(!popup_open);
        setRegisterstate(0);

    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("You click the submit button")
        
        // username
        if ((!username > 3 && !username < 25)) {
            // popup -- "the username should be between 0 and 15 and should contain only upper and lowercase letters, numbers, and underscores "
            // toggle 
            setRegisterstate(1);
            setpopup_open(!popup_open);
        }

        // password
        if (!password.length >= 6 && !password.length <= 20) {
            // popup -- "the password should be between "
            setRegisterstate(1);
            setpopup_open(!popup_open);
        }

        // confirmedpw
        if (confirmedPW !== password) {
            // popup -- "Passwords does not match. Please try again"
            setRegisterstate(1);
            setpopup_open(!popup_open);
        }

        // securityA
        if (!securityA.length > 0 && !securityA.length < 20) {
            // popup -- "The security answer should be between 0 and 20 characters"
            setRegisterstate(1);
            setpopup_open(!popup_open);
        }

        if (registerState === 0) {
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
                .then(data => (data.state !== 0) ? setpopup_open(!popup_open) : navigate('/loginrequest') )
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
            <h2>Create your account</h2>
            <div>
                <div className='container' >
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
                    <br/>
                    <Link to="/loginrequest" > Existing user? Login here</Link> 
                </div>
                <br />

                {registerState === 1 && popup_open && <Popup content={
                    <>
                        <p>* All fields are required</p>
                        <p>The username should be between 0 and 15 and should contain only upper and lowercase letters, numbers, and underscores</p>
                        <p>The password should be between 6 and 20 and should contain at least one uppercase letter, one number, and one symbol</p>
                        <p>* Please make sure your passwords match</p>
                    </>} handleClose={togglePopup} />}
            </div>
        </form>

    )
}

export default User