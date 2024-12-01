"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Statistics = () => {
  const [statisticsData, setStatisticsData] = useState(null);

  useEffect(() => {
    fetch("/api/statistics")
      .then((response) => response.json())
      .then((data) => setStatisticsData(data))
      .catch((error) => toast.error("Error fetching statistics data:", error));
  }, []);

  if (!statisticsData) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const { volume, marketCap, priceHistory } = statisticsData;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Statistics</h2>

      {/* Market Capitalization Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Market Capitalization:</h3>
        <p className="text-md">Current: {marketCap.current.toLocaleString()}</p>
        <p className="text-md">
          All-Time High: {marketCap.allTimeHigh.toLocaleString()}
        </p>
      </div>

      {/* Volume Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Volume:</h3>
        <p className="text-md">24-Hour: {volume["24Hour"].toLocaleString()}</p>
        <p className="text-md">7-Day: {volume["7Day"].toLocaleString()}</p>
        <p className="text-md">30-Day: {volume["30Day"].toLocaleString()}</p>
      </div>

      {/* Price History Section */}
      <div>
        <h3 className="text-lg font-semibold">Price History:</h3>
        <p className="text-md">Highest: ${priceHistory.highest.toFixed(2)}</p>
        <p className="text-md">Lowest: ${priceHistory.lowest.toFixed(2)}</p>
        <p className="text-md">Average: ${priceHistory.average.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Statistics;
