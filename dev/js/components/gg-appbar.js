import $ from 'jquery';

const $ggAppBarMenu = $('.gg-appbar-menu');
const $ggAppBarMenuToggle = $('.gg-appbar-menu-toggle');

export default function () {

  // Toggle the appbar menu
  $ggAppBarMenuToggle.on('click', (event) => {
    event.preventDefault();
    $ggAppBarMenu.ggToggle('show');
  });

  // Close the appbar menu on click-outside
  $(document).on('click', (event) => {
    $ggAppBarMenu.ggCloseOutside([$ggAppBarMenuToggle], event);
  });

}
