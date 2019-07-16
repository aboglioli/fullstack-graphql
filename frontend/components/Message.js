import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ error, children }) => {
  return (
    <div
      style={{
        backgroundColor: error ? '#d8000c' : '#dff2bf',
        borderRadius: '3px',
        color: error ? '#ffbaba' : '#4f8a10',
        marginBottom: '1rem',
        padding: '0.5rem',
      }}
    >
      {children}
    </div>
  );
};

Message.propTypes = {
  error: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Message;
