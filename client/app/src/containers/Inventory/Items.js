import React, { Component } from "react";
import { Link } from "react-router-dom";

import { observer } from "mobx-react";
import InventoryStore from '../../stores/Inventory';

import UserStore from '../../stores/User';
import servers from "shared/configs/servers";
import Item from './Item';

@observer
class Inventory extends Component {
  componentDidMount() {
    console.log(InventoryStore.config)
  }

  render() {
    return (
      <div>
        <h4>Предметы</h4>
        {
          this.props.items.map(itemId => {
            const item = InventoryStore.config[itemId];
            console.log(itemId)
            return <Item key={itemId} id={itemId} data={item}/>
          })
        }
      </div>
    )
  }
}

export default Inventory;
