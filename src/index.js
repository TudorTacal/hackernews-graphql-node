const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const resolvers = {
  Query: {
    info: () => 'This is GraphQLs',
    feed: (root, args, context, info) => {
      return context.db.query.links({}, info);
    },
  },
  Mutation: {
    post: (root, args, context, info) => {
     return context.db.mutation.createLink({
       data: {
         url: args.url,
         description: args.description,
       }
     }, info);
    },
    updateLink: (root, args) => {
      let updatedLink;
      links.forEach(link => {
        if (link.id === args.id) {
          link.description = args.description;
          link.url = args.url;
          updatedLink = link;
        }
      })
      return updatedLink;
    },
    deleteLink: (root, args) => {
      let deletedLink;
      const findLink = link => {
        if (link.id === args.id) {
          deletedLink = link;
          return false;
        }
        return true;
      };
      links = links.filter(findLink);
      return deletedLink;
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/tudortacal-5fcb71/database/dev',
      secret: 'mysecret123',
      debug: true,
    }),
  })
});
server.start(() => console.log('Server is running on localhost:4000'));


