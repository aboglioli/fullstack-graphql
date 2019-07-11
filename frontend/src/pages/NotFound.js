import React from 'react';
import PropTypes from 'prop-types';

import Box from '../components/core/Box';

const NotFound = ({ location }) => (
  <Box>
    <b>404</b> - <i>Not Found {location.pathname}</i>
  </Box>
);

NotFound.propTypes = {
  location: PropTypes.object,
};

export default NotFound;
