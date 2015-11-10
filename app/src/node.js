/**
 * @file
 * node.js
 */
var loader = require('./element/loader.js');
var animate = require('./mixin/animate.js');
var path = require('./mixin/alias.js');

var node = {
  attributes: {
    class: 'layout-no-sidebars node'
  },
  controller: function() {
    // Perform a lookup on the path alias.
    path.lookup(m.route.param('alias'));
  },
  view: function(ctrl) {
    if (path.node && path.node.status()) {
      return m('#content', {config: animate.fadeIn, class: 'column main-content'}, [
        m('section', {class: 'section'}, [
          m('h1', {class: 'title page-title'}, path.node.data().title[0].value),
          m('article', {class: 'node node--view-mode-full clearfix'}, [
            m('header', [
              m('.node__meta', [
                m('span', [
                  'Submitted by admin on '
                  + new Date(path.node.data().created[0].value * 1000)
                ])
              ])
            ]),
            m('.node__content', [
              m.trust(path.node.data().body[0].value)
            ])
          ])
        ])
      ])
    }
    else {
      return loader(); 
    }
  }
}

module.exports = node;