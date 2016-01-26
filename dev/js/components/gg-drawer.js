import $ from 'jquery';
import Hammer from 'hammerjs';
import Ps from 'perfect-scrollbar';

const $body = $('body');
const $ggLayout = $('.gg-layout');
const $ggDrawer = $('.gg-drawer');
const $ggDrawerToggle = $('.gg-drawer-toggle');
const $ggObfuscator = $('.gg-obfuscator');

export default function () {

  // Toggle the drawer

  $ggDrawerToggle.on('click', (event) => {
    event.preventDefault();
    $ggDrawer.ggToggle();
    $ggObfuscator.ggToggle();
    $body.toggleClass('is-obfuscated');
  });

  $ggObfuscator.on('click', (event) => {
    event.preventDefault();
    $ggDrawer.ggToggle('hide');
    $ggObfuscator.ggToggle('hide');
    $body.removeClass('is-obfuscated');
  });


  // Swipe the drawer

  delete Hammer.defaults.cssProps.userSelect;
  let drawerSwipe = new Hammer($ggLayout[0]);

  drawerSwipe.on('swipeleft', () => {
    if ($ggDrawer.hasClass('is-visible')) {
      $ggDrawer.ggToggle('hide');
      $ggObfuscator.ggToggle('hide');
      $body.removeClass('is-obfuscated');
    }
  });

  drawerSwipe.on('swiperight', () => {
    if (!$ggDrawer.hasClass('is-visible')) {
      $ggDrawer.ggToggle('show');
      $ggObfuscator.ggToggle('show');
      $body.addClass('is-obfuscated');
    }
  });


  // Add the scrollbar to the drawer

  Ps.initialize($ggDrawer[0]);

}
