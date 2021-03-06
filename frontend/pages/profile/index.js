import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Link from 'next/link';

import withAuth from '../../lib/with-auth';
import Container from '../../components/Container';
import Error from '../../components/Error';

const ME_QUERY = gql`
  {
    me {
      id
      username
      name
      email
    }
  }
`;

const Profile = () => {
  const { data, loading, error } = useQuery(ME_QUERY);

  if (loading) return <b>Loading...</b>;
  if (error) return <Error code={error.graphQLErrors[0].message} />;

  const { me: user } = data;

  return (
    <Container title="Profile">
      <h1>Profile</h1>
      <div className="box">
        <h3>Username</h3>
        <p>{user.username}</p>
        <h3>Name</h3>
        <p>{user.name}</p>
        <h3>Email</h3>
        <p>{user.email}</p>
        <p>
          <Link href="/profile/change-password">
            <a>Change password</a>
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default withAuth(Profile);
