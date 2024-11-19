import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import '@fontsource/inter';
import './index.css';

import Uploadpage from './pages/Uploadpage.jsx';
import Loginpge from './pages/Loginpage.jsx';
import Infopage from './pages/Infopage.jsx';
import Homepage from './pages/Homepage.jsx';
import Statuspage from './pages/Statuspage.jsx';
import Logout from './components/logout.jsx';
import AuthGuard from './components/AuthGuard.jsx';
import InfoDonepage from './pages/InfoDonePage.jsx';

const router = createBrowserRouter([
  { path: "/", element: <Loginpge /> },
  { path: "Upload", element: <AuthGuard><Uploadpage /></AuthGuard> },
  { path: "Infomation/:postId", element: <AuthGuard><Infopage /></AuthGuard> },
  { path: "InfoDone", element: <InfoDonepage /> },
  { path: "Home", element: <AuthGuard><Homepage /></AuthGuard> },
  { path: "Status", element: <AuthGuard><Statuspage /></AuthGuard> },
  { path: "logout", element: <Logout /> },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
