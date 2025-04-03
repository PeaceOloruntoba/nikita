import React, { useEffect } from "react";
import { Link } from "react-router";
import useAdminStore from "../../store/useAdminStore";

export default function Restaurants() {
  const { restaurants, getRestaurants, isAdminRequesting } = useAdminStore();

  useEffect(() => {
    getRestaurants();
  }, [getRestaurants]);

  if (isAdminRequesting)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading restaurants...
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Restaurants</h2>
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
            {restaurants?.map((restaurant) => (
              <tr key={restaurant.id}>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                  {restaurant.id}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">
                  {restaurant.email}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    to={`/admin/restaurants/${restaurant.id}`}
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
