import { IS_DIRTY, IS_INVALID } from '../utilities/constants';
import { qs, qsa, listen, closest, hasClass, addClass, removeClass } from '../utilities/helpers';
import modal from '../utilities/modal';

const article = qs('.gg-article');
const respond = qs('.gg-respond');
const inputFields = qsa('input, textarea', respond);

// Binds a modal to links contained in the article (where applicable).
modal('a', article);

// Handles inputs floating labels.
for (const field of inputFields) {
  listen(field, 'focus', inputHandling);
  listen(field, 'blur', inputHandling);
  listen(field, 'keyup', inputHandling);
}

/**
  * Callback function when using input fields.
  * Toggles the label floating state and the invalid attribute.
  * @param  {Event} event - The event interface.
 */
function inputHandling(event) {
  if (event.target.getAttribute('type') === 'submit') {
    return;
  }

  const container = closest(event.target, '.gg-comment-input, .gg-comment-textarea');

  switch (event.type) {
    case 'focus' : {
      addClass(container, IS_DIRTY);
      break;
    }
    case 'blur' : {
      if (!event.target.value) {
        removeClass(container, IS_DIRTY);
      }
      if (!event.target.checkValidity()) {
        addClass(container, IS_INVALID);
      } else {
        removeClass(container, IS_INVALID);
      }
      break;
    }
    case 'keyup' : {
      if (event.target.checkValidity()) {
        removeClass(container, IS_INVALID);
      }
      break;
    }
  }
}
