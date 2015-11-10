/**
 * @file
 * footer
 *
 * @region: footer 
 */

var footer = function(ctrl) {
  return m('.site-footer__bottom', [
    m('.region', [
      m('nav', {class: 'block-menu'}, [
        m('.content', [
          // @todo, request footer menu.
        ])
      ]),
      m('.block', [
        m('.content', [
          m('span', [
            'Powered by ',
            m('a', {href: 'https://www.drupal.org'}, 'Drupal')
          ])
        ])
      ])
    ])
  ])
}

module.exports = footer;