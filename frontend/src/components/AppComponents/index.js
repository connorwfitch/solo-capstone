// External modules
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import AppNav from "./AppNav";
import Sidebar from "./Sidebar";

// Internal modules
import './App.css';

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
          <Route exact path='/app/bar'>
            <h1>Bar</h1>
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default PrimaryApp;