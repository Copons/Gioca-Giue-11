import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import { qs, qsa, listen } from '../utilities/helpers';
import toggle from '../utilities/toggle';

export default class Cards {

  constructor() {
    this.cards = qs('.gg-cards');
    this.masonryContainer = qs('#masonry');

    this.masonry();
  }

  masonry() {
    if (this.masonryContainer) {
      const masonryItemsClass = '#masonry .gg-card';
      const masonryItems = qsa(masonryItemsClass);
      const imagesLoadControl = imagesLoaded(this.masonryContainer);
      const cardsLayout = new Masonry(this.cards, {
        itemSelector : masonryItemsClass,
        gutter : 16,
        percentPosition : true,
      });

      setTimeout(() => {
        cardsLayout.layout();
      }, 200);

      imagesLoadControl.on('progress', () => {
        cardsLayout.layout();
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
        cardsLayout.appended(infiniteItems);
        toggle(masonryItems, 'show');
      });
    }
  }

}
