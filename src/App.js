/*global chrome*/
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isCart: false
    };
    this.isCart = this.isCart.bind(this);
  }

  isCart() {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      var activeTab = tabs[0].url;
      console.log(activeTab);
      console.log(activeTab.includes("cart"));
      this.setState({ isCart: activeTab.includes("cart") });
    });
    console.log(this.state.isCart);
  }

  render() {
    this.isCart(); 
    if (this.state.isCart) { 
      return <h1>WORKING</h1>;
    }
    return (
      <div className="App">
        <div className="container">
          <header className="title">
          Hi, Kim!
          </header>
        </div>
      </div>
    );
  }
};

export default App;