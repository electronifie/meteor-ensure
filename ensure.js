function Ensure(meteor)  {
  this.meteor = meteor;
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
  var err = new Error();

  if (prefix && message) {
    message = prefix + ": " + message;
  } else if (prefix) {
    message = prefix;
  } else if (!message) {
    message = this.message;
  }

  if (!condition) {
    this.middleware.forEach(function (f) {
      f.apply(this, [ message, err.stack ]);
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
  this.Ensure = new Ensure(this);
}


