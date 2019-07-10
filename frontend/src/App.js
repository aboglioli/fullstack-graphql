import React from 'react';

import routes from './routes';
import Routes from './utils/Routes';
import SideBar from './SideBar';

const App = () => (
  <SideBar>
    <ul>
      <li>Primer link</li>
      <li>Segundo link</li>
      <li>Tercer link</li>
    </ul>
  </SideBar>
//<Routes routes={routes} />
);

export default App;
