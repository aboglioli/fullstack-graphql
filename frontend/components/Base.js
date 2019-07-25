import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const Base = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title} | fullstack-graphql</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
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
