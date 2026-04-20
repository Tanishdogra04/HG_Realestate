// src/middleware/errorHandler.js
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Server Error';
  const response = { message };
  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }
  res.status(statusCode).json(response);
};
