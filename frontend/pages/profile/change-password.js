import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Container from '../../components/Container';
import Message from '../../components/Message';
import Error from '../../components/Error';

const CHANGE_PASSWORD_MUTATION = gql`
  mutation changePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(currentPassword: $currentPassword, newPassword: $newPassword)
  }
`;

const ChangePassword = () => {
  const [data, setData] = useState({ currentPassword: '', newPassword: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [mutation, { loading }] = useMutation(CHANGE_PASSWORD_MUTATION, {
    variables: data,
    onCompleted: ({ changePassword }) => {
      if (changePassword) {
        setMessage('Password changed');
      }
    },
    onError: ({ graphQLErrors }) => {
      if (graphQLErrors.length > 0) {
        setError(graphQLErrors[0].message);
      }
    },
  });

  const onChange = e => {
    if (e && e.target) {
      setData({ ...data, [e.target.name]: e.target.value });
      setError('');
      setMessage('');
    }
  };

  return (
    <Container title="Change Password">
      <h1>Change password</h1>
      <div className="box">
        {error && <Error code={error} />}
        {message && <Message>{message}</Message>}

        <div
          style={{
            display: 'flex',
          }}
        >
          <input
            className="input"
            style={{ marginRight: '0.5rem' }}
            name="currentPassword"
            value={data.currentPassword}
            onChange={onChange}
            type="text"
            placeholder="Current password"
          />
          <input
            className="input"
            style={{ marginLeft: '0.5rem' }}
            name="newPassword"
            value={data.newPassword}
            onChange={onChange}
            type="text"
            placeholder="New password"
          />
        </div>
        <button className="button" disabled={loading} onClick={mutation}>
          Change
        </button>
      </div>
    </Container>
  );
};

export default ChangePassword;
