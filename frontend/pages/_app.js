import App, { Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';

import '../lib/icons';
import withApollo from '../lib/with-apollo';
import Dashboard from '../components/Dashboard';

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    const { title, disableDashboard } = Component;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          {disableDashboard ? (
            <Component {...pageProps} />
          ) : (
            <Dashboard title={title}>
              <Component {...pageProps} />
            </Dashboard>
          )}
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
