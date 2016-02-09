import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import toggle from '../utilities/toggle';

export default class Cards {

  constructor () {
    this.cards = document.querySelector('.gg-cards');
    this.masonryContainer = document.querySelector('#masonry');

    this.masonry();
  }

  masonry () {
    if (this.masonryContainer) {
      const masonryItemsClass = '#masonry .gg-card';
      const masonryItems = document.querySelectorAll(masonryItemsClass);
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

      document.body.addEventListener('post-load', () => {
        infiniteCount++;
        const infiniteContainer = document.querySelector(`#infinite-view-${infiniteCount}`);
        const infiniteItems = infiniteContainer.querySelectorAll('.gg-card');
        cardsLayout.appended(infiniteItems);
        toggle(masonryItems, 'show');
      });
    }
  }

}
