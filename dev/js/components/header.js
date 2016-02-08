import {IS_VISIBLE} from '../utilities/constants';
import toggle from '../utilities/toggle';

class Header {

  constructor () {
    this.header = document.querySelector('.gg-header');
    this.searchbar = document.querySelector('.gg-searchbar');

    this.scroll();
    this.resize();
  }

  scroll () {
    let windowDidScroll = false;
    let previousScrollTop = window.pageYOffset;
    let scrollDelta = 25;

    window.addEventListener('scroll', function () {
      windowDidScroll = true;
    });

    setInterval(() => {
      if (windowDidScroll) {
        windowDidScroll = false;
        let currentScrollTop = window.scrollY;

        if (Math.abs(previousScrollTop - currentScrollTop) <= scrollDelta) {
          return;
        }

        if (currentScrollTop > previousScrollTop && currentScrollTop > this.header.offsetHeight) {
          toggle(this.header, 'hide');
          toggle(this.searchbar, 'hide');
        }
        else if (currentScrollTop + window.innerHeight < document.body.clientHeight) {
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

export default Header;
