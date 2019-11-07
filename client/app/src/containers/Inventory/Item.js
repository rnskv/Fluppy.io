import React, { Component } from "react";
import { Link } from "react-router-dom";

import { observer } from "mobx-react";
import "./Inventory.css";
import InventoryStore from '../../stores/Inventory';

import UserStore from '../../stores/User';
import servers from "shared/configs/servers";

@observer
class Item extends Component {
  componentDidMount() {
  }

  render() {
    const { id, data } = this.props;
    return (
      <div onClick={() => InventoryStore.changeSkin(id)}>
        <img
          style={
            {
              width: 55,
              height: 55,
              border: this.props.isChanged ? '3px solid red' : '1px solid black',
            }
          }
          src={data.preview.url}
        />
      </div>
    );
  }
}

export default Item;
