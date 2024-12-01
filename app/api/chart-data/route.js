export async function GET() {
  const chartData = {
    currentPrice: 63179.71,
    change: 2161.42,
    data: {
      "1d": [
        { time: "2024-12-01 00:00", value: 100 },
        { time: "2024-12-01 01:00", value: 102 },
        { time: "2024-12-01 02:00", value: 101 },
        { time: "2024-12-01 03:00", value: 103 },
        { time: "2024-12-01 04:00", value: 104 },
        { time: "2024-12-01 05:00", value: 105 },
      ],
      "3d": [
        { time: "2024-11-29", value: 98 },
        { time: "2024-11-30", value: 101 },
        { time: "2024-12-01", value: 103 },
      ],
      // ... other data
    },
  };

  return new Response(JSON.stringify(chartData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
