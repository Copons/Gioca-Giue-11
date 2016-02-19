import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import { qs, qsa } from '../utilities/helpers';
import toggle from '../utilities/toggle';
import Waves from 'node-waves';

const cards = qs('.gg-cards');
const masonryContainer = qs('#masonry');

// Creates the Masonry layout for cards.
if (masonryContainer) {
  const masonryItemsClass = '#masonry .gg-card';
  const masonryItems = qsa(masonryItemsClass);
  const imagesLoadControl = imagesLoaded(masonryContainer);
  const masonryLayout = new Masonry(cards, {
    itemSelector : masonryItemsClass,
    gutter : 16,
    percentPosition : true,
  });

  setTimeout(() => {
    masonryLayout.layout();
  }, 200);

  imagesLoadControl.on('progress', () => {
    masonryLayout.layout();
  });
  imagesLoadControl.on('done', () => {
    toggle(masonryItems, 'show');
  });

  /*let windowDidResize = false;

  listen(window, 'resize', () => {
    windowDidResize = true;
  });

  setInterval(() => {
    if (windowDidResize) {
      windowDidResize = false;
      console.log('masonry.layout');
      masonryLayout.layout();
    }
  }, 200);*/

  // WordPress Jetpack Infinite Scroll
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      for (const addedNode of mutation.addedNodes) {
        if (addedNode.nodeName.toLowerCase() === 'article') {
          Waves.attach('.gg-button-flat', ['waves-button']);
          masonryLayout.appended(addedNode);
          toggle(addedNode, 'show');
        }
      }
      masonryLayout.layout();
    });
  });
  observer.observe(masonryContainer, { childList : true });
}
