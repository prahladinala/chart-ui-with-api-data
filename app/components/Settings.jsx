"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Settings = () => {
  const [settingsData, setSettingsData] = useState(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((response) => response.json())
      .then((data) => setSettingsData(data))
      .catch((error) => toast.error("Error fetching settings data:", error));
  }, []);

  if (!settingsData) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Settings</h2>
      <div className="mt-4">
        <p className="text-lg">Theme: {settingsData.theme.current}</p>
        <p className="text-lg">
          Notifications Enabled:{" "}
          {settingsData.notifications.enabled ? "Yes" : "No"}
        </p>
        {/* <p className="text-lg">Language: {settingsData.language}</p> */}
      </div>
    </div>
  );
};

export default Settings;
