import $ from 'jquery';
import Hammer from 'hammerjs';
import Ps from 'perfect-scrollbar';
import { ggObfuscatorToggle } from '../plugins/gg-obfuscator';

const $ggLayout = $('.gg-layout');
const $ggDrawer = $('.gg-drawer');
const $ggDrawerToggle = $('.gg-drawer-toggle');
const $ggObfuscator = $('.gg-obfuscator');
const ggMediumWidth = '1280';

export default function () {

  // Toggle the drawer

  $ggDrawerToggle.on('click', (event) => {
    event.preventDefault();
    if ($ggLayout.width() < ggMediumWidth) {
      $ggDrawer.ggToggle();
      ggObfuscatorToggle();
    }
  });

  $ggObfuscator.on('click', (event) => {
    event.preventDefault();
    if ($ggLayout.width() < ggMediumWidth) {
      $ggDrawer.ggToggle('hide');
      ggObfuscatorToggle('hide');
    }
  });


  // Swipe the drawer

  delete Hammer.defaults.cssProps.userSelect;
  let drawerSwipe = new Hammer($ggLayout[0]);

  drawerSwipe.on('swipeleft', () => {
    if ($ggDrawer.hasClass('is-visible') && $ggLayout.width() < ggMediumWidth) {
      $ggDrawer.ggToggle('hide');
      ggObfuscatorToggle('hide');
    }
  });

  drawerSwipe.on('swiperight', () => {
    if (!$ggDrawer.hasClass('is-visible') && $ggLayout.width() < ggMediumWidth) {
      $ggDrawer.ggToggle('show');
      ggObfuscatorToggle('show');
    }
  });


  // Add the scrollbar to the drawer

  Ps.initialize($ggDrawer[0]);

}
