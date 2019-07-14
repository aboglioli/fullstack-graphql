import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = ({ children, ...props }) => (
  <button className="button" {...props}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
};

export default Button;
