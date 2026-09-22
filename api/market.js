export default async function handler(req, res) {
  try {
    const apiKey = process.env.TWELVE_DATA_API_KEY;

    return res.status(200).json({
      envKeyExists: Boolean(apiKey),
      envKeyLength: apiKey ? apiKey.length : 0
    });

  } catch (error) {
    return res.status(500).json({
      error: "Test failed"
    });
  }
}