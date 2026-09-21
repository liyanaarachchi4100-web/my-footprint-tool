export default async function handler(req, res) {
  try {
    const apiKey = process.env.TWELVE_DATA_API_KEY;

    const url =
      `https://api.twelvedata.com/price?symbol=XAU/USD&apikey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || !data.price) {
      return res.status(500).json({
        error: "Twelve Data error",
        details: data
      });
    }

    res.status(200).json({
      symbol: "XAU/USD",
      price: Number(data.price),
      status: "live"
    });

  } catch (error) {
    res.status(500).json({
      error: "Market data request failed"
    });
  }
}