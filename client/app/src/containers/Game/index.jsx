import EventEmitter from "shared/core/EventEmitter";
import Injector from "game/src/main";

import UserStore from 'app/src/stores/User'

import React, { Component } from "react";
import { observer } from "mobx-react";
import "./Game.css";

@observer
class Home extends Component {
  constructor() {
    super();
    this.gameRef = React.createRef();

  }

  componentDidMount() {
    Injector.inject(this.gameRef.current);
    this.join();
  }

  join() {
    console.log(window.localStorage.getItem('accessToken'))
    EventEmitter.emit("game:join", { accessToken: window.localStorage.getItem('accessToken') });
  }

  leave() {
    EventEmitter.emit("game:leave");
  }

  render() {
    return (
      <div>
        {/*<button onClick={this.join}>Войті</button>*/}
        {/*<button onClick={this.leave}>Вийті</button>*/}

        <div ref={this.gameRef} id="game" />
      </div>
    );
  }
}

export default Home;
