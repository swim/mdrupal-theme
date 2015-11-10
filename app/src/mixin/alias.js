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