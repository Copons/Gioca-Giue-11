(function ($) {
  'use strict';

  // Variables

  var $ggHeader = $('.gg-header');

  var $ggObfuscator = $('.gg-obfuscator');

  var $ggDrawer = $('.gg-drawer');
  var $ggDrawerToggle = $('.gg-drawer-toggle');

  //var $ggAppBar = $('.gg-appbar');
  var $ggAppBarMenu = $('.gg-appbar-menu');
  var $ggAppBarMenuToggle = $('.gg-appbar-menu-toggle');

  var $ggSearchBar = $('.gg-searchbar');
  var $ggSearchBarToggle = $('.gg-searchbar-toggle');
  var $ggSearchBarSearch = $('.gg-searchbar input');
  var $ggSearchBarCancel = $('.gg-searchbar-cancel');




  // Ripple effect

  Waves.attach('.gg-appbar-icon', ['waves-circle', 'waves-light']);
  Waves.attach('.gg-searchbar-icon', ['waves-circle']);
  Waves.init();




  // Slide toggle the header on scroll
  var windowDidScroll;
  var ggHeaderHeight = $ggHeader.outerHeight();
  var prevScrollTop = $(window).scrollTop();
  var scrollDelta = 25;

  $(window).on('scroll', function () {
    windowDidScroll = true;
  });
  setInterval(function () {
    if (windowDidScroll) {
      ggHeaderSlideToggle();
      windowDidScroll = false;
    }
  }, 250);

  function ggHeaderSlideToggle () {
    var currScrollTop = $(window).scrollTop();
    if (Math.abs(prevScrollTop - currScrollTop) <= scrollDelta) {
      return;
    }
    if (currScrollTop > prevScrollTop && currScrollTop > ggHeaderHeight) {
      $ggHeader.ggToggle('hide');
      $ggSearchBar.ggToggle('hide');
    }
    else if (currScrollTop + $(window).height() < $(document).height()) {
      $ggHeader.ggToggle('show');
    }
    prevScrollTop = currScrollTop;
  }



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




  // Toggle the appbar menu

  $ggAppBarMenuToggle.on('click', function (event) {
    event.preventDefault();
    $ggAppBarMenu.ggToggle('show');
  });




  // Toggle between appbar and searchbar

  $ggSearchBarToggle.on('click', function (event) {
    event.preventDefault();
    $ggSearchBar.ggToggle();
    setTimeout(function () {
      $ggSearchBarSearch.focus();
    }, 150);
  });

  $ggSearchBarSearch.on('keyup', function () {
    if ($(this).val()) {
      $ggSearchBarCancel.ggToggle('show');
    }
    else {
      $ggSearchBarCancel.ggToggle('hide');
    }
  });

  $ggSearchBarCancel.on('click', function (event) {
    event.preventDefault();
    $ggSearchBarSearch.val('');
    $ggSearchBarCancel.ggToggle('hide');
    $ggSearchBarSearch.focus();
  });




  // Watch for click-outside open elements

  $(document).on('click', function (event) {

    // Close the appbar menu
    $ggAppBarMenu.ggCloseOutside([$ggAppBarMenuToggle], event);

    // Close the searchbar
    //$ggSearchBar.ggCloseOutside([$ggAppBar], event);

  });


}(jQuery));
