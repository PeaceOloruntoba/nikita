import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import useAdminStore from "../../store/useAdminStore";

Chart.register(...registerables);

export default function Dashboard() {
  const { dashboardData, getDashboard, isAdminRequesting } = useAdminStore();

  useEffect(() => {
    getDashboard();
  }, [getDashboard]);

  if (isAdminRequesting)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading dashboard data...
      </div>
    );
  if (!dashboardData)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  const userRegistrationData = {
    labels: dashboardData.userRegistrations.map(
      (item) => item.registration_date
    ),
    datasets: [
      {
        label: "New Users",
        data: dashboardData.userRegistrations.map(
          (item) => item.registration_count
        ),
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
    ],
  };

  const restaurantRegistrationData = {
    labels: dashboardData.restaurantRegistrations.map(
      (item) => item.registration_date
    ),
    datasets: [
      {
        label: "New Restaurants",
        data: dashboardData.restaurantRegistrations.map(
          (item) => item.registration_count
        ),
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-md p-4">
          <h3 className="text-lg font-semibold mb-2">Total Counts</h3>
          <p>
            Total Restaurants:{" "}
            <span className="font-bold">{dashboardData.totalRestaurants}</span>
          </p>
          <p>
            Total Users:{" "}
            <span className="font-bold">{dashboardData.totalUsers}</span>
          </p>
        </div>
        <div className="bg-white shadow rounded-md p-4">
          <h3 className="text-lg font-semibold mb-2">
            User Registrations (Last 30 Days)
          </h3>
          {dashboardData.userRegistrations.length > 0 ? (
            <Bar data={userRegistrationData} />
          ) : (
            <p>No user registration data available.</p>
          )}
        </div>
        <div className="bg-white shadow rounded-md p-4">
          <h3 className="text-lg font-semibold mb-2">
            Restaurant Registrations (Last 30 Days)
          </h3>
          {dashboardData.restaurantRegistrations.length > 0 ? (
            <Bar data={restaurantRegistrationData} />
          ) : (
            <p>No restaurant registration data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
