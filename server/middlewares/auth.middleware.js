const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token, authorization denied',
        logout: true
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const currentTime = Math.floor(Date.now() / 1000);
      
      if (decoded.exp <= currentTime) {
        return res.status(401).json({
          success: false,
          message: 'Token has expired',
          logout: true
        });
      }

      if (decoded.exp - currentTime < 1800) {
        return res.status(401).json({
          success: false,
          message: 'Token is about to expire',
          logout: true,
          tokenExpiring: true
        });
      }

      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found',
          logout: true
        });
      }

      if (user.status !== 'active') {
        return res.status(401).json({
          success: false,
          message: 'User account is not active',
          logout: true
        });
      }

      req.user = user;
      req.tokenExp = decoded.exp;
      next();

    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token has expired',
          logout: true
        });
      }

      return res.status(401).json({
        success: false,
        message: 'Token is not valid',
        logout: true
      });
    }

  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Authentication error',
      logout: true
    });
  }
};

exports.isAdmin = (req, res, next) => {
  console.log(req.user)
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Admin access required',
      logout: true
    });
  }
};