import {IS_OBFUSCATED} from './constants';
import toggle from './toggle';

export default function (action) {

  const obfuscator = document.querySelector('.gg-obfuscator');

  if (action === 'hide') {
    toggle(obfuscator, 'hide');
    document.body.classList.remove(IS_OBFUSCATED);
  }
  else {
    toggle(obfuscator);
    document.body.classList.toggle(IS_OBFUSCATED);
  }

}
