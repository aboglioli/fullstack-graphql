import React from 'react';
import PropTypes from 'prop-types';

import Routes from '../utils/Routes';
import Toolbar from '../components/Toolbar';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';

const sidebarItems = [
  {
    section: 'Products',
    items: [
      { text: 'Create Product', link: '/page1', className: 'active' },
      { text: 'Product List', link: '/meta' },
      { text: 'Stock', link: '/asd' },
    ],
  },
  {
    section: 'Providers',
    items: [
      { text: 'Add Provider', link: '/asd' },
      { text: 'Add Quotation', link: '/asd' },
      { text: 'Compare Quotations', link: '/asd' },
    ],
  },
];

const Dashboard = ({ routes }) => {
  return (
    <Layout
      logo="fullstack-graphql"
      toolbar={<Toolbar />}
      sidebar={<Sidebar items={sidebarItems} />}
      footer={<div style={{ textAlign: 'center', padding: '5px 0' }}>Copyright © 2019 - Alan Boglioli</div>}
    >
      <Routes routes={routes} />
    </Layout>
  );
};

Dashboard.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default Dashboard;
