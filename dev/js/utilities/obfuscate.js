import { IS_OBFUSCATED } from './constants';
import { qs, removeClass, toggleClass } from './helpers';
import toggle from './toggle';

/**
 * Toggles the obfuscator.
 * @param  {string} action - Hides or toggles the obfuscator.
 * @param  {number} zIndex (default: 9) - Modifies the obfuscator z-index.
 */
export default function (action, zIndex = 9) {
  const obfuscator = qs('.gg-obfuscator');
  obfuscator.style.zIndex = zIndex;

  if (action === 'hide') {
    toggle(obfuscator, 'hide');
    removeClass(document.body, IS_OBFUSCATED);
  } else {
    toggle(obfuscator);
    toggleClass(document.body, IS_OBFUSCATED);
  }
}
