// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { AuthProvider } from "./context/AuthContext";
// import PrivateRoute from "./components/PrivateRoute";
// import AdminRoute from "./components/AdminRoute";
// import CreatorRoute from "./components/CreatorRoute";

// // Pages
// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import PodcastDetails from "./pages/PodcastDetails";
// import PodcastCreate from "./pages/PodcastCreate";
// import PodcastEdit from "./pages/PodcastEdit";
// import CategoryList from "./components/CategoryList";
// import NotFound from "./pages/NotFound";

// // Layout components
// import Layout from "./components/Layout";
// import AdminDashboard from "./pages/AdminDash";
// import AdminOverview from "./pages/ADMIN/AdminOverview";
// import AdminUsers from "./pages/ADMIN/AdminUsers";
// import AdminPodcasts from "./pages/ADMIN/AdminPodcasts";
// import AdminCategories from "./pages/ADMIN/AdminCategories";
// import AdminTags from "./pages/ADMIN/AdminTags";
// import AdminAnalytics from "./pages/ADMIN/AdminAnalytics";
// import AdminReports from "./pages/ADMIN/AdminReports";

// import ForgotPassword from './pages/forgotpassword';

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <ToastContainer
//           position="top-right"
//           autoClose={5000}
//           hideProgressBar={false}
//         />
//         <Routes>
//           {/* Public routes */}
//           <Route path="/" element={<Layout />}>
//             <Route index element={<Home />} />
//             <Route path="podcast/:id" element={<PodcastDetails />} />
//             <Route path="login" element={<Login />} />
//             <Route path="register" element={<Register />} />
//             <Route path="forgot-password" element={<ForgotPassword />} />
//             <Route path="categories" element={<CategoryList />} />
//           </Route>

//           {/* Protected routes */}
//           <Route element={<PrivateRoute />}>
//             <Route path="/" element={<Layout />}>
//               <Route path="profile" element={<Profile />} />
//             </Route>
//           </Route>

//           {/* Creator routes */}
//           <Route element={<CreatorRoute />}>
//             <Route path="/" element={<Layout />}>
//               <Route path="podcast/create" element={<PodcastCreate />} />
//               <Route path="dashboard" element={<Dashboard />} />
//               <Route path="podcast/edit/:id" element={<PodcastEdit />} />
//             </Route>
//           </Route>

//           {/* Admin routes */}
//           <Route element={<AdminRoute />}>
//             <Route path="admin/*" element={<AdminDashboard />} />
//           </Route>

//           {/* 404 and redirects */}
//           <Route path="/404" element={<NotFound />} />
//           <Route path="*" element={<Navigate to="/404" replace />} />
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import CreatorRoute from "./components/CreatorRoute";

// Pages
import Home from "./pages/Home";
import Home1 from "./pages/Home1";
import Contact from "./pages/contact";
import About from "./pages/about";
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
import AdminOverview from "./pages/ADMIN/AdminOverview";
import AdminUsers from "./pages/ADMIN/AdminUsers";
import AdminPodcasts from "./pages/ADMIN/AdminPodcasts";
import AdminCategories from "./pages/ADMIN/AdminCategories";
import AdminTags from "./pages/ADMIN/AdminTags";
import AdminAnalytics from "./pages/ADMIN/AdminAnalytics";
import AdminReports from "./pages/ADMIN/AdminReports";

import ForgotPassword from './pages/forgotpassword';

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={isAuthenticated ? <Home /> : <Navigate to="/home1" />}
        />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="home1" element={<Home1 />} />
        <Route path="podcast/:id" element={<PodcastDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="categories" element={<CategoryList />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
      <Route element={<CreatorRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="podcast/create" element={<PodcastCreate />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="podcast/edit/:id" element={<PodcastEdit />} />
        </Route>
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="admin/*" element={<AdminDashboard />} />
      </Route>

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
        />
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
