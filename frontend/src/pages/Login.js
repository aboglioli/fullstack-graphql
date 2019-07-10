import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        email
        name
      }
    }
  }
`;

const Login = ({ history }) => {
  const [data, setData] = useState({ username: '', password: '' });

  const onChange = e => {
    if (e && e.target) {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const confirm = data => {
    if (data && data.login) {
      const { login } = data;
      localStorage.setItem('TOKEN', login.token);
      history.push('/');
    }
  };

  return (
    <div>
      <h4>Login</h4>
      <input
        name="username"
        value={data.username}
        onChange={onChange}
        type="text"
        placeholder="Username"
      />
      <input
        name="password"
        value={data.password}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <Mutation
        mutation={LOGIN_MUTATION}
        variables={data}
        onCompleted={confirm}
      >
        {mutation => <button onClick={mutation}>Login</button>}
      </Mutation>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Login;
