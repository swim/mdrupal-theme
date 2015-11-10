/**
 * @file
 * route.js
 */

// Theme.
var theme = require('./layout/layout.js');

// Pages.
var home = require('./home.js');
var node = require('./node.js');
var user = require('./user.js');

m.route.mode = 'pathname';
m.route(document.getElementById('page-wrapper'), '/', theme.wrap({
  '/': home,
  '/:alias': node,
  '/user': user
}))
