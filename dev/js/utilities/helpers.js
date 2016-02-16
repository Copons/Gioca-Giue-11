/**
 * querySelector alias
 * Returns the first element within the document that matches the specified group of selectors.
 * @param  {string}  selector - The CSS selector to search.
 * @param  {Element} container (default: document.body) - The container in which to search.
 * @return {Element} The matched element.
 */
export function qs(selector, container = document.body) {
  if (!container) {
    return null;
  }
  return container.querySelector(selector);
}




/**
 * querySelectorAll alias
 * Returns a list of the elements within the document that match the specified group of selectors.
 * @param  {string}  selector - The CSS selector to search.
 * @param  {Element} container (default: document.body) - The container in which to search.
 * @return {NodeList} The matched element.
 */
export function qsa(selector, container = document.body) {
  if (!container) {
    return [];
  }
  return container.querySelectorAll(selector);
}




/**
 * addEventListener alias
 * Registers the specified listener on the target it's called on.
 * @param  {Element}  target - The target element.
 * @param  {string}   eventType - The event type to register.
 * @param  {Function} callback - The event callback function.
 * @param  {boolean}  useCapture (default: false) Forces the event to activate at the beginning.
 */
export function listen(target, eventType, callback, useCapture = false) {
  if (target) {
    target.addEventListener(eventType, callback, !!useCapture);
  }
}




/**
 * Delegates an event listener.
 * @param  {string}   targetSelector - The target selector.
 * @param  {Element}  container - The container of the target selector.
 * @param  {string}   eventType - The event type to register.
 * @param  {Function} callback - The event callback function.
 */
export function delegate(targetSelector, container, eventType, callback) {
  const dispatchEvent = event => {
    const targetElement = event.target;
    const potentialElements = qsa(targetSelector, container);
    const hasMatch = Array.from(potentialElements).includes(targetElement);

    if (hasMatch) {
      callback.call(targetElement, event);
    }
  };

  const useCapture = eventType === 'blur' || eventType === 'focus';

  listen(container, eventType, dispatchEvent, useCapture);
}




/**
 * Traversing up from the given element, gets the first element that matches the selector.
 * @param  {Element} element - The starting element.
 * @param  {string}  selector - The target selector.
 * @return {Element} The matched closest parent element.
 */
export function closest(element, selector) {
  if (!element.parentNode) {
    return;
  }

  if (element.parentNode.matches(selector)) {
    return element.parentNode;
  }

  return closest(element.parentNode, selector);
}




/**
 * Determines whether the element has the given class name.
 * @param  {Element} element - The target element.
 * @param  {string}  className - The class name to search for.
 * @return {boolean} - True if the element has the given class name.
 */
export function hasClass(element, className) {
  return element.classList.contains(className);
}




/**
 * Adds a class to an element.
 * @param {Element} element - The target element.
 * @param {string}  className - The class name to add.
 */
export function addClass(element, className) {
  element.classList.add(className);
}




/**
 * Removes a class from an element.
 * @param {Element} element - The target element.
 * @param {string}  className - The class name to remove.
 */
export function removeClass(element, className) {
  element.classList.remove(className);
}




/**
 * Toggles a class from an element.
 * @param {Element} element - The target element.
 * @param {string}  className - The class name to toggle.
 */
export function toggleClass(element, className) {
  element.classList.toggle(className);
}
