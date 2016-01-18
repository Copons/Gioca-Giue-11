(function () {
  'use strict';

  var $ggDrawer = $('.gg-drawer');
  var $ggDrawerToggle = $('.gg-drawer-toggle');
  var $ggObfuscator = $('.gg-obfuscator');




  Waves.attach('.gg-menu-icon', ['waves-circle', 'waves-light']);
  Waves.init();




  $ggDrawerToggle.on('click', function (event) {
    event.preventDefault();
    $ggDrawer.toggleClass('is-visible');
    $ggObfuscator.toggleClass('is-visible');
  });

  $ggObfuscator.on('click', function (event) {
    event.preventDefault();
    $ggDrawer.removeClass('is-visible');
    $ggObfuscator.removeClass('is-visible');
  });

})();
