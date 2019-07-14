import React from 'react';
import PropTypes from 'prop-types';

import './Box.css';

const Box = ({ children, ...props }) => {
  return (
    <div className="box" {...props}>
      {children}
    </div>
  );
};

Box.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Box;
