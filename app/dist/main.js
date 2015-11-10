(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
/**
 * @file
 * mithril.form.js
 *
 * Provides a basic form builder with managed
 * submit and validation handlers.
 */

var form = {
  controller: function(data) {
    this.elements = data.elements ? data.elements : [];
    this.attributes = data.attributes ? data.attributes : {};

    // onSubmit event handler.
    this.submit = function(event) {
      event.preventDefault();

      var form = this;
      var submission = [];

      // Format form submission.
      for (i = 0; i < form.elements.length; ++i) {
        var value = form.elements[i].value;
        var name = form.elements[i].name;

        if (Array.isArray(data.elements[name])) {
          if (event.target.checked) {
            submission[name].push(value);
          }
          else {
            var index = submission[name].indexOf(value);
            submission[name].splice(index, 1);
          }
        }
        else if (name) {
          submission[name] = value;
        }
      }

      // Handles basic form validation, user supplied
      // validation function must return true to pass.
      var valid = data.validate(form, submission);
      if (valid && valid.status) {
        // Clear validation message; if exists.
        m.render(form.children[0], '');

        // Provided submit handler.
        data.submit(form, submission);
      }
      else if (valid) {
        // Render validation message to user.
        // @todo, support multiple messages.
        m.render(form.children[0], valid.message);
      }
    }

    // Attach validation message.
    this.validation = form.validate();

    // Attach submit handler.
    this.attributes.onsubmit = this.submit;
  },
  view: function(ctrl) {
    var validation = m('.validation', [
      ctrl.validation.value
    ])

    var elements = ctrl.elements.map(function(element) {
      element.attributes = element.attributes ? element.attributes : {};
      element.attributes.type = element.type;

      // @todo, allow setting of parent attributes.
      return m('.form-item', {class: element.type}, [
        form.title(element),
        element.prefix,
        form.element()[element.type] ? 
          form.element()[element.type](element)
        : '',
        element.suffix
      ]);
    })

    return m('form', ctrl.attributes, [
      validation,
      elements
    ]);
  },
  validate: function() {
    return {
      value: ''
    };
  },
  title: function(element) {
    return element.title ? m('label', {class: 'title'}, element.title) : '';
  },
  element: function() {
    var input = function(element) {
      return m('input', element.attributes);
    }

    var textarea = function(element) {
      return m('textarea', element.attributes);
    }

    var select = function(element) {
      return m('select', element.attributes, [
        (typeof element.options === 'object' || typeof element.options[0] === 'object') ?
          Object.keys(element.options).map(function(index) {
            return m('option', {value: element.options[index].value}, element.options[index].name)
          })
        :
          element.options.map(function(value) {
            return m('option', {value: value}, value)
          })
      ]);
    }

    var checkbox = function(element) {
      return m('.options', [
        (typeof element.options === 'object' || typeof element.options[0] === 'object') ?
          Object.keys(element.options).map(function(index) {
            element.attributes.title = element.options[index].name;
            element.attributes.value = element.options[index].value;

            return m('label', [
              m('input', element.attributes),
              element.options[index].name
            ])
          })
        :
          element.options.map(function(value) {
            element.attributes.value = value;
            return m('label', [
              m('input', element.attributes),
              element.options[option]
            ])
          })
      ]);
    }

    var markup = function(element) {
      return element.value;
    }

    return {
      text: input,
      password: input,
      range: input,
      number: input,
      color: input,
      button: input,
      reset: input,
      submit: input,
      hidden: input,
      textarea: textarea,
      select: select,
      checkbox: checkbox,
      markup: markup
    }
  }
};

module.exports = form;
},{}],3:[function(require,module,exports){
/**
 * @file
 * loader.js
 *
 * @ref, http://tobiasahlin.com/spinkit
 */

var loader = function() {
  return m('.spinner', [
    m('.rect1'),
    m('.rect2'),
    m('.rect3'),
    m('.rect4'),
    m('.rect5')
  ]);
}

module.exports = loader;
},{}],4:[function(require,module,exports){
/**
 * @file
 * login
 */

var login = {
  attributes: {
    id: 'login-form'
  },
  elements: [
    {
      type: 'text',
      title: 'Username',
      attributes: {
        class: 'form-text',
        name: 'name'
      }
    },
    {
      type: 'password',
      title: 'Password',
      attributes: {
        class: 'form-text',
        name: 'pass'
      }
    },
    {
      type: 'submit',
      value: 'Log in',
      attributes: {
        class: 'form-submit button',
      }
    }
  ],
  validate: function(form, values) {
    var valid = {
      status: true,
      message: ''
    }

    if (!values.name) {
      valid.status = false;
      valid.message = m('p', 'Please enter a username.');
    }

    if (!values.pass) {
      valid.status = false;
      valid.message = m('p', 'Please enter a password.');
    }

    return valid;
  },
  submit: function(form, values) {
    // Attempt to log user in.
    md.request({
      method: 'POST',
      url: '/user/login',
      data: values,
      serialize: function(value) {
        return 'name=' + value.name + '&pass=' + value.pass + '&form_id=user_login_form';
      },
      extract: function(xhr) {
        // Oh brah...
        var response = 'Incorrect username or password.';
        if (xhr.responseURL != location.origin + '/user/login') {
          response = 'Yay!';
        }

        return JSON.stringify(response);
      }
    },
    {
      headers: [
        {
          type: 'Content-Type',
          value: 'application/x-www-form-urlencoded'
        }
      ], 
      format: 'none'
    }).data.then(function(response) {
      // Handle user after login.
    })
  }
}

module.exports = login;
},{}],5:[function(require,module,exports){
/**
 * @file
 * Forgot password
 */

var password = {
  attributes: {
    id: 'forgot-password-form'
  },
  elements: [
    {
      type: 'text',
      title: 'Username or email address',
      suffix: m('p', 'Password reset instructions will be sent to your registered email address.'),
      attributes: {
        class: 'form-text',
        name: 'email'
      }
    },
    {
      type: 'submit',
      value: 'Forgot password',
      attributes: {
        class: 'form-submit button',
      }
    }
  ],
  validate: function(form, values) {
    var valid = {
      status: true,
      message: ''
    }

    if (!values.email) {
      valid.status = false;
      valid.message = m('p', 'Please enter a username or email address.');
    }

    return valid;
  },
  submit: function(form, values) {  
    // Perform login op.
    console.log(values);
  }
}

module.exports = password;
},{}],6:[function(require,module,exports){
/**
 * @file
 * register
 */

var register = {
  attributes: {
    id: 'register-form'
  },
  elements: [
    {
      type: 'text',
      title: 'Email address',
      description: 'A valid email address. All emails from the system will be sent to this address. The email address is not made public and will only be used if you wish to receive a new password or wish to receive certain news or notifications by email.',
      attributes: {
        class: 'form-email',
        name: 'email'
      }
    },
    {
      type: 'text',
      title: 'Username',
      description: "Several special characters are allowed, including space, period (.), hyphen (-), apostrophe ('), underscore (_), and the @ sign.",
      attributes: {
        class: 'form-text',
        name: 'username',
      }
    },
    {
      type: 'submit',
      value: 'Create new account',
      attributes: {
        class: 'form-submit button',
      }
    }
  ],
  validate: function(form, values) {
    var valid = {
      status: true,
      message: ''
    }

    if (!values.email) {
      valid.status = false;
      valid.message = m('p', 'Please enter an email address.');
    }

    if (!values.username) {
      valid.status = false;
      valid.message = m('p', 'Please enter a username.');
    }

    return valid;
  },
  submit: function(form, values) {  
    // Perform login op.
    console.log(values);
  }
}

module.exports = register;
},{}],7:[function(require,module,exports){
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
},{"./element/loader.js":3,"./mixin/animate.js":12}],8:[function(require,module,exports){
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
},{"./region/footer.js":9,"./region/header.js":10}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
},{"../../component/menu.js":1}],11:[function(require,module,exports){
/**
 * @file
 * alias.js
 */

/**
 * Path alias vm.
 */
var alias = (function() {
  var vm = {
    node: false
  };

  vm.structure = function(response) {
    this.nid = response.nid;
  }

  vm.lookup = function(alias) {
    return md.request({
      method: 'GET',
      url: '/alias/' + alias,
      type: vm.structure,
      background: true
    }, {
      format: 'json'
    }).data.then(function(response) {
      // Load the node associated with the alias.
      vm.node = md.request({
        method: 'GET',
        url: '/node/' + response[0].nid,
        background: true
      }, {redrawTimeout: 500})
    })
  }

  return vm;
}())

module.exports = alias;
},{}],12:[function(require,module,exports){
/**
 * @file
 * animate.js
 */

var animate = (function() {
  var vm = {};

  vm.fadeIn = function(element, isInitialized, context) {
    if (isInitialized) return;

    element.style.opacity = 0;
    Velocity(element, {opacity: 1}, 750);
  }

  return vm;
}());

module.exports = animate;
},{}],13:[function(require,module,exports){
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
},{"./element/loader.js":3,"./mixin/alias.js":11,"./mixin/animate.js":12}],14:[function(require,module,exports){
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

},{"./home.js":7,"./layout/layout.js":8,"./node.js":13,"./user.js":15}],15:[function(require,module,exports){
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
},{"./component/mithril.form.js":2,"./form/login.js":4,"./form/password.js":5,"./form/register.js":6,"./mixin/animate.js":12}]},{},[14]);
