// External modules
import { Link } from "react-router-dom";

function NotFoundApp() {
  return (
    <div id='content-container'>
      <div className='app-not-found'>
        <h1>Not found</h1>
        <img src='/images/farmer.png' className='tasks-empty-img' alt='farmer' />
        <Link to='/app' className="btn-large btn-red">
          Return to app home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundApp;