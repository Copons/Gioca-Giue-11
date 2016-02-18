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


  // WordPress Jetpack Infinite Scroll
  // TODO: CHECK ONCE STAGED!!

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      for (const addedNode of mutation.addedNodes) {
        if (addedNode.nodeName.toLowerCase() === 'article') {
          Waves.attach('.gg-button-flat', ['waves-button']);
          masonryLayout.appended(addedNode);
          toggle(addedNode, 'show');
        }
      }
    });
  });
  observer.observe(masonryContainer, { childList : true });

  /*let infiniteCount = 0;

  listen(document.body, 'post-load', () => {
    console.log('hola!');
    infiniteCount++;
    const infiniteContainer = qs(`#infinite-view-${infiniteCount}`);
    const infiniteItems = qsa('.gg-card', infiniteContainer);
    for (const newInfiniteItem of infiniteItems) {
      masonryContainer.insertBefore(newInfiniteItem, infiniteContainer);
      infiniteContainer.removeChild(newInfiniteItem);
      masonryLayout.appended(newInfiniteItem);
      toggle(newInfiniteItem, 'show');
    }
    masonryContainer.removeChild(infiniteContainer);
  });*/
}
