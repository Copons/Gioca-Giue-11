import toggle from '../utilities/toggle';
import closeOutside from '../utilities/closeOutside';

export default class Appbar {

  constructor () {
    this.appbar = document.querySelector('.gg-appbar');
    this.appbarMenu = this.appbar.querySelector('.gg-appbar-menu');

    this.openMenu();
    this.closeMenu();
  }

  openMenu () {
    this.appbar.addEventListener('click', event => {
      if (event.target.classList.contains('gg-appbar-menu-toggle')) {
        event.preventDefault();
        toggle(this.appbarMenu, 'show');
      }
    });
  }

  closeMenu () {
    document.body.addEventListener('click', event => {
      closeOutside(this.appbarMenu, event, '.gg-appbar-menu-toggle');
    });
  }

}
