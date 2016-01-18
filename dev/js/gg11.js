(function () {
  'use strict';

  Waves.attach('a');
  Waves.init();

  $('.gg-drawer-toggle').on('click', function (event) {
    event.preventDefault();
    /*var $drawer = $('.gg-drawer');
    if ($drawer.hasClass('open')) {
      $drawer.addClass('open');
    }*/
    $('.gg-drawer').toggleClass('open');
  });

})();
