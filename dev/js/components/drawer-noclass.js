import Hammer from 'hammerjs';
import PerfectScrollbar from 'perfect-scrollbar';
import { IS_VISIBLE } from '../utilities/constants';
import { qs, listen, delegate, hasClass } from '../utilities/helpers';
import toggle from '../utilities/toggle';
import obfuscate from '../utilities/obfuscate';

delete Hammer.defaults.cssProps.userSelect;

const drawer = qs('.gg-drawer');
const obfuscator = qs('.gg-obfuscator');
const layout = qs('.gg-layout');
const breakpoint = 1280;
const swipe = new Hammer(layout);

// Toggles the drawer on click on its toggle button.
delegate('.gg-drawer-toggle', document.body, 'click', () => {
  toggle(drawer);
  obfuscate();
});

// Closes the drawer on click outside.
listen(obfuscator, 'click', event => {
  event.preventDefault();
  if (layout.offsetWidth < breakpoint) {
    toggle(drawer, 'hide');
    obfuscate('hide');
  }
});

// Closes the drawer on swipe left.
swipe.on('swipeleft', () => {
  if (hasClass(drawer, IS_VISIBLE) && layout.offsetWidth < breakpoint) {
    toggle(drawer, 'hide');
    obfuscate('hide');
  }
});

// Opens the drawer on swipe right.
swipe.on('swiperight', () => {
  if (!hasClass(drawer, IS_VISIBLE) && layout.offsetWidth < breakpoint) {
    toggle(drawer);
    obfuscate();
  }
});

// Attaches the Perfect Scrollbar to the drawer.
PerfectScrollbar.initialize(drawer);
