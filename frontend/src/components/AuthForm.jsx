<script src="http://localhost:8097"></script>
import React, { useState } from 'react';
import { postAuthenticated } from '../api/api';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      if (isLogin) {
        // Make an authenticated POST request to login
        const data = await postAuthenticated('auth/login', { email, password });
        // Handle successful login (e.g., store JWT token in localStorage)
        console.log('Logged in successfully:', data);
      } else {
        // Make an authenticated POST request to register
        const data = await postAuthenticated('auth/register', { email, password });
        // Handle successful registration (e.g., show success message)
        console.log('Registered successfully:', data);
      }
    } catch (error) {
      setErrorMessage(error.error); // Display the error message from the server
    }
  };

  return (
    <form onSubmit={handleAuthSubmit}>
      {errorMessage && <div>{errorMessage}</div>}
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div>
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </div>
      <div>
        <button type="button" onClick={() => setIsLogin((prevState) => !prevState)}>
          {isLogin ? 'Switch to Register' : 'Switch to Login'}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
