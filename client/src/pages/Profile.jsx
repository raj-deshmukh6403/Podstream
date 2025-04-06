import React, { useState, useEffect } from 'react';
import { FaCamera, FaEdit, FaSave, FaTimes, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
    notificationPreferences: {
      newPodcasts: false, 
      comments: false,
      newsletter: false
    },
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }
        
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const currentUserId = currentUser?._id;
        
        const endpoint = userId && userId !== currentUserId 
          ? `http://localhost:5000/api/auth/${userId}`
          : 'http://localhost:5000/api/auth/me';
        
        setIsOwnProfile(!userId || userId === currentUserId);
        
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
        
        const res = await axios.get(endpoint, config);
        const userData = res.data.data || res.data;
        setUser(userData);
        
        setFormData({
          username: userData.username || '',
          email: userData.email || '',
          bio: userData.bio || '',
          notificationPreferences: {
            newPodcasts: userData.notificationPreferences?.newPodcasts ?? false,
            comments: userData.notificationPreferences?.comments ?? false,
            newsletter: userData.notificationPreferences?.newsletter ?? false
          },
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } catch (err) {
        console.error('Error fetching user data:', err);
        setAlert({
          message: 'Failed to load profile data',
          type: 'danger'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, userId]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    
    if (name.startsWith('notification-')) {
      const preference = name.split('-')[1];
      setFormData({
        ...formData,
        notificationPreferences: {
          ...formData.notificationPreferences,
          [preference]: checked
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    setAlert({ message: '', type: '' });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      notificationPreferences: {
        ...formData.notificationPreferences,
        [name]: checked
      }
    });
    
    setAlert({ message: '', type: '' });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      try {
        const token = localStorage.getItem('token');
        const formDataToUpload = new FormData();
        formDataToUpload.append('profileImage', file);
        
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        };
        
        const response = await axios.put('http://localhost:5000/api/auth/profile/image', formDataToUpload, config);
        
        if (response.data) {
          setAlert({
            message: 'Profile image updated successfully',
            type: 'success'
          });
          
          if (response.data.data && response.data.data.profileImage) {
            setUser(prevUser => ({
              ...prevUser,
              profileImage: response.data.data.profileImage
            }));
          }
          
          setTimeout(() => {
            setAlert({ message: '', type: '' });
          }, 3000);
        }
      } catch (err) {
        console.error('Error uploading image:', err);
        setAlert({
          message: err.response?.data?.message || 'Failed to update profile image',
          type: 'danger'
        });
      }
    }
    setShowImageUpload(false);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    if (formData.username.trim() === '') {
      setAlert({
        message: 'Username is required',
        type: 'danger'
      });
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      
      const updateData = {
        username: formData.username,
        bio: formData.bio,
        notificationPreferences: formData.notificationPreferences
      };
      
      const res = await axios.put('http://localhost:5000/api/auth/profile', updateData, config);
      
      if (res.data) {
        const userData = res.data.data || res.data;
        setUser(userData);
        
        localStorage.setItem('user', JSON.stringify(userData));
        
        setIsEditing(false);
        setAlert({
          message: 'Profile updated successfully',
          type: 'success'
        });
        
        setTimeout(() => {
          setAlert({ message: '', type: '' });
        }, 3000);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setAlert({
        message: err.response?.data?.message || 'Failed to update profile',
        type: 'danger'
      });
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setAlert({
        message: 'New passwords do not match',
        type: 'danger'
      });
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      
      await axios.put(
        'http://localhost:5000/api/auth/password',
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        },
        config
      );
      
      setAlert({
        message: 'Password updated successfully',
        type: 'success'
      });
      
      setFormData(prevState => ({
        ...prevState,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      setTimeout(() => {
        setAlert({ message: '', type: '' });
      }, 3000);
    } catch (err) {
      console.error('Error updating password:', err);
      setAlert({
        message: err.response?.data?.message || 'Failed to update password',
        type: 'danger'
      });
    }
  };

  // Custom components
  const Loader = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );

  const Alert = ({ message, type }) => {
    if (!message) return null;
    
    const bgColor = type === 'danger' ? 'bg-red-100 border-red-400 text-red-700' : 
                    type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 
                    'bg-blue-100 border-blue-400 text-blue-700';
    
    return (
      <div className={`${bgColor} px-4 py-3 rounded border mb-4`} role="alert">
        <span className="block sm:inline">{message}</span>
      </div>
    );
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Unable to load profile. Please log in and try again.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Alert component fixed at top */}
      {alert.message && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <Alert message={alert.message} type={alert.type} />
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Profile Header with Cover Banner */}
            <div className="h-32 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
            
            {/* Profile Image Section */}
            <div className="flex flex-col items-center -mt-16 px-4 pb-8">
              <div className="relative mb-4">
                {/* Profile Image */}
                {((user.profileImage && (typeof user.profileImage === 'string' ? user.profileImage !== 'default-profile.png' : user.profileImage.url)) || imagePreview) ? (
                  <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                    <img 
                      src={imagePreview || (typeof user.profileImage === 'string' ? user.profileImage : user.profileImage.url)} 
                      alt={user.username} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-700 flex items-center justify-center text-4xl text-white font-bold">
                    {getInitials(user.username)}
                  </div>
                )}
                
                {/* Camera Icon - Only show for own profile */}
                {isOwnProfile && (
                  <button 
                    onClick={() => setShowImageUpload(!showImageUpload)} 
                    className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
                  >
                    <FaCamera size={16} />
                  </button>
                )}
                
                {/* Image Upload Dropdown */}
                {showImageUpload && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-md shadow-lg z-10 p-3 w-60">
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      Upload Profile Picture
                    </label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange}
                      className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-indigo-50 file:text-indigo-700
                      hover:file:bg-indigo-100"
                    />
                    <button 
                      onClick={() => setShowImageUpload(false)} 
                      className="mt-2 text-xs text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              
              {/* Profile basic information */}
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                {user.username}
              </h1>
              
              <div className="text-gray-500 text-sm mb-3">
                {user.role === 'creator' && 'Content Creator'}
                {user.role === 'admin' && 'Administrator'}
                {user.role !== 'creator' && user.role !== 'admin' && 'Member'}
              </div>
              
              <div className="text-gray-600 text-sm mb-4">
                Joined {new Date(user.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              
              {/* Edit button - Only show for own profile */}
              {isOwnProfile && !isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
                >
                  <FaEdit className="mr-2" /> Edit Profile
                </button>
              )}
              
              {isOwnProfile && isEditing && (
                <button 
                  onClick={() => setIsEditing(false)}
                  className="flex items-center bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition"
                >
                  <FaTimes className="mr-2" /> Cancel
                </button>
              )}
            </div>
          </div>
          
          {/* Quick Info Card */}
          {!isEditing && (
            <div className="bg-white rounded-lg shadow mt-6 p-6">
              <h3 className="font-medium text-gray-700 mb-4 border-b pb-2">Quick Info</h3>
              
              <div className="text-gray-600 mb-3">
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 w-20">Email:</span>
                  <span>{user.email}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-medium text-gray-700 mb-2">Bio</h3>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {user.bio || "No bio provided yet."}
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Right Column - Content Area */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-lg shadow">
            {/* Tabs - Only for own profile */}
            {isOwnProfile && (
              <div className="border-b">
                <nav className="flex px-6">
                  <button
                    type="button"
                    onClick={() => setActiveTab('profile')}
                    className={`mr-6 py-4 font-medium relative ${
                      activeTab === 'profile'
                        ? 'text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Profile Information
                    {activeTab === 'profile' && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"></span>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setActiveTab('security')}
                    className={`mr-6 py-4 font-medium relative ${
                      activeTab === 'security'
                        ? 'text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Password & Security
                    {activeTab === 'security' && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"></span>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setActiveTab('notifications')}
                    className={`mr-6 py-4 font-medium relative ${
                      activeTab === 'notifications'
                        ? 'text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Notification Settings
                    {activeTab === 'notifications' && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"></span>
                    )}
                  </button>
                </nav>
              </div>
            )}
            
            {/* Content Area */}
            <div className="p-6">
              {/* Profile Information Tab */}
              {(!isOwnProfile || activeTab === 'profile') && (
                <>
                  {!isOwnProfile || !isEditing ? (
                    // Display mode for non-owners or when not editing
                    <>
                      <h2 className="text-xl font-bold text-gray-800 mb-6">Profile Information</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Information */}
                        <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                          <h3 className="font-medium text-gray-800 mb-4 pb-2 border-b">Account Details</h3>
                          
                          <div className="space-y-3">
                            <div className="flex flex-col">
                              <span className="text-sm text-gray-500">Username</span>
                              <span className="font-medium">{user.username}</span>
                            </div>
                            
                            <div className="flex flex-col">
                              <span className="text-sm text-gray-500">Email</span>
                              <span className="font-medium">{user.email}</span>
                            </div>
                            
                            <div className="flex flex-col">
                              <span className="text-sm text-gray-500">Role</span>
                              <span className="font-medium">
                                {user.role === 'creator' && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                    Content Creator
                                  </span>
                                )}
                                {user.role === 'admin' && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    Administrator
                                  </span>
                                )}
                                {user.role === 'user' && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    Standard User
                                  </span>
                                )}
                              </span>
                            </div>
                            
                            <div className="flex flex-col">
                              <span className="text-sm text-gray-500">Member Since</span>
                              <span className="font-medium">
                                {new Date(user.createdAt).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Content Stats */}
                        <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                          <h3 className="font-medium text-gray-800 mb-4 pb-2 border-b">Content Statistics</h3>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-md shadow-sm">
                              <div className="text-2xl font-bold text-indigo-600">
                                {user.podcasts?.length || 0}
                              </div>
                              <div className="text-sm text-gray-500">Podcasts</div>
                            </div>
                            
                            <div className="bg-white p-4 rounded-md shadow-sm">
                              <div className="text-2xl font-bold text-indigo-600">
                                {/* You would need to fetch this data */}
                                0
                              </div>
                              <div className="text-sm text-gray-500">Followers</div>
                            </div>
                            
                            <div className="bg-white p-4 rounded-md shadow-sm">
                              <div className="text-2xl font-bold text-indigo-600">
                                {/* You would need to fetch this data */}
                                0
                              </div>
                              <div className="text-sm text-gray-500">Comments</div>
                            </div>
                            
                            <div className="bg-white p-4 rounded-md shadow-sm">
                              <div className="text-2xl font-bold text-indigo-600">
                                {/* You would need to fetch this data */}
                                0
                              </div>
                              <div className="text-sm text-gray-500">Likes</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Notification Preferences (visible to profile owner only in non-edit mode) */}
                      {isOwnProfile && (
                        <div className="mt-8">
                          <h3 className="font-medium text-gray-800 mb-4 pb-2 border-b">Notification Preferences</h3>
                          
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <ul className="space-y-2">
                              <li className="flex items-center">
                                <span className={`inline-block w-4 h-4 rounded-full mr-3 ${user.notificationPreferences?.newPodcasts ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                <span>New podcast releases: <span className="font-medium">{user.notificationPreferences?.newPodcasts ? 'Enabled' : 'Disabled'}</span></span>
                              </li>
                              <li className="flex items-center">
                                <span className={`inline-block w-4 h-4 rounded-full mr-3 ${user.notificationPreferences?.comments ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                <span>Comments and replies: <span className="font-medium">{user.notificationPreferences?.comments ? 'Enabled' : 'Disabled'}</span></span>
                              </li>
                              <li className="flex items-center">
                                <span className={`inline-block w-4 h-4 rounded-full mr-3 ${user.notificationPreferences?.newsletter ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                <span>Platform updates: <span className="font-medium">{user.notificationPreferences?.newsletter ? 'Enabled' : 'Disabled'}</span></span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}
                      
                      {/* Bio Section
                      <div className="mt-8">
                        <h3 className="font-medium text-gray-800 mb-4 pb-2 border-b">About Me</h3>
                        
                        <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                          <p className="text-gray-700 whitespace-pre-wrap">
                            {user.bio || "This user hasn't added a bio yet."}
                          </p>
                        </div>
                      </div> */}
                    </>
                  ) : (
                    // Edit mode for profile information
                    <form onSubmit={handleProfileUpdate}>
                      <h2 className="text-xl font-bold text-gray-800 mb-6">Edit Profile Information</h2>
                      
                      <div className="mb-6">
                        <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          required
                        />
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                        />
                        <p className="mt-1 text-sm text-gray-500">Email cannot be changed</p>
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="bio" className="block text-gray-700 font-medium mb-2">Bio</label>
                        <textarea
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          rows="6"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                      
                      <div className="flex justify-end mt-8">
                        <button
                          type="submit"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition flex items-center"
                        >
                          <FaSave className="mr-2" /> Save Changes
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}
              
              {/* Password & Security Tab */}
              {isOwnProfile && activeTab === 'security' && (
                <form onSubmit={handlePasswordChange}>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Password & Security</h2>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                    <p className="text-sm text-blue-700">
                      For your security, please enter your current password before setting a new one.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="currentPassword" className="block text-gray-700 font-medium mb-2">Current Password</label>
                    <input
                      id="currentPassword"
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">New Password</label>
                    <input
                      id="newPassword"
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm New Password</label>
                    <input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end mt-8">
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition flex items-center"
                    >
                      <FaSave className="mr-2" /> Update Password
                    </button>
                  </div>
                </form>
              )}
              
              {/* Notification Preferences Tab */}
              {isOwnProfile && activeTab === 'notifications' && (
                <form onSubmit={handleProfileUpdate}>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Notification Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                      <div className="flex items-center mb-2">
                        <input
                          id="notification-newPodcasts"
                          type="checkbox"
                          name="newPodcasts"
                          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          checked={formData.notificationPreferences.newPodcasts}
                          onChange={handleCheckboxChange}
                        />
                        <label htmlFor="notification-newPodcasts" className="ml-3 text-gray-800 font-medium">
                          New podcast releases
                        </label>
                      </div>
                      <p className="text-sm text-gray-500 ml-8">
                        Get notified when creators you follow publish new podcast episodes
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                      <div className="flex items-center mb-2">
                        <input
                          id="notification-comments"
                          type="checkbox"
                          name="comments"
                          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          checked={formData.notificationPreferences.comments}
                          onChange={handleCheckboxChange}
                        />
                        <label htmlFor="notification-comments" className="ml-3 text-gray-800 font-medium">
                          Comments and replies
                        </label>
                      </div>
                      <p className="text-sm text-gray-500 ml-8">
                        Get notified about comments on your podcasts or replies to your comments
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                      <div className="flex items-center mb-2">
                        <input
                          id="notification-newsletter"
                          type="checkbox"
                          name="newsletter"
                          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          checked={formData.notificationPreferences.newsletter}
                          onChange={handleCheckboxChange}
                        />
                        <label htmlFor="notification-newsletter" className="ml-3 text-gray-800 font-medium">
                          Platform updates
                        </label>
                      </div>
                      <p className="text-sm text-gray-500 ml-8">
                        Receive our weekly newsletter and important platform updates
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-8">
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition flex items-center"
                    >
                      <FaSave className="mr-2" /> Save Preferences
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;