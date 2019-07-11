import React from 'react';
import PropTypes from 'prop-types';
import './Dashboard.css';

// import Nav from '../components/Nav';
import Routes from '../utils/Routes';
import Sidebar from '../components/Sidebar';

const sidebarItems = [
  {
    section: 'Products',
    items: [
      { text: 'Create product', link: '#' },
      { text: 'Product list', link: '#', className: 'active' },
      { text: 'Stock', link: '#' },
    ],
  },
  {
    section: 'Providers',
    items: [
      { text: 'Add provider', link: '#' },
      { text: 'Add quotation', link: '#' },
      { text: 'Compare quotations', link: '#' },
    ],
  },
];

const Dashboard = ({ routes }) => {
  return (
    <div className="container">
      <Sidebar id="sidebar" items={sidebarItems} />
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
