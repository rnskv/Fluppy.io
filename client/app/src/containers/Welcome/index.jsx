import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './Welcome.css'

@observer
class Home extends Component {
  render() {
    return <div>
      Приветственная страница. Войти в игру - :
      <input type={'button'} value={'Go to game!!!'}/>
    </div>
  }
}

export default Home
