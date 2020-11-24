// It's important to add `next` as argument, otherwise Express will not detect this as error handler
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  if (!res.headersSent) {
    res.status(500);
  }
  res.send(err.message);
};
