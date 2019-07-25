import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import config from '../lib/config';

const Base = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>
          {title} | {config.title}
        </title>
      </Head>
      {children}
    </>
  );
};

Base.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Base;
