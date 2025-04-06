import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const CreatorRoute = () => {
  const { user, loading } = useAuth();
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Check if user is authenticated and has creator role
  if (!user) {
    toast.error('Please login to access this page');
    return <Navigate to="/login" />;
  }
  
  if (user.role !== 'creator') {
    toast.error('You need to be a creator to access this page');
    return <Navigate to="/" />;
  }
  
  return <Outlet />;
};

export default CreatorRoute; 