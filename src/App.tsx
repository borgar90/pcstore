import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import { publicRoutes, protectedRoutes, adminRoutes } from './routes';

interface ProtectedRouteProps {
  element: React.ReactElement;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, adminOnly = false }) => {
  const { user, loading, checkPermission } = useAuth();
  const [hasPermission, setHasPermission] = React.useState<boolean | null>(null);
  const [isChecking, setIsChecking] = React.useState(true);

  React.useEffect(() => {
    const checkAdminPermission = async () => {
      if (adminOnly && user) {
        const isAdmin = await checkPermission('super');
        console.log(isAdmin);
        setHasPermission(isAdmin);
      } else {
        setHasPermission(true);
      }
      setIsChecking(false);
    };

    if (!loading && user) {
      checkAdminPermission();
    } else if (!loading && !user) {
      setIsChecking(false);
    }
  }, [user, loading, adminOnly, checkPermission]);

  if (loading || isChecking) {
    return <div>Laster...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && hasPermission === false) {
    return <>{hasPermission ? hasPermission : "not loaded"}</>
  }

  return element;
};

const AppRoutes: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Laster...</div>;
  }

  return (
    <Routes>
      {publicRoutes.map(({ path, element }: { path: string; element: React.ReactElement }) => (
        <Route key={path} path={path} element={element} />
      ))}
      {protectedRoutes.map(({ path, element }: { path: string; element: React.ReactElement }) => (
        <Route key={path} path={path} element={<ProtectedRoute element={element} />} />
      ))}
      <Route path="/admin" element={<ProtectedRoute element={<AdminLayout />} adminOnly />}>
        {adminRoutes.map(({ path, element }: { path: string; element: React.ReactElement }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;