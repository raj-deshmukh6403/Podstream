const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
  
    // Log error details for debugging
    console.warn('Error details:', {
      name: err.name,
      message: err.message,
      stack: err.stack,
      errors: err.errors
    });
  
    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
      const message = `Resource not found with id of ${err.value}`;
      error = { message, statusCode: 404 };
    }
  
    // Mongoose duplicate key
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      const message = `Duplicate field value: ${field}. Please use another value`;
      error = { message, statusCode: 400 };
    }
  
    // Mongoose validation error
    if (err.name === 'ValidationError') {
      const validationErrors = {};
      Object.keys(err.errors).forEach(key => {
        validationErrors[key] = err.errors[key].message;
      });
      error = { 
        message: 'Validation failed',
        errors: validationErrors,
        statusCode: 400 
      };
    }
  
    // JWT validation errors
    if (err.name === 'JsonWebTokenError') {
      const message = 'Not authorized to access this route';
      error = { message, statusCode: 401 };
    }
  
    // JWT expired
    if (err.name === 'TokenExpiredError') {
      const message = 'Your session has expired. Please log in again';
      error = { message, statusCode: 401 };
    }
  
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Server Error',
      errors: error.errors || null
    });
  };
  
  module.exports = errorHandler;