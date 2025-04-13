import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import AdminSidebar from "./ADMIN/AdminSidebar";
import AdminOverview from "./ADMIN/AdminOverview";
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
  const location = useLocation();

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
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
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminOverview />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="podcasts" element={<AdminPodcasts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="tags" element={<AdminTags />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
