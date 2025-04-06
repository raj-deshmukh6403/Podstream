import React from 'react';

const CategoryList = () => {
  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <ul className="space-y-2">
        <li className="hover:text-blue-600 cursor-pointer">Technology</li>
        <li className="hover:text-blue-600 cursor-pointer">Education</li>
        <li className="hover:text-blue-600 cursor-pointer">Health</li>
        <li className="hover:text-blue-600 cursor-pointer">Business</li>
      </ul>
    </div>
  );
};

export default CategoryList;
