import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const Base = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
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
