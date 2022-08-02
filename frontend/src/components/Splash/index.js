// External modules
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Internal modules
import SplashNav from './SplashNav';
import './Splash.css';
import Footer from '../Misc/Footer';

function Splash() {
  const user = useSelector(state => state.session.user);

  let startButton;

  if (user) {
    startButton = (
      <Link to='/app' className='btn-large btn-red'>
        Enter the app
      </Link>
    )
  } else {
    startButton = (
      <Link to='/login' className='btn-large btn-red'>
        Start for free
      </Link>
    )
  }

  return (
    <>
      <SplashNav />
      <div className='splash-main footer-below'>
        <div className='splash-central'>
          <div className='splash-central-text'>
            <h1>Organize your work and life, finally.</h1>
            <div>
              <p className='light'>Become focused, organized, and calm with Twodoist.</p>
              <p className='light'>A clone of the world's #1 task manager.</p>
            </div>
            {startButton}
          </div>
          <img src='/images/large.jpeg' className='splash-img-large' alt='illustration of productive people' />
        </div>
        <div className='splash-display'>
          <img src='/images/peace.png' className='splash-display-img' alt='illustration of peaceful mind' />
          <div>
            <h2>
              De-clutter your brain
            </h2>
            <p className='light'>
              Quickly add action items to your inbox, so you can stop worrying about 
              trying to hold everything in your brain.
            </p>
          </div>
        </div>
        <div className='splash-display'>
          <div>
            <h2 className='ralign'>
              Accomplish more
            </h2>
            <p className='light ralign'>
              Organizing your tasks into lists or visualizing them with kanban boards can help you 
              better understand your next task and get it done quicker.
            </p>
          </div>
          <img src='/images/tada.png' className='splash-display-img' alt='illustration of productive people' />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Splash;