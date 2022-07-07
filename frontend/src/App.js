// External modules
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

// Internal modules
import * as sessionActions from "./store/session";
import ProtectedRoute from "./components/Misc/ProtectedRoute";
import Splash from "./components/Splash";
import LoginPage from "./components/Login";
import SignupPage from "./components/Signup";
import About from "./components/Misc/About";
import NotFound from "./components/Misc/NotFound";
import PrimaryApp from "./components/AppComponents";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <Switch>
      <Route exact path="/">
        <Splash />
      </Route>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/signup">
        <SignupPage />
      </Route>
      <Route exact path='/about'>
        <About />
      </Route>
      <ProtectedRoute path="/app">
        <PrimaryApp />
      </ProtectedRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
