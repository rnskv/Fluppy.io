import React, { Component } from 'react'
import { observer } from 'mobx-react'
import 'src/styles/Home.css'

@observer
class Home extends Component {
  render() {
    return <>Hello world</>
  }
}

export default Home
