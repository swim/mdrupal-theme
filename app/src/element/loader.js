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