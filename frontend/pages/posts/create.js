import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Message from '../../components/Message';
import Error from '../../components/Error';

const CREATE_POST_MUTATION = gql`
  mutation createPost($data: CreatePostInput!) {
    createPost(data: $data) {
      id
      content
      category {
        id
        name
      }
      user {
        id
      }
    }
  }
`;

const Create = () => {
  const [data, setData] = useState({ category: '', content: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const onChange = e => {
    if (e && e.target) {
      setData({ ...data, [e.target.name]: e.target.value });
      setError('');
      setMessage('');
    }
  };

  return (
    <>
      <h1>Create post</h1>
      <div className="box">
        {error && <Error code={error} />}
        {message && <Message>{message}</Message>}

        <div
          style={{
            display: 'flex',
          }}
        >
          <input
            className="input"
            style={{ flex: 1, marginRight: '0.5rem' }}
            name="category"
            value={data.category}
            onChange={onChange}
            type="text"
            placeholder="Category"
          />
          <input
            className="input"
            style={{ flex: 2, marginLeft: '0.5rem' }}
            name="content"
            value={data.content}
            onChange={onChange}
            type="text"
            placeholder="Content"
          />
        </div>
        <Mutation
          mutation={CREATE_POST_MUTATION}
          variables={{ data }}
          onCompleted={({ createPost }) => {
            if (createPost.id) {
              setMessage('Post created');
            }
          }}
          onError={({ graphQLErrors }) => {
            if (graphQLErrors.length > 0) {
              setError(graphQLErrors[0].message);
            }
          }}
        >
          {(mutation, { loading }) => (
            <button className="button" onClick={mutation} disabled={loading}>
              Create
            </button>
          )}
        </Mutation>
      </div>
    </>
  );
};

Create.title = 'Create post';

export default Create;
