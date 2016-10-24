//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources');

  // Add logs
  aurelia.use.developmentLogging();

  // Use MaterializeCSS controls
  aurelia.use.plugin('aurelia-materialize-bridge', bridge => bridge.useAll());

  // Use Aurelia validation plugin
  aurelia.use.plugin('aurelia-validation');

  // Start app from app.js (root by default)
  aurelia.start().then(() => aurelia.setRoot());
}
