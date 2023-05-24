const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/socket.io',
    createProxyMiddleware({
      target: 'http://salvoserver.my.to:47654',
      changeOrigin: true,
    })
  );
};