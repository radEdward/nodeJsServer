const dataRoutes = require('./dataRoute');
module.exports = function(app, db) {
  dataRoutes(app, db);
  // Other route groups could go here, in the future
};