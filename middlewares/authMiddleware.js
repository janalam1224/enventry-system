const auth = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(400).json({ message: 'Invalid Authorization format' });
    }

    const token = parts[1];

    if (token === 'mysecrettoken') {
      next();
    } else {
      return res.status(403).json({ message: 'Invalid token' });
    }

  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized User" });
  }
};

module.exports = auth;
