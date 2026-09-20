export default async function handler(req, res) {
  res.status(200).json({
    symbol: "GC",
    market: "CME Gold Futures",
    status: "waiting_for_live_feed",
    price: null,
    buy: null,
    sell: null,
    delta: null,
    cvd: null
  });
}