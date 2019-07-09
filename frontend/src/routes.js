import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Home from './pages/ProtectedPage';
import Page2 from './pages/ProtectedPage';
import Meta from './pages/Meta';
import NotFound from './pages/NotFound';

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
