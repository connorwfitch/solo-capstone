// External modules
import { Link } from 'react-router-dom';

function SplashNav() {
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
        <Link to='/login' className='btn-large btn-white'>
          Log in
        </Link>
        <Link to='/signup' className='btn-large btn-red'>
          Sign up
        </Link>
      </div>
    </nav>
  )
}

export default SplashNav;