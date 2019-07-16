import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Error from '../components/Error';

const SIGNUP_MUTATION = gql`
  mutation signup($data: UserCreateInput!) {
    signup(data: $data) {
      id
      username
      email
      name
    }
  }
`;

const Signup = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
  });
  const [error, setError] = useState('');

  const onChange = e => {
    if (e && e.target) {
      setData({ ...data, [e.target.name]: e.target.value });
      setError('');
    }
  };

  const confirm = data => {
    if (data && data.signup) {
      Router.push('/login');
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="box" style={{ width: '400px' }}>
        <h2>Signup</h2>
        {error && <Error code={error} />}
        <input
          className="input"
          name="username"
          value={data.username}
          onChange={onChange}
          type="text"
          placeholder="Username"
        />
        <input
          className="input"
          name="password"
          value={data.password}
          onChange={onChange}
          type="password"
          placeholder="Password"
        />
        <input
          className="input"
          name="name"
          value={data.name}
          onChange={onChange}
          type="text"
          placeholder="Name"
        />
        <input
          className="input"
          name="email"
          value={data.email}
          onChange={onChange}
          type="text"
          placeholder="Email"
        />
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link href="/login">
            <a>Log in</a>
          </Link>
          <Mutation
            mutation={SIGNUP_MUTATION}
            variables={{ data }}
            onCompleted={confirm}
          >
            {mutation => (
              <button
                className="button"
                onClick={async () => {
                  try {
                    await mutation();
                  } catch ({ graphQLErrors }) {
                    if (graphQLErrors.length > 0) {
                      setError(graphQLErrors[0].message);
                    }
                  }
                }}
              >
                Sign up
              </button>
            )}
          </Mutation>
        </div>
      </div>
    </div>
  );
};

Signup.title = 'Sign up';
Signup.disableDashboard = true;

export default Signup;
