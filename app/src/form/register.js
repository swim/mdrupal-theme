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