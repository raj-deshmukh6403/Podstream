import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import CreatorRoute from "./components/CreatorRoute";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PodcastDetails from "./pages/PodcastDetails";
import PodcastCreate from "./pages/PodcastCreate";
import PodcastEdit from "./pages/PodcastEdit";
import CategoryList from "./components/CategoryList";
import NotFound from "./pages/NotFound";

// Layout components
import Layout from "./components/Layout";
import AdminDashboard from "./pages/AdminDash";

import ForgotPassword from './pages/forgotpassword';


function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
        />
        <Routes>
          {/* Public routes */}

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="podcast/:id" element={<PodcastDetails />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="categories" element={<CategoryList />} />
            <Route path="profile" element={<Profile />} />
          </Route>
            {/* Protected routes */}
            {/* <Route element={<PrivateRoute />}>
              <Route path="profile" element={<Profile />} />
            </Route> */}

            {/* Creator routes */}
           
             <Route element={<CreatorRoute />}>
              <Route path="/" element={<Layout />}>
              <Route path="podcast/create" element={<PodcastCreate />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="podcast/edit/:id" element={<PodcastEdit />} />
              <Route path="profile" element={<Profile />} />
             </Route>
            </Route>

            {/* Admin routes */}
            <Route element={<AdminRoute />}>
            <Route path="/admin/*" element={<AdminDashboard />} />
            </Route>
            {/* 404 and redirects */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
