// External modules
import React from "react";
import { NavLink } from "react-router-dom";

// Internal modules
import EditBoardModal from "../Boards/EditBoard/EditBoardModal";
import DeleteBoardModal from "../Boards/DeleteBoard/DeleteBoardModal";

function SidebarLinkBoard({ board, showMenu, setShowMenu }) {
  let buttons;

  if ('board' + board.id === showMenu) {
    buttons = (
      <div className="sidebar-details-menu">
        <DeleteBoardModal board={board} />
        <EditBoardModal board={board} />
        <button className="sidebar-details" onClick={() => setShowMenu('')}>
          <i className="fa-solid fa-ellipsis"></i>
        </button>
      </div>
    )
  } else {
    buttons = (
      <button className="sidebar-details" onClick={() => setShowMenu('board' + board.id)}>
        <i className="fa-solid fa-ellipsis"></i>
      </button>
    )
  }


  return (
    <NavLink className='sidebar-nl' activeClassName='sidebar-nl-active'
      to={`/app/boards/${board.id}`}>
      <i className="fa-solid fa-circle" style={{
        color: board.color,
        fontSize: '10px'
      }}></i>
      <div className="ellipses">
        {board.title}
      </div>
      {buttons}
    </NavLink>
  )
};

export default SidebarLinkBoard;