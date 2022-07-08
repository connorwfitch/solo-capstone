// External modules
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Internal modules
import './Sidebar.css'
import { getLists } from "../../../store/list";
import AddListModal from "../Lists/AddList/AddListModal";
import SidebarLink from "./SidebarLink";

function Sidebar({ showSidebar }) {
  const user = useSelector(state => state.session.user);
  const lists = useSelector(state => state.lists);

  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState('');

  useEffect(() => {
    dispatch(getLists(user.id));
  }, [dispatch, user.id])

  const inboxId = Object.values(lists).filter((list) => list.title === "Inbox")[0]?.id;

  return showSidebar && lists && (
    <div className="sidebar">
      <div className="sidebar-section">
        <NavLink className='sidebar-nl' 
          activeClassName='sidebar-nl-active'
          exact to='/app'
        >
          All Tasks
        </NavLink>
        <NavLink className='sidebar-nl' 
          activeClassName='sidebar-nl-active'
          to={`/app/lists/${inboxId}`}
        >
          Inbox
        </NavLink>
        <NavLink className='sidebar-nl' 
          activeClassName='sidebar-nl-active'
          to='/app/today'
        >
          Today
        </NavLink>
        <NavLink className='sidebar-nl' 
          activeClassName='sidebar-nl-active'
          to='/app/completed'
        >
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
            <SidebarLink key={`list-${list.id}`} list={list}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
            />
          )
        })}
      </div>
      {/* <div className="sidebar-section">
        <div className="sidebar-label">
          <p>Tags</p>
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;