const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/*', {
      target: 'https://portfolio-v2-backend-production.up.railway.app',
    }),
  );
};
