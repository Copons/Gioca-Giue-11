(function () {
  'use strict';

  // Constants

  var IS_VISIBLE = 'is-visible';




  // Variables

  var $ggHeader = $('.gg-header');

  var $ggObfuscator = $('.gg-obfuscator');

  var $ggDrawer = $('.gg-drawer');
  var $ggDrawerToggle = $('.gg-drawer-toggle');

  var $ggAppBar = $('.gg-appbar');
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
      $ggHeader.removeClass(IS_VISIBLE);
      $ggSearchBar.removeClass(IS_VISIBLE);
    }
    else if (currScrollTop + $(window).height() < $(document).height()) {
      $ggHeader.addClass(IS_VISIBLE);
    }
    prevScrollTop = currScrollTop;
  }



  // Toggle the drawer

  $ggDrawerToggle.on('click', function (event) {
    event.preventDefault();
    $ggDrawer.toggleClass(IS_VISIBLE);
    $ggObfuscator.toggleClass(IS_VISIBLE);
  });

  $ggObfuscator.on('click', function (event) {
    event.preventDefault();
    $ggDrawer.removeClass(IS_VISIBLE);
    $ggObfuscator.removeClass(IS_VISIBLE);
  });




  // Toggle the appbar menu

  $ggAppBarMenuToggle.on('click', function (event) {
    event.preventDefault();
    $ggAppBarMenu.addClass(IS_VISIBLE);
  });




  // Toggle between appbar and searchbar

  $ggSearchBarToggle.on('click', function (event) {
    event.preventDefault();
    $ggSearchBar.toggleClass(IS_VISIBLE);
  });

  $ggSearchBarSearch.on('keyup', function () {
    if ($(this).val()) {
      $ggSearchBarCancel.addClass(IS_VISIBLE);
    }
    else {
      $ggSearchBarCancel.removeClass(IS_VISIBLE);
    }
  });

  $ggSearchBarCancel.on('click', function (event) {
    event.preventDefault();
    $ggSearchBarSearch.val('');
    $ggSearchBarCancel.removeClass(IS_VISIBLE);
  });




  // Watch for click-outside open elements

  $(document).on('click', function (event) {

    // Close the appbar menu
    if (
      $ggAppBarMenu.hasClass(IS_VISIBLE) &&
      !$ggAppBarMenuToggle.is(event.target) &&
      $ggAppBarMenuToggle.has(event.target).length === 0 &&
      !$ggAppBarMenu.is(event.target) &&
      $ggAppBarMenu.has(event.target).length === 0
    ) {
      $ggAppBarMenu.removeClass(IS_VISIBLE);
    }

    // Close the searchbar
    if (
      $ggSearchBar.hasClass(IS_VISIBLE) &&
      !$ggAppBar.is(event.target) &&
      $ggAppBar.has(event.target).length === 0 &&
      !$ggSearchBar.is(event.target) &&
      $ggSearchBar.has(event.target).length === 0
    ) {
      $ggSearchBar.removeClass(IS_VISIBLE);
    }

  });


})();
