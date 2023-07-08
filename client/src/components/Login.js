import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../path/to/mutations';
import Auth from '../utils/auth';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      // Handle validation or display error message
      return;
    }

    try {
      const { data } = await login({
        variables: { username: email, password }
      });

      const token = data.login.token;

      Auth.login(token);

      // Clear form inputs
      setEmail('');
      setPassword('');
    } catch (error) {
      // Handle login error
    }
  };

  return (
    <div id="loginForm">
      <form onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
