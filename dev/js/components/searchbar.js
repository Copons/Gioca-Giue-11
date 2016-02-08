import toggle from '../utilities/toggle';
import closeOutside from '../utilities/closeOutside';

class Searchbar {

  constructor () {
    this.searchbar = document.querySelector('.gg-searchbar');
    this.searchInput = this.searchbar.querySelector('input');

    this.open();
    this.cancel();
    this.close();
  }

  open () {
    let searchbarToggle = document.querySelector('.gg-searchbar-toggle');
    searchbarToggle.addEventListener('click', (event) => {
      event.preventDefault();
      toggle(this.searchbar);
      setTimeout(() => {
        this.searchInput.focus();
      }, 150);
    });
  }

  cancel () {
    let searchbarCancel = this.searchbar.querySelector('.gg-searchbar-cancel');
    this.searchInput.addEventListener('keyup', () => {
      if (this.searchInput.value) {
        toggle(searchbarCancel, 'show');
      }
      else {
        toggle(searchbarCancel, 'hide');
      }
    });
    searchbarCancel.addEventListener('click', (event) => {
      event.preventDefault();
      this.searchInput.value = '';
      toggle(searchbarCancel, 'hide');
      this.searchInput.focus();
    });
  }

  close () {
    document.addEventListener('click', (event) => {
      closeOutside(this.searchbar, event, '.gg-searchbar-toggle');
    });
  }

}

export default Searchbar;
