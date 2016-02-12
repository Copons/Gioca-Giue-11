import toggle from '../utilities/toggle';
import { qs, qsa, listen, delegate } from '../utilities/helpers';
import closeOutside from '../utilities/closeOutside';

const searchbar = qs('.gg-searchbar');
const searchInput = qs('input', searchbar);
const searchbarToggleButtons = qsa('.gg-searchbar-toggle');
const searchbarCancel = qs('.gg-searchbar-cancel', searchbar);

// Toggles the searchbar on click on each of its toggle buttons.
for (const searchbarToggle of searchbarToggleButtons) {
  listen(searchbarToggle, 'click', searchbarToggleBindClick);
}

// Toggles the searchbar cancel button when the searchbar input field contains something.
delegate('input', searchbar, 'keyup', event => {
  if (event.target.value) {
    toggle(searchbarCancel, 'show');
  } else {
    toggle(searchbarCancel, 'hide');
  }
});

// Empties the searchbar input fields and moves the focus back to it.
delegate('.gg-searchbar-cancel', searchbar, 'click', event => {
  event.preventDefault();
  searchInput.value = '';
  toggle(searchbarCancel, 'hide');
  searchInput.focus();
});

// Closes the searchbar on click outside.
listen(document.body, 'click', event => {
  closeOutside(searchbar, event, '.gg-searchbar-toggle');
});

/**
 * Callback function when clicking on searchbarToggleButtons.
 * Toggles the searchbar and moves the focus onto its input field.
 * @param  {Event} event - The event interface.
 */
function searchbarToggleBindClick(event) {
  event.preventDefault();
  toggle(searchbar);
  setTimeout(() => {
    searchInput.focus();
  }, 150);
}
