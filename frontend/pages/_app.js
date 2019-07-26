import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';

import './global.scss';
import '../lib/icons';
import withApollo from '../lib/with-apollo';
import LayoutContext from '../components/LayoutContext';
import Dashboard from '../components/Dashboard';

const sidebar = [
  {
    section: 'Profile',
    items: [
      { text: 'Profile', link: '/profile' },
      { text: 'Change password', link: '/profile/change-password' },
    ],
  },
  {
    section: 'Server',
    items: [{ text: 'Meta', link: '/meta' }],
  },
];

const disableDashboard = ['/login', '/signup', '/unauthorized'];

class MyApp extends App {
  state = {
    sidebarOpen: true,
    sidebar: sidebar.map(section => ({ ...section, open: true })),
  };

  toggleSidebar = () => {
    this.setState(state => ({ sidebarOpen: !state.sidebarOpen }));
  };

  toggleSidebarSection = index => {
    let { sidebar } = this.state;

    sidebar = sidebar.map((section, i) => {
      if (i === index) {
        return { ...section, open: !section.open };
      }

      return section;
    });

    this.setState({ sidebar });
  };

  render() {
    const { Component, pageProps, apolloClient, router } = this.props;
    const { pathname } = router;
    return (
      <Container>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
        </Head>
        <ApolloProvider client={apolloClient}>
          <LayoutContext.Provider
            value={{
              ...this.state,
              toggleSidebar: this.toggleSidebar,
              toggleSidebarSection: this.toggleSidebarSection,
            }}
          >
            {disableDashboard.includes(pathname) ? (
              <Component {...pageProps} />
            ) : (
              <Dashboard>
                <Component {...pageProps} />
              </Dashboard>
            )}
          </LayoutContext.Provider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
