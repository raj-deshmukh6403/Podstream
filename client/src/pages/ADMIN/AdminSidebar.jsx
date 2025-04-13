import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, Users, Headphones, Tag, BarChart2, 
  FileText, LogOut, ChevronLeft, ChevronRight, List, Grid 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const navItems = [
    { path: '/admin/dashboard', icon: <Home size={20} />, label: 'Overview' },
    { path: '/admin/users', icon: <Users size={20} />, label: 'Users' },
    { path: '/admin/podcasts', icon: <Headphones size={20} />, label: 'Podcasts' },
    { path: '/admin/categories', icon: <Grid size={20} />, label: 'Categories' },
    { path: '/admin/tags', icon: <Tag size={20} />, label: 'Tags' },
    { path: '/admin/analytics', icon: <BarChart2 size={20} />, label: 'Analytics' },
    // { path: '/admin/reports', icon: <FileText size={20} />, label: 'Reports' },
  ];
  
  return (
    <div 
      className={`bg-gray-900 text-white h-screen fixed left-0 top-0 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen && <h2 className="text-xl font-bold">Admin Panel</h2>}
        <button 
          onClick={toggleSidebar}
          className={`p-2 rounded-full hover:bg-gray-700 ${!isOpen && 'mx-auto'}`}
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <nav className="mt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center px-4 py-3 transition-colors
              ${isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
            `}
          >
            <span className="inline-flex">{item.icon}</span>
            {isOpen && <span className="ml-3">{item.label}</span>}
          </NavLink>
        ))}
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors"
        >
          <span className="inline-flex"><LogOut size={20} /></span>
          {isOpen && <span className="ml-3">Logout</span>}
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;