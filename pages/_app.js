import React from 'react';
import '../styles/index.css';
// Use this if going with the Twin GlobalStyles instead of custom Tailwind base classes
// import { GlobalStyles } from 'twin.macro';
// Or, sans animate classes
// import 'tailwindcss/dist/base.min.css'
import { ApolloClient, ApolloProvider, InMemoryCache, split, HttpLink} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = new HttpLink({
    uri: 'http://localhost:3000/api/graphql'
  });
  

const wsLink = process.browser ? new WebSocketLink({
    uri: `ws://localhost:3000/api/graphql`,
    options: {
      reconnect: true
    }
  }) : null;

  const splitLink = process.browser ? split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  ) : httpLink;

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});


export default function MyApp({ Component, pageProps }) {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}