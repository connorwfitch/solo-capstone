// External modules
import React from "react";
import { NavLink } from "react-router-dom";

function SidebarLink({ list, showMenu, setShowMenu }) {
  let buttons;

  if (list.id === showMenu) {
    buttons = (
      <div className="sidebar-details-menu">
        <button className="sidebar-details" onClick={() => null} >
          <i className="fa-solid fa-trash"></i>
        </button>
        <button className="sidebar-details" onClick={() => null} >
          <i className="fa-solid fa-gear"></i>
        </button>
        <button className="sidebar-details" onClick={() => setShowMenu('')}>
          <i className="fa-solid fa-ellipsis"></i>
        </button>
      </div>
    )
  } else {
    buttons = (
      <button className="sidebar-details" onClick={() => setShowMenu(list.id)}>
        <i className="fa-solid fa-ellipsis"></i>
      </button>
    )
  }


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
      {buttons}
    </NavLink>
  )
};

export default SidebarLink;