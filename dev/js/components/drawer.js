import Hammer from 'hammerjs';
import Ps from 'perfect-scrollbar';
import {IS_VISIBLE} from '../utilities/constants';
import toggle from '../utilities/toggle';
import obfuscate from '../utilities/obfuscate';

class Drawer {

  constructor () {
    this.drawer = document.querySelector('.gg-drawer');
    this.obfuscator = document.querySelector('.gg-obfuscator');
    this.layout = document.querySelector('.gg-layout');

    this.breakpoint = 1280;

    this.toggle();
    this.swipe();
    this.scrollbar();
  }

  toggle () {
    let drawerToggle = document.querySelector('.gg-drawer-toggle');
    drawerToggle.addEventListener('click', (event) => {
      event.preventDefault();
      if (this.layout.offsetWidth < this.breakpoint) {
        toggle(this.drawer);
        obfuscate();
      }
    });
    this.obfuscator.addEventListener('click', (event) => {
      event.preventDefault();
      if (this.layout.offsetWidth < this.breakpoint) {
        toggle(this.drawer, 'hide');
        obfuscate('hide');
      }
    });
  }

  swipe () {
    delete Hammer.defaults.cssProps.userSelect;
    let drawerSwipe = new Hammer(this.layout);

    drawerSwipe.on('swipeleft', () => {
      if (this.drawer.classList.contains(IS_VISIBLE) && this.layout.offsetWidth < this.breakpoint) {
        toggle(this.drawer, 'hide');
        obfuscate('hide');
      }
    });

    drawerSwipe.on('swiperight', () => {
      if (!this.drawer.classList.contains(IS_VISIBLE) && this.layout.offsetWidth < this.breakpoint) {
        toggle(this.drawer);
        obfuscate();
      }
    });

  }

  scrollbar () {
    Ps.initialize(this.drawer);
  }

}

export default Drawer;
