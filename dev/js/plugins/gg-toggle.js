import $ from 'jquery';

const IS_VISIBLE = 'is-visible';

export default function () {

  $.fn.ggToggle = function (action) {
    if (typeof action === 'undefined') {
      this.toggleClass(IS_VISIBLE);
    }
    else if (action === 'show') {
      this.addClass(IS_VISIBLE);
    }
    else if (action === 'hide') {
      this.removeClass(IS_VISIBLE);
    }
    return this;
  };

  $.fn.ggCloseOutside = function (excluded, event) {
    if (
      this.hasClass(IS_VISIBLE) &&
      !this.is(event.target) &&
      this.has(event.target).length === 0
    ) {

      if ($.isArray(excluded)) {
        for (var i = 0, len = excluded.length; i < len; i++) {
          if (
            excluded[i].is(event.target) ||
            excluded[i].has(event.target).length !== 0
          ) {
            return this;
          }
        }
      }
      this.removeClass(IS_VISIBLE);
    }
    return this;
  };

}
