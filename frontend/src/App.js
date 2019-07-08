import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Nav from './components/Nav';
import Dashboard from './components/Dashboard';

const App = () => (
  <Router>
    <Nav />
    <Dashboard />
  </Router>
);

export default App;
