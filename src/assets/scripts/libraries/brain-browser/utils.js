/* global BrainBrowser */
/* eslint-disable */

// class to override the utils vue objects
class Utils{
  constructor(){
    BrainBrowser.utils.captureMouse = (element) => this.captureMouse(element);
    BrainBrowser.utils.captureTouch = (element) => this.captureTouch(element);
  }

  captureMouse(element){
    var mouse = { x: 0, y: 0, left: false, middle: false, right: false};
    let main = document.getElementsByTagName('main')[0];

    document.addEventListener("mousemove", function(event) {
      var offset = BrainBrowser.utils.getOffset(element);
      var x, y;

      if (event.pageX !== undefined) {
        x = event.pageX + main.scrollLeft;
        y = event.pageY + main.scrollTop;
      } else {
        x = event.clientX + main.offsetLeft;
        y = event.clientY + main.offsetTop;
      }

      mouse.x = x - offset.left;
      mouse.y = y - offset.top;
    }, false);

    element.addEventListener("mousedown", function(event) {
      event.preventDefault();

      if (event.button === 0) {
        mouse.left = true;
      }
      if (event.button === 1) {
        mouse.middle = true;
      }
      if (event.button === 2) {
        mouse.right = true;
      }
    }, false);

    element.addEventListener("mouseup", function(event) {
      event.preventDefault();

      if (event.button === 0) {
        mouse.left = false;
      }
      if (event.button === 1) {
        mouse.middle = false;
      }
      if (event.button === 2) {
        mouse.right = false;
      }

    }, false);

    element.addEventListener("mouseleave", function(event) {
      event.preventDefault();

      mouse.left = mouse.middle = mouse.right = false;
    }, false);

    element.addEventListener("contextmenu", function(event) {
      event.preventDefault();
    }, false);

    return mouse;
  }

  captureTouch(element) {
    var touches = [];

    function updateTouches(event) {
      var offset = BrainBrowser.utils.getOffset(element);
      var x, y;
      var i, count;
      var touch;
      let main = document.getElementsByTagName('main')[0];

      touches.length = count = event.touches.length;

      for (i = 0; i < count; i++) {
        touch = event.touches[i];

        if (touch.pageX !== undefined) {
          x = touch.pageX + main.scrollLeft;
          y = touch.pageY + main.scrollTop;
        } else {
          x = touch.clientX + window.pageXOffset + main.scrollLeft;
          y = touch.clientY + window.pageYOffset + main.scrollTop;
        }

        touches[i] = touches[i] || {};

        touches[i].x = x - offset.left;
        touches[i].y = y - offset.top;
      }
    }

    element.addEventListener("touchstart", updateTouches, false);
    element.addEventListener("touchmove", updateTouches, false);
    element.addEventListener("touchend", updateTouches, false);

    return touches;
  }
}

export { Utils }

/* eslint-enable */
