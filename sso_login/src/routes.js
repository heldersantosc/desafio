import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Bob from "./pages/Bob";
import Home from "./pages/Home";
import Bemol from "./pages/Bemol";
import Farma from "./pages/Farma";
import SignUp from "./pages/SignUp";
import SingleSignOn from "./pages/SingleSignOn";
import BemolDigital from "./pages/BemolDigital";

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/sso" component={SingleSignOn} />
      <Route exact path="/bob" component={Bob} />
      <Route exact path="/bemol" component={Bemol} />
      <Route exact path="/farma" component={Farma} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/bemoldigital" component={BemolDigital} />
    </Switch>
  </Router>
);

export default Routes;
