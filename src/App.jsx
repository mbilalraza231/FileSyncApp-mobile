// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Send from './pages/Send/Send'; // Import the Send page
import Receive from './pages/Receive/Receive'; // Import the Receive page
import Home from './pages/Home/Home'; // Import the Home page
import './global.css'; // Global styles for the app

const App = () => {
  return (
    <Router>
      <div className="app">
        <h1>FileSyncApp</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/send" element={<Send />} />
          <Route path="/receive" element={<Receive />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
