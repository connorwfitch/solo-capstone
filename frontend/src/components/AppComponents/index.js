// External modules
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

// Internal modules
import './App.css';
import AppNav from "./AppNav";
import ListAll from "./Lists/ListAll";
import ListCompleted from "./Lists/ListCompleted";
import ListDetail from "./Lists/ListDetail";
import ListToday from "./Lists/ListToday";
import Sidebar from "./Sidebar";
import NotFoundApp from "./NotFoundApp";

function PrimaryApp() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div id="app-container">
      <AppNav showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
      <Sidebar showSidebar={showSidebar} />
      <Switch>
        <Route exact path='/app'>
          <ListAll showSidebar={showSidebar}/>
        </Route>
        <Route exact path='/app/today'>
          <ListToday showSidebar={showSidebar}/>
        </Route>
        <Route exact path='/app/completed'>
          <ListCompleted showSidebar={showSidebar}/>
        </Route>
        <Route exact path='/app/lists/:listId'>
          <ListDetail showSidebar={showSidebar}/>
        </Route>
        <Route>
          <NotFoundApp showSidebar={showSidebar}/>
        </Route>
      </Switch>
    </div>
  )
}

export default PrimaryApp;