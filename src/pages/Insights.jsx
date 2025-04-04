// Insights.jsx
import React, { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import useInsightStore from "../store/useInsightStore";

Chart.register(...registerables);

export default function Insights() {
  const { insights, loading, error, fetchInsights, clearInsights } =
    useInsightStore();

  useEffect(() => {
    fetchInsights();

    return () => clearInsights();
  }, [fetchInsights, clearInsights]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading insights...
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="flex justify-center items-center h-screen">
        No insights available.
      </div>
    );
  }

  // Chart Data Preparation
  const barChartData = {
    labels: insights.mostOrderedMenuItems?.map((item) => item.name) || [],
    datasets: [
      {
        label: "Order Count",
        data:
          insights.mostOrderedMenuItems?.map((item) => item.order_count) || [],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: insights.favoriteWineMenu?.map((wine) => wine.name) || [],
    datasets: [
      {
        data: insights.favoriteWineMenu?.map((wine) => wine.order_count) || [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">AI Agent Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p>Total Messages: {insights.totalMessageCount}</p>
          <p>User/Assistant Ratio: {insights.userAssistantRatio}</p>
          <p>
            Average Conversation Length: {insights.averageConversationLength}
          </p>
        </div>

        {insights.mostOrderedMenuItems &&
          insights.mostOrderedMenuItems.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Most Ordered Menu Items
              </h3>
              <Bar data={barChartData} />
            </div>
          )}

        {insights.favoriteWineMenu && insights.favoriteWineMenu.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Favorite Wine Menu</h3>
            <Pie data={pieChartData} />
          </div>
        )}
      </div>
    </div>
  );
}
