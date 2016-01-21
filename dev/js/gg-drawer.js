(function ($) {
  'use strict';

  var $ggLayout = $('.gg-layout');
  var $ggDrawer = $('.gg-drawer');
  var $ggDrawerToggle = $('.gg-drawer-toggle');
  var $ggObfuscator = $('.gg-obfuscator');
  var $body = $('body');




  // Toggle the drawer

  $ggDrawerToggle.on('click', function (event) {
    event.preventDefault();
    $ggDrawer.ggToggle();
    $ggObfuscator.ggToggle();
    $body.toggleClass('is-obfuscated');
  });

  $ggObfuscator.on('click', function (event) {
    event.preventDefault();
    $ggDrawer.ggToggle('hide');
    $ggObfuscator.ggToggle('hide');
    $body.removeClass('is-obfuscated');
  });




  // Swipe the drawer

  delete Hammer.defaults.cssProps.userSelect;
  var drawerSwipe = new Hammer($ggLayout[0]);

  drawerSwipe.on('swipeleft', function () {
    if ($ggDrawer.hasClass('is-visible')) {
      $ggDrawer.ggToggle('hide');
      $ggObfuscator.ggToggle('hide');
      $body.removeClass('is-obfuscated');
    }
  });

  drawerSwipe.on('swiperight', function () {
    if (!$ggDrawer.hasClass('is-visible')) {
      $ggDrawer.ggToggle('show');
      $ggObfuscator.ggToggle('show');
      $body.addClass('is-obfuscated');
    }
  });



  // Add the scrollbar to the drawer

  Ps.initialize($ggDrawer[0]);

}(jQuery));
