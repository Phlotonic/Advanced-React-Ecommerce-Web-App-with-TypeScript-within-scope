import React from 'react'; // Keep React import if needed, though not strictly necessary for just JSX in modern setups
import Homepage from './pages/Homepage'; // Assuming Homepage.tsx is in the src directory.
                                 // Adjust the path if it's elsewhere, e.g., './pages/Homepage'
import './App.css'; // You can keep your global styles

function App() {
  return (
    <div className="App">
      <Homepage />
    </div>
  );
}

export default App;