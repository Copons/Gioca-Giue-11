import $ from 'jquery';
import Hammer from 'hammerjs';
import Ps from 'perfect-scrollbar';
import { ggObfuscatorToggle } from '../plugins/gg-obfuscator';

const $ggLayout = $('.gg-layout');
const $ggDrawer = $('.gg-drawer');
const $ggDrawerToggle = $('.gg-drawer-toggle');
const $ggObfuscator = $('.gg-obfuscator');

export default function () {

  // Toggle the drawer

  $ggDrawerToggle.on('click', (event) => {
    event.preventDefault();
    $ggDrawer.ggToggle();
    ggObfuscatorToggle();
  });

  $ggObfuscator.on('click', (event) => {
    event.preventDefault();
    $ggDrawer.ggToggle('hide');
    ggObfuscatorToggle('hide');
  });


  // Swipe the drawer

  delete Hammer.defaults.cssProps.userSelect;
  let drawerSwipe = new Hammer($ggLayout[0]);

  drawerSwipe.on('swipeleft', () => {
    if ($ggDrawer.hasClass('is-visible')) {
      $ggDrawer.ggToggle('hide');
      ggObfuscatorToggle('hide');
    }
  });

  drawerSwipe.on('swiperight', () => {
    if (!$ggDrawer.hasClass('is-visible')) {
      $ggDrawer.ggToggle('show');
      ggObfuscatorToggle('show');
    }
  });


  // Add the scrollbar to the drawer

  Ps.initialize($ggDrawer[0]);

}
