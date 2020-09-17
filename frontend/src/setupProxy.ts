// import { createProxyMiddleware } from 'http-proxy-middleware';
// import { CODIMD_URL, BACKEND_URL, CODIMD_PATH, BACKEND_PATH } from './hooks/function'

// module.exports = function(app:any) {
//   app.use(
//     BACKEND_PATH,
//     createProxyMiddleware({
//       target: BACKEND_URL,
//       changeOrigin: true,
//     })
//   );
//   app.use(
//     '/tasks',
//     createProxyMiddleware({
//       target: BACKEND_URL,
//       changeOrigin: true,
//     })
//   );
//   app.use(
//     CODIMD_PATH,
//     createProxyMiddleware({
//       target: CODIMD_URL,
//       changeOrigin: true,
//       pathRewrite: {
//           '^/codimd': '/'
//       }
//     })
//   );
// };