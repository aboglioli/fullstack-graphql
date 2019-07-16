import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;

const createClient = initialState => {
  const isBrowser = typeof window !== 'undefined';

  // Links
  const authLink = setContext((_, { headers }) => {
    const token = isBrowser && localStorage.getItem('TOKEN');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
    fetch: !isBrowser && fetch,
  });

  // Client
  const client = new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
  });

  return client;
};

export default function initApollo(initialState) {
  const isBrowser = typeof window !== 'undefined';

  // New client for every server-side request
  if (!isBrowser) {
    return createClient(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createClient(initialState);
  }

  return apolloClient;
}
