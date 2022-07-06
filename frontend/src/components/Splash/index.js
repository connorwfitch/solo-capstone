// External modules
import { Link } from 'react-router-dom';

// Internal modules
import SplashNav from './SplashNav';
import './Splash.css';

function Splash() {
  return (
    <>
      <SplashNav />
      <div className='splash-main'>
        <div className='splash-display'>
          <div>
            <h1>Organize your work and life, finally.</h1>
            <p>Become focused, organized, and calm with Twodoist.</p>
            <p>A clone of the world's #1 task manager.</p>
            <Link to='/stories' className='btn-large btn-red'>
              Start for free
            </Link>
          </div>
          <img src='/images/large.jpeg' className='splash-img-large' alt='illustration of productive people' />
        </div>
      </div>
    </>
  )
}

export default Splash;