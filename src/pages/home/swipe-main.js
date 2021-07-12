/* global WebKitCSSMatrix */
//import { useState } from 'react'
const React = require("react");
const sleep = require("p-sleep");

const settings = {
  snapBackDuration: 300,
  maxTilt: 5,
  bouncePower: 0.2,
  swipeThreshold: 100, // offset to start the swiping
};

const animateOut = async (element, speed, easeIn = false) => {
  const time = 0.7; //diagonal / velocity
  const multiplier = 1; //diagonal / velocity

  // const translateString = translationString(speed.x * multiplier + startPos.x, -speed.y * multiplier + startPos.y)
  const translateString = translationString(
    speed.x * multiplier,
    -speed.y * multiplier
  );
  let rotateString = "";

  const rotationPower = 200;

  if (easeIn) {
    element.style.transition = "ease " + time + "s";
  } else {
    element.style.transition = "ease-out " + time + "s";
  }

  if (speed.x === 0) {
    rotateString = rotationString(getRotation(element));
  } else if (speed.x < 0) {
    rotateString = rotationString(-rotationPower / 4 + getRotation(element));
  } else {
    rotateString = rotationString(rotationPower / 4 + getRotation(element));
  }
  // rotateString = rotationString(0)
  // console.log("vaules", translateString + rotateString);
  element.style.transform = translateString + rotateString;
  await sleep(time * 1000);
};

const animateBack = (element) => {
  element.style.transition = settings.snapBackDuration + "ms";
  const startingPoint = getTranslate(element);
  const translation = translationString(
    startingPoint.x * -settings.bouncePower,
    startingPoint.y * -settings.bouncePower
  );
  const rotation = rotationString(getRotation(element) * -settings.bouncePower);
  element.style.transform = translation + rotation;

  setTimeout(() => {
    element.style.transform = "none";
  }, settings.snapBackDuration * 0.75);

  setTimeout(() => {
    element.style.transition = "10ms";
  }, settings.snapBackDuration);
};

const getSwipeDirection = (speed) => {
  if (Math.abs(speed.x) > Math.abs(speed.y)) {
    return speed.x > 0 ? "right" : "left";
  } else {
    return speed.y > 0 ? "up" : "down";
  }
};

const getSwipeDirectionBasedOnLocation = (location) => {
  if (location.x < -settings.swipeThreshold) {
    return "left";
  } else if (location.x > settings.swipeThreshold) {
    return "right";
  }
};

const calcSpeed = (oldLocation, newLocation) => {
  const dx = newLocation.x - oldLocation.x;
  const dy = oldLocation.y - newLocation.y;
  const dt = (newLocation.time - oldLocation.time) / 1000;
  return { x: dx / dt, y: dy / dt };
};

const translationString = (x, y) => {
  const translation = "translate(" + x + "px, " + y + "px)";
  return translation;
};

const rotationString = (rot) => {
  const rotation = "rotate(" + rot + "deg)";
  return rotation;
};

const getTranslate = (element) => {
  const style = window.getComputedStyle(element);
  const matrix = new WebKitCSSMatrix(style.webkitTransform);
  const ans = { x: matrix.m41, y: matrix.m42 };
  return ans;
};

const getRotation = (element) => {
  const style = window.getComputedStyle(element);
  const matrix = new WebKitCSSMatrix(style.webkitTransform);
  const ans = (-Math.asin(matrix.m21) / (2 * Math.PI)) * 360;
  return ans;
};

const dragableTouchmove = (coordinates, element, offset, lastLocation) => {
  const pos = { x: coordinates.x + offset.x, y: coordinates.y + offset.y };
  const newLocation = { x: pos.x, y: pos.y, time: new Date().getTime() };
  const translation = translationString(pos.x, pos.y);
  const rotCalc = pos.x * 0.05; //calcSpeed(lastLocation, newLocation).x / 1000
  const rotation = rotationString(rotCalc);
  element.style.transform = translation + rotation;
  return newLocation;
};

const touchCoordinatesFromEvent = (e) => {
  const touchLocation = e.targetTouches[0];
  return { x: touchLocation.clientX, y: touchLocation.clientY };
};

const mouseCoordinatesFromEvent = (e) => {
  return { x: e.clientX, y: e.clientY };
};

const TinderCard = React.forwardRef(
  (
    {
      flickOnSwipe = true,
      children,
      onSwipe,
      onCardLeftScreen,
      onClickSwiperMain,
      className,
      preventSwipe = ["up", "down"],
      overlayLabels = false,
    },
    perentRef
  ) => {
    const swipeAlreadyReleased = React.useRef(false);
    let elementGlobal;

    React.useImperativeHandle(perentRef, () => ({
      async swipe(dir = "right") {
        if (onSwipe) onSwipe(dir);
        const power = 1000;
        const disturbance = 0; //(Math.random() - 0.5) * 100

        if (dir === "right") {
          await animateOut(elementGlobal, { x: power, y: disturbance });
        } else if (dir === "left") {
          await animateOut(elementGlobal, { x: -power, y: disturbance });
        } else if (dir === "up") {
          await animateOut(elementGlobal, { x: disturbance, y: power });
        } else if (dir === "down") {
          await animateOut(elementGlobal, { x: disturbance, y: -power });
        }

        elementGlobal.style.display = "none";
        if (onCardLeftScreen) onCardLeftScreen(dir);
      },
    }));

    const handleSwipeReleased = React.useCallback(
      async (element, speed, location) => {
        if (swipeAlreadyReleased.current) {
          return;
        }
        swipeAlreadyReleased.current = true;

        // Check if this is a swipe
        if (
          location.x > settings.swipeThreshold ||
          location.x < -settings.swipeThreshold
        ) {
          // const dir = getSwipeDirection(speed);
          const dir = getSwipeDirectionBasedOnLocation(location);

          if (onSwipe) onSwipe(dir);

          if (flickOnSwipe) {
            if (!preventSwipe.includes(dir)) {
              //await animateOut(element, speed)

              const power = 1000;
              const disturbance = 0;
              if (dir === "left") {
                //left
                await animateOut(element, { x: -power, y: disturbance });
              } else if (dir === "right") {
                //right
                await animateOut(element, { x: power, y: disturbance });
              } else if (location.y < -settings.swipeThreshold) {
                //up
                await animateOut(element, { x: disturbance, y: power });
              }

              element.style.display = "none";
              if (onCardLeftScreen) {
                onCardLeftScreen(dir);
              }
              return;
            } else {
              console.log("Ignored direction - " + dir);
            }
          }
        }

        // Card was not flicked away, animate back to start
        animateBack(element);
      },
      [
        swipeAlreadyReleased,
        flickOnSwipe,
        onSwipe,
        onCardLeftScreen,
        preventSwipe,
      ]
    );

    const handleSwipeStart = React.useCallback(() => {
      swipeAlreadyReleased.current = false;
    }, [swipeAlreadyReleased]);

    const ref = React.useCallback(
      (element) => {
        if (!element) {
          return;
        } // necesarry?
        // eslint-disable-next-line react-hooks/exhaustive-deps
        elementGlobal = element;
        let offset = { x: null, y: null };
        let speed = { x: 0, y: 0 };
        let lastLocation = { x: 0, y: 0, time: new Date().getTime() };
        let mouseIsClicked = false;
        let evtMouseOnly = false;

        element.addEventListener("touchstart", (ev) => {
          ev.preventDefault();
          ev.stopImmediatePropagation();
          mouseIsClicked = true;
          evtMouseOnly = true;
          handleSwipeStart();
          offset = {
            x: -touchCoordinatesFromEvent(ev).x,
            y: -touchCoordinatesFromEvent(ev).y,
          };
        });

        element.addEventListener("mousedown", (ev) => {
          ev.preventDefault();
          mouseIsClicked = true;
          evtMouseOnly = true;
          handleSwipeStart();
          offset = {
            x: -mouseCoordinatesFromEvent(ev).x,
            y: -mouseCoordinatesFromEvent(ev).y,
          };
        });

        element.addEventListener("touchmove", (ev) => {
          ev.preventDefault();
          ev.stopImmediatePropagation();
          if (mouseIsClicked) {
            evtMouseOnly = false;
            const newLocation = dragableTouchmove(
              touchCoordinatesFromEvent(ev),
              element,
              offset,
              lastLocation
            );
            speed = calcSpeed(lastLocation, newLocation);
            lastLocation = newLocation;
          }
        });

        element.addEventListener("mousemove", (ev) => {
          ev.preventDefault();
          if (mouseIsClicked) {
            evtMouseOnly = false;
            const newLocation = dragableTouchmove(
              mouseCoordinatesFromEvent(ev),
              element,
              offset,
              lastLocation
            );
            speed = calcSpeed(lastLocation, newLocation);
            lastLocation = newLocation;
          }
        });

        element.addEventListener("touchend", (ev) => {
          if (mouseIsClicked) {
            if (evtMouseOnly) {
              onClickSwiperMain();
            } else {
              ev.preventDefault();
              ev.stopImmediatePropagation();
              handleSwipeReleased(element, speed, lastLocation);
            }
          }
        });

        element.addEventListener("mouseup", (ev) => {
          if (mouseIsClicked) {
            if (evtMouseOnly) {
              evtMouseOnly = false;
              onClickSwiperMain();
            } else {
              ev.preventDefault();
              mouseIsClicked = false;
              //console.log('mouseup', offset.x, lastLocation)
              handleSwipeReleased(element, speed, lastLocation);
            }
          }
        });

        element.addEventListener("mouseleave", (ev) => {
          if (mouseIsClicked) {
            ev.preventDefault();
            mouseIsClicked = false;
            evtMouseOnly = false;
            handleSwipeReleased(element, speed, lastLocation);
          }
        });
      },
      [handleSwipeReleased, handleSwipeStart]
    );

    // console.log("render card");
    return React.createElement(
      "div",
      { ref, className, "data-key": "card-abs" },
      children
    );
  }
);

export default TinderCard;
