"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Analysis = () => {
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    fetch("/api/analysis")
      .then((response) => response.json())
      .then((data) => setAnalysisData(data))
      .catch((error) => toast.error("Error fetching analysis data:", error));
  }, []);

  if (!analysisData) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Analysis: {analysisData.trend}</h2>

      {/* Predictions Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Predictions:</h3>
        <div className="mt-2">
          <p className="text-md">
            <strong>Short-Term:</strong>{" "}
            {analysisData.predictions.shortTerm.prediction}
          </p>
          <p className="text-sm text-gray-500">
            Confidence: {analysisData.predictions.shortTerm.confidence}%
          </p>
        </div>
        <div className="mt-4">
          <p className="text-md">
            <strong>Long-Term:</strong>{" "}
            {analysisData.predictions.longTerm.prediction}
          </p>
          <p className="text-sm text-gray-500">
            Confidence: {analysisData.predictions.longTerm.confidence}%
          </p>
        </div>
      </div>

      {/* News Impact Section */}
      <div>
        <h3 className="text-lg font-semibold">News Impact:</h3>
        <ul className="list-disc ml-5 mt-2">
          {Object.entries(analysisData.newsImpact).map(
            ([newsTitle, impact], index) => (
              <li key={index} className="text-md">
                <strong>{newsTitle}:</strong> {impact}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Analysis;
