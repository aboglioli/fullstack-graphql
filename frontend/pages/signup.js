import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Container from '../components/Container';
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

  const [mutation, { loading }] = useMutation(SIGNUP_MUTATION, {
    variables: { data },
    onError: ({ graphQLErrors }) => {
      if (graphQLErrors.length > 0) {
        setError(graphQLErrors[0].message);
      }
    },
    onCompleted: data => {
      if (data && data.signup) {
        Router.push('/login');
      }
    },
  });

  const onChange = e => {
    if (e && e.target) {
      setData({ ...data, [e.target.name]: e.target.value });
      setError('');
    }
  };

  return (
    <Container title="Sign up">
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
            <button className="button" disabled={loading} onClick={mutation}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
