(function ($) {
  'use strict';

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

}(jQuery));
