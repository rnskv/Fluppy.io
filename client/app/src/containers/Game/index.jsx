import EventEmitter from "shared/core/EventEmitter";
import Injector from "game/src/main";

import UserStore from 'app/src/stores/User'

import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { observer } from "mobx-react";
import "./Game.css";

@observer
class Home extends Component {
  constructor() {
    super();
    this.gameRef = React.createRef();
    this.state = {
      isLeave: false
    }

    this.leave = this.leave.bind(this)
  }

  componentDidMount() {
    console.log('mount')
    Injector.inject(this.gameRef.current);
    this.join();
  }

  join() {
    console.log(window.localStorage.getItem('accessToken'))
    EventEmitter.emit("game:join", { accessToken: window.localStorage.getItem('accessToken') });
  }

  leave() {
    EventEmitter.emit("game:unmount");
    EventEmitter.emit("game:leave");

    this.setState({
      isLeave: true,
    });

  }

  componentWillUnmount() {
    // EventEmitter.emit("game:unmount");
  }

  render() {
    return (
      <div>
        {
          this.state.isLeave ? <Redirect to={'/'}/> : null
        }

        {/*<button onClick={this.join}>Войті</button>*/}
        <button id="leave" onClick={this.leave}>Вийті</button>

        <div ref={this.gameRef} id="game" />
      </div>
    );
  }
}

export default Home;
