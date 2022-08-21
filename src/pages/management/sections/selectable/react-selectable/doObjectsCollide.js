import getBoundsForNode from './getBoundsForNode';

/**
 * Given offsets, widths, and heights of two objects, determine if they collide (overlap).
 * @param initialW
 * @param initialH
 * @param lastW
 * @param lastH
 * @param  {int} bTop        The top position of the second object
 * @param  {int} bLeft       The left position of the second object
 * @param  {int} bWidth      The width of the second object
 * @param  {int} bHeight     The height of the second object
 * @param  {int} tolerance   Amount of forgiveness an item will offer to the selectbox before registering a selection
 * @return {boolean}
 */


const coordsCollide = (initialW, initialH, lastW, lastH, bTop, bLeft, bWidth, bHeight, tolerance) => {
  return ((bLeft <= initialW && initialW <= bLeft + bWidth) && (bTop <= initialH && initialH <= bTop + bHeight))
    || ((bLeft <= lastW && lastW <= bLeft + bWidth) && (bTop <= lastH && lastH <= bTop + bHeight));
};

/**
 * Given two objects containing "top", "left", "offsetWidth" and "offsetHeight"
 * properties, determine if they collide.
 * @param initialW
 * @param initialH
 * @param lastW
 * @param lastH
 * @param  {Object|HTMLElement} b
 * @param  {int} tolerance
 * @return {boolean}
 */
const doObjectsCollide = (initialW, initialH, lastW, lastH, b, tolerance = 0) => {
  const bObj = (b instanceof HTMLElement) ? getBoundsForNode(b) : b;

  return coordsCollide(
    initialW,
    initialH,
    lastW,
    lastH,
    bObj.top,
    bObj.left,
    bObj.offsetWidth,
    bObj.offsetHeight,
    tolerance
  );
};

export default doObjectsCollide;
