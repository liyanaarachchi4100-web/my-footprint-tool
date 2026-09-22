export default async function handler(req, res) {
  try {
    const apiKey = process.env.TWELVE_DATA_API_KEY;

    const interval = req.query.interval || "1min";

    const url =
      `https://api.twelvedata.com/time_series?symbol=XAU/USD&interval=${interval}&outputsize=100&apikey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data.status === "error") {
      return res.status(500).json({
        error: "Twelve Data error",
        details: data
      });
    }

    return res.status(200).json({
      symbol: "XAU/USD",
      interval: interval,
      status: "live",
      values: data.values || []
    });

  } catch (error) {
    return res.status(500).json({
      error: "Market data request failed"
    });
  }
}