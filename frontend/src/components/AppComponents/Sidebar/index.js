// External modules
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Internal modules
import './Sidebar.css'
import { getLists } from "../../../store/list";
import AddListModal from "../Lists/AddListModal";

function Sidebar({ showSidebar }) {
  const user = useSelector(state => state.session.user);
  const lists = useSelector(state => state.lists);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLists(user.id));
  }, [dispatch, user.id])

  return showSidebar && lists && (
    <div className="sidebar">
      <div className="sidebar-section">

      </div>
      <div className="sidebar-section">
        <div className="sidebar-label">
          <p>Lists</p>
          <AddListModal />
        </div>
        {Object.values(lists).map((list) => {
          if (list.title === "Inbox") return null;
          return (
            <NavLink to={`/app/lists/${list.id}`} key={`list-${list.id}`}>
              {list.title}
            </NavLink>
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