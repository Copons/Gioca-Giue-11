import {IS_VISIBLE} from './constants';

export default function (target, action) {

  if (target instanceof NodeList) {
    for (let element of target) {
      if (action === 'show') {
        element.classList.add(IS_VISIBLE);
      }
      else if (action === 'hide') {
        element.classList.remove(IS_VISIBLE);
      }
      else {
        element.classList.toggle(IS_VISIBLE);
      }
    }
  }
  else if (action === 'show') {
    target.classList.add(IS_VISIBLE);
  }
  else if (action === 'hide') {
    target.classList.remove(IS_VISIBLE);
  }
  else {
    target.classList.toggle(IS_VISIBLE);
  }

}
