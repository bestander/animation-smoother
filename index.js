/**
 * Class ObjectCoordinateInterpolator is especially useful for doing animations based on inconsistent and irregular
 * updates.
 * It can be used in network games where network lags would prevent smooth animation of game objects.
 *
 * API: see README.md
 *
 * @author Konstantin Raev (bestander@gmail.com)
 */

'use strict';
var TWEEN = require('tween.js');

/**
 * create animation smoother interpolator object
 * @param initialCoordinate starting position
 * @constructor
 */
function ObjectCoordinateInterpolator (initialCoordinate) {
  this._previosTweenTargetPosition = initialCoordinate;
  this._previosTweenFinishTime = Date.now();
  this._onCoordinateRequest = null;
}

module.exports = ObjectCoordinateInterpolator;

/**
 * update all tweens
 */
ObjectCoordinateInterpolator.updateAll = function () {
  TWEEN.update();
};

/**
 * schedule next animation sequence
 * @param coordinate destination coordinate, starting position will be destination of previous point
 * @param delayFromNow in how many milliseconds after current moment the animation must finish
 */
ObjectCoordinateInterpolator.prototype.scheduleNext = function (coordinate, delayFromNow) {
  var animationDuration;
  var tween;
  delayFromNow = delayFromNow > 0 ? delayFromNow : 0;

  animationDuration = Date.now() + delayFromNow - this._previosTweenFinishTime;
  tween = new TWEEN.Tween(this._previosTweenTargetPosition).to(coordinate, animationDuration);
  tween.start(this._previosTweenFinishTime);
  tween.onUpdate(this._onCoordinateRequest);
  this._previosTweenTargetPosition = coordinate;
  this._previosTweenFinishTime = Date.now() + animationDuration;

};

/**
 * register a callback that will be called every time ObjectCoordinateInterpolator.updateAll is executed
 * @param callback where 'this' scope is current coordinate
 */
ObjectCoordinateInterpolator.prototype.onCoordinateRequest = function (callback) {
  this._onCoordinateRequest = callback;
};