const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/#/socialLogin', {
      target: 'https://portfolio-v2-backend.railway.internal',
      changeOrigin: true,
    }),
  );
};
