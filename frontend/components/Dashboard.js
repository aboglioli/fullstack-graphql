import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import './Dashboard.scss';
import config from '../lib/config';
import Toolbar from './Toolbar';
import Sidebar from './Sidebar';
import Layout from './Layout';

const Dashboard = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>
          {title} | {config.title}
        </title>
      </Head>
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
    </>
  );
};

Dashboard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Dashboard;
