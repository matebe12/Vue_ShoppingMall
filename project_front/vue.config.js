module.exports = {
  devServer: {
    overlay: false,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000/api',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': '',
    //     },
    //   },
    // },
  },
  outputDir: '../project_server/public',
};
