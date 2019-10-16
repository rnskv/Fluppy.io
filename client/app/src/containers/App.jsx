import React, { PureComponent } from "react";
import RouterView from "src/modules/router/router";
import { BrowserRouter as Router } from "react-router-dom";

import { routes } from "src/modules/router";

import "src/styles/App.css";

import Api from 'shared/core/Api/index';

import bRequest from 'browser-request';

class App extends PureComponent {
  componentDidMount() {

    const api = new Api({
      url: 'http://192.168.101.155:3003',
      methods: {
        'users.get': {
          method: 'GET',
          action: '/users'
        }
      },
      request: bRequest
    });

    api.execute('users.get')
      .then((data) => { console.log('Все ок', data)})
      .catch((err) => { console.log('Все не ок', err)});

    console.log('test function', api)

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
