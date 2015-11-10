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