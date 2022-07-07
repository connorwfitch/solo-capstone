// Internal modules
import SplashNav from "../../Splash/SplashNav";
import './About.css'

function About() {
  return (
    <>
      <SplashNav />
      <div className="about-main">
        <h1>About</h1>
        <div className="about-text">
          <p className="light">
            Hi, I am Connor Fitch, the developer for this website. I use Todoist on
            a daily basis to help me stay organized and productive.
          </p>
          <p className="light">
            Given my familiarity with the product and my admiration for their UI/UX design,
            I knew I wanted to try my hand at making my own version of it. I hope you enjoy!
          </p>
        </div>
        
        <div className="about-links">
          <a href="https://github.com/connorwfitch/react-solo-project" className="link"
            target='_blank' rel='noreferrer'>
            Project Repo
          </a>
          <a href="https://github.com/connorwfitch" className="link"
            target='_blank' rel='noreferrer'>
            My GitHub
          </a>
          <a href="https://www.linkedin.com/in/connor-fitch-241678159/" className="link"
            target='_blank' rel='noreferrer'>
            My LinkedIn
          </a>
          <a href="https://todoist.com/" className="link"
            target='_blank' rel='noreferrer'>
            Todoist
          </a>
        </div>
        <img src="/images/cards.png" className='about-img' alt='productive people' />
      </div>
    </>
  )
}

export default About;