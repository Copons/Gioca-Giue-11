import $ from 'jquery';
import Masonry from 'masonry-layout';

const $ggCardToggleAddon = $('.gg-card-toggle-addon');
const ggCardAddonClass = '.gg-card-addon';

export default function () {

  setTimeout(() => {
    let cardsLayout = new Masonry(document.querySelector('.gg-cards'), {
      itemSelector : '#masonry .gg-card',
      gutter : 16,
      percentPosition : true
    });
    cardsLayout.layout();
  }, 200);

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
