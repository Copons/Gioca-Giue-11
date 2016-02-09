import { IS_VISIBLE } from '../utilities/constants';
import { qs, listen } from '../utilities/helpers';
import toggle from '../utilities/toggle';

export default class Header {

  constructor() {
    this.header = qs('.gg-header');
    this.searchbar = qs('.gg-searchbar');

    this.scroll();
    this.resize();
  }

  scroll() {
    const scrollDelta = 25;
    let windowDidScroll = false;
    let previousScrollTop = window.pageYOffset;
    let currentScrollTop = 0;

    listen(window, 'scroll', () => {
      windowDidScroll = true;
    });

    setInterval(() => {
      if (windowDidScroll) {
        windowDidScroll = false;
        currentScrollTop = window.scrollY;

        if (Math.abs(previousScrollTop - currentScrollTop) <= scrollDelta) {
          return;
        }

        if (currentScrollTop > previousScrollTop && currentScrollTop > this.header.offsetHeight) {
          toggle(this.header, 'hide');
          toggle(this.searchbar, 'hide');
        } else if (currentScrollTop + window.innerHeight < document.body.clientHeight) {
          toggle(this.header, 'show');
        }

        previousScrollTop = currentScrollTop;
      }
    }, 200);
  }

  resize() {
    listen(window, 'resize', () => {
      if (!this.header.classList.contains(IS_VISIBLE)) {
        toggle(this.header, 'show');
      }
    });
  }

}
