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