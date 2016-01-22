(function ($) {
  'use strict';

  var $ggHeader = $('.gg-header');
  var $ggSearchBar = $('.gg-searchbar');

  var windowDidScroll;
  var ggHeaderHeight = $ggHeader.outerHeight();
  var prevScrollTop = $(window).scrollTop();
  var scrollDelta = 25;




  // Slide toggle the header on scroll

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

  // Fix header disappearing forever if the header is tucked back
  // and the window is resized tall enough to prevent vertical scrolling

  $(window).on('resize', function () {
    if (!$ggHeader.hasClass('is-visible')) {
      $ggHeader.ggToggle('show');
    }
  });

}(jQuery));
