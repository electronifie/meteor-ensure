Package.describe({
  name: 'electronifiejs:meteor-ensure',
  summary: "ensure",
  version: "0.0.1",
  git: "https://github.com/electronifie/meteor-ensure.git"
});

Npm.depends({
  "stack-trace": "0.0.9"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.0');
  api.addFiles('ensure.js', 'server');
});
