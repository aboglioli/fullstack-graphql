import Home from './Home';
import Login from './Login';
import Meta from './Meta';

const routes = [
  {
    path: '/',
    exact: true,
    private: true,
    component: Home,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/meta',
    component: Meta,
  },
];

export default routes;
