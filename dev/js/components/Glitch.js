import { qs, qsa, listen, delegate } from '../utilities/helpers';

export default class Glitch {

  constructor() {
    this.glitch('.gg-card-image .gg-card-media');
  }

  attach() {}

  glitch(selector) {
    const glitchContainer = qs(selector);
    const glitchImage = qs('img', glitchContainer);

    if (glitchImage !== null) {
      const firstLayer = glitchContainer.appendChild(glitchImage.cloneNode());
      const firstLayerWidth = firstLayer.naturalWidth;
      const firstLayerHeight = firstLayer.naturalHeight;
      const firstLayerRandomHeight1 = Math.floor(Math.random() * (firstLayerHeight - 1));
      const firstLayerRandomHeight2 = Math.floor(Math.random() * (firstLayerHeight - 1));
      const secondLayer = glitchContainer.appendChild(glitchImage.cloneNode());
      const secondLayerWidth = secondLayer.naturalWidth;
      const secondLayerHeight = secondLayer.naturalHeight;
      const secondLayerRandomHeight1 = Math.floor(Math.random() * (secondLayerHeight - 1));
      const secondLayerRandomHeight2 = Math.floor(Math.random() * (secondLayerHeight - 1));

      glitchContainer.style.overflow = 'hidden';

      firstLayer.style.clip = `rect(
        ${firstLayerRandomHeight1}px,
        ${firstLayerWidth}px,
        ${firstLayerRandomHeight2}px,
        0
      )`;
      firstLayer.style.webkitFilter  = 'invert(10%)';
      firstLayer.style.left = `${firstLayer.style.left + 10}px`;

      secondLayer.style.clip = `rect(
        ${secondLayerRandomHeight1}px,
        ${secondLayerWidth}px,
        ${secondLayerRandomHeight2}px,
        0
      )`;
      secondLayer.style.webkitFilter  = 'invert(100%)';
      secondLayer.style.left = `${secondLayer.style.left - 10}px`;
    }
  }

}
