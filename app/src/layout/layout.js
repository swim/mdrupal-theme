/**
 * @file
 * layout.js
 *
 * @theme: Bartikapp
 */

// Regions.
var layout = {
  header: require('./region/header.js'),
  footer: require('./region/footer.js')
}

/**
 * Bartik layout controller.
 */
layout.controller = function(module) {
  this.controller = new module.controller
  this.view = module.view

  // Page attributes.
  this.attributes = module.attributes ? module.attributes : {};
}

/**
 * Bartik layout view.
 */
layout.view = function(ctrl) {
  return m('#page', ctrl.attributes, [
    m.component(layout.header),
    m('#main-wrapper', {class: 'layout-main-wrapper layout-container clearfix'}, [
      m('#main', {class: 'layout-main clearfix'}, [
        ctrl.view(ctrl.controller)
      ])
    ]),
    m('footer', {class: 'site-footer'}, [
      m('.layout-container', [
        layout.footer(ctrl.controller)
      ])
    ])
  ]);
}

/**
 * Bartik layout wrapper.
 */
layout.wrap = function(routes) {
  var map = {}
  Object.keys(routes).map(function(r) {
    map[r] = {
      controller: function() {
        return new layout.controller(routes[r])
      },
      view: layout.view
    }
  })

  return map;
}

module.exports = layout;