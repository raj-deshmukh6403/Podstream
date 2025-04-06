import React, { useState } from "react";
import { useNavigate, Routes, Route, Router } from "react-router-dom";
import AdminSidebar from "./ADMIN/AdminSidebar";
import AdminUsers from "./ADMIN/AdminUsers";
import AdminPodcasts from "./ADMIN/AdminPodcasts";
import AdminCategories from "./ADMIN/AdminCategories";
import AdminTags from "./ADMIN/AdminTags";
import AdminAnalytics from "./ADMIN/AdminAnalytics";
import AdminReports from "./ADMIN/AdminReports";
import { useAuth } from "../context/AuthContext";
import NotFound from "./NotFound";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not admin
  React.useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen">
        Unauthorized access
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div
        className={`flex-1 ${
          sidebarOpen ? "ml-64" : "ml-20"
        } transition-all duration-300 overflow-auto`}
      >
        <div className="p-6">
          <Routes>
            <Route path="admin/" element={<AdminOverview />} />
            <Route path="admin/users" element={<AdminUsers />} />
            <Route path="admin/podcasts" element={<AdminPodcasts />} />
            <Route path="admin/categories" element={<AdminCategories />} />
            <Route path="admin/tags" element={<AdminTags />} />
            <Route path="admin/analytics" element={<AdminAnalytics />} />
            <Route path="admin/reports" element={<AdminReports />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

// Admin overview component showing dashboard stats
const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPodcasts: 0,
    totalListens: 0,
    recentSignups: 0,
    recentUploads: 0,
  });

//   React.useEffect(() => {
    // Fetch dashboard stats
//     const fetchStats = async () => {
//       try {
//         const response = await fetch("/api/admin/stats", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setStats(data);
//         }
//       } catch (error) {
//         console.error("Error fetching admin stats:", error);
//       }
//     };

//     fetchStats();
//   }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
          <p className="text-green-600 mt-2">
            +{stats.recentSignups} new this week
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Podcasts
          </h3>
          <p className="text-3xl font-bold mt-2">{stats.totalPodcasts}</p>
          <p className="text-green-600 mt-2">
            +{stats.recentUploads} new this week
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Total Listens</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalListens}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Recent Activity
          </h3>
          {/* Activity log would go here */}
          <p className="text-gray-500">Loading recent activities...</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            System Health
          </h3>
          {/* System metrics would go here */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Server Load</span>
                <span>45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Storage Used</span>
                <span>72%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: "72%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
