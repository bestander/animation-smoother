animation-smoother
==========
[![web component logo](https://component.jit.su/component-badge.svg)](https://github.com/component/component)

Just a few tools for games and multimedia that render animations based on inconsistent and irregular data.  

For example a remote server may send to a client positions of an object at times T1 and T2.  
This utility is able to give an interpolated position of the object at time T1` that is between T1 and T2.    
Extrapolation based on recent speed of the object's is in TODO list for this module.  

## Usage

```javascript
... sphere is defined as a Mesh in three.js for example
var Interpolator = require('animation-smoother');

var ballPositions = new Interpolator({x: 100, y: 100});
ballPositions.onCoordinateRequest(function () {
  sphere.position.x = this.x;
  sphere.position.y = this.y;
});

function animate() {
  requestAnimationFrame( animate );
  Interpolator.updateAll();
}
...
ballPositions.scheduleNext({x: 125, y: 77}, 100);
...
ballPositions.scheduleNext({x: 134, y: 80}, 97);
```

## API

### ObjectCoordinateInterpolator(initialCoordinate)
constructor, call it for every object that needs interpolation
**initialCoordinate** Initial coordinate for the object that needs interpolated coordinates

### scheduleNext(coordinate, delayFromNow)
Call this function
**coordinate** Destination coordinate
**delayFromNow** In how many milliseconds the object should be at **coordinate**

### scheduleNext(coordinate, delayFromNow)
**coordinate** Destination coordinate
**delayFromNow** In how many milliseconds the object should be at **coordinate**


   

License
--------
Copyright 2012 Konstantin Raev (bestander@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
