import $ from 'jquery';

const $ggSearchBar = $('.gg-searchbar');
const $ggSearchBarToggle = $('.gg-searchbar-toggle');
const $ggSearchBarSearch = $('.gg-searchbar input');
const $ggSearchBarCancel = $('.gg-searchbar-cancel');

export default function () {

  // Toggle between appbar and searchbar

  $ggSearchBarToggle.on('click', (event) => {
    event.preventDefault();
    $ggSearchBar.ggToggle();
    setTimeout(function () {
      $ggSearchBarSearch.focus();
    }, 150);
  });




  // Toggle the searchbar cancel button

  $ggSearchBarSearch.on('keyup', () => {
    if ($ggSearchBarSearch.val()) {
      $ggSearchBarCancel.ggToggle('show');
    }
    else {
      $ggSearchBarCancel.ggToggle('hide');
    }
  });

  $ggSearchBarCancel.on('click', (event) => {
    event.preventDefault();
    $ggSearchBarSearch.val('');
    $ggSearchBarCancel.ggToggle('hide');
    $ggSearchBarSearch.focus();
  });


  // Close the appbar menu on click-outside
  $(document).on('click', (event) => {
    $ggSearchBar.ggCloseOutside([$ggSearchBarToggle], event);
  });

}
