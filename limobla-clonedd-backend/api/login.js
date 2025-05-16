export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ message: 'API is working fine' });
  }

  if (req.method === 'POST') {
    const { email, password } = req.body;
    if (email === 'test@example.com' && password === '1234') {
      return res.status(200).json({ message: 'Login successful' });
    }
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.status(405).json({ message: 'Method not allowed' });
}
