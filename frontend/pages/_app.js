import App, { Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import './global.scss';
import '../lib/icons';
import withApollo from '../lib/with-apollo';
import Base from '../components/Base';
import Dashboard from '../components/Dashboard';

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    const { title, disableDashboard } = Component;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          {disableDashboard ? (
            <Base title={title}>
              <Component {...pageProps} />
            </Base>
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
