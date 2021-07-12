module.exports = {
  // config options can be found here: https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config
  //                                   https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW
  swDest: 'dist/service-worker.js',
  globDirectory: 'dist',
  cacheId: 'furo-viz',
  globPatterns: ['favicon.ico', 'assets/**', 'src/configs/**', '**/*.{js,json}', 'index.html'],
  globStrict: true,
  navigationPreload: false,
  mode: 'production',
  cleanupOutdatedCaches: true,
  navigateFallbackDenylist: [],
  runtimeCaching: [],
};
