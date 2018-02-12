import React from "react";
import { render, } from "react-dom";
import "./MyJsExtensions"
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

// components
import Home from "./components/Home/Home";
import App from "./components/App/App";
import EmbedBible from "./components/Bible/EmbedBible";
import NotePage from "./components/Note/NotePage";
import Classroom from "./components/Classroom/Classroom";
import Dashboard from "./components/Dashboard/Dashboard";

render(
  <Router>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route exact path="/bible/:reference?/:noteID?" component={App}/>
      <Route exact path="/embed/bible/:reference?" component={EmbedBible}/>
      <Route path='/classroom/:trackID' component={Classroom} />
      <Route path='/notes/:notedID/:lang?' component={NotePage} />
      <Route path='/me/:section?' component={Dashboard} />
      <Route path="*" render={() => <h1>Not found</h1>} />
    </Switch>
  </Router>
  , document.getElementById("root")
);
registerServiceWorker();
