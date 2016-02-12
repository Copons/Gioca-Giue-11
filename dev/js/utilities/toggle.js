import { IS_VISIBLE } from './constants';
import { addClass, removeClass, toggleClass } from './helpers';

/**
 * Toggles the .is-visible class.
 * @param  {Element} target - The target element.
 * @param  {string}  action - Shows, hides or toggles the element.
 */
export default function (target, action) {
  if (target instanceof NodeList) {
    for (const element of target) {
      if (action === 'show') {
        addClass(element, IS_VISIBLE);
      } else if (action === 'hide') {
        removeClass(element, IS_VISIBLE);
      } else {
        toggleClass(element, IS_VISIBLE);
      }
    }
  } else if (action === 'show') {
    addClass(target, IS_VISIBLE);
  } else if (action === 'hide') {
    removeClass(target, IS_VISIBLE);
  } else {
    toggleClass(target, IS_VISIBLE);
  }
}
