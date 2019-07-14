import config from './config';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Playground from './pages/Playground';
import NotFound from './pages/NotFound';
import ProtectedPage from './pages/ProtectedPage';
import Meta from './pages/Meta';

export const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/signup',
    component: Signup,
  },
  {
    path: '/playground', // testing area (Area 51)
    component: Playground,
  },
  {
    path: '/',
    private: config.authEnabled,
    component: Dashboard,
    routes: [
      {
        path: '/feed',
        component: ProtectedPage,
      },
      {
        path: '/my-posts',
        component: ProtectedPage,
      },
      {
        path: '/profile',
        component: ProtectedPage,
      },
      {
        path: '/change-password',
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

export const sidebar = [
  {
    section: 'Posts',
    items: [
      { text: 'Feed', link: '/feed' },
      { text: 'My posts', link: '/my-posts' },
    ],
  },
  {
    section: 'Profile',
    items: [
      { text: 'Profile', link: '/profile' },
      { text: 'Change password', link: '/change-password' },
    ],
  },
];
