import React, { Component } from "react";
import { observer } from "mobx-react"
import { Redirect } from "react-router-dom";

import "./Auth.css";
import UserStore from '../../stores/User';;

@observer
class Auth extends Component {
  componentDidMount() {
    console.log('Ваш accessToken token', this.props.match);
    UserStore.login(this.props.match.params.accessToken);
  }

  render() {
    return (
      <Redirect to={'/'}/>
    );
  }
}

export default Auth;
