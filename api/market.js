export default async function handler(req, res) {
  res.status(200).json({
    status: "backend-ready",
    message: "AS OrderFlow backend is working"
  });
}