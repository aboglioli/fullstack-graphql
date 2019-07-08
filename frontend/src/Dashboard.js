import React from 'react';
import PropTypes from 'prop-types';

import Nav from './Nav';
import Routes from './utils/Routes';

const Dashboard = ({ routes }) => {
  return (
    <main>
      <h2>Dashboard</h2>
      <Nav />
      <Routes routes={routes} />
    </main>
  );
};

Dashboard.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default Dashboard;
