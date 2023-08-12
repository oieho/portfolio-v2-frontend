const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('*', {
      target:
        'https://port-0-portfolio-v2-backend-3prof2lll3bfr1i.sel3.cloudtype.app:8080',
      changeOrigin: true,
    }),
  );
};
