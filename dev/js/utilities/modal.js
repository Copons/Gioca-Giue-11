import { IS_VISIBLE, IS_MODAL_OPEN } from './constants';
import { qs, qsa, listen, delegate, closest } from './helpers';
import toggle from './toggle';
import obfuscate from './obfuscate';

export default function (selector, container) {
  const targets = qsa(selector, container);
  let i = 1;
  for (const target of targets) {
    if (
      target.tagName.toLowerCase() === 'a' &&
      target.getAttribute('href') &&
      target.getAttribute('href').match(/\.(jpeg|jpg|gif|png)$/) !== null &&
      !qs('.gg-modal', target)
    ) {
      target.setAttribute('data-modal', `gg-modal-${i}`);
      target.insertAdjacentHTML('beforeend', `
        <div class="gg-modal" data-modal="gg-modal-${i}">
          <img class="gg-modal-image" src="${target.getAttribute('href')}" />
        </div>
      `);
      i++;

      listen(target, 'click', toggleModal);
    }
  }

  listen(window, 'resize', scaleImage);
}

function toggleModal(event) {
  event.preventDefault();
  // 11 is a zIndex higher than the drawer
  obfuscate(null, 11);
  let container;
  if (event.target.tagName.toLowerCase() === 'a') {
    container = event.target;
  } else {
    container = closest(event.target, 'a');
  }
  toggle(qs('.gg-modal', container));
  if (document.body.classList.contains(IS_MODAL_OPEN)) {
    document.body.classList.remove(IS_MODAL_OPEN);
  } else {
    document.body.classList.add(IS_MODAL_OPEN);
    scaleImage();
  }
}

function scaleImage() {
  if (document.body.classList.contains(IS_MODAL_OPEN)) {
    const windowSize = {
      width : window.innerWidth,
      height : window.innerHeight,
    };
    // 5% padding
    windowSize.width = 0.95 * windowSize.width;
    windowSize.height = 0.95 * windowSize.height;
    const image = qs('img', qs(`.gg-modal.${IS_VISIBLE}`));
    const imageSize = {
      width : image.naturalWidth,
      height : image.naturalHeight,
    };
    const scale = {
      ratio : 1.0,
      x : windowSize.width / imageSize.width,
      y : windowSize.height / imageSize.height,
    };
    if (windowSize.width < imageSize.width || windowSize.height < imageSize.height) {
      scale.ratio = scale.x < scale.y ? scale.x : scale.y;
    }
    image.style.width = `${imageSize.width * scale.ratio}px`;
    image.style.height = `${imageSize.height * scale.ratio}px`;
  }
}
