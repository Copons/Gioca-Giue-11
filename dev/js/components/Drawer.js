import Hammer from 'hammerjs';
import Ps from 'perfect-scrollbar';
import { IS_VISIBLE } from '../utilities/constants';
import { qs, listen, delegate } from '../utilities/helpers';
import toggle from '../utilities/toggle';
import obfuscate from '../utilities/obfuscate';

export default class Drawer {

  constructor() {
    this.drawer = qs('.gg-drawer');
    this.obfuscator = qs('.gg-obfuscator');
    this.layout = qs('.gg-layout');
    this.breakpoint = 1280;

    this.toggle();
    this.swipe();
    this.scrollbar();
  }

  toggle() {
    delegate('.gg-drawer-toggle', document.body, 'click', () => {
      toggle(this.drawer);
      obfuscate();
    });

    listen(this.obfuscator, 'click', event => {
      event.preventDefault();
      if (this.layout.offsetWidth < this.breakpoint) {
        toggle(this.drawer, 'hide');
        obfuscate('hide');
      }
    });
  }

  swipe() {
    delete Hammer.defaults.cssProps.userSelect;
    const drawerSwipe = new Hammer(this.layout);

    drawerSwipe.on('swipeleft', () => {
      if (
        this.drawer.classList.contains(IS_VISIBLE) &&
        this.layout.offsetWidth < this.breakpoint
      ) {
        toggle(this.drawer, 'hide');
        obfuscate('hide');
      }
    });

    drawerSwipe.on('swiperight', () => {
      if (
        !this.drawer.classList.contains(IS_VISIBLE) &&
        this.layout.offsetWidth < this.breakpoint
      ) {
        toggle(this.drawer);
        obfuscate();
      }
    });
  }

  scrollbar() {
    Ps.initialize(this.drawer);
  }

}
