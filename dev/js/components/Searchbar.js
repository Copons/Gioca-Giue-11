import toggle from '../utilities/toggle';
import { qs, qsa, listen, delegate } from '../utilities/helpers';
import closeOutside from '../utilities/closeOutside';

export default class Searchbar {

  constructor() {
    this.searchbar = qs('.gg-searchbar');
    this.searchInput = qs('input', this.searchbar);

    this.open();
    this.cancel();
    this.close();
  }

  open() {
    const searchbar = this.searchbar;
    const searchbarInput = this.searchInput;
    const searchbarToggleButtons = qsa('.gg-searchbar-toggle');

    for (const searchbarToggle of searchbarToggleButtons) {
      listen(searchbarToggle, 'click', searchbarToggleBindClick);
    }

    function searchbarToggleBindClick (event) {
      event.preventDefault();
      toggle(searchbar);
      setTimeout(() => {
        searchbarInput.focus();
      }, 150);
    }
  }

  cancel() {
    const searchbarCancel = qs('.gg-searchbar-cancel', this.searchbar);

    delegate('input', this.searchbar, 'keyup', () => {
      if (event.target.value) {
        toggle(searchbarCancel, 'show');
      } else {
        toggle(searchbarCancel, 'hide');
      }
    });

    delegate('.gg-searchbar-cancel', this.searchbar, 'click', event => {
      event.preventDefault();
      this.searchInput.value = '';
      toggle(searchbarCancel, 'hide');
      this.searchInput.focus();
    });
  }

  close() {
    listen(document.body, 'click', event => {
      closeOutside(this.searchbar, event, '.gg-searchbar-toggle');
    });
  }

}
