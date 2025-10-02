import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { buildTheme } from './theme';
import { useThemeStore } from './store/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './components/Layout/MainLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { MessagesPage } from './pages/MessagesPage';
import { CampaignsPage } from './pages/CampaignsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';

const queryClient = new QueryClient();

function App() {
  const mode = useThemeStore((s) => s.mode);
  return (
    <ThemeProvider theme={buildTheme(mode)}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: (
          <MainLayout>
            <DashboardPage />
          </MainLayout>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <MainLayout>
            <DashboardPage />
          </MainLayout>
        ),
      },
      {
        path: '/messages',
        element: (
          <MainLayout>
            <MessagesPage />
          </MainLayout>
        ),
      },
      {
        path: '/campaigns',
        element: (
          <MainLayout>
            <CampaignsPage />
          </MainLayout>
        ),
      },
      {
        path: '/analytics',
        element: (
          <MainLayout>
            <AnalyticsPage />
          </MainLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);
