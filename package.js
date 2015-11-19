Package.describe({
  name: 'electronifiejs:meteor-ensure',
  summary: "ensure",
  version: "0.0.2",
  git: "https://github.com/electronifie/meteor-ensure.git"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.0');
  api.addFiles('ensure.js', 'server');
});
