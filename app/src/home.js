/**
 * @file
 * home
 */
var loader = require('./element/loader.js');
var animate = require('./mixin/animate.js');

var home = {
  attributes: {
    class: 'layout-no-sidebars'
  },
  controller: function() {
    this.loaded = m.prop(false);

    // Example of raw request queue.
    this.nodes = md.queue([
      {
        method: 'GET',
        url: '/node/1',
        background: true
      },
      {
        method: 'GET',
        url: '/node/2',
        background: true
      },
      {
        method: 'GET',
        url: '/node/4',
        background: true
      }
    ], {
      format: 'json',
      redrawTimeout: 500
    })
  },
  view: function(ctrl) {
    return m('#content', {class: ctrl.loaded() ? 'main-content column' : 'main-content column loading'}, [
      m('section', {class: 'section'}, [
        ctrl.nodes.map(function(value) {
          if (value.status()) {
            ctrl.loaded(true);

            return m('.node', {config: animate.fadeIn, class: 'node--view-mode-teaser'}, [
              m('header', [
                m('h2', {class: 'node__title'}, [
                  m('a', {config: m.route, href: value.data().field_path[0].value}, value.data().title[0].value)
                ]),
                m('.node__meta', [
                  m('span', [
                    'Submitted by admin on '
                    + new Date(value.data().created[0].value * 1000)
                  ])
                ])
              ]),
              m('.node__content', {class: 'clearfix'}, [
                m.trust(value.data().body[0].value)
              ])
            ])
          }
          else {
            return loader();
          }
        })
      ])
    ]);
  }
}

module.exports = home;