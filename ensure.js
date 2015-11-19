function Ensure(meteor, st)  {
  this.meteor = meteor;
  this.st = st;
  this.middleware = [];
  this.message = "Permission denied."
}

// Set the default error message (i.e. "Permission denied", "Invalid parameter, ...")
Ensure.prototype.setMessage = function(message) {
  this.message = message;
};

Ensure.prototype.use = function(fn) {
  this.middleware.push(fn);
};

Ensure.prototype.getMethodName = function() {
  var parsed = st.parse(new Error());
  return parsed.length > 1 ? parsed[1].methodName : "<unknown>";
};

Ensure.prototype.ensure = function(condition, message) {
  var args = arguments;
  var methodName, parsed;
  
  //var err = this.stackTrace(new Error());
  var err = new Error();
  err = err.stack;

  message = message || this.message;

  if (!condition) {
    this.middleware.forEach(function (f) {
      f.apply(this, [ message, err ]);
    }.bind(this));

    throw new Meteor.Error(422, message);
  }
};

if (Meteor.isServer) {
  var st = Npm.require('stack-trace');

  this.Ensure = new Ensure(this, st);
}


