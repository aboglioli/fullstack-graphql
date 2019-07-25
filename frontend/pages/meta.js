import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import withAuth from '../lib/with-auth';
import Dashboard from '../components/Dashboard';
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
  const { data, loading, error } = useQuery(META_QUERY);

  if (loading) return <b>Loading...</b>;
  if (error) return <Error code={error.graphQLErrors[0].message} />;

  const { meta } = data;

  return (
    <Dashboard title="Meta">
      <h1>Meta</h1>
      <div className="box">
        <h3>Author</h3>
        <p>{meta.author}</p>
        <h3>Backend version</h3>
        <p>{meta.version}</p>
        <h3>Uptime</h3>
        <p>{meta.uptime}</p>
      </div>
    </Dashboard>
  );
};

export default withAuth(Meta);
