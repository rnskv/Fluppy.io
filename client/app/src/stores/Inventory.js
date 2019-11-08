import { observable, action } from "mobx";
import api from 'app/src/modules/api';

import itemsConfig from 'shared/configs/items.json';
import UserStore from './User';

class InventoryStore {
  @observable isLoading = true;
  @observable items = [];
  @observable changedSkin = null;
  @observable changedHat = null;

  constructor() {
    console.log('Init inventory store');
    this.getItemsConfig();
  }

  getUserInventory() {
    if (!UserStore.player._id) {
      UserStore.authFromLocalStorage().then(() => {
        this.getUserInventory()
      });
      return;
    }

    console.log(UserStore.player)
    api.execute({name: 'user.get', params: {id: UserStore.player._id}}, {
      json: {
        // totalScores: this.totalScores
      }
    }).then((data) => {
      console.log('Получил инвентарь', data)
      if (!data.body) {
        console.log('ns kj[');
        return;
      }
      this.isLoading = false;
      this.items = data.body.inventory || [];
      this.changedSkin = data.body.skin || null;
    })
  }

  getItemsConfig() {
    this.config = itemsConfig;
  }

  changeSkin(itemId) {
    // this.isLoading = true;
    this.changedSkin = itemId;
    api.execute(
      {name: 'player.changeSkin'},
      {
        json: {
          skin: itemId
        }
      }
    ).then((data) => {
      console.log('Скин изменен', data);
      // this.getUserInventory();
    })
  }
}

export default new InventoryStore();
