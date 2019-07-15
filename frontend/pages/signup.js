import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

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

const Signup = ({ history }) => {
  const [data, setData] = useState({ username: '', password: '' });

  const onChange = e => {
    if (e && e.target) {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const confirm = data => {
    if (data && data.signup) {
      const { signup } = data;
      console.log(signup);
      history.push('/');
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
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link href="/login">Log in</Link>
          <Mutation
            mutation={SIGNUP_MUTATION}
            variables={data}
            onCompleted={confirm}
          >
            {mutation => (
              <button className="button" onClick={mutation}>
                Sign up
              </button>
            )}
          </Mutation>
        </div>
      </div>
    </div>
  );
};

Signup.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Signup;
