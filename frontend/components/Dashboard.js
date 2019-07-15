import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { sidebar } from '../lib/sidebar';
import Toolbar from './Toolbar';
import Sidebar from './Sidebar';
import Layout from './Layout';

const Dashboard = ({ children }) => {
  return (
    <>
      <Head>
        <title>fullstack-graphql</title>
        <link href="/static/styles.css" rel="stylesheet" />
        <link href="/static/layout.css" rel="stylesheet" />
        <link href="/static/sidebar.css" rel="stylesheet" />
      </Head>
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
        {children}
      </Layout>
    </>
  );
};

Dashboard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Dashboard;
