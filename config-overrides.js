const {defaultInjectConfig, rewireWorkboxInject} = require('react-app-rewire-workbox')
const path = require('path');

module.exports = function override(config, env) {
  if (env === "production") {
    console.log("Generating Service Worker")

    const workboxConfig = {
      ...defaultInjectConfig,
      swSrc: path.join(__dirname, 'src', 'service-worker.js')
    }
    config = rewireWorkboxInject(workboxConfig)(config, env)
  }

  return config;
}