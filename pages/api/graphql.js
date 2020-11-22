import { ApolloServer } from 'apollo-server-micro';
import {schema} from './schema';

const apolloServer = new ApolloServer({schema, 
  subscriptions: {
    path: '/api/graphql',
    keepAlive: 9000,
    onConnect: console.log('connected'),
    onDisconnect: () => console.log('disconnected'),
  },
  playground: {
    subscriptionEndpoint: '/api/graphql',

    settings: {
      'request.credentials': 'same-origin',
    },
  }
});

// const handler = apolloServer.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false
  }
};

const graphqlWithSubscriptionHandler = (req, res, next) => {
  if (!res.socket.server.apolloServer) {
    console.log(`* apolloServer first use *`);

    apolloServer.installSubscriptionHandlers(res.socket.server);
    const handler = apolloServer.createHandler({ path: '/api/graphql' });
    res.socket.server.apolloServer = handler;
  }

  return res.socket.server.apolloServer(req, res, next);
};

export default graphqlWithSubscriptionHandler;

// export default handler;