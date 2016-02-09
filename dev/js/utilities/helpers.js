export function qs(selector, container = document.body) {
  return container.querySelector(selector);
}

export function qsa(selector, container = document.body) {
  return container.querySelectorAll(selector);
}

export function listen(target, eventType, callback, useCapture = false) {
  target.addEventListener(eventType, callback, !!useCapture);
}

export function delegate(target, selector, eventType, callback) {
  const dispatchEvent = event => {
    const targetElement = event.target;
    const potentialElements = qsa(selector, target);
    const hasMatch = Array.from(potentialElements).includes(targetElement);

    if (hasMatch) {
      callback.call(targetElement, event);
    }
  };

  const useCapture = eventType === 'blur' || eventType === 'focus';

  listen(target, eventType, dispatchEvent, useCapture);
}

export function closest(element, selector) {
  if (!element.parentNode) {
    return;
  }

  if (element.parentNode.matches(selector)) {
    return element.parentNode;
  }

  return closest(element.parentNode, selector);
}
