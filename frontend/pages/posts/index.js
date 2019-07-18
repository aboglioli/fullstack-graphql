import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Error from '../../components/Error';

const FEED_QUERY = gql`
  query feed {
    feed {
      id
      content
      category {
        id
        name
      }
      user {
        id
        username
        name
      }
    }
  }
`;

const Feed = () => {
  return (
    <div className="box">
      <Query query={FEED_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <b>Loading...</b>;
          if (error) return <Error code={error.graphQLErrors[0].message} />;

          return data.feed.length === 0 ? (
            <b>No posts</b>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Content</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                {data.feed.map(post => (
                  <tr key={post.id}>
                    <td>{post.category.name}</td>
                    <td>{post.content}</td>
                    <td>{post.user.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          );
        }}
      </Query>
    </div>
  );
};

Feed.title = 'Feed';

export default Feed;
