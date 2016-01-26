import $ from 'jquery';

const $ggHeader = $('.gg-header');
const $ggSearchBar = $('.gg-searchbar');

let windowDidScroll;
let ggHeaderHeight = $ggHeader.outerHeight();
let prevScrollTop = $(window).scrollTop();
let scrollDelta = 25;

export default function () {

  // Slide toggle the header on scroll

  $(window).on('scroll', () => {
    windowDidScroll = true;
  });
  setInterval(() => {
    if (windowDidScroll) {
      ggHeaderSlideToggle();
      windowDidScroll = false;
    }
  }, 250);

  function ggHeaderSlideToggle () {
    let currScrollTop = $(window).scrollTop();
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

  $(window).on('resize', () => {
    if (!$ggHeader.hasClass('is-visible')) {
      $ggHeader.ggToggle('show');
    }
  });

}
