// External modules
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Internal modules
import './Sidebar.css'
import { getLists } from "../../../store/list";
import { getBoards } from "../../../store/board";
import AddListModal from "../Lists/AddList/AddListModal";
import AddBoardModal from "../Boards/AddBoard/AddBoardModal";
import SidebarLinkList from "./SidebarLinkList";

function Sidebar({ showSidebar }) {
  const user = useSelector(state => state.session.user);
  const lists = useSelector(state => state.lists);
  const boards = useSelector(state => state.boards);

  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState('');

  useEffect(() => {
    dispatch(getLists(user.id));
    dispatch(getBoards(user.id));
  }, [dispatch, user.id])

  const inboxId = Object.values(lists).filter((list) => list.title === "Inbox")[0]?.id;

  return showSidebar && lists && (
    <div className="sidebar">
      <div className="sidebar-section">
        <NavLink className='sidebar-nl' 
          activeClassName='sidebar-nl-active'
          exact to='/app'
        >
          <i className="fa-solid fa-house" style={{
            color: '#E44332',
            fontSize: '13px'
          }}></i>
          All Tasks
        </NavLink>
        <NavLink className='sidebar-nl' 
          activeClassName='sidebar-nl-active'
          to={`/app/lists/${inboxId}`}
        >
          <i className="fa-solid fa-inbox" style={{
            color: '#467BB0',
            fontSize: '14px'
          }}></i>
          Inbox
        </NavLink>
        <NavLink className='sidebar-nl' 
          activeClassName='sidebar-nl-active'
          to='/app/today'
        >
          <i className="fa-regular fa-calendar" style={{
            color: '#7B52A9',
            fontSize: '15px'
          }}></i>
          Today
        </NavLink>
        <NavLink className='sidebar-nl' 
          activeClassName='sidebar-nl-active'
          to='/app/completed'
        >
          <i className="fa-regular fa-circle-check" style={{
            color: '#2FB86F',
            fontSize: '14px'
          }}></i>
          Completed
        </NavLink>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-label">
          <p>Lists</p>
          <AddListModal />
        </div>
        {Object.values(lists).map((list) => {
          if (list.title === "Inbox") return null;
          return (
            <SidebarLinkList key={`list-${list.id}`} list={list}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
            />
          )
        })}
      </div>
      <div className="sidebar-section">
        <div className="sidebar-label">
          <p>Boards</p>
          <AddBoardModal />
        </div>
        {Object.values(boards).map((board) => {
          return (
            <SidebarLinkBoard key={`board-${board.id}`} board={board}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
            />
          )
        })}
      </div>
    </div>
  );
};

export default Sidebar;