import { IS_VISIBLE } from '../utilities/constants';
import toggle from '../utilities/toggle';

export default class Header {

  constructor () {
    this.header = document.querySelector('.gg-header');
    this.searchbar = document.querySelector('.gg-searchbar');

    this.scroll();
    this.resize();
  }

  scroll () {
    const scrollDelta = 25;
    let windowDidScroll = false;
    let previousScrollTop = window.pageYOffset;
    let currentScrollTop = 0;

    window.addEventListener('scroll', () => {
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

  resize () {
    window.addEventListener('resize', () => {
      if (!this.header.classList.contains(IS_VISIBLE)) {
        toggle(this.header, 'show');
      }
    });
  }

}
