// External modules
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

// Internal modules
import './App.css';
import AppNav from "./AppNav";
import ListDetail from "./ListDetail";
import Sidebar from "./Sidebar";

function PrimaryApp() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div id="app-container">
      <AppNav showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
      <div className="app-main">
        <Sidebar showSidebar={showSidebar} />
        <Switch>
          <Route exact path='/app'>
            <h1>Root of App</h1>
          </Route>
          <Route exact path='/app/lists/:listId'>
            <ListDetail />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default PrimaryApp;