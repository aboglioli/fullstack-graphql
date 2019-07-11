import React from 'react';
import PropTypes from 'prop-types';

import './Box.css';

const Box = ({ children }) => {
  return <div className="box">{children}</div>;
};

Box.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Box;
