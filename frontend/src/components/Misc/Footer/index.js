// External modules
import { Link } from 'react-router-dom';

// Internal modules
import './Footer.css'

function Footer() {
  return (
    <div className='footer'>
      <div className='footer-holder'>
        <h4 className='light'>Information</h4>
        <Link to='/about' className='footer-link'>
          About
        </Link>
        <a href='https://github.com/connorwfitch/solo-capstone' className='footer-link'
          target='_blank' rel='noreferrer'>
          Project Repo
        </a>
        <a href='https://github.com/connorwfitch' className='footer-link' 
          target='_blank' rel='noreferrer'>
          My Github
        </a>
        <a href='https://www.linkedin.com/in/connor-fitch-241678159/' className='footer-link'
          target='_blank' rel='noreferrer'>
          My LinkedIn
        </a>
      </div>
      <div className='footer-holder'>
        <h4 className='light'>Frontend Stack</h4>
        <a href='https://reactjs.org/' className='footer-link'
          target='_blank' rel='noreferrer'>
          React
        </a>
        <a href='https://redux.js.org/' className='footer-link'
          target='_blank' rel='noreferrer'>
          Redux
        </a>
        <a href='https://developer.mozilla.org/en-US/docs/Glossary/HTML5' className='footer-link'
          target='_blank' rel='noreferrer'>
          HTML5
        </a>
        <a href='https://developer.mozilla.org/en-US/docs/Web/CSS' className='footer-link'
          target='_blank' rel='noreferrer'>
          CSS3
        </a>
      </div>
      <div className='footer-holder'>
        <h4 className='light'>Backend Stack</h4>
        <a href='https://nodejs.org/en/' className='footer-link'
          target='_blank' rel='noreferrer'>
          NodeJS
        </a>
        <a href='https://expressjs.com/' className='footer-link'
          target='_blank' rel='noreferrer'>
          ExpressJS
        </a>
        <a href='https://www.postgresql.org/' className='footer-link'
          target='_blank' rel='noreferrer'>
          PostgreSQL
        </a>
        <a href='https://sequelize.org/' className='footer-link'
          target='_blank' rel='noreferrer'>
          Sequelize
        </a>
      </div>
    </div>
  )
}

export default Footer;