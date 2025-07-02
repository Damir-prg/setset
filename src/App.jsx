import React, { useState } from 'react';
import TestQuiz from './TestQuiz';
import Login from './Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (success) => {
    setIsAuthenticated(success);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return <TestQuiz onLogout={handleLogout} />;
}

export default App;
