const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authorize = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Authorization denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET);

    const verifiedUser = await User.findById(verified.id).select('-password');

    if (!verifiedUser || !verifiedUser.admin) {
      return res.status(401).json({ error: 'Authorization denied' });
    }

    req.user = verifiedUser;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Authorization denied' });
  }
};

module.exports = authorize;
