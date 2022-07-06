// External modules
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Internal modules 
import ProfileButton from './ProfileButton';

function Navigation({ isLoaded }) {
  const user = useSelector(state => state.session.user);

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <ProfileButton user={user} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;