import React, { useEffect } from "react";
import { useParams, Link } from "react-router";
import useAdminStore from "../../store/useAdminStore";

export default function RestaurantDetails() {
  const { restaurantId } = useParams();
  const { selectedRestaurant, getRestaurant, isAdminRequesting } =
    useAdminStore();

  useEffect(() => {
    getRestaurant(restaurantId);
  }, [getRestaurant, restaurantId]);

  if (isAdminRequesting)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading restaurant details...
      </div>
    );
  if (!selectedRestaurant)
    return (
      <div className="flex justify-center items-center h-screen">
        Restaurant not found.
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Restaurant Details</h2>
      <div className="bg-white shadow rounded-md p-4">
        <p className="mb-2">
          <span className="font-semibold">ID:</span> {selectedRestaurant.id}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Email:</span>{" "}
          {selectedRestaurant.email}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Role:</span> {selectedRestaurant.role}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Created At:</span>{" "}
          {new Date(selectedRestaurant.created_at).toLocaleDateString()}{" "}
          {new Date(selectedRestaurant.created_at).toLocaleTimeString()}
        </p>
        <Link
          to="/admin/restaurants"
          className="inline-block mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Back to Restaurants
        </Link>
      </div>
    </div>
  );
}
