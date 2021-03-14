/*global chrome*/
import './App.css';

async function isCart(){
  let result = '';
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    result = tabs[0];
    // use `url` here inside the callback because it's asynchronous!
  });

  console.log(result?.url);

  return result?.url.includes("cart");
}

function App() {
  console.log(0, isCart());
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

export default App;