const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/*', {
      target: ' portfolio-v2-backend:8080',
      changeOrigin: true,
    }),
  );
};
