(function ($) {
  'use strict';

  const $ggAppBarMenu = $('.gg-appbar-menu');
  const $ggAppBarMenuToggle = $('.gg-appbar-menu-toggle');




  // Toggle the appbar menu

  $ggAppBarMenuToggle.on('click', function (event) {
    event.preventDefault();
    $ggAppBarMenu.ggToggle('show');
  });




  // Close the appbar menu on click-outside

  $(document).on('click', function (event) {
    $ggAppBarMenu.ggCloseOutside([$ggAppBarMenuToggle], event);
  });

}(jQuery));
