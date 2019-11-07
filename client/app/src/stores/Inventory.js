import { observable, action } from "mobx";
import api from 'app/src/modules/api';

import itemsConfig from 'shared/configs/items.json';

class InventoryStore {
  @observable isLoading = true;
  @observable items = [];

  constructor() {
    console.log('Init inventory store');
    this.getItemsConfig();
    this.getUserInventory();
  }

  getUserInventory() {
    api.execute({name: 'user.get', params: {id: 1}}, {
      json: {
        // totalScores: this.totalScores
      }
    }).then((data) => {
      console.log('Получил инвентарь', data)
      this.isLoading = false;
      this.items = data.body.inventory
    })
  }

  getItemsConfig() {
    this.config = itemsConfig;
  }
}

export default new InventoryStore();
