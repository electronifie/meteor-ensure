function Ensure(meteor, st)  {
  this.meteor = meteor;
  this.st = st;
  this.middleware = [];
  this.message = "Permission denied"
}

// Set the default error message (i.e. "Permission denied", "Invalid parameter, ...")
Ensure.prototype.setMessage = function(message) {
  this.message = message;
};

Ensure.prototype.use = function(fn) {
  this.middleware.push(fn);
};

Ensure.prototype.ensure = function(condition, prefix, message, code) {
  var args = arguments;
  var methodName, parsed;
  
  //var err = this.stackTrace(new Error());
  var err = new Error();
  err = err.stack;

  if (prefix && message) {
    message = prefix + ": " + message;
  } else if (prefix) {
    message = prefix;
  } else if (!message) {
    message = this.message;
  }

  if (!condition) {
    this.middleware.forEach(function (f) {
      f.apply(this, [ message, err ]);
    }.bind(this));

    throw new Meteor.Error(code || 422, message);
  }
};

Ensure.prototype.authenticated = function(message, code) {
  this.ensure(Meteor.userId(), "Permission denied", message, code || 401);
};

Ensure.prototype.param = function(condition, message, code) {
  this.ensure(condition, "Invalid parameter", message, code || 422);
};

if (Meteor.isServer) {
  var st = Npm.require('stack-trace');

  this.Ensure = new Ensure(this, st);
}


