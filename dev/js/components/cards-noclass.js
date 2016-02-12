import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import { qs, qsa, listen } from '../utilities/helpers';
import toggle from '../utilities/toggle';

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
  let infiniteCount = 0;

  listen(document.body, 'post-load', () => {
    infiniteCount++;
    const infiniteContainer = qs(`#infinite-view-${infiniteCount}`);
    const infiniteItems = qsa('.gg-card', infiniteContainer);
    masonryLayout.appended(infiniteItems);
    toggle(masonryItems, 'show');
  });
}
