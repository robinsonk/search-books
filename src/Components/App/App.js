import React, { Component } from 'react';
import './App.css';
import BookSearchBar from '../BookSearchBar/BookSearchBar';

class App extends Component {
  render() {
    return (
      <div className="App" >
          <h1>Google Book Search</h1>
          <h2 className="subheading">Search a title or author</h2>
          <BookSearchBar />
      </div>
    );
  }
}

export default App;
