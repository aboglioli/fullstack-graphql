import React from 'react';
import PropTypes from 'prop-types';

const NotFound = ({ location }) => (
  <>
    <b>404</b> - <i>Not Found {location.pathname}</i>
  </>
);

NotFound.propTypes = {
  location: PropTypes.object,
};

export default NotFound;
