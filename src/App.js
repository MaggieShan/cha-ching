/*global chrome*/
import logo from './logo.svg';
import React from 'react';
import Wallet from './wallet'
import Loanee from './loanee'
import Cart from './cart'
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isCart: false,    
      userId: "",
      signedIn: false
    }
    this.onInputchange = this.onInputchange.bind(this);
    this.onLogIn = this.onLogIn.bind(this);
    this.isCart = this.isCart.bind(this);
  }

  isCart() {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      var activeTab = tabs[0].url;
      this.setState({ isCart: activeTab.includes("cart") });
    });
  }

  onInputchange = (event) => {
    console.log(event);
    this.setState({
      userId: event.target.value
    });
  }

  onLogIn() {
    if(this.state.userId) {
      this.setState({ signedIn: true });
    }
    console.log(this.state.signedIn);
  }
    
  render() {
    this.isCart(); 
    if (!this.state.signedIn) {
      return (
        <form>
          <div className="App">
            <div className="login">
              <h1 className="title"> Invest in her </h1>
              <input 
                type="text" 
                name="name"
                value={this.state.userId}
                onChange={this.onInputchange}
                />
              <button className="loginButton" onClick={this.onLogIn}> <h1>Log in</h1></button>
            </div>
          </div>
        </form>
    );
    }
    if (this.state.isCart) { 
      return (
        <div className="App">
          <div className="wallet">
            <h1 className="welcome">
              Hi, {this.state.userId}!
            </h1>
            <Cart/>
          </div>
          <Loanee/>
        </div>
      );
    } 
    return (
      <div className="App">
        <div className="wallet">
          <h1 className="welcome">
            Hi, {this.state.userId}!
          </h1>
          <Wallet/>
        </div>
        <Loanee/>
      </div>
    );
  };
};

export default App;