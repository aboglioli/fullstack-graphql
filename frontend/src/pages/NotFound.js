import React from 'react';
import PropTypes from 'prop-types';

const NotFound = ({ location }) => (
  <div className="box">
    <b>404</b> - <i>Not Found {location.pathname}</i>
  </div>
);

NotFound.propTypes = {
  location: PropTypes.object,
};

export default NotFound;
