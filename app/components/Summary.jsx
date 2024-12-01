"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Summary = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/summary")
      .then((response) => response.json())
      .then((data) => {
        setSummaryData(data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Error fetching summary data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Summary Header */}
      <div className="mb-6">
        <p className="text-5xl text-gray-800 font-sans">
          {summaryData.summary.currentPrice.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          <sup className="text-lg text-gray-400">USD</sup>
        </p>
        <p
          className={`pt-2 ${
            summaryData.summary.change > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {summaryData.summary.change > 0 ? "+" : ""}
          {summaryData.summary.change.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          (
          {(
            (summaryData.summary.change / summaryData.summary.currentPrice) *
            100
          ).toFixed(2)}
          %)
        </p>
      </div>

      {/* Percentage Change Info */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-xl font-semibold">24h Change</p>
          <p
            className={`text-lg ${
              summaryData.summary.percentChange24Hours > 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {summaryData.summary.percentChange24Hours}%
          </p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold">1 Week Change</p>
          <p
            className={`text-lg ${
              summaryData.summary.percentChangeWeek > 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {summaryData.summary.percentChangeWeek}%
          </p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold">1 Month Change</p>
          <p
            className={`text-lg ${
              summaryData.summary.percentChangeMonth > 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {summaryData.summary.percentChangeMonth}%
          </p>
        </div>
      </div>

      {/* News Section */}
      <div className="border-t pt-4">
        <h2 className="text-2xl font-semibold text-gray-800">Latest News</h2>
        {summaryData.news.map((newsItem) => (
          <div key={newsItem.id} className="mt-4">
            <h3 className="text-xl font-semibold text-gray-700">
              {newsItem.title}
            </h3>
            <p className="text-gray-600">{newsItem.summary}</p>
            <p className="text-sm text-gray-400">
              {new Date(newsItem.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;
