import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import withAuth from '../lib/with-auth';
import Error from '../components/Error';

const META_QUERY = gql`
  {
    meta {
      author
      version
      uptime
    }
  }
`;

const Meta = () => {
  return (
    <>
      <h1>Meta</h1>
      <div className="box">
        <Query query={META_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <b>Loading...</b>;
            if (error) return <Error code={error.graphQLErrors[0].message} />;

            const { meta } = data;

            return (
              <>
                <h3>Author</h3>
                <p>{meta.author}</p>
                <h3>Backend version</h3>
                <p>{meta.version}</p>
                <h3>Uptime</h3>
                <p>{meta.uptime}</p>
              </>
            );
          }}
        </Query>
      </div>
    </>
  );
};

export default withAuth(Meta);
