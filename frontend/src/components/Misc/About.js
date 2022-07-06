// External modules
import { Link } from "react-router-dom";

function About() {
  return (
    <div>
      <a href="https://github.com/connorwfitch/react-solo-project">
        Project Repo
      </a>
      <a href="https://github.com/connorwfitch">
        My GitHub
      </a>
      <a href="https://www.linkedin.com/in/connor-fitch-241678159/">
        My LinkedIn
      </a>
      <Link to='/'>
        Return to home page
      </Link>
    </div>
  )
}

export default About;