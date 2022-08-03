// External modules
import React from "react";
import { NavLink } from "react-router-dom";

// Internal modules
import EditBoardModal from "../Boards/EditBoard/EditBoardModal";
// import DeleteListModal from "../Lists/DeleteList/DeleteListModal";

function SidebarLinkList({ list, showMenu, setShowMenu }) {
  let buttons;

  if (list.id === showMenu) {
    buttons = (
      <div className="sidebar-details-menu">
        <DeleteListModal list={list} />
        <EditBoardModal list={list} />
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

export default SidebarLinkList;