import $ from 'jquery';

const $body = $('body');
const $ggObfuscator = $('.gg-obfuscator');

function ggObfuscatorToggle (action) {
  if (action === 'hide') {
    $ggObfuscator.ggToggle('hide');
    $body.removeClass('is-obfuscated');
  }
  else {
    $ggObfuscator.ggToggle();
    $body.toggleClass('is-obfuscated');
  }
}

export { ggObfuscatorToggle };
