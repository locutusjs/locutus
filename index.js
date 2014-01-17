phpjs = require('./build/npm');

phpjs.registerGlobals = function() {
  for (var key in this) {
    global[key] = this[key];
  }
};

module.exports = phpjs;
