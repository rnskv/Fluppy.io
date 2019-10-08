import EventEmitter from "shared/core/EventEmitter";
import initGame from "game/src/main";

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
    initGame(this.gameRef.current);
  }

  join() {
    EventEmitter.emit("game:join");
  }

  leave() {
    EventEmitter.emit("game:leave");
  }

  render() {
    return (
      <div>
        <button onClick={this.join}>Войті</button>
        <button onClick={this.leave}>Вийті</button>

        <div ref={this.gameRef} id="game" />
      </div>
    );
  }
}

export default Home;
