// External modules
import React, { useState } from 'react';

// Internal modules
import ProfileMenu from '../ProfileMenu';
import './AppNav.css'

function AppNav({ showSidebar, setShowSidebar }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <nav className="app-nav">
      <div className='app-nav-holder'>
        <button className="btn app-nav-btn" onClick={() => setShowSidebar(!showSidebar)}>
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
      <button className="btn app-nav-btn" onClick={() => setShowProfileMenu(!showProfileMenu)}>
        <i className="fa-solid fa-user">
        </i>
      </button>
      <ProfileMenu setShowProfileMenu={setShowProfileMenu} showProfileMenu={showProfileMenu}/>
    </nav>
  )
}

export default AppNav;