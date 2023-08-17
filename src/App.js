import { Component } from 'react';
//import CountDown from './Component/CountDown';
import "./App.css"
import CountDownWithFunCom from './Component/CountDownWithFunCom';
class App extends Component {
  render() {
    return(
      <div className="App">
        {/* <CountDown /> */}
        <CountDownWithFunCom />
      </div>
    )
  }
}
export default App;
