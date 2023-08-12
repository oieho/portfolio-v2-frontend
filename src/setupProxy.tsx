const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/proxy',
    createProxyMiddleware({
      target: 'https://portfolio-v2-backend:8080',
      changeOrigin: true,
    }),
  );
};
