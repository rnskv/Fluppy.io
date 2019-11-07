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
  }

  render() {
    return (
      <div>
        <h3>Inventory</h3>
        {
          InventoryStore.isLoading ? 'Загрузка' : <Items items={InventoryStore.items}/>
        }
      </div>
    );
  }
}

export default Inventory;
