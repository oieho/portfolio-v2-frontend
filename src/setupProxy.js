const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api/*', {
      target: 'https://portfolio-v2-backend-production.up.railway.app',
      pathRewrite: {
        '^/socialLogin': '', // Remove the "/socialLogin" part from the path
      },
    }),
  );
};
