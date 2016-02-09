import { IS_VISIBLE } from './constants';
import { qsa } from './helpers';

export default function (target, event, excludedSelector) {
  if (target.classList.contains(IS_VISIBLE) &&
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
    target.classList.remove(IS_VISIBLE);
  }
}
