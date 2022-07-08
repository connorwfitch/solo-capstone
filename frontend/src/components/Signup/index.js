// External modules
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

// Internal modules
import * as sessionActions from "../../store/session";
import ColorSelector from "../Misc/ColorSelector";
import SplashNav from "../Splash/SplashNav";

function SignupPage() {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [color, setColor] = useState("#E44332");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, color }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  if (user) return (
    <Redirect to="/app" />
  );

  return (
    <>
      <SplashNav />
      <div className="auth-page">
        <form onSubmit={handleSubmit} className='auth-form'>
          <h2>
            Sign up
          </h2>
          {errors.length > 0 && <ul className="errors">
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>}
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Color
            <ColorSelector
              required
              defaultVal={color}
              setColor={setColor}
            />
          </label>
          <button type="submit" className="btn-large btn-red">Sign Up</button>
          <button type="button" onClick={(e) => {
            e.preventDefault();
            dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }));
          }} className="btn-large btn-red">Use Demo Credentials</button>
          <Link to='/login' className="link-small">
            Already have an account? Log in
          </Link>
        </form>
        <img src='/images/auth.png' className='auth-img' alt='illustrated computer' />
      </div>
    </>
  );
}

export default SignupPage;