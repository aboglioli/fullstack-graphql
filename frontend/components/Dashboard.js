import React from 'react';
import PropTypes from 'prop-types';

import './Dashboard.scss';
import Toolbar from './Toolbar';
import Sidebar from './Sidebar';
import Layout from './Layout';

const Dashboard = ({ children }) => {
  return (
    <Layout
      logo="fullstack-graphql"
      toolbar={<Toolbar />}
      sidebar={<Sidebar />}
      footer={
        <div style={{ textAlign: 'center', padding: '5px 0' }}>
          Copyright © 2019 - Alan Boglioli
        </div>
      }
    >
      {children}
    </Layout>
  );
};

Dashboard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Dashboard;
