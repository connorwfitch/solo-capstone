// External modules
import React from "react";
import { NavLink } from "react-router-dom";

// Internal modules
import './Sidebar.css'

function Sidebar({ showSidebar }) {
  return showSidebar && (
    <div className="sidebar">
      <div className="sidebar-section">

      </div>
      <div className="sidebar-section">
        <div className="sidebar-label">
          <p>Lists</p>
        </div>
        <NavLink to='' className=''>
          Placeholder
        </NavLink>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-label">
          <p>Tags</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;