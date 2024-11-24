import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './frontend/landing-page/login-acc';
import WelcomePage from './frontend/landing-page/welcome-page';
import Register from './frontend/landing-page/create-acc';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
