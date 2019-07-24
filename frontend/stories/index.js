import React from 'react';
import { storiesOf } from '@storybook/react';

import Layout from '../components/Layout';

storiesOf('Layout', module).add('basic', () => (
  <Layout
    logo="Layout"
    toolbar={<div className="toolbar">toolbar</div>}
    sidebar={<div className="sidebar">sidebar</div>}
    footer={<div className="footer">footer</div>}
  >
    Layout
  </Layout>
));
