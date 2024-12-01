export async function GET() {
  const summaryData = {
    summary: {
      currentPrice: 123.45,
      change: 5.67,
      high: 130.0,
      low: 115.0,
      "24HourChange": -1.23,
      marketCap: 1500000000,
      "24HourVolume": 1200000,
      percentChange24Hours: -0.8,
      percentChangeWeek: 8.0,
      percentChangeMonth: -3.0,
    },
    news: [
      {
        id: 1,
        title: "Company XYZ reports record profits",
        summary:
          "Company XYZ has posted record-breaking profits this quarter, outperforming analysts' expectations.",
        timestamp: "2024-12-01T10:00:00Z",
      },
      // ... more news items
    ],
  };

  return new Response(JSON.stringify(summaryData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
