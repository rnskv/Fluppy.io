import React, { Component } from "react";
import { Link } from "react-router-dom";

import { observer } from "mobx-react";
import "./Welcome.css";

import UserStore from '../../stores/User';
import servers from "shared/configs/servers";

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
                <button onClick={UserStore.logout}>Выйти</button>
                <button><Link to={'/game'}>Войти в мир</Link></button>
                <button><Link to={'/inventory'}>Ваш инвентарь</Link></button>
            </div>
            : <div>
              Вам нужно авторизироваться :(
            <p>
              <button><a href={servers.urls.backend.url() + '/auth/vk'}>Войти через вк</a></button>
            </p>
            </div>
        }
      </div>
    );
  }
}

export default Welcome;
