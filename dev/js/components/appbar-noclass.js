import { qs, listen, delegate } from '../utilities/helpers';
import toggle from '../utilities/toggle';
import closeOutside from '../utilities/closeOutside';

const appbar = qs('.gg-appbar');
const appbarMenu = qs('.gg-appbar-menu', appbar);

// Opens the appbarMenu on click on its toggle button.
delegate('.gg-appbar-menu-toggle', appbar, 'click', event => {
  event.preventDefault();
  toggle(appbarMenu, 'show');
});

// Closes the appbar menu on click outside.
listen(document.body, 'click', event => {
  closeOutside(appbarMenu, event, '.gg-appbar-menu-toggle');
});
