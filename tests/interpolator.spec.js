/**
 * To run unit tests:
 * 1 - run a build with 'make build' command
 * 2 - open JasmineSpecRunner.html in a browser
 */
/*jshint node:true indent:2*/
/*global it:true describe:true expect:true spyOn:true beforeEach:true afterEach:true jasmine:true window runs waitsFor*/
"use strict";

var Interpolator = require('animation-smoother/index.js');


describe('Object Coordinate Interpolator', function () {

  it('should return coordinates evenly spread between current and destination within a specified time period', function () {
    var interpolator = new Interpolator({x: 100, y: 200});
    var currentPosition;
    var currentTime = Date.now();

    interpolator.onCoordinateRequest(function () {
      currentPosition = {x: this.x, y: this.y};
    });
    interpolator.scheduleNext({x: 400, y: 400}, 1000);

    spyOn(Date, 'now').andReturn(currentTime + 1);
    interpolator.updateAll();
    expect(currentPosition.x).toBeCloseTo(100, 0);
    expect(currentPosition.y).toBeCloseTo(200, 0);

    Date.now.andReturn(currentTime + 250);
    interpolator.updateAll();
    expect(currentPosition.x).toBeCloseTo(175, 0);
    expect(currentPosition.y).toBeCloseTo(250, 0);

    Date.now.andReturn(currentTime + 500);
    interpolator.updateAll();
    expect(currentPosition.x).toBeCloseTo(250, 0);
    expect(currentPosition.y).toBeCloseTo(300, 0);

    Date.now.andReturn(currentTime + 1000);
    interpolator.updateAll();
    expect(currentPosition.x).toBeCloseTo(400, 0);
    expect(currentPosition.y).toBeCloseTo(400, 0);
  });
});




