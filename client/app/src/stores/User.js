import { observable, action } from "mobx";
import api from 'app/src/modules/api';

class UserStore {
  @observable accessToken = null;
  @observable player = {};

  constructor() {
    this.authFromLocalStorage().then().catch();
  }

  async authFromLocalStorage() {
    const accessToken = window.localStorage.getItem('accessToken');
    if (accessToken) {
      await this.login(accessToken)
    } else {
      alert('Вам нужно авторизироваться')
    }
  }

  onSessionExpired() {
    alert('Ваша сессия устарела. Разрываем соединение');
    this.logout()
  }

  @action
  login = (accessToken) => {
    return new Promise((resolve, reject) => {
      this.accessToken = accessToken;
      localStorage.setItem('accessToken', accessToken);

      api.setToken(this.accessToken);
      api.execute({name: 'player.get'})
        .then((data) => {
          console.log('Все ок', data)
          if (!data.body) {
            this.onSessionExpired();
            return
          }

          this.player = data.body;
          resolve();
        })
        .catch((err) => {
          console.log('Все не ок', err)
          reject(err)
        });
    });
  };

  @action
  logout = () => {
    console.log('log out')
    this.accessToken = null;
    localStorage.removeItem('accessToken');
  };

  @action
  getUserData = () => {

  }
}

export default new UserStore();
