import React from 'react';
import './App.css';

import Ad from './Ad';
import ProductList from './ProductList';

function App() {
  return (
    <div className="App">
      <div style={{backgroundColor: 'red', width: '40px', height: '40px'}}></div>
      <div>Hello to everyone</div>
      <Ad />
      <ProductList />
    </div>
  );
}

export default App;
