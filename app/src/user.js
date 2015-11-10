/**
 * @file
 * user
 */
var form = require('./component/mithril.form.js');
var animate = require('./mixin/animate.js');

// forms
var forms = {
  login: require('./form/login.js'),
  register: require('./form/register.js'),
  password: require('./form/password.js')
}

var user = {
  attributes: {
    class: 'layout-no-sidebars user'
  },
  controller: function() {
    // Toggle tabs.
    this.toggleTab = function(e) {
      e.preventDefault();

      var value = this.valueOf();      
      m.route('/user/' + value);
    }
  },
  view: function(ctrl) {
    return m('#content', {config: animate.fadeIn, class: 'column main-content'}, [
      m('section', {class: 'section'}, [
        m('nav', {class: 'tabs'}, [
          m('ul', {class: 'tabs primary'}, [
            m('li', [
              m('a', {onclick: ctrl.toggleTab.bind('login'), href: '#'}, [
                'Log in'
              ])
            ]),
            m('li', [
              m('a', {onclick: ctrl.toggleTab.bind('register'), href: '#'}, [
                'Create new account'
              ])
            ]),
            m('li', [
              m('a', {onclick: ctrl.toggleTab.bind('password'), href: '#'}, [
                'Reset your password'
              ])
            ])
          ])
        ]),
        m('.content', [
          m.component(form, forms.login)
        ])
      ])
    ])
  }
}

module.exports = user;