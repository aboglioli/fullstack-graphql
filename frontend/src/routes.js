import Dashboard from './Dashboard';
import Login from './Login';
import Home from './ProtectedPage';
import Page2 from './ProtectedPage';
import Meta from './Meta';
import NotFound from './NotFound';

let routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    private: true,
    component: Dashboard,
    routes: [
      {
        path: '/home',
        private: true,
        component: Home,
      },
      {
        path: '/page2',
        private: true,
        component: Page2,
      },
      {
        path: '/meta',
        private: true,
        component: Meta,
      },
      {
        component: NotFound,
      },
    ],
  },
];

export default routes;
