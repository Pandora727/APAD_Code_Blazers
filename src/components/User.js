import React, { useState } from 'react'

const User = () => {
    // user setup
    const securityQs = [
        { label: 'What is your hometown city?', value: 'hometown' },
        { label: 'What is the name of your pet?', value: 'pet' },
        { label: 'What was your favorite sport in high school?', value: 'sport' },
        { label: 'What was the first exam you failed?', value: 'exam' }
    ];

    const [username, setUsename] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPW, setconfirmedPW] = useState('')
    const [securityA, setSecurityA] = useState('')
    const [securityQ, setSecurityQ] = useState('hometown');

    function handleSubmit(e) {
        e.preventDefault();
        console.log("You click the submit button")

    }

    return (

        <form align="center">
            <title>SignUp</title>
            <h2>Create your account</h2>
            <br />
            <br />
            <div>
                <div className='LeftForm' style={{paddingRight: '400px'}}>
                    <label>Username:    </label>
                    <input name="username" value={username}
                        onChange={(e) => setUsename(e.target.value)} required/>
                    <br /><br />
                    <label>Email:     </label>
                    <input type="email" name="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} required/>
                    <br /><br />
                    <label>Password: </label>
                    <input type="password" name="password" value={password}
                        onChange={(e) => setPassword(e.target.value)} required/>
                </div>

                <div className='RightForm' style={{paddingLeft: '100px'}}>
                    <label>Select a Security Question:  </label>
                    <select value={securityQ} onChange={(e) => setSecurityQ(e.target.value)}>
                        {securityQs.map((securityQ) => (<option value={securityQ.value}>{securityQ.label}</option>))}
                    </select>
                    <br /><br />
                    <label>Security Answer:     </label>
                    <input name="securityA" value={securityA}
                        onChange={(e) => setSecurityA(e.target.value)} required/>
                    <br /><br />
                    <label>     Confirm Password: </label>
                    <input type="password" name="confirmedPW" value={confirmedPW}
                        onChange={(e) => setconfirmedPW(e.target.value)} required/>
                </div>
                <button onClick={handleSubmit} type="submit"> Create</button>
            </div>


        </form>

    )
}

export default User