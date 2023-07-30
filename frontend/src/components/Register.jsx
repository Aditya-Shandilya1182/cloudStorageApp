import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();


    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

    async function registerUser(event){
        event.preventDefault();
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            })
        });

        const data = await response.json();
        if (data.status === 201) {
			    navigate('http://localhost:3000/api/auth/login');
		    }
    }

  return (
    <div>
        <h1>REGISTER</h1>
        <form onSubmit={registerUser}>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				<input type="submit" value="Register" />
        </form>
    </div>
  )
}

export default Register;