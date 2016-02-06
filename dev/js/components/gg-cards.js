import $ from 'jquery';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

const ggCardsClass = '.gg-cards';
const ggCardClass = '.gg-card';
const $ggCardToggleAddon = $('.gg-card-toggle-addon');
const ggCardAddonClass = '.gg-card-addon';

const $body = $(document.body);
const $masonryContainer = $('#masonry');
const masonryBlockClass = '#masonry .gg-card';

export default function () {

  if ($masonryContainer.length) {

    let cardsLayout;
    let imagesLoadControl = imagesLoaded($masonryContainer);

    cardsLayout = new Masonry(document.querySelector(ggCardsClass), {
      itemSelector : masonryBlockClass,
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
      $(masonryBlockClass).ggToggle('show');
    });

    // WordPress Jetpack Infinite Scroll
    let infiniteCount = 0;
    $body.on('post-load', () => {
      infiniteCount++;
      let $infiniteContainer = $('#infinite-view-' + infiniteCount);
      let $infiniteBlocks = $infiniteContainer.find(ggCardsClass);
      cardsLayout.appended($infiniteBlocks);
      $(masonryBlockClass).ggToggle('show');
    });
    // CHECK ONCE STAGED!!

  }

  $ggCardToggleAddon.on('click', (event) => {
    event.preventDefault();
    let $toggle = $(event.currentTarget);
    let $container = $toggle.closest(ggCardClass);
    let $target = $(`${ggCardAddonClass}[data-addon="${$toggle.data('addon')}"]`, $container);
    let innerHeight = 0;
    $target.children().each((index, $item) => {
      innerHeight += $($item).outerHeight(true);
    });

    $toggle.ggToggle();
    $target.ggToggle();

    if ($target.hasClass('is-visible')) {
      $container.css({ zIndex : 1 });
      $target.css({ maxHeight : innerHeight });
    }
    else {
      setTimeout(() => {
        $container.css({ zIndex : 'auto' });
      }, 200);
      $target.css({ maxHeight : 0 });
    }
  });

}
