module.exports = {
  Query: {
    categories(root, args, { models }) {
      return models.Category.findAll();
    },
    feed(root, args, { models }) {
      return models.Post.findAll();
    },
    myPosts(root, args, { user, models }) {
      return models.Post.findAll({ where: { userId: user.id } });
    },
  },
  Mutation: {
    async createPost(root, { data }, { user, models }) {
      const [category] = await models.Category.findOrCreate({
        where: { name: data.category },
      });

      const post = await models.Post.create({
        content: data.content,
        userId: user.id,
      });

      await post.setCategory(category);

      return post;
    },
  },
  Post: {
    category(post, args, { models }) {
      return models.Category.findByPk(post.categoryId);
    },
    user(post, args, { models }) {
      return models.User.findById(post.userId);
    },
  },
  Category: {
    posts(category, args, { models }) {
      return models.Post.findAll({ where: { categoryId: category.id } });
    },
  },
};
