import $ from 'jquery';
import Masonry from 'masonry-layout';

const ggCardsClass = '.gg-cards';
const $ggCardToggleAddon = $('.gg-card-toggle-addon');
const ggCardAddonClass = '.gg-card-addon';

const $body = $(document.body);
const $masonryContainer = $('#masonry');
const masonryBlockClass = '#masonry .gg-card';

export default function () {

  if ($masonryContainer.length) {
    let cardsLayout;
    setTimeout(() => {
      cardsLayout = new Masonry(document.querySelector(ggCardsClass), {
        itemSelector : masonryBlockClass,
        gutter : 16,
        percentPosition : true
      });
      cardsLayout.layout();
      $(masonryBlockClass).ggToggle('show');
    }, 200);

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
    let $target = $(`${ggCardAddonClass}[data-addon="${$toggle.data('addon')}"]`);
    let innerHeight = 0;
    $target.children().each((index, $item) => {
      innerHeight += $($item).outerHeight(true);
    });
    $toggle.ggToggle();
    $target.ggToggle();
    if ($target.hasClass('is-visible')) {
      $target.css({ maxHeight : innerHeight });
    }
    else {
      $target.css({ maxHeight : 0 });
    }
  });

}
