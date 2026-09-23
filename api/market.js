export default async function handler(req, res) {
  try {
    const apiKey = process.env.TWELVE_DATA_API_KEY;
    const interval = req.query.interval || "1min";

    const priceUrl =
      `https://api.twelvedata.com/time_series?symbol=XAU/USD&interval=${interval}&outputsize=100&apikey=${apiKey}`;

    const vwapUrl =
      `https://api.twelvedata.com/vwap?symbol=XAU/USD&interval=${interval}&apikey=${apiKey}`;

    const [priceResponse, vwapResponse] = await Promise.all([
      fetch(priceUrl),
      fetch(vwapUrl)
    ]);

    const data = await priceResponse.json();
    const vwapData = await vwapResponse.json();

    if (!priceResponse.ok || data.status === "error") {
      return res.status(500).json({
        error: "Twelve Data price error",
        details: data
      });
    }

    const values = data.values || [];

    const hasVolume = values.some(
      candle =>
        candle.volume !== undefined &&
        candle.volume !== null &&
        candle.volume !== ""
    );

    return res.status(200).json({
      symbol: "XAU/USD",
      interval,
      status: "live",
      hasVolume,
      vwapStatus: vwapData.status || "unknown",
      vwapValues: vwapData.values || [],
      values
    });

  } catch (error) {
    return res.status(500).json({
      error: "Market data request failed"
    });
  }
}