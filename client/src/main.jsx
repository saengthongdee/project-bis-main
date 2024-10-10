import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Theme
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme.js'

// Human Resource
import Dashbord from './HR/dashbord.jsx';
import CreateCost from './HR/createcost.jsx';
import Repost from './HR/repost.jsx';

// Employee
import DashboardPage from './EMP/dashboard.jsx';
import CoursesPage from './EMP/courses.jsx';
import CoursePage from './EMP/course.jsx';

const router = createBrowserRouter([
  {
    path: "index",
    element: <App />
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "dashboard",
    element: <Dashbord />
  },
  {
    path: "createcost",
    element: <CreateCost />
  },
  {
    path: "repost",
    element: <Repost />
  },
  {
    path: "dashboardEMP",
    element: <DashboardPage />
  },
  {
    path: "courses",
    element: <CoursesPage />
  },
  {
    path: "course",
    element: <CoursePage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
