const gql = require('graphql-tag');
const Server = require('./server');
const { models } = require('../src/db');
const { checkError } = Server;

const POST_FRAGMENT = gql`
  fragment Post on Post {
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
`;

const FEED_QUERY = gql`
  query feed {
    feed {
      ...Post
    }
  }
  ${POST_FRAGMENT}
`;

const MY_POSTS_QUERY = gql`
  query myPosts {
    myPosts {
      ...Post
    }
  }
  ${POST_FRAGMENT}
`;

const CREATE_POST_MUTATION = gql`
  mutation createPost($data: CreatePostInput!) {
    createPost(data: $data) {
      ...Post
    }
  }
  ${POST_FRAGMENT}
`;

const author = {
  username: 'author',
  name: 'The Author',
  password: '123456',
  email: 'the-author@author.com',
};

const admin = {
  username: 'admin',
  name: 'The Admin',
  password: '123456',
  email: 'admin@admin.com',
};

const graphqlPost = {
  category: 'GraphQL',
  content: 'Amazing!',
};

const nodePost = {
  category: 'Node',
  content: 'It rocks',
};

const maintenancePost = {
  category: 'Maintenance',
  content: 'Due to Y2K, server is shutting down.',
};

describe('Post', () => {
  let server;

  beforeAll(async () => {
    server = new Server();
    await server.connectDb('post');
    await server.start();

    await models.User.create({ ...author, validated: true });
    await server.login('author', '123456');
  });

  test('Get feed with not logged in user', async () => {
    await checkError(server.request(FEED_QUERY), 'NOT_LOGGED_IN');
    await checkError(server.request(MY_POSTS_QUERY), 'NOT_LOGGED_IN');
  });

  test('Create post', async () => {
    const { createPost: post } = await server.client.request(
      CREATE_POST_MUTATION,
      { data: graphqlPost },
    );
    expect(typeof post).toBe('object');
    expect(post.category.name).toBe(graphqlPost.category);
    expect(post.content).toBe(graphqlPost.content);
    expect(post.user.username).toBe(author.username);
  });

  test('Created post and category should exist in db', async () => {
    const categories = await models.Category.findAll();
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBe(1);
    expect(categories[0].name).toBe(graphqlPost.category);

    const posts = await models.Post.findAll();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBe(1);
    expect(posts[0].content).toBe(graphqlPost.content);
  });

  test('Create another post', async () => {
    const { createPost: post } = await server.client.request(
      CREATE_POST_MUTATION,
      { data: graphqlPost },
    );
    expect(post.category.name).toBe(graphqlPost.category);
    expect(post.content).toBe(graphqlPost.content);
    expect(post.user.username).toBe(author.username);
  });

  test('Category should have been reused (not created again)', async () => {
    const categories = await models.Category.findAll();
    expect(categories.length).toBe(1);
    expect(categories[0].name).toBe(graphqlPost.category);

    const posts = await models.Post.findAll();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBe(2);
    expect(posts[0].content).toBe(graphqlPost.content);
    expect(posts[1].content).toBe(graphqlPost.content);
  });

  test('Create another post with new content and category', async () => {
    const { createPost: post } = await server.client.request(
      CREATE_POST_MUTATION,
      { data: nodePost },
    );

    expect(post.category.name).toBe(nodePost.category);
    expect(post.content).toBe(nodePost.content);
    expect(post.user.username).toBe(author.username);
  });

  test('New category created', async () => {
    const categoryCount = await models.Category.count();
    expect(categoryCount).toBe(2);

    const postCount = await models.Post.count();
    expect(postCount).toBe(3);
  });

  test('Get my posts', async () => {
    const { myPosts } = await server.client.request(MY_POSTS_QUERY);
    expect(myPosts.length).toBe(3);
    myPosts.forEach(post => {
      expect(
        [graphqlPost.content, nodePost.content].includes(post.content),
      ).toBe(true);
      expect(
        [graphqlPost.category, nodePost.category].includes(post.category.name),
      ).toBe(true);
      expect(post.user.username).toBe(author.username);
    });
  });

  test('Create post with new username', async () => {
    await models.User.create({ ...admin, validated: true });
    await server.login('admin', '123456');

    const { createPost } = await server.client.request(CREATE_POST_MUTATION, {
      data: maintenancePost,
    });
    expect(createPost.content).toBe(maintenancePost.content);
    expect(createPost.category.name).toBe(maintenancePost.category);
    expect(createPost.user.username).toBe(admin.username);
  });

  test('Total of posts and categories', async () => {
    const userCount = await models.User.estimatedDocumentCount();
    expect(userCount).toBe(2);

    const categoryCount = await models.Category.count();
    expect(categoryCount).toBe(3);

    const postCount = await models.Post.count();
    expect(postCount).toBe(4);
  });
});
