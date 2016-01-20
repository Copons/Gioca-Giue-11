(function ($) {
  'use strict';

  var $ggLayout = $('.gg-layout');
  var $ggDrawer = $('.gg-drawer');
  var $ggDrawerToggle = $('.gg-drawer-toggle');
  var $ggObfuscator = $('.gg-obfuscator');




  // Toggle the drawer

  $ggDrawerToggle.on('click', function (event) {
    event.preventDefault();
    $ggDrawer.ggToggle();
    $ggObfuscator.ggToggle();
  });

  $ggObfuscator.on('click', function (event) {
    event.preventDefault();
    $ggDrawer.ggToggle('hide');
    $ggObfuscator.ggToggle('hide');
  });




  // Swipe the drawer

  var drawerSwipe = new Hammer($(document)[0]);

  drawerSwipe.on('swipeleft', function () {
    if ($ggDrawer.hasClass('is-visible')) {
      $ggDrawer.ggToggle('hide');
      $ggObfuscator.ggToggle('hide');
    }
  });

  drawerSwipe.on('swiperight', function () {
    if (!$ggDrawer.hasClass('is-visible')) {
      $ggDrawer.ggToggle('show');
      $ggObfuscator.ggToggle('show');
    }
  });

}(jQuery));
