import React from 'react';
import PropTypes from 'prop-types';
import NextHead from 'next/head';

import config from '../lib/config';

const Head = ({ title, children }) => (
  <>
    <NextHead>
      <title>
        {title} | {config.title}
      </title>
    </NextHead>
    {children}
  </>
);

Head.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Head;
