import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import config from '../lib/config';

const Container = ({ title, children }) => (
  <>
    <Head>
      <title>
        {title} | {config.title}
      </title>
    </Head>
    {children}
  </>
);

Container.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Container;
