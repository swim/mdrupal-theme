/**
 * @file
 * menu.js
 *
 * @component: menu
 */

/**
 * Menu component.
 */
var menu = {
  controller: function() {
    /* We need config entities to become RESTful ='(.
    return {
      load: mdrupal.request({
        method: 'GET',
        url: '/entity/menu/main',
        background: true
      })
    }*/
  },
  view: function(ctrl) {
    return m('nav', {class: 'block-menu navigation'}, [
      m('.content', [
        m('ul', {class: 'menu clearfix'}, [
          m('li', {class: 'menu-item'}, [
            m('a', {config: m.route, href: '/', class: m.route() == '/' ? 'is-active' : ''}, 'Home')
          ]),
          m('li', {class: 'menu-item'}, [
            m('a', {config: m.route, href: '/vivamus-eu', class: m.route() == '/vivamus-eu' ? 'is-active' : ''}, 'Vivamus eu')
          ])
        ])
      ])
    ]);
  }
};

module.exports = menu;