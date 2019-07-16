import React from 'react';
import Link from 'next/link';
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
    <div className="box">
      <Query query={META_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <b>Loading...</b>;
          if (error) return <Error code={error.graphQLErrors[0].message} />;

          const { meta } = data;

          return (
            <>
              <h2>Author</h2>
              <p>{meta.author}</p>
              <h2>Backend version</h2>
              <p>{meta.version}</p>
              <h2>Uptime</h2>
              <p>{meta.uptime}</p>
            </>
          );
        }}
      </Query>
    </div>
  );
};

export default withAuth(Meta);
