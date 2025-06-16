import React from 'react';
import Homepage from './pages/Homepage';
import ShoppingCart from './components/shopping cart/ShoppingCart';
import './App.css'; 
function App() {
  return (
    <div className="App">
      <Homepage />
      <ShoppingCart />
    </div>
  );
}

export default App;