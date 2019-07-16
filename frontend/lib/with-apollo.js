import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { getDataFromTree } from 'react-apollo';

import initApollo from './apollo';
import { redirect } from '../utils/auth';

const withApollo = App => {
  return class WithApollo extends Component {
    static displayName = `withApollo(${App.displayName || 'All'})`;

    static propTypes = {
      apolloState: PropTypes.object.isRequired,
    };

    static async getInitialProps(ctx) {
      const {
        Component,
        router,
        ctx: { res },
      } = ctx;
      let initialProps = {};
      if (App.getInitialProps) {
        initialProps = await App.getInitialProps(ctx);
      }

      const apollo = initApollo({}, ctx);

      if (res && res.finished) {
        // In case of redirection
        return {};
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (typeof window === 'undefined') {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...initialProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />,
          );
        } catch (err) {
          console.error('getDataFromTree:', err);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      const apolloState = apollo.cache.extract();

      return {
        ...initialProps,
        apolloState,
      };
    }

    constructor(props) {
      super(props);
      this.apolloClient = initApollo(props.apolloState);
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};

export default withApollo;
