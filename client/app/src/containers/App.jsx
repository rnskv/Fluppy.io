import React, { PureComponent } from "react";
import RouterView from "src/modules/router/router";
import { BrowserRouter as Router } from "react-router-dom";

import { routes } from "src/modules/router";

import "src/styles/App.css";

import UserStore from '../stores/User';

class App extends PureComponent {
  componentDidMount() {
    UserStore.authFromLocalStorage();
  }

  render() {
    return (
      <Router>
        <RouterView routes={routes} />
      </Router>
    );
  }
}

export default App;
