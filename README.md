meteor-ensure
====
Ensure provides basic validation for Meteor methods.  In each case if a condition is not met then a `new Meteor.Error` will be thrown.  

Optional middleware allows for additional handling (i.e. logging) of condition failures.  Middleware will also be passed the stack trace.

Installation
====
`meteor add electronifiejs:meteor-ensure`

Methods
====
+ `Ensure.ensure(condition, prefix, message, code)` - unless `condition` is truthy, throw a new `Meteor.error(txt, code)`.
+ `Ensure.authenticated(message, code)` - unless `Meteor.userId()` is truthy, throw a new `Meteor.error(message, code)`.  Default message is "Permission denied" and default code is 401.
+ `Ensure.param(condition, message, code)` - unless `condition` is truthy, throw a new `Meteor.error(message, code)`.  Default message is "Invalid parameter" and default code is 422.

Middleware
====
+ `Ensure.use(function mw(message, stack) { ... })` - Each `Ensure.ensure()` call will result in `mw` being called with the message and stack. 

