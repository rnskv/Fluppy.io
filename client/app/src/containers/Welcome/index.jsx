import React, { Component } from "react";
import { observer } from "mobx-react";
import "./Welcome.css";

import UserStore from '../../stores/User';

@observer
class Welcome extends Component {
  componentDidMount() {
    console.log('Ваш acessToken token', this.props.match)
  }

  render() {
    return (
      <div>
        {
          UserStore.acessToken
            ? <div>
                <h1>Опача!</h1>
              <hr/>
                <p>Ваш токен - { UserStore.acessToken }</p>
                <button onClick={UserStore.logout}>Выйти из этого дерьма</button>
              </div>
            : <div>
              Вам нужно авторизироваться :(
              <a href={'http://127.0.0.1:800/auth/vk'}>Войти через вк</a>
            </div>
        }
      </div>
    );
  }
}

export default Welcome;
