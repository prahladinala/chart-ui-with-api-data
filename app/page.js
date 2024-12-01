"use client";
import React, { useEffect, useState } from "react";
import Summary from "./components/Summary";
import Chart from "./components/Chart";
import Statistics from "./components/Statistics";
import Analysis from "./components/Analysis";
import Settings from "./components/Settings";
import { Toaster } from "react-hot-toast";
export default function Home() {
  const [chartData, setChartData] = useState(null);
  const [activeTab, setActiveTab] = useState("Chart");

  useEffect(() => {
    fetch("/api/chart-data")
      .then((response) => response.json())
      .then((data) => setChartData(data))
      .catch((error) => {
        console.error("Error fetching chart data:", error);
        toast.error("Failed to load chart data");
      });
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Summary":
        return <Summary />;
      case "Chart":
        return <Chart />;
      case "Statistics":
        return <Statistics />;
      case "Analysis":
        return <Analysis />;
      case "Settings":
        return <Settings />;
      default:
        return null;
    }
  };

  if (!chartData) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Toaster />
      <div className=" mb-4">
        <p className="text-5xl text-gray-800 font-sans">
          {chartData.currentPrice.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          <sup className="text-lg text-gray-400">USD</sup>
        </p>
        <p
          className={`pt-2 ${
            chartData.change > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {chartData.change > 0 ? "+" : ""}
          {chartData.change.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          ({((chartData.change / chartData.currentPrice) * 100).toFixed(2)}%)
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-around border-b text-sm font-sans">
        {["Summary", "Chart", "Statistics", "Analysis", "Settings"].map(
          (tab) => (
            <button
              key={tab}
              className={`pb-3 ${
                activeTab === tab
                  ? "border-b-[3px] border-[#4B40EE] text-bold"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* Tab Content */}
      <div className="mt-4">{renderTabContent()}</div>
    </div>
  );
}
