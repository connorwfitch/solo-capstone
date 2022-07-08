// External modules
import React, { useState }from "react";
import { NavLink } from "react-router-dom";

function SidebarLink({ list }) {
  return (
    <NavLink className='sidebar-nl' activeClassName='sidebar-nl-active'
      to={`/app/lists/${list.id}`}>
      <i className="fa-solid fa-circle" style={{
        color: list.color,
        fontSize: '10px'
      }}></i>
      <div className="ellipses">
        {list.title}
      </div>
      <button className="sidebar-details">
        <i className="fa-solid fa-ellipsis"></i>
      </button>
    </NavLink>
  )
};

export default SidebarLink;