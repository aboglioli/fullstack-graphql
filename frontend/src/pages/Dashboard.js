import React from 'react';
import PropTypes from 'prop-types';

import Routes from '../utils/Routes';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';

const sidebarItems = [
  {
    section: 'Products',
    items: [
      { text: 'Create Product', link: '/page1' },
      { text: 'Product List', link: '/meta', className: 'active' },
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
    <div className="container">
      <Sidebar id="sidebar" items={sidebarItems} header="Header" />
      <main id="main">
        <div className="content">
          <Routes routes={routes} />
        </div>
      </main>
    </div>
  );
};

Dashboard.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default Dashboard;
