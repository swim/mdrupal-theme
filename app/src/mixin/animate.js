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