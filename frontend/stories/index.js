import React from 'react';
import { storiesOf } from '@storybook/react';

import '../pages/global.scss';

storiesOf('Layout', module).add('basic', () => (
  <button className="button">Click me</button>
));
