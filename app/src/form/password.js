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