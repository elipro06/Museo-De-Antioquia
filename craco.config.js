const zoomPanPinchWarning = /react-zoom-pan-pinch[\\/]dist[\\/]index\.esm\.js/;
const missingNodeModulesSourceMap = /Failed to parse source map/;

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.ignoreWarnings = [
        ...(webpackConfig.ignoreWarnings || []),
        (warning) => {
          const moduleName = warning?.module?.resource || '';
          const details = warning?.details || '';

          return zoomPanPinchWarning.test(moduleName) && missingNodeModulesSourceMap.test(details);
        }
      ];

      return webpackConfig;
    }
  }
};