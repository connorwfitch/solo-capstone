// External modules
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

// Internal modules
import * as sessionActions from "../../store/session";
import SplashNav from "../Splash/SplashNav";

function LoginPage() {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  if (user) return (
    <Redirect to="/" />
  );

  return (
    <>
      <SplashNav />
      <div className='auth-page'>
        <form onSubmit={handleSubmit} className='auth-form'>
          <h2>
            Log in
          </h2>
          {errors.length > 0 && <ul className="errors">
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>}
          <label>
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              placeholder='Enter your username or email...'
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password...'
              required
            />
          </label>
            <button type="submit" className="btn-large btn-red">Log In</button>
            <button type="button" onClick={(e) => {
              e.preventDefault();
              dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }));
            }} className="btn-large btn-red">Use Demo Credentials</button>
          <Link to='/signup' className='link-small'>
            No account? Sign up
          </Link>
        </form>
        <img src='/images/auth.png' className='auth-img' alt='illustrated computer'/>
      </div>
    </>
  );
}

export default LoginPage;