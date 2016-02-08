import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import toggle from '../utilities/toggle';

class Cards {

  constructor () {
    this.cards = document.querySelector('.gg-cards');
    this.masonryContainer = document.querySelector('#masonry');

    this.masonry();
  }

  masonry () {
    if (this.masonryContainer) {
      const masonryItemsClass = '#masonry .gg-card';
      const masonryItems = document.querySelectorAll(masonryItemsClass);

      let imagesLoadControl = imagesLoaded(this.masonryContainer);

      let cardsLayout = new Masonry(this.cards, {
        itemSelector : masonryItemsClass,
        gutter : 16,
        percentPosition : true
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
      let infiniteCount = 0;
      document.body.addEventListener('post-load', () => {
        infiniteCount++;
        let infiniteContainer = document.querySelector('#infinite-view-' + infiniteCount);
        let infiniteItems = infiniteContainer.querySelectorAll('.gg-card');
        cardsLayout.appended(infiniteItems);
        toggle(masonryItems, 'show');
      });
      // CHECK ONCE STAGED!!
    }
  }

}

export default Cards;
