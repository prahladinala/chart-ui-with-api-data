export async function GET() {
  const analysisData = {
    trend: "Bullish",
    predictions: {
      shortTerm: {
        prediction: "Price expected to rise by 3% in the next 24 hours.",
        confidence: 85,
      },
      longTerm: {
        prediction: "Price expected to drop by 5% in the next month.",
        confidence: 60,
      },
    },
    newsImpact: {
      "Company XYZ profit report":
        "Positive impact, expected to boost stock by 2%.",
      "Global market highs": "Neutral impact, market will stabilize.",
    },
  };

  return new Response(JSON.stringify(analysisData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
