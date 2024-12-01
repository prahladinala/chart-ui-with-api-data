"use client";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { toast } from "react-hot-toast";

// Import Chart.js plugins
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Maximize2, Minimize2, PlusCircle } from "react-feather";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const Chart = () => {
  const [activeRange, setActiveRange] = useState("1d");
  const [data, setData] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    fetch("/api/chart-data")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Error fetching chart data:", error);
        toast.error("Failed to load chart data");
        toast.error("Check if API Server is running");
      });
  }, []);

  const handleFullScreenToggle = () => {
    const chartElement = document.getElementById("chart-container");
    const isInFullscreen =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;

    if (isInFullscreen) {
      document.exitFullscreen?.() ||
        document.webkitExitFullscreen?.() ||
        document.mozCancelFullScreen?.() ||
        document.msExitFullscreen?.();
      setIsFullscreen(false);
    } else {
      chartElement.requestFullscreen?.() ||
        chartElement.webkitRequestFullscreen?.() ||
        chartElement.mozRequestFullScreen?.() ||
        chartElement.msRequestFullscreen?.();
      setIsFullscreen(true);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!(
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement
        )
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  if (!data || !data.currentPrice) {
    return <p>Loading or Invalid Data</p>;
  }

  const { currentPrice, change, percentageChange } = data;

  // Handle compare button click
  const handleCompare = () => {
    toast.success("Compare button clicked!");
  };

  // Generate chart data dynamically based on the selected range
  const getChartData = () => {
    if (!data || !data.data || !data.data[activeRange]) return null;

    const rangeData = data.data[activeRange];
    const labels = rangeData.map(
      (point) =>
        point.time || point.day || point.week || point.month || point.year
    );
    const values = rangeData.map((point) => point.value);

    return {
      labels,
      datasets: [
        {
          label: "Price (USD)",
          data: values,
          borderColor: "#4B40EE",
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: "#4B40EE",
          fill: false,
        },
      ],
    };
  };

  const chartData = getChartData();

  return (
    <div
      id="chart-container"
      className="p-4 bg-white rounded shadow-lg overflow-auto max-h-[500px]"
    >
      {/* Current Price and Change */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <button
            onClick={handleFullScreenToggle}
            className="flex px-4 py-2 text-[#4B40EE] hover:bg-[#4B40EE] hover:text-white rounded"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="pr-1" />
                <span>Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="pr-1" />
                <span>Fullscreen</span>
              </>
            )}
          </button>
          <button
            onClick={handleCompare}
            className="flex px-4 py-2 text-[#4B40EE] hover:bg-[#4B40EE] hover:text-white rounded"
          >
            <PlusCircle className="pr-1" />
            Compare
          </button>
        </div>
        {["1d", "3d", "1w", "1m", "6m", "1y", "max"].map((range) => (
          <button
            key={range}
            className={`px-2 py-1 rounded ${
              activeRange === range ? "bg-[#4B40EE] text-white" : "bg-gray-100"
            }`}
            onClick={() => setActiveRange(range)}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Line Chart */}
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => `$${context.raw} USD`,
                },
              },
            },
          }}
          height={400} // Adjust this height as per requirement
        />
      ) : (
        <p>Loading chart data or no data available for the selected range...</p>
      )}
    </div>
  );
};

export default Chart;
