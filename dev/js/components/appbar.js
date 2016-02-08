import toggle from '../utilities/toggle';
import closeOutside from '../utilities/closeOutside';

class Appbar {

  constructor () {
    this.appbar = document.querySelector('.gg-appbar');
    this.appbarMenu = this.appbar.querySelector('.gg-appbar-menu');

    this.openMenu();
    this.closeMenu();
  }

  openMenu () {
    let appbarMenuToggle = this.appbar.querySelector('.gg-appbar-menu-toggle');
    appbarMenuToggle.addEventListener('click', (event) => {
      event.preventDefault();
      toggle(this.appbarMenu, 'show');
    });
  }

  closeMenu () {
    document.addEventListener('click', (event) => {
      closeOutside(this.appbarMenu, event, '.gg-appbar-menu-toggle');
    });
  }

}

export default Appbar;
