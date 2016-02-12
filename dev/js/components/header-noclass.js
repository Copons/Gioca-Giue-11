import { IS_VISIBLE } from '../utilities/constants';
import { qs, listen, hasClass } from '../utilities/helpers';
import toggle from '../utilities/toggle';

const header = qs('.gg-header');
const searchbar = qs('.gg-searchbar');
const scrollDelta = 25;

let windowDidScroll = false;
let previousScrollTop = window.pageYOffset;
let currentScrollTop = 0;

// Listens for the window to scroll.
listen(window, 'scroll', () => {
  windowDidScroll = true;
});

// Throttles the header toggle every 200ms.
setInterval(() => {
  if (windowDidScroll) {
    windowDidScroll = false;
    currentScrollTop = window.scrollY;

    // Check if the current scrolling length is more than the scroll delta.
    if (Math.abs(previousScrollTop - currentScrollTop) <= scrollDelta) {
      return;
    }

    if (currentScrollTop > previousScrollTop && currentScrollTop > header.offsetHeight) {
      // Hides the header when scrolling downward more than the scroll delta.
      toggle(header, 'hide');
      toggle(searchbar, 'hide');
    } else if (currentScrollTop + window.innerHeight < document.body.clientHeight) {
      // Shows the header when scrolling upward more than the scroll delta.
      toggle(header, 'show');
    }

    previousScrollTop = currentScrollTop;
  }
}, 200);

// Always shows the header on window resize.
listen(window, 'resize', () => {
  if (!hasClass(header, IS_VISIBLE)) {
    toggle(header, 'show');
  }
});
