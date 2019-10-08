import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './Game.css'

@observer
class Home extends Component {
  render() {
    return <div>
      Ты типа в игре
    </div>
  }
}

export default Home
