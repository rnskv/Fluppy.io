import React, { PureComponent } from "react";
import RouterView from "src/modules/router/router";
import { BrowserRouter as Router } from "react-router-dom";

import { routes } from "src/modules/router";

import "src/styles/App.css";

import api from 'app/src/modules/api';

import bRequest from 'browser-request';

class App extends PureComponent {
  render() {
    return (
      <Router>
        <RouterView routes={routes} />
      </Router>
    );
  }
}

export default App;
