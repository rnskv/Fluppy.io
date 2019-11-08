import React, { Component } from "react";
import { Link } from "react-router-dom";

import { observer } from "mobx-react";
import "./Inventory.css";
import InventoryStore from '../../stores/Inventory';

import UserStore from '../../stores/User';
import servers from "shared/configs/servers";
import Items from './Items.js';

@observer
class Inventory extends Component {
  componentDidMount() {
    // UserStore.authFromLocalStorage()
    InventoryStore.getUserInventory();
  }

  render() {
    console.log(UserStore)
    if (!UserStore.player) {
      return 'Предзагрузка';
    }

    if (InventoryStore.isLoading) {
      return 'Загрузка';
    }

    if (!InventoryStore.items.length) {
      return 'Инвентарь пуст'
    }

    return (
      <div>
        <h3>Inventory</h3>
        <Items changedSkin={InventoryStore.changedSkin} changedHat={InventoryStore.changedHat} items={InventoryStore.items} />
      </div>
    );
  }
}

export default Inventory;
