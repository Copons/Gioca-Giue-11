import { IS_OBFUSCATED } from './constants';
import { qs } from './helpers';
import toggle from './toggle';

export default function (action) {
  const obfuscator = qs('.gg-obfuscator');

  if (action === 'hide') {
    toggle(obfuscator, 'hide');
    document.body.classList.remove(IS_OBFUSCATED);
  } else {
    toggle(obfuscator);
    document.body.classList.toggle(IS_OBFUSCATED);
  }
}
