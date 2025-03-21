// src/routes.js
import { createBrowserRouter } from 'react-router-dom';

import NGORankingPage from './pages/NGORankingPage';
import HomePage from './pages/HomePage';
import TradingPage from './pages/TradingPage';
import UserProfile from './pages/UserPage';
import CompaignPage from './pages/CompaignPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/ngo-rankings',
    element: <NGORankingPage />,
  },
  {
    path: '/trading',
    element: <TradingPage />,

  },
    {
        path: '/user-profile',
        element: <UserProfile />,
    },

    {
        path: '/compaign',
        element: <CompaignPage />,

    },
    
]);

export default router;