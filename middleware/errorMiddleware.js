const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    let message = err.message;

    if (err.name === 'ValidationError') {
      message = Object.values(err.errors).map(val => val.message).join('. ');
      statusCode = 400;
    }
    if (err.code === 11000) {
      message = `Duplicate field value entered: ${Object.keys(err.keyValue)}`;
      statusCode = 400;
    }
    if (err.name === 'CastError') {
      message = `Resource not found with id of ${err.value}`;
      statusCode = 404;
    }
    if (err.name === 'JsonWebTokenError') {
      message = 'Invalid token';
      statusCode = 401;
    }
    if (err.name === 'TokenExpiredError') {
      message = 'Token expired';
      statusCode = 401;
    }
    res.status(statusCode).json({
      success: false,
      message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
  };
  
  module.exports = errorHandler;