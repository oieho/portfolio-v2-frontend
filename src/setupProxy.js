const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/*',
    createProxyMiddleware({
      target: 'portfolio-v2-frontend-production.up.railway.app',
      changeOrigin: true,
    }),
  );
};
