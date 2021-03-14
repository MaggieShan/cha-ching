/*global chrome*/
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isCart: false,
      pageText: ""      
    };
    this.isCart = this.isCart.bind(this);
  }

  isCart() {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      var activeTab = tabs[0].url;
      this.setState({ isCart: activeTab.includes("cart") });
      // this.setState({ isProduct: activeTab.includes("product") });
    });
  }

  // getText() {
  //   chrome.tabs.onActivated.listener(activeInfo => {  
  //     chrome.tabs.query({active: true, currentWindow: true}, tabs => {
  //       chrome.tabs.sendMessage({message: tabs, options: ''}, response => {
  //         this.setState({pageText: response});
  //       });
  //     });
  //   });
  // }

  render() {
    this.isCart(); 
    if (this.state.isCart) { 
      // console.log(this.state.url);
      return (
        <div className='cart'>
          <h1>Hi Kim!</h1>
          <h2>Your order will donate</h2>
          <h3>$3.29</h3>
          <card>Meet...</card>
        </div>
      );
    } 
    // else if (this.state.isProduct) {
    //   console.log("here")
    // }

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