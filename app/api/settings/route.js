export async function GET() {
  const settingsData = {
    theme: {
      current: "light",
      availableThemes: ["light", "dark"],
    },
    chartOptions: {
      displayGrid: true,
      lineSmoothness: "curved",
    },
    notifications: {
      enabled: true,
      alertThreshold: 5,
    },
  };

  return new Response(JSON.stringify(settingsData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
