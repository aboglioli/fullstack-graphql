import React from 'react';
import PropTypes from 'prop-types';

import { sidebar } from '../routes';
import Routes from '../utils/Routes';
import Toolbar from '../components/Toolbar';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';

const Dashboard = ({ routes }) => {
  return (
    <Layout
      logo="fullstack-graphql"
      toolbar={<Toolbar />}
      sidebar={<Sidebar items={sidebar} />}
      footer={
        <div style={{ textAlign: 'center', padding: '5px 0' }}>
          Copyright © 2019 - Alan Boglioli
        </div>
      }
    >
      <Routes routes={routes} />
    </Layout>
  );
};

Dashboard.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default Dashboard;
