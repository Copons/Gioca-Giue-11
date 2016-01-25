(function ($) {
  'use strict';

  var $ggSearchBar = $('.gg-searchbar');
  var $ggSearchBarToggle = $('.gg-searchbar-toggle');
  var $ggSearchBarSearch = $('.gg-searchbar input');
  var $ggSearchBarCancel = $('.gg-searchbar-cancel');




  // Toggle between appbar and searchbar

  $ggSearchBarToggle.on('click', function (event) {
    event.preventDefault();
    $ggSearchBar.ggToggle();
    setTimeout(function () {
      $ggSearchBarSearch.focus();
    }, 150);
  });




  // Toggle the searchbar cancel button

  $ggSearchBarSearch.on('keyup', function () {
    if ($(this).val()) {
      $ggSearchBarCancel.ggToggle('show');
    }
    else {
      $ggSearchBarCancel.ggToggle('hide');
    }
  });

  $ggSearchBarCancel.on('click', function (event) {
    event.preventDefault();
    $ggSearchBarSearch.val('');
    $ggSearchBarCancel.ggToggle('hide');
    $ggSearchBarSearch.focus();
  });

}(jQuery));
