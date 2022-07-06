// External modules
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="special-background" >
      <div className="misc-container">
        <h1 className="average">Not Found</h1>
        <Link to='/' className="link">
          Return to home page
        </Link>
      </div>
    </div>
  )
}

export default NotFound;