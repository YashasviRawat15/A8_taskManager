const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

function verifyToken (req, res, next)  {
    
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    console.log(`JWT Secret: ${jwtSecret}`);
    if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: 'Token expired' });
        } else if (err.name === 'JsonWebTokenError') {
          return res.status(403).json({ error: 'Invalid token' });
        } else {
          return res.status(500).json({ error: 'Internal server error' });
        }
      }

    console.log('Decoded token:', decoded);
    req.user = decoded;
    //req.tokenPayload = decoded;

    next();
  });
};

module.exports = verifyToken;
