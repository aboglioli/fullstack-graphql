import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import withAuth from '../../lib/with-auth';
import Error from '../../components/Error';

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      name
      email
    }
  }
`;

const Profile = () => {
  return (
    <>
      <h1>Profile</h1>
      <div className="box">
        <Query query={ME_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <b>Loading...</b>;
            if (error)
              return (
                <Error
                  code={
                    error.graphQLErrors.length > 0
                      ? error.graphQLErrors[0].message
                      : ''
                  }
                />
              );

            const { me: user } = data;

            return (
              <>
                <h3>Username</h3>
                <p>{user.username}</p>
                <h3>Name</h3>
                <p>{user.name}</p>
                <h3>Email</h3>
                <p>{user.email}</p>
              </>
            );
          }}
        </Query>
      </div>
    </>
  );
};

Profile.title = 'Profile';

export default withAuth(Profile);
