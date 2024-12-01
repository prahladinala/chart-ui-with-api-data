export async function GET() {
  const statisticsData = {
    volume: {
      "24Hour": 1200000,
      "7Day": 9000000,
      "30Day": 35000000,
    },
    marketCap: {
      current: 1500000000,
      allTimeHigh: 2000000000,
    },
    priceHistory: {
      highest: 130.0,
      lowest: 115.0,
      average: 120.0,
    },
  };

  return new Response(JSON.stringify(statisticsData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
