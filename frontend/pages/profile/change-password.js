import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

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

  const onChange = e => {
    if (e && e.target) {
      setData({ ...data, [e.target.name]: e.target.value });
      setError('');
      setMessage('');
    }
  };

  return (
    <>
      <h1>Change password</h1>
      <div className="box">
        {error && <Error code={error} />}
        {message && <Message>{message}</Message>}

        <input
          className="input"
          name="currentPassword"
          value={data.currentPassword}
          onChange={onChange}
          type="text"
          placeholder="Current password"
        />
        <input
          className="input"
          name="newPassword"
          value={data.newPassword}
          onChange={onChange}
          type="text"
          placeholder="New password"
        />
        <Mutation
          mutation={CHANGE_PASSWORD_MUTATION}
          variables={data}
          onCompleted={({ changePassword }) => {
            if (changePassword) {
              setMessage('Password changed');
            }
          }}
          onError={({ graphQLErrors }) => {
            if (graphQLErrors.length > 0) {
              setError(graphQLErrors[0].message);
            }
          }}
        >
          {(mutation, { loading }) => (
            <button className="button" disabled={loading} onClick={mutation}>
              Change
            </button>
          )}
        </Mutation>
      </div>
    </>
  );
};

ChangePassword.title = 'ChangePassword';

export default ChangePassword;
