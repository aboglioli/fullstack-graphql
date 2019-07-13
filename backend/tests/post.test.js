const gql = require('graphql-tag');
const Server = require('./server');
const { models } = require('../src/db');

const FEED_QUERY = gql`
  query feed {
    feed {
      id
      content
      category {
        name
      }
      user {
        id
        username
      }
    }
  }
`;

const MY_POSTS_QUERY = gql`
  query myPosts {
    myPosts {
      id
      content
      category {
        name
      }
      user {
        id
        username
      }
    }
  }
`;

const author = {
  username: 'author',
  name: 'The Author',
  password: '123456',
  email: 'the-author@author.com',
};

describe('Post', () => {
  let server;

  beforeAll(async () => {
    server = new Server();
    await server.connectDb('post');
    await server.start();

    await models.User.create({ author, validated: true });
  });
});
