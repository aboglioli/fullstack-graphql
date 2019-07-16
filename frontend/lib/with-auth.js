import React, { Component } from 'react';

import { auth } from '../utils/auth';

const withAuth = WrappedComponent => {
  return class WithAuth extends Component {
    static displayName = `withAuth(${WrappedComponent.displayName ||
      'Component'})`;

    static async getInitialProps(ctx) {
      const token = auth(ctx);

      let initialProps = {};
      if (WrappedComponent.getInitialProps) {
        initialProps = await WrappedComponent.getInitialProps(ctx);
      }

      return { ...initialProps, token };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withAuth;
