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
    const searchbar = this.searchbar;
    const searchbarInput = this.searchInput;
    const searchbarToggleButtons = document.querySelectorAll('.gg-searchbar-toggle');
    for (let searchbarToggle of searchbarToggleButtons) {
      searchbarToggle.addEventListener('click', searchbarToggleBindClick);
    }

    function searchbarToggleBindClick (event) {
      event.preventDefault();
      toggle(searchbar);
      setTimeout(() => {
        searchbarInput.focus();
      }, 150);
    }
  }

  cancel () {
    const searchbarCancel = this.searchbar.querySelector('.gg-searchbar-cancel');
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
