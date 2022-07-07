// External modules
import React from "react";
import { NavLink } from "react-router-dom";

// Internal modules
import './Sidebar.css'

function Sidebar({ showSidebar }) {
  return showSidebar && (
    <h2>Sidebar showing!</h2>
  );
};

export default Sidebar;