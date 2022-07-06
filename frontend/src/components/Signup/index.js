// External modules
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";

// Internal modules
import * as sessionActions from "../../store/session";

function SignupPage() {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  if (user) return (
    <Redirect to="/" />
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>
          Join Twodoist
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
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              history.push('/');
            }}
            className="button cancel"
          >
            Cancel
          </button>
          <button type="submit" className="button red">Sign Up</button>
        </div>
        <button type="button" onClick={(e) => {
          e.preventDefault();
          dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }));
        }} className="button red">Use Demo Credentials</button>
        <Link to='/login'>
          Already have an account?
        </Link>
      </form>
    </div>
  );
}

export default SignupPage;