import React from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import withAuth from '../lib/with-auth';

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
    <Query query={META_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <b>Loading...</b>;
        if (error) return <b>ERROR</b>;

        const { meta } = data;

        return (
          <ul>
            <li>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
            <li>
              <b>Author</b>: {meta.author}
            </li>
            <li>
              <b>Backend version</b>: {meta.version}
            </li>
            <li>
              <b>Uptime</b>: {meta.uptime}
            </li>
          </ul>
        );
      }}
    </Query>
  );
};

export default withAuth(Meta);
