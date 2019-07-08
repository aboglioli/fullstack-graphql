import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import Login from './Login';
import Meta from './Meta';

const Dashboard = () => {
  return (
    <Router>
      <Nav />
      
      <main>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/meta" component={Meta} />
      </main>
    </Router>
  );
};

export default Dashboard;
