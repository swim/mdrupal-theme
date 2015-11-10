/**
 * @file
 * header
 *
 * @region: header 
 */
var menu = require('../../component/menu.js');

var header = {
  controller: function(data) {
    // @ref, https://www.drupal.org/node/2300677
    // <3 clemens.tolboom
    this.logo = 'themes/bartikapp/logo.svg';
    this.name = 'mDrupal';
  },
  view: function(ctrl) {
    return m('header', {id: 'header', class: 'header'}, [
      m('.section', {class: 'layout-container clearfix'}, [
        m('.region-secondary-menu', {class: 'region'}, [
          m('nav', [
            m('.content', [
              m('ul', {class: 'menu clearfix'}, [
                m('li', {class: 'menu-item'}, [
                  m('a', {config: m.route, href: '/user'}, 'Log in')
                ])
              ])
            ])
          ])
        ]),
        m('.region-header', {class: 'region'}, [
          m('a', {config: m.route, href: '/', class: 'site-branding__logo'}, [
            m('img', {src: ctrl.logo})
          ]),
          m('.site-branding__text', [
            m('.site-branding__name', [
              m('a', {config: m.route, href: '/'}, ctrl.name)
            ])
          ])
        ]),
        m('.region-primary-menu', {class: 'region'}, [
          m.component(menu)
        ])
      ])
    ]);
  }
}

module.exports = header;