import { IS_VISIBLE } from './constants';
import { qsa, hasClass, removeClass } from './helpers';

/**
 * Hides an element when a mouse click occurs outside it or outside additional elements.
 * @param  {Element} target - The element to hide.
 * @param  {Event}   event - The event interface.
 * @param  {string}  excludedSelector - A selector of additional elements to exclude.
 */
export default function (target, event, excludedSelector) {
  if (hasClass(target, IS_VISIBLE) &&
      target !== event.target &&
      !target.contains(event.target)
  ) {
    if (excludedSelector) {
      for (const excludedElement of qsa(excludedSelector)) {
        if (excludedElement === event.target || excludedElement.contains(event.target)) {
          return;
        }
      }
    }
    removeClass(target, IS_VISIBLE);
  }
}
