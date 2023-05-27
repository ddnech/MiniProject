const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://minpro-blog.purwadhikabootcamp.com',
      changeOrigin: true,
    })
  );
};