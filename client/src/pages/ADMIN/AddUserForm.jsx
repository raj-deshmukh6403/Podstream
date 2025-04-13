import React from 'react';

const AddUserForm = ({ formData, setFormData, handleAddUser, closeModal }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make sure we have all required fields
    if (!formData.username || !formData.email || !formData.password) {
      alert('Please fill all required fields');
      return;
    }
    handleAddUser(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Add New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username || ''}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password || ''}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select
            name="role"
            value={formData.role || 'user'}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option value="user">User</option>
            <option value="creator">Creator</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;