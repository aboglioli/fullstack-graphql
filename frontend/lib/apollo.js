import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import fetch from 'isomorphic-unfetch';
import nextCookies from 'next-cookies';

import { logout } from '../utils/auth';

let apolloClient = null;
const isBrowser = typeof window !== 'undefined';

const createClient = (initialState, ctx) => {
  // Links
  const authLink = setContext((_, { headers }) => {
    const { token } = nextCookies(ctx);
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

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      const notLoggedIn = graphQLErrors.some(
        err => err.message === 'NOT_LOGGED_IN',
      );

      if (notLoggedIn) {
        logout();
      }
    }

    if (networkError) {
      if (isBrowser) {
        logout();
      }
    }
  });

  // Client
  const client = new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: ApolloLink.from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache().restore(initialState || {}),
  });

  return client;
};

export default function initApollo(initialState, ctx) {
  // New client for every server-side request
  if (!isBrowser) {
    return createClient(initialState, ctx);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createClient(initialState, ctx);
  }

  return apolloClient;
}
