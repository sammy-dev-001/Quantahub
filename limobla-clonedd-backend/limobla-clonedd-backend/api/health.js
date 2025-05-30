module.exports = (req, res) => {
  if (req.method === 'GET') {
    res.status(200).json({ status: 'OK', message: 'Service is running' });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};