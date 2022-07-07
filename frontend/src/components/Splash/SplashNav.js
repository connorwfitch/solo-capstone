// External modules
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

// Internal modules
import * as sessionActions from '../../store/session';

function SplashNav() {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let buttons;
  if (user) {
    buttons = (
      <>
        <button onClick={logout} className='btn-large btn-white'>
          Log out
        </button>
        <Link to='/app' className='btn-large btn-red'>
          Enter app
        </Link>
      </>
    )
  } else {
    buttons = (
      <>
        <Link to='/login' className='btn-large btn-white'>
          Log in
        </Link>
        <Link to='/signup' className='btn-large btn-red'>
          Sign up
        </Link>
      </>
    )
  }
  return (
    <nav className='splash-nav'>
      <Link to='/' className='no-decor logo-link'>
        <img src='/images/logo.png' className='logo' alt='twodoist logo'/>
        <h3>twodoist</h3>
      </Link>
      <div className='splash-nav-links'>
        <Link to='/about' className='btn-large btn-white'>
          About
        </Link>
        {buttons}
      </div>
    </nav>
  )
}

export default SplashNav;