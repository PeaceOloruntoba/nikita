// Users.jsx
import React, { useEffect } from "react";
import useAdminStore from "../hooks/useAdminStore";
import { Link } from "react-router-dom";

export default function Users() {
  const { users, getUsers, isAdminRequesting } = useAdminStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isAdminRequesting)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading users...
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                  {user.id}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">
                  {user.email}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    to={`/admin/users/${user.id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
