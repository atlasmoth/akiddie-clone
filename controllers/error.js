module.exports = function errorHandler(asyncFunc) {
  return (req, res, next) => {
    asyncFunc(req, res, next).catch(next);
  };
};
