const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/boards',
    createProxyMiddleware({
      target:
        'https://port-0-portfolio-v2-backend-3prof2lll3bfr1i.sel3.cloudtype.app/',
      changeOrigin: true,
    }),
  );
};
