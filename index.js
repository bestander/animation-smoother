/**
 * 
 */

"use strict";
var TWEEN = require('tween.js');


function ObjectCoordinateInterpolator (initialCoordinate) {
  this._tween = new TWEEN.Tween(initialCoordinate);
}

module.exports = ObjectCoordinateInterpolator;

ObjectCoordinateInterpolator.prototype.updateAll = function () {
  TWEEN.update();
};

ObjectCoordinateInterpolator.prototype.scheduleNext = function (coordinate, delay) {
  this._tween.to(coordinate, delay).start();
};

ObjectCoordinateInterpolator.prototype.onCoordinateRequest = function (callback) {
  this._tween.onUpdate(callback);
};