import React, { Component } from "react";
import { Link } from "react-router-dom";

import { observer } from "mobx-react";
import "./Welcome.css";

import UserStore from '../../stores/User';

@observer
class Welcome extends Component {
  componentDidMount() {
    console.log('Ваш accessToken token', this.props.match)
  }

  render() {
    return (
      <div>
        {
          UserStore.accessToken
            ? <div>
                <h1>Опача!</h1>
              <hr/>
                <p>Ваш токен - { UserStore.accessToken }</p>
                <button onClick={UserStore.logout}>Выйти из этого дерьма</button>
                <button><Link to={'/game'}>Войти в мир полный радости</Link></button>
              </div>
            : <div>
              Вам нужно авторизироваться :(
            <p>
              <button><a href={'http://127.0.0.1:800/auth/vk'}>Войти через вк</a></button>
            </p>
            </div>
        }
      </div>
    );
  }
}

export default Welcome;
