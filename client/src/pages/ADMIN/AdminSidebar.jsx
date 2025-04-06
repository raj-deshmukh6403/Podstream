import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, Users, Headphones, Tag, BarChart2, 
  FileText, LogOut, ChevronLeft, ChevronRight, List, Grid 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useAuth();
  
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
        <NavLink 
          to="/admin" 
          end
          className={({ isActive }) => 
            `flex items-center p-4 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
          }
        >
          <Home size={20} />
          {isOpen && <span className="ml-4">Dashboard</span>}
        </NavLink>
        
        <NavLink 
          to="/admin/users" 
          className={({ isActive }) => 
            `flex items-center p-4 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
          }
        >
          <Users size={20} />
          {isOpen && <span className="ml-4">Users</span>}
        </NavLink>
        
        <NavLink 
          to="/admin/podcasts" 
          className={({ isActive }) => 
            `flex items-center p-4 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
          }
        >
          <Headphones size={20} />
          {isOpen && <span className="ml-4">Podcasts</span>}
        </NavLink>
        
        <NavLink 
          to="/admin/categories" 
          className={({ isActive }) => 
            `flex items-center p-4 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
          }
        >
          <Grid size={20} />
          {isOpen && <span className="ml-4">Categories</span>}
        </NavLink>
        
        <NavLink 
          to="/admin/tags" 
          className={({ isActive }) => 
            `flex items-center p-4 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
          }
        >
          <Tag size={20} />
          {isOpen && <span className="ml-4">Tags</span>}
        </NavLink>
        
        <NavLink 
          to="/admin/analytics" 
          className={({ isActive }) => 
            `flex items-center p-4 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
          }
        >
          <BarChart2 size={20} />
          {isOpen && <span className="ml-4">Analytics</span>}
        </NavLink>
        
        <NavLink 
          to="/admin/reports" 
          className={({ isActive }) => 
            `flex items-center p-4 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
          }
        >
          <FileText size={20} />
          {isOpen && <span className="ml-4">Reports</span>}
        </NavLink>
      </nav>
      
      <div className="absolute bottom-0 w-full border-t border-gray-700">
        <button 
          onClick={logout}
          className="flex items-center p-4 w-full hover:bg-gray-700"
        >
          <LogOut size={20} />
          {isOpen && <span className="ml-4">Logout</span>}
        </button>   
      </div>
    </div>
  );
};

export default AdminSidebar;