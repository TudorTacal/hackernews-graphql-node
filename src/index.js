const { GraphQLServer } = require('graphql-yoga');

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL',
}];
let idCount = links.length;

const resolvers = {
  Query: {
    info: () => 'This is GraphQLs',
    feed: () => links,
    link: (root, args) => links.find(link => link.id === args.id)
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link);
      return link;
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
});
server.start(() => console.log('Server is running on localhost:4000'));


