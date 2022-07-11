// External modules
import { Link } from "react-router-dom";

// Internal modules
import SplashNav from "../../Splash/SplashNav";

function NotFound() {
  return (
    <>
      <SplashNav />
      <div className="about-main">
        <h1 className="">Not Found</h1>
        <Link to='/' className="link">
          Return to home page
        </Link>
        <img src="/images/cards.png" className='about-img' alt='productive people' />
      </div>
    </>
  )
}

export default NotFound;