import config from './config';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProtectedPage from './pages/ProtectedPage';
import Meta from './pages/Meta';

let routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    private: config.authEnabled,
    component: Dashboard,
    routes: [
      {
        path: '/page1',
        private: config.authEnabled,
        component: ProtectedPage,
      },
      {
        path: '/meta',
        private: config.authEnabled,
        component: Meta,
      },
      {
        private: config.authEnabled,
        component: NotFound,
      },
    ],
  },
];

export default routes;
