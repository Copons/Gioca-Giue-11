import { qs, qsa, listen, delegate } from '../utilities/helpers';
import toggle from '../utilities/toggle';
import closeOutside from '../utilities/closeOutside';

export default class Appbar {

  constructor() {
    this.appbar = qs('.gg-appbar');
    this.appbarMenu = qs('.gg-appbar-menu', this.appbar);

    this.openMenu();
    this.closeMenu();
  }

  openMenu() {
    delegate(this.appbar, '.gg-appbar-menu-toggle', 'click', event => {
      event.preventDefault();
      toggle(this.appbarMenu, 'show');
    });
  }

  closeMenu() {
    listen(document.body, 'click', event => {
      closeOutside(this.appbarMenu, event, '.gg-appbar-menu-toggle');
    });
  }

}
