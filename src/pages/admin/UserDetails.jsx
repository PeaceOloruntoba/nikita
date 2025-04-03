import React, { useEffect } from "react";
import { useParams, Link } from "react-router";
import useAdminStore from "../../store/useAdminStore";

export default function UserDetails() {
  const { userId } = useParams();
  const { selectedUser, getUser, isAdminRequesting } = useAdminStore();

  useEffect(() => {
    getUser(userId);
  }, [getUser, userId]);

  if (isAdminRequesting)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading user details...
      </div>
    );
  if (!selectedUser)
    return (
      <div className="flex justify-center items-center h-screen">
        User not found.
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">User Details</h2>
      <div className="bg-white shadow rounded-md p-4">
        <p className="mb-2">
          <span className="font-semibold">ID:</span> {selectedUser.id}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Email:</span> {selectedUser.email}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Role:</span> {selectedUser.role}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Created At:</span>{" "}
          {new Date(selectedUser.created_at).toLocaleDateString()}{" "}
          {new Date(selectedUser.created_at).toLocaleTimeString()}
        </p>
        {/* Add more user details as needed */}
        <Link
          to="/admin/users"
          className="inline-block mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Back to Users
        </Link>
      </div>
    </div>
  );
}
