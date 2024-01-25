import logo from './logo.svg';
import './App.css';
import React from 'react';
import Header from './components/header';
import Content from './components/content';
import Disclaimer from './components/disclaimer';
import Map from './components/map';
import SearchBar from './components/searchbar';
import Footer from './components/footer';

// The code below this was default
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
// The code above this was default

const App = () => {
  return (
    <div>
      <Header />
      <Disclaimer/>
      <Content />
      <Map />
      <SearchBar />
      <Footer />
    </div>
  );
};

export default App;
