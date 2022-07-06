// External modules
import { Link } from 'react-router-dom';

// Internal modules
import SplashNav from './SplashNav';
import './Splash.css';

function Splash() {
  return (
    <>
      <SplashNav />
      <div>
        <h1>Organize your work and life, finally.</h1>
        <Link to='/stories' className='button red'>
          Start for free
        </Link>
      </div>
    </>
  )
}

export default Splash;