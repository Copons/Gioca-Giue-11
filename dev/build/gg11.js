(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/*!
 * Waves v0.7.4
 * http://fian.my.id/Waves
 *
 * Copyright 2014 Alfiana E. Sibuea and other contributors
 * Released under the MIT license
 * https://github.com/fians/Waves/blob/master/LICENSE
 */

;(function (window, factory) {
    'use strict';

    // AMD. Register as an anonymous module.  Wrap in function so we have access
    // to root via `this`.

    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return factory.apply(window);
        });
    }

    // Node. Does not work with strict CommonJS, but only CommonJS-like
    // environments that support module.exports, like Node.
    else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
            module.exports = factory.call(window);
        }

        // Browser globals.
        else {
                window.Waves = factory.call(window);
            }
})((typeof global === 'undefined' ? 'undefined' : _typeof(global)) === 'object' ? global : undefined, function () {
    'use strict';

    var Waves = Waves || {};
    var $$ = document.querySelectorAll.bind(document);
    var toString = Object.prototype.toString;
    var isTouchAvailable = 'ontouchstart' in window;

    // Find exact position of element
    function isWindow(obj) {
        return obj !== null && obj === obj.window;
    }

    function getWindow(elem) {
        return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }

    function isObject(value) {
        var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
        return type === 'function' || type === 'object' && !!value;
    }

    function isDOMNode(obj) {
        return isObject(obj) && obj.nodeType > 0;
    }

    function getWavesElements(nodes) {
        var stringRepr = toString.call(nodes);

        if (stringRepr === '[object String]') {
            return $$(nodes);
        } else if (isObject(nodes) && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) && nodes.hasOwnProperty('length')) {
            return nodes;
        } else if (isDOMNode(nodes)) {
            return [nodes];
        }

        return [];
    }

    function offset(elem) {
        var docElem,
            win,
            box = { top: 0, left: 0 },
            doc = elem && elem.ownerDocument;

        docElem = doc.documentElement;

        if (_typeof(elem.getBoundingClientRect) !== (typeof undefined === 'undefined' ? 'undefined' : _typeof(undefined))) {
            box = elem.getBoundingClientRect();
        }
        win = getWindow(doc);
        return {
            top: box.top + win.pageYOffset - docElem.clientTop,
            left: box.left + win.pageXOffset - docElem.clientLeft
        };
    }

    function convertStyle(styleObj) {
        var style = '';

        for (var prop in styleObj) {
            if (styleObj.hasOwnProperty(prop)) {
                style += prop + ':' + styleObj[prop] + ';';
            }
        }

        return style;
    }

    var Effect = {

        // Effect duration
        duration: 750,

        // Effect delay (check for scroll before showing effect)
        delay: 200,

        show: function show(e, element, velocity) {

            // Disable right click
            if (e.button === 2) {
                return false;
            }

            element = element || this;

            // Create ripple
            var ripple = document.createElement('div');
            ripple.className = 'waves-ripple waves-rippling';
            element.appendChild(ripple);

            // Get click coordinate and element width
            var pos = offset(element);
            var relativeY = 0;
            var relativeX = 0;
            // Support for touch devices
            if ('touches' in e && e.touches.length) {
                relativeY = e.touches[0].pageY - pos.top;
                relativeX = e.touches[0].pageX - pos.left;
            }
            //Normal case
            else {
                    relativeY = e.pageY - pos.top;
                    relativeX = e.pageX - pos.left;
                }
            // Support for synthetic events
            relativeX = relativeX >= 0 ? relativeX : 0;
            relativeY = relativeY >= 0 ? relativeY : 0;

            var scale = 'scale(' + element.clientWidth / 100 * 3 + ')';
            var translate = 'translate(0,0)';

            if (velocity) {
                translate = 'translate(' + velocity.x + 'px, ' + velocity.y + 'px)';
            }

            // Attach data to element
            ripple.setAttribute('data-hold', Date.now());
            ripple.setAttribute('data-x', relativeX);
            ripple.setAttribute('data-y', relativeY);
            ripple.setAttribute('data-scale', scale);
            ripple.setAttribute('data-translate', translate);

            // Set ripple position
            var rippleStyle = {
                top: relativeY + 'px',
                left: relativeX + 'px'
            };

            ripple.classList.add('waves-notransition');
            ripple.setAttribute('style', convertStyle(rippleStyle));
            ripple.classList.remove('waves-notransition');

            // Scale the ripple
            rippleStyle['-webkit-transform'] = scale + ' ' + translate;
            rippleStyle['-moz-transform'] = scale + ' ' + translate;
            rippleStyle['-ms-transform'] = scale + ' ' + translate;
            rippleStyle['-o-transform'] = scale + ' ' + translate;
            rippleStyle.transform = scale + ' ' + translate;
            rippleStyle.opacity = '1';

            var duration = e.type === 'mousemove' ? 2500 : Effect.duration;
            rippleStyle['-webkit-transition-duration'] = duration + 'ms';
            rippleStyle['-moz-transition-duration'] = duration + 'ms';
            rippleStyle['-o-transition-duration'] = duration + 'ms';
            rippleStyle['transition-duration'] = duration + 'ms';

            ripple.setAttribute('style', convertStyle(rippleStyle));
        },

        hide: function hide(e, element) {
            element = element || this;

            var ripples = element.getElementsByClassName('waves-rippling');

            for (var i = 0, len = ripples.length; i < len; i++) {
                removeRipple(e, element, ripples[i]);
            }
        }
    };

    /**
     * Collection of wrapper for HTML element that only have single tag
     * like <input> and <img>
     */
    var TagWrapper = {

        // Wrap <input> tag so it can perform the effect
        input: function input(element) {

            var parent = element.parentNode;

            // If input already have parent just pass through
            if (parent.tagName.toLowerCase() === 'i' && parent.classList.contains('waves-effect')) {
                return;
            }

            // Put element class and style to the specified parent
            var wrapper = document.createElement('i');
            wrapper.className = element.className + ' waves-input-wrapper';
            element.className = 'waves-button-input';

            // Put element as child
            parent.replaceChild(wrapper, element);
            wrapper.appendChild(element);

            // Apply element color and background color to wrapper
            var elementStyle = window.getComputedStyle(element, null);
            var color = elementStyle.color;
            var backgroundColor = elementStyle.backgroundColor;

            wrapper.setAttribute('style', 'color:' + color + ';background:' + backgroundColor);
            element.setAttribute('style', 'background-color:rgba(0,0,0,0);');
        },

        // Wrap <img> tag so it can perform the effect
        img: function img(element) {

            var parent = element.parentNode;

            // If input already have parent just pass through
            if (parent.tagName.toLowerCase() === 'i' && parent.classList.contains('waves-effect')) {
                return;
            }

            // Put element as child
            var wrapper = document.createElement('i');
            parent.replaceChild(wrapper, element);
            wrapper.appendChild(element);
        }
    };

    /**
     * Hide the effect and remove the ripple. Must be
     * a separate function to pass the JSLint...
     */
    function removeRipple(e, el, ripple) {

        // Check if the ripple still exist
        if (!ripple) {
            return;
        }

        ripple.classList.remove('waves-rippling');

        var relativeX = ripple.getAttribute('data-x');
        var relativeY = ripple.getAttribute('data-y');
        var scale = ripple.getAttribute('data-scale');
        var translate = ripple.getAttribute('data-translate');

        // Get delay beetween mousedown and mouse leave
        var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
        var delay = 350 - diff;

        if (delay < 0) {
            delay = 0;
        }

        if (e.type === 'mousemove') {
            delay = 150;
        }

        // Fade out ripple after delay
        var duration = e.type === 'mousemove' ? 2500 : Effect.duration;

        setTimeout(function () {

            var style = {
                top: relativeY + 'px',
                left: relativeX + 'px',
                opacity: '0',

                // Duration
                '-webkit-transition-duration': duration + 'ms',
                '-moz-transition-duration': duration + 'ms',
                '-o-transition-duration': duration + 'ms',
                'transition-duration': duration + 'ms',
                '-webkit-transform': scale + ' ' + translate,
                '-moz-transform': scale + ' ' + translate,
                '-ms-transform': scale + ' ' + translate,
                '-o-transform': scale + ' ' + translate,
                'transform': scale + ' ' + translate
            };

            ripple.setAttribute('style', convertStyle(style));

            setTimeout(function () {
                try {
                    el.removeChild(ripple);
                } catch (e) {
                    return false;
                }
            }, duration);
        }, delay);
    }

    /**
     * Disable mousedown event for 500ms during and after touch
     */
    var TouchHandler = {

        /* uses an integer rather than bool so there's no issues with
         * needing to clear timeouts if another touch event occurred
         * within the 500ms. Cannot mouseup between touchstart and
         * touchend, nor in the 500ms after touchend. */
        touches: 0,

        allowEvent: function allowEvent(e) {

            var allow = true;

            if (/^(mousedown|mousemove)$/.test(e.type) && TouchHandler.touches) {
                allow = false;
            }

            return allow;
        },
        registerEvent: function registerEvent(e) {
            var eType = e.type;

            if (eType === 'touchstart') {

                TouchHandler.touches += 1; // push
            } else if (/^(touchend|touchcancel)$/.test(eType)) {

                    setTimeout(function () {
                        if (TouchHandler.touches) {
                            TouchHandler.touches -= 1; // pop after 500ms
                        }
                    }, 500);
                }
        }
    };

    /**
     * Delegated click handler for .waves-effect element.
     * returns null when .waves-effect element not in "click tree"
     */
    function getWavesEffectElement(e) {

        if (TouchHandler.allowEvent(e) === false) {
            return null;
        }

        var element = null;
        var target = e.target || e.srcElement;

        while (target.parentElement !== null) {
            if (target.classList.contains('waves-effect') && !(target instanceof SVGElement)) {
                element = target;
                break;
            }
            target = target.parentElement;
        }

        return element;
    }

    /**
     * Bubble the click and show effect if .waves-effect elem was found
     */
    function showEffect(e) {

        // Disable effect if element has "disabled" property on it
        // In some cases, the event is not triggered by the current element
        // if (e.target.getAttribute('disabled') !== null) {
        //     return;
        // }

        var element = getWavesEffectElement(e);

        if (element !== null) {

            // Make it sure the element has either disabled property, disabled attribute or 'disabled' class
            if (element.disabled || element.getAttribute('disabled') || element.classList.contains('disabled')) {
                return;
            }

            TouchHandler.registerEvent(e);

            if (e.type === 'touchstart' && Effect.delay) {

                var hidden = false;

                var timer = setTimeout(function () {
                    timer = null;
                    Effect.show(e, element);
                }, Effect.delay);

                var hideEffect = function hideEffect(hideEvent) {

                    // if touch hasn't moved, and effect not yet started: start effect now
                    if (timer) {
                        clearTimeout(timer);
                        timer = null;
                        Effect.show(e, element);
                    }
                    if (!hidden) {
                        hidden = true;
                        Effect.hide(hideEvent, element);
                    }
                };

                var touchMove = function touchMove(moveEvent) {
                    if (timer) {
                        clearTimeout(timer);
                        timer = null;
                    }
                    hideEffect(moveEvent);
                };

                element.addEventListener('touchmove', touchMove, false);
                element.addEventListener('touchend', hideEffect, false);
                element.addEventListener('touchcancel', hideEffect, false);
            } else {

                Effect.show(e, element);

                if (isTouchAvailable) {
                    element.addEventListener('touchend', Effect.hide, false);
                    element.addEventListener('touchcancel', Effect.hide, false);
                }

                element.addEventListener('mouseup', Effect.hide, false);
                element.addEventListener('mouseleave', Effect.hide, false);
            }
        }
    }

    Waves.init = function (options) {
        var body = document.body;

        options = options || {};

        if ('duration' in options) {
            Effect.duration = options.duration;
        }

        if ('delay' in options) {
            Effect.delay = options.delay;
        }

        if (isTouchAvailable) {
            body.addEventListener('touchstart', showEffect, false);
            body.addEventListener('touchcancel', TouchHandler.registerEvent, false);
            body.addEventListener('touchend', TouchHandler.registerEvent, false);
        }

        body.addEventListener('mousedown', showEffect, false);
    };

    /**
     * Attach Waves to dynamically loaded inputs, or add .waves-effect and other
     * waves classes to a set of elements. Set drag to true if the ripple mouseover
     * or skimming effect should be applied to the elements.
     */
    Waves.attach = function (elements, classes) {

        elements = getWavesElements(elements);

        if (toString.call(classes) === '[object Array]') {
            classes = classes.join(' ');
        }

        classes = classes ? ' ' + classes : '';

        var element, tagName;

        for (var i = 0, len = elements.length; i < len; i++) {

            element = elements[i];
            tagName = element.tagName.toLowerCase();

            if (['input', 'img'].indexOf(tagName) !== -1) {
                TagWrapper[tagName](element);
                element = element.parentElement;
            }

            if (element.className.indexOf('waves-effect') === -1) {
                element.className += ' waves-effect' + classes;
            }
        }
    };

    /**
     * Cause a ripple to appear in an element via code.
     */
    Waves.ripple = function (elements, options) {
        elements = getWavesElements(elements);
        var elementsLen = elements.length;

        options = options || {};
        options.wait = options.wait || 0;
        options.position = options.position || null; // default = centre of element

        if (elementsLen) {
            var element,
                pos,
                off,
                centre = {},
                i = 0;
            var mousedown = {
                type: 'mousedown',
                button: 1
            };
            var hideRipple = function hideRipple(mouseup, element) {
                return function () {
                    Effect.hide(mouseup, element);
                };
            };

            for (; i < elementsLen; i++) {
                element = elements[i];
                pos = options.position || {
                    x: element.clientWidth / 2,
                    y: element.clientHeight / 2
                };

                off = offset(element);
                centre.x = off.left + pos.x;
                centre.y = off.top + pos.y;

                mousedown.pageX = centre.x;
                mousedown.pageY = centre.y;

                Effect.show(mousedown, element);

                if (options.wait >= 0 && options.wait !== null) {
                    var mouseup = {
                        type: 'mouseup',
                        button: 1
                    };

                    setTimeout(hideRipple(mouseup, element), options.wait);
                }
            }
        }
    };

    /**
     * Remove all ripples from an element.
     */
    Waves.calm = function (elements) {
        elements = getWavesElements(elements);
        var mouseup = {
            type: 'mouseup',
            button: 1
        };

        for (var i = 0, len = elements.length; i < len; i++) {
            Effect.hide(mouseup, elements[i]);
        }
    };

    /**
     * Deprecated API fallback
     */
    Waves.displayEffect = function (options) {
        console.error('Waves.displayEffect() has been deprecated and will be removed in future version. Please use Waves.init() to initialize Waves effect');
        Waves.init(options);
    };

    return Waves;
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],2:[function(require,module,exports){
'use strict';

var waves = require('./libs/waves');

console.log('hi there!');

},{"./libs/waves":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXZcXGpzXFxsaWJzXFxkZXZcXGpzXFxsaWJzXFx3YXZlcy5qcyIsImRldlxcanNcXG1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztBQ1NBLENBQUMsQ0FBQyxVQUFTLE1BQVQsRUFBaUIsT0FBakIsRUFBMEI7QUFDeEI7Ozs7QUFEd0I7QUFLeEIsUUFBSSxPQUFPLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0MsT0FBTyxHQUFQLEVBQVk7QUFDNUMsZUFBTyxFQUFQLEVBQVcsWUFBVztBQUNsQixtQkFBTyxRQUFRLEtBQVIsQ0FBYyxNQUFkLENBQVAsQ0FEa0I7U0FBWCxDQUFYLENBRDRDOzs7OztBQUFoRCxTQVFLLElBQUksUUFBTyx5REFBUCxLQUFtQixRQUFuQixFQUE2QjtBQUNsQyxtQkFBTyxPQUFQLEdBQWlCLFFBQVEsSUFBUixDQUFhLE1BQWIsQ0FBakIsQ0FEa0M7Ozs7QUFBakMsYUFLQTtBQUNELHVCQUFPLEtBQVAsR0FBZSxRQUFRLElBQVIsQ0FBYSxNQUFiLENBQWYsQ0FEQzthQUxBO0NBYlAsQ0FBRCxDQXFCRSxRQUFPLHVEQUFQLEtBQWtCLFFBQWxCLEdBQTZCLE1BQTdCLFlBckJGLEVBcUI4QyxZQUFXO0FBQ3RELGlCQURzRDs7QUFHdEQsUUFBSSxRQUFtQixTQUFTLEVBQVQsQ0FIK0I7QUFJdEQsUUFBSSxLQUFtQixTQUFTLGdCQUFULENBQTBCLElBQTFCLENBQStCLFFBQS9CLENBQW5CLENBSmtEO0FBS3RELFFBQUksV0FBbUIsT0FBTyxTQUFQLENBQWlCLFFBQWpCLENBTCtCO0FBTXRELFFBQUksbUJBQW1CLGtCQUFrQixNQUFsQjs7O0FBTitCLGFBVTdDLFFBQVQsQ0FBa0IsR0FBbEIsRUFBdUI7QUFDbkIsZUFBTyxRQUFR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USxDQUFSO3FCQUZBLENBRHdDOztBQU01QywrQkFBVyxXQUFXLE9BQVgsRUFBb0IsT0FBcEIsQ0FBWCxFQUF5QyxRQUFRLElBQVIsQ0FBekMsQ0FONEM7aUJBQWhEO2FBaEJKO1NBWko7S0FUVzs7Ozs7QUE5ZHVDLFNBa2hCdEQsQ0FBTSxJQUFOLEdBQWEsVUFBUyxRQUFULEVBQW1CO0FBQzVCLG1CQUFXLGlCQUFpQixRQUFqQixDQUFYLENBRDRCO0FBRTVCLFlBQUksVUFBVTtBQUNWLGtCQUFNLFNBQU47QUFDQSxvQkFBUSxDQUFSO1NBRkEsQ0FGd0I7O0FBTzVCLGFBQUssSUFBSSxJQUFJLENBQUosRUFBTyxNQUFNLFNBQVMsTUFBVCxFQUFpQixJQUFJLEdBQUosRUFBUyxHQUFoRCxFQUFxRDtBQUNqRCxtQkFBTyxJQUFQLENBQVksT0FBWixFQUFxQixTQUFTLENBQVQsQ0FBckIsRUFEaUQ7U0FBckQ7S0FQUzs7Ozs7QUFsaEJ5QyxTQWlpQnRELENBQU0sYUFBTixHQUFzQixVQUFTLE9BQVQsRUFBa0I7QUFDcEMsZ0JBQVEsS0FBUixDQUFjLHFJQUFkLEVBRG9DO0FBRXBDLGNBQU0sSUFBTixDQUFXLE9BQVgsRUFGb0M7S0FBbEIsQ0FqaUJnQzs7QUFzaUJ0RCxXQUFPLEtBQVAsQ0F0aUJzRDtDQUFYLENBckI5Qzs7Ozs7OztBQ1RELElBQUksUUFBUSxRQUFRLGNBQVIsQ0FBUjs7QUFFSixRQUFRLEdBQVIsQ0FBWSxXQUFaIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIVxuICogV2F2ZXMgdjAuNy40XG4gKiBodHRwOi8vZmlhbi5teS5pZC9XYXZlc1xuICpcbiAqIENvcHlyaWdodCAyMDE0IEFsZmlhbmEgRS4gU2lidWVhIGFuZCBvdGhlciBjb250cmlidXRvcnNcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogaHR0cHM6Ly9naXRodWIuY29tL2ZpYW5zL1dhdmVzL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG47KGZ1bmN0aW9uKHdpbmRvdywgZmFjdG9yeSkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS4gIFdyYXAgaW4gZnVuY3Rpb24gc28gd2UgaGF2ZSBhY2Nlc3NcbiAgICAvLyB0byByb290IHZpYSBgdGhpc2AuXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW10sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhY3RvcnkuYXBwbHkod2luZG93KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gTm9kZS4gRG9lcyBub3Qgd29yayB3aXRoIHN0cmljdCBDb21tb25KUywgYnV0IG9ubHkgQ29tbW9uSlMtbGlrZVxuICAgIC8vIGVudmlyb25tZW50cyB0aGF0IHN1cHBvcnQgbW9kdWxlLmV4cG9ydHMsIGxpa2UgTm9kZS5cbiAgICBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5LmNhbGwod2luZG93KTtcbiAgICB9XG5cbiAgICAvLyBCcm93c2VyIGdsb2JhbHMuXG4gICAgZWxzZSB7XG4gICAgICAgIHdpbmRvdy5XYXZlcyA9IGZhY3RvcnkuY2FsbCh3aW5kb3cpO1xuICAgIH1cbn0pKHR5cGVvZiBnbG9iYWwgPT09ICdvYmplY3QnID8gZ2xvYmFsIDogdGhpcywgZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIFdhdmVzICAgICAgICAgICAgPSBXYXZlcyB8fCB7fTtcbiAgICB2YXIgJCQgICAgICAgICAgICAgICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwuYmluZChkb2N1bWVudCk7XG4gICAgdmFyIHRvU3RyaW5nICAgICAgICAgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICAgIHZhciBpc1RvdWNoQXZhaWxhYmxlID0gJ29udG91Y2hzdGFydCcgaW4gd2luZG93O1xuXG5cbiAgICAvLyBGaW5kIGV4YWN0IHBvc2l0aW9uIG9mIGVsZW1lbnRcbiAgICBmdW5jdGlvbiBpc1dpbmRvdyhvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiAhPT0gbnVsbCAmJiBvYmogPT09IG9iai53aW5kb3c7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0V2luZG93KGVsZW0pIHtcbiAgICAgICAgcmV0dXJuIGlzV2luZG93KGVsZW0pID8gZWxlbSA6IGVsZW0ubm9kZVR5cGUgPT09IDkgJiYgZWxlbS5kZWZhdWx0VmlldztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHR5cGUgPT09ICdmdW5jdGlvbicgfHwgdHlwZSA9PT0gJ29iamVjdCcgJiYgISF2YWx1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0RPTU5vZGUob2JqKSB7XG4gICAgICAgIHJldHVybiBpc09iamVjdChvYmopICYmIG9iai5ub2RlVHlwZSA+IDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0V2F2ZXNFbGVtZW50cyhub2Rlcykge1xuICAgICAgICB2YXIgc3RyaW5nUmVwciA9IHRvU3RyaW5nLmNhbGwobm9kZXMpO1xuXG4gICAgICAgIGlmIChzdHJpbmdSZXByID09PSAnW29iamVjdCBTdHJpbmddJykge1xuICAgICAgICAgICAgcmV0dXJuICQkKG5vZGVzKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc09iamVjdChub2RlcykgJiYgL15cXFtvYmplY3QgKEhUTUxDb2xsZWN0aW9ufE5vZGVMaXN0fE9iamVjdClcXF0kLy50ZXN0KHN0cmluZ1JlcHIpICYmIG5vZGVzLmhhc093blByb3BlcnR5KCdsZW5ndGgnKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgICB9IGVsc2UgaWYgKGlzRE9NTm9kZShub2RlcykpIHtcbiAgICAgICAgICAgIHJldHVybiBbbm9kZXNdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9mZnNldChlbGVtKSB7XG4gICAgICAgIHZhciBkb2NFbGVtLCB3aW4sXG4gICAgICAgICAgICBib3ggPSB7IHRvcDogMCwgbGVmdDogMCB9LFxuICAgICAgICAgICAgZG9jID0gZWxlbSAmJiBlbGVtLm93bmVyRG9jdW1lbnQ7XG5cbiAgICAgICAgZG9jRWxlbSA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCAhPT0gdHlwZW9mIHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYm94ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgfVxuICAgICAgICB3aW4gPSBnZXRXaW5kb3coZG9jKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcDogYm94LnRvcCArIHdpbi5wYWdlWU9mZnNldCAtIGRvY0VsZW0uY2xpZW50VG9wLFxuICAgICAgICAgICAgbGVmdDogYm94LmxlZnQgKyB3aW4ucGFnZVhPZmZzZXQgLSBkb2NFbGVtLmNsaWVudExlZnRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb252ZXJ0U3R5bGUoc3R5bGVPYmopIHtcbiAgICAgICAgdmFyIHN0eWxlID0gJyc7XG5cbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBzdHlsZU9iaikge1xuICAgICAgICAgICAgaWYgKHN0eWxlT2JqLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgc3R5bGUgKz0gKHByb3AgKyAnOicgKyBzdHlsZU9ialtwcm9wXSArICc7Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgfVxuXG4gICAgdmFyIEVmZmVjdCA9IHtcblxuICAgICAgICAvLyBFZmZlY3QgZHVyYXRpb25cbiAgICAgICAgZHVyYXRpb246IDc1MCxcblxuICAgICAgICAvLyBFZmZlY3QgZGVsYXkgKGNoZWNrIGZvciBzY3JvbGwgYmVmb3JlIHNob3dpbmcgZWZmZWN0KVxuICAgICAgICBkZWxheTogMjAwLFxuXG4gICAgICAgIHNob3c6IGZ1bmN0aW9uKGUsIGVsZW1lbnQsIHZlbG9jaXR5KSB7XG5cbiAgICAgICAgICAgIC8vIERpc2FibGUgcmlnaHQgY2xpY2tcbiAgICAgICAgICAgIGlmIChlLmJ1dHRvbiA9PT0gMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQgfHwgdGhpcztcblxuICAgICAgICAgICAgLy8gQ3JlYXRlIHJpcHBsZVxuICAgICAgICAgICAgdmFyIHJpcHBsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgcmlwcGxlLmNsYXNzTmFtZSA9ICd3YXZlcy1yaXBwbGUgd2F2ZXMtcmlwcGxpbmcnO1xuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChyaXBwbGUpO1xuXG4gICAgICAgICAgICAvLyBHZXQgY2xpY2sgY29vcmRpbmF0ZSBhbmQgZWxlbWVudCB3aWR0aFxuICAgICAgICAgICAgdmFyIHBvcyAgICAgICA9IG9mZnNldChlbGVtZW50KTtcbiAgICAgICAgICAgIHZhciByZWxhdGl2ZVkgPSAwO1xuICAgICAgICAgICAgdmFyIHJlbGF0aXZlWCA9IDA7XG4gICAgICAgICAgICAvLyBTdXBwb3J0IGZvciB0b3VjaCBkZXZpY2VzXG4gICAgICAgICAgICBpZigndG91Y2hlcycgaW4gZSAmJiBlLnRvdWNoZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmVsYXRpdmVZICAgPSAoZS50b3VjaGVzWzBdLnBhZ2VZIC0gcG9zLnRvcCk7XG4gICAgICAgICAgICAgICAgcmVsYXRpdmVYICAgPSAoZS50b3VjaGVzWzBdLnBhZ2VYIC0gcG9zLmxlZnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9Ob3JtYWwgY2FzZVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVsYXRpdmVZICAgPSAoZS5wYWdlWSAtIHBvcy50b3ApO1xuICAgICAgICAgICAgICAgIHJlbGF0aXZlWCAgID0gKGUucGFnZVggLSBwb3MubGVmdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTdXBwb3J0IGZvciBzeW50aGV0aWMgZXZlbnRzXG4gICAgICAgICAgICByZWxhdGl2ZVggPSByZWxhdGl2ZVggPj0gMCA/IHJlbGF0aXZlWCA6IDA7XG4gICAgICAgICAgICByZWxhdGl2ZVkgPSByZWxhdGl2ZVkgPj0gMCA/IHJlbGF0aXZlWSA6IDA7XG5cbiAgICAgICAgICAgIHZhciBzY2FsZSAgICAgPSAnc2NhbGUoJyArICgoZWxlbWVudC5jbGllbnRXaWR0aCAvIDEwMCkgKiAzKSArICcpJztcbiAgICAgICAgICAgIHZhciB0cmFuc2xhdGUgPSAndHJhbnNsYXRlKDAsMCknO1xuXG4gICAgICAgICAgICBpZiAodmVsb2NpdHkpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGUgPSAndHJhbnNsYXRlKCcgKyAodmVsb2NpdHkueCkgKyAncHgsICcgKyAodmVsb2NpdHkueSkgKyAncHgpJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQXR0YWNoIGRhdGEgdG8gZWxlbWVudFxuICAgICAgICAgICAgcmlwcGxlLnNldEF0dHJpYnV0ZSgnZGF0YS1ob2xkJywgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgICByaXBwbGUuc2V0QXR0cmlidXRlKCdkYXRhLXgnLCByZWxhdGl2ZVgpO1xuICAgICAgICAgICAgcmlwcGxlLnNldEF0dHJpYnV0ZSgnZGF0YS15JywgcmVsYXRpdmVZKTtcbiAgICAgICAgICAgIHJpcHBsZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2NhbGUnLCBzY2FsZSk7XG4gICAgICAgICAgICByaXBwbGUuc2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScsIHRyYW5zbGF0ZSk7XG5cbiAgICAgICAgICAgIC8vIFNldCByaXBwbGUgcG9zaXRpb25cbiAgICAgICAgICAgIHZhciByaXBwbGVTdHlsZSA9IHtcbiAgICAgICAgICAgICAgICB0b3A6IHJlbGF0aXZlWSArICdweCcsXG4gICAgICAgICAgICAgICAgbGVmdDogcmVsYXRpdmVYICsgJ3B4J1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmlwcGxlLmNsYXNzTGlzdC5hZGQoJ3dhdmVzLW5vdHJhbnNpdGlvbicpO1xuICAgICAgICAgICAgcmlwcGxlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBjb252ZXJ0U3R5bGUocmlwcGxlU3R5bGUpKTtcbiAgICAgICAgICAgIHJpcHBsZS5jbGFzc0xpc3QucmVtb3ZlKCd3YXZlcy1ub3RyYW5zaXRpb24nKTtcblxuICAgICAgICAgICAgLy8gU2NhbGUgdGhlIHJpcHBsZVxuICAgICAgICAgICAgcmlwcGxlU3R5bGVbJy13ZWJraXQtdHJhbnNmb3JtJ10gPSBzY2FsZSArICcgJyArIHRyYW5zbGF0ZTtcbiAgICAgICAgICAgIHJpcHBsZVN0eWxlWyctbW96LXRyYW5zZm9ybSddID0gc2NhbGUgKyAnICcgKyB0cmFuc2xhdGU7XG4gICAgICAgICAgICByaXBwbGVTdHlsZVsnLW1zLXRyYW5zZm9ybSddID0gc2NhbGUgKyAnICcgKyB0cmFuc2xhdGU7XG4gICAgICAgICAgICByaXBwbGVTdHlsZVsnLW8tdHJhbnNmb3JtJ10gPSBzY2FsZSArICcgJyArIHRyYW5zbGF0ZTtcbiAgICAgICAgICAgIHJpcHBsZVN0eWxlLnRyYW5zZm9ybSA9IHNjYWxlICsgJyAnICsgdHJhbnNsYXRlO1xuICAgICAgICAgICAgcmlwcGxlU3R5bGUub3BhY2l0eSA9ICcxJztcblxuICAgICAgICAgICAgdmFyIGR1cmF0aW9uID0gZS50eXBlID09PSAnbW91c2Vtb3ZlJyA/IDI1MDAgOiBFZmZlY3QuZHVyYXRpb247XG4gICAgICAgICAgICByaXBwbGVTdHlsZVsnLXdlYmtpdC10cmFuc2l0aW9uLWR1cmF0aW9uJ10gPSBkdXJhdGlvbiArICdtcyc7XG4gICAgICAgICAgICByaXBwbGVTdHlsZVsnLW1vei10cmFuc2l0aW9uLWR1cmF0aW9uJ10gICAgPSBkdXJhdGlvbiArICdtcyc7XG4gICAgICAgICAgICByaXBwbGVTdHlsZVsnLW8tdHJhbnNpdGlvbi1kdXJhdGlvbiddICAgICAgPSBkdXJhdGlvbiArICdtcyc7XG4gICAgICAgICAgICByaXBwbGVTdHlsZVsndHJhbnNpdGlvbi1kdXJhdGlvbiddICAgICAgICAgPSBkdXJhdGlvbiArICdtcyc7XG5cbiAgICAgICAgICAgIHJpcHBsZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgY29udmVydFN0eWxlKHJpcHBsZVN0eWxlKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGlkZTogZnVuY3Rpb24oZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQgfHwgdGhpcztcblxuICAgICAgICAgICAgdmFyIHJpcHBsZXMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3dhdmVzLXJpcHBsaW5nJyk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSByaXBwbGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlUmlwcGxlKGUsIGVsZW1lbnQsIHJpcHBsZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbGxlY3Rpb24gb2Ygd3JhcHBlciBmb3IgSFRNTCBlbGVtZW50IHRoYXQgb25seSBoYXZlIHNpbmdsZSB0YWdcbiAgICAgKiBsaWtlIDxpbnB1dD4gYW5kIDxpbWc+XG4gICAgICovXG4gICAgdmFyIFRhZ1dyYXBwZXIgPSB7XG5cbiAgICAgICAgLy8gV3JhcCA8aW5wdXQ+IHRhZyBzbyBpdCBjYW4gcGVyZm9ybSB0aGUgZWZmZWN0XG4gICAgICAgIGlucHV0OiBmdW5jdGlvbihlbGVtZW50KSB7XG5cbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG5cbiAgICAgICAgICAgIC8vIElmIGlucHV0IGFscmVhZHkgaGF2ZSBwYXJlbnQganVzdCBwYXNzIHRocm91Z2hcbiAgICAgICAgICAgIGlmIChwYXJlbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaScgJiYgcGFyZW50LmNsYXNzTGlzdC5jb250YWlucygnd2F2ZXMtZWZmZWN0JykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFB1dCBlbGVtZW50IGNsYXNzIGFuZCBzdHlsZSB0byB0aGUgc3BlY2lmaWVkIHBhcmVudFxuICAgICAgICAgICAgdmFyIHdyYXBwZXIgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgICAgICB3cmFwcGVyLmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lICsgJyB3YXZlcy1pbnB1dC13cmFwcGVyJztcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ3dhdmVzLWJ1dHRvbi1pbnB1dCc7XG5cbiAgICAgICAgICAgIC8vIFB1dCBlbGVtZW50IGFzIGNoaWxkXG4gICAgICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKHdyYXBwZXIsIGVsZW1lbnQpO1xuICAgICAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChlbGVtZW50KTtcblxuICAgICAgICAgICAgLy8gQXBwbHkgZWxlbWVudCBjb2xvciBhbmQgYmFja2dyb3VuZCBjb2xvciB0byB3cmFwcGVyXG4gICAgICAgICAgICB2YXIgZWxlbWVudFN0eWxlICAgID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgbnVsbCk7XG4gICAgICAgICAgICB2YXIgY29sb3IgICAgICAgICAgID0gZWxlbWVudFN0eWxlLmNvbG9yO1xuICAgICAgICAgICAgdmFyIGJhY2tncm91bmRDb2xvciA9IGVsZW1lbnRTdHlsZS5iYWNrZ3JvdW5kQ29sb3I7XG5cbiAgICAgICAgICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKCdzdHlsZScsICdjb2xvcjonICsgY29sb3IgKyAnO2JhY2tncm91bmQ6JyArIGJhY2tncm91bmRDb2xvcik7XG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnYmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLDApOycpO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gV3JhcCA8aW1nPiB0YWcgc28gaXQgY2FuIHBlcmZvcm0gdGhlIGVmZmVjdFxuICAgICAgICBpbWc6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcblxuICAgICAgICAgICAgdmFyIHBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcblxuICAgICAgICAgICAgLy8gSWYgaW5wdXQgYWxyZWFkeSBoYXZlIHBhcmVudCBqdXN0IHBhc3MgdGhyb3VnaFxuICAgICAgICAgICAgaWYgKHBhcmVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpJyAmJiBwYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCd3YXZlcy1lZmZlY3QnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUHV0IGVsZW1lbnQgYXMgY2hpbGRcbiAgICAgICAgICAgIHZhciB3cmFwcGVyICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQod3JhcHBlciwgZWxlbWVudCk7XG4gICAgICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSGlkZSB0aGUgZWZmZWN0IGFuZCByZW1vdmUgdGhlIHJpcHBsZS4gTXVzdCBiZVxuICAgICAqIGEgc2VwYXJhdGUgZnVuY3Rpb24gdG8gcGFzcyB0aGUgSlNMaW50Li4uXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVtb3ZlUmlwcGxlKGUsIGVsLCByaXBwbGUpIHtcblxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgcmlwcGxlIHN0aWxsIGV4aXN0XG4gICAgICAgIGlmICghcmlwcGxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByaXBwbGUuY2xhc3NMaXN0LnJlbW92ZSgnd2F2ZXMtcmlwcGxpbmcnKTtcblxuICAgICAgICB2YXIgcmVsYXRpdmVYID0gcmlwcGxlLmdldEF0dHJpYnV0ZSgnZGF0YS14Jyk7XG4gICAgICAgIHZhciByZWxhdGl2ZVkgPSByaXBwbGUuZ2V0QXR0cmlidXRlKCdkYXRhLXknKTtcbiAgICAgICAgdmFyIHNjYWxlICAgICA9IHJpcHBsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2NhbGUnKTtcbiAgICAgICAgdmFyIHRyYW5zbGF0ZSA9IHJpcHBsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG5cbiAgICAgICAgLy8gR2V0IGRlbGF5IGJlZXR3ZWVuIG1vdXNlZG93biBhbmQgbW91c2UgbGVhdmVcbiAgICAgICAgdmFyIGRpZmYgPSBEYXRlLm5vdygpIC0gTnVtYmVyKHJpcHBsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaG9sZCcpKTtcbiAgICAgICAgdmFyIGRlbGF5ID0gMzUwIC0gZGlmZjtcblxuICAgICAgICBpZiAoZGVsYXkgPCAwKSB7XG4gICAgICAgICAgICBkZWxheSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZS50eXBlID09PSAnbW91c2Vtb3ZlJykge1xuICAgICAgICAgICAgZGVsYXkgPSAxNTA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGYWRlIG91dCByaXBwbGUgYWZ0ZXIgZGVsYXlcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gZS50eXBlID09PSAnbW91c2Vtb3ZlJyA/IDI1MDAgOiBFZmZlY3QuZHVyYXRpb247XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICAgICAgICAgIHRvcDogcmVsYXRpdmVZICsgJ3B4JyxcbiAgICAgICAgICAgICAgICBsZWZ0OiByZWxhdGl2ZVggKyAncHgnLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6ICcwJyxcblxuICAgICAgICAgICAgICAgIC8vIER1cmF0aW9uXG4gICAgICAgICAgICAgICAgJy13ZWJraXQtdHJhbnNpdGlvbi1kdXJhdGlvbic6IGR1cmF0aW9uICsgJ21zJyxcbiAgICAgICAgICAgICAgICAnLW1vei10cmFuc2l0aW9uLWR1cmF0aW9uJzogZHVyYXRpb24gKyAnbXMnLFxuICAgICAgICAgICAgICAgICctby10cmFuc2l0aW9uLWR1cmF0aW9uJzogZHVyYXRpb24gKyAnbXMnLFxuICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uLWR1cmF0aW9uJzogZHVyYXRpb24gKyAnbXMnLFxuICAgICAgICAgICAgICAgICctd2Via2l0LXRyYW5zZm9ybSc6IHNjYWxlICsgJyAnICsgdHJhbnNsYXRlLFxuICAgICAgICAgICAgICAgICctbW96LXRyYW5zZm9ybSc6IHNjYWxlICsgJyAnICsgdHJhbnNsYXRlLFxuICAgICAgICAgICAgICAgICctbXMtdHJhbnNmb3JtJzogc2NhbGUgKyAnICcgKyB0cmFuc2xhdGUsXG4gICAgICAgICAgICAgICAgJy1vLXRyYW5zZm9ybSc6IHNjYWxlICsgJyAnICsgdHJhbnNsYXRlLFxuICAgICAgICAgICAgICAgICd0cmFuc2Zvcm0nOiBzY2FsZSArICcgJyArIHRyYW5zbGF0ZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmlwcGxlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBjb252ZXJ0U3R5bGUoc3R5bGUpKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBlbC5yZW1vdmVDaGlsZChyaXBwbGUpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGR1cmF0aW9uKTtcblxuICAgICAgICB9LCBkZWxheSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBEaXNhYmxlIG1vdXNlZG93biBldmVudCBmb3IgNTAwbXMgZHVyaW5nIGFuZCBhZnRlciB0b3VjaFxuICAgICAqL1xuICAgIHZhciBUb3VjaEhhbmRsZXIgPSB7XG5cbiAgICAgICAgLyogdXNlcyBhbiBpbnRlZ2VyIHJhdGhlciB0aGFuIGJvb2wgc28gdGhlcmUncyBubyBpc3N1ZXMgd2l0aFxuICAgICAgICAgKiBuZWVkaW5nIHRvIGNsZWFyIHRpbWVvdXRzIGlmIGFub3RoZXIgdG91Y2ggZXZlbnQgb2NjdXJyZWRcbiAgICAgICAgICogd2l0aGluIHRoZSA1MDBtcy4gQ2Fubm90IG1vdXNldXAgYmV0d2VlbiB0b3VjaHN0YXJ0IGFuZFxuICAgICAgICAgKiB0b3VjaGVuZCwgbm9yIGluIHRoZSA1MDBtcyBhZnRlciB0b3VjaGVuZC4gKi9cbiAgICAgICAgdG91Y2hlczogMCxcblxuICAgICAgICBhbGxvd0V2ZW50OiBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgIHZhciBhbGxvdyA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmICgvXihtb3VzZWRvd258bW91c2Vtb3ZlKSQvLnRlc3QoZS50eXBlKSAmJiBUb3VjaEhhbmRsZXIudG91Y2hlcykge1xuICAgICAgICAgICAgICAgIGFsbG93ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBhbGxvdztcbiAgICAgICAgfSxcbiAgICAgICAgcmVnaXN0ZXJFdmVudDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIGVUeXBlID0gZS50eXBlO1xuXG4gICAgICAgICAgICBpZiAoZVR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xuXG4gICAgICAgICAgICAgICAgVG91Y2hIYW5kbGVyLnRvdWNoZXMgKz0gMTsgLy8gcHVzaFxuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKC9eKHRvdWNoZW5kfHRvdWNoY2FuY2VsKSQvLnRlc3QoZVR5cGUpKSB7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoVG91Y2hIYW5kbGVyLnRvdWNoZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFRvdWNoSGFuZGxlci50b3VjaGVzIC09IDE7IC8vIHBvcCBhZnRlciA1MDBtc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgNTAwKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogRGVsZWdhdGVkIGNsaWNrIGhhbmRsZXIgZm9yIC53YXZlcy1lZmZlY3QgZWxlbWVudC5cbiAgICAgKiByZXR1cm5zIG51bGwgd2hlbiAud2F2ZXMtZWZmZWN0IGVsZW1lbnQgbm90IGluIFwiY2xpY2sgdHJlZVwiXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0V2F2ZXNFZmZlY3RFbGVtZW50KGUpIHtcblxuICAgICAgICBpZiAoVG91Y2hIYW5kbGVyLmFsbG93RXZlbnQoZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblxuICAgICAgICB3aGlsZSAodGFyZ2V0LnBhcmVudEVsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd3YXZlcy1lZmZlY3QnKSAmJiAoISh0YXJnZXQgaW5zdGFuY2VvZiBTVkdFbGVtZW50KSkpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gdGFyZ2V0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWJibGUgdGhlIGNsaWNrIGFuZCBzaG93IGVmZmVjdCBpZiAud2F2ZXMtZWZmZWN0IGVsZW0gd2FzIGZvdW5kXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2hvd0VmZmVjdChlKSB7XG5cbiAgICAgICAgLy8gRGlzYWJsZSBlZmZlY3QgaWYgZWxlbWVudCBoYXMgXCJkaXNhYmxlZFwiIHByb3BlcnR5IG9uIGl0XG4gICAgICAgIC8vIEluIHNvbWUgY2FzZXMsIHRoZSBldmVudCBpcyBub3QgdHJpZ2dlcmVkIGJ5IHRoZSBjdXJyZW50IGVsZW1lbnRcbiAgICAgICAgLy8gaWYgKGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGlzYWJsZWQnKSAhPT0gbnVsbCkge1xuICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgdmFyIGVsZW1lbnQgPSBnZXRXYXZlc0VmZmVjdEVsZW1lbnQoZSk7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQgIT09IG51bGwpIHtcblxuICAgICAgICAgICAgLy8gTWFrZSBpdCBzdXJlIHRoZSBlbGVtZW50IGhhcyBlaXRoZXIgZGlzYWJsZWQgcHJvcGVydHksIGRpc2FibGVkIGF0dHJpYnV0ZSBvciAnZGlzYWJsZWQnIGNsYXNzXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5kaXNhYmxlZCB8fCBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGlzYWJsZWQnKSB8fCBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgVG91Y2hIYW5kbGVyLnJlZ2lzdGVyRXZlbnQoZSk7XG5cbiAgICAgICAgICAgIGlmIChlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyAmJiBFZmZlY3QuZGVsYXkpIHtcblxuICAgICAgICAgICAgICAgIHZhciBoaWRkZW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHZhciB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIEVmZmVjdC5zaG93KGUsIGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH0sIEVmZmVjdC5kZWxheSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgaGlkZUVmZmVjdCA9IGZ1bmN0aW9uKGhpZGVFdmVudCkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRvdWNoIGhhc24ndCBtb3ZlZCwgYW5kIGVmZmVjdCBub3QgeWV0IHN0YXJ0ZWQ6IHN0YXJ0IGVmZmVjdCBub3dcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpbWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgRWZmZWN0LnNob3coZSwgZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFoaWRkZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBFZmZlY3QuaGlkZShoaWRlRXZlbnQsIGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHZhciB0b3VjaE1vdmUgPSBmdW5jdGlvbihtb3ZlRXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpbWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGhpZGVFZmZlY3QobW92ZUV2ZW50KTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0b3VjaE1vdmUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgaGlkZUVmZmVjdCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCBoaWRlRWZmZWN0LCBmYWxzZSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBFZmZlY3Quc2hvdyhlLCBlbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGlmIChpc1RvdWNoQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBFZmZlY3QuaGlkZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgRWZmZWN0LmhpZGUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBFZmZlY3QuaGlkZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIEVmZmVjdC5oaWRlLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBXYXZlcy5pbml0ID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB2YXIgYm9keSA9IGRvY3VtZW50LmJvZHk7XG5cbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgICAgaWYgKCdkdXJhdGlvbicgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgRWZmZWN0LmR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgnZGVsYXknIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIEVmZmVjdC5kZWxheSA9IG9wdGlvbnMuZGVsYXk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNUb3VjaEF2YWlsYWJsZSkge1xuICAgICAgICAgICAgYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgc2hvd0VmZmVjdCwgZmFsc2UpO1xuICAgICAgICAgICAgYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIFRvdWNoSGFuZGxlci5yZWdpc3RlckV2ZW50LCBmYWxzZSk7XG4gICAgICAgICAgICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgVG91Y2hIYW5kbGVyLnJlZ2lzdGVyRXZlbnQsIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgc2hvd0VmZmVjdCwgZmFsc2UpO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIEF0dGFjaCBXYXZlcyB0byBkeW5hbWljYWxseSBsb2FkZWQgaW5wdXRzLCBvciBhZGQgLndhdmVzLWVmZmVjdCBhbmQgb3RoZXJcbiAgICAgKiB3YXZlcyBjbGFzc2VzIHRvIGEgc2V0IG9mIGVsZW1lbnRzLiBTZXQgZHJhZyB0byB0cnVlIGlmIHRoZSByaXBwbGUgbW91c2VvdmVyXG4gICAgICogb3Igc2tpbW1pbmcgZWZmZWN0IHNob3VsZCBiZSBhcHBsaWVkIHRvIHRoZSBlbGVtZW50cy5cbiAgICAgKi9cbiAgICBXYXZlcy5hdHRhY2ggPSBmdW5jdGlvbihlbGVtZW50cywgY2xhc3Nlcykge1xuXG4gICAgICAgIGVsZW1lbnRzID0gZ2V0V2F2ZXNFbGVtZW50cyhlbGVtZW50cyk7XG5cbiAgICAgICAgaWYgKHRvU3RyaW5nLmNhbGwoY2xhc3NlcykgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzLmpvaW4oJyAnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzID8gJyAnICsgY2xhc3NlcyA6ICcnO1xuXG4gICAgICAgIHZhciBlbGVtZW50LCB0YWdOYW1lO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBlbGVtZW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudHNbaV07XG4gICAgICAgICAgICB0YWdOYW1lID0gZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmIChbJ2lucHV0JywgJ2ltZyddLmluZGV4T2YodGFnTmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgVGFnV3JhcHBlclt0YWdOYW1lXShlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZignd2F2ZXMtZWZmZWN0JykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgKz0gJyB3YXZlcy1lZmZlY3QnICsgY2xhc3NlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIENhdXNlIGEgcmlwcGxlIHRvIGFwcGVhciBpbiBhbiBlbGVtZW50IHZpYSBjb2RlLlxuICAgICAqL1xuICAgIFdhdmVzLnJpcHBsZSA9IGZ1bmN0aW9uKGVsZW1lbnRzLCBvcHRpb25zKSB7XG4gICAgICAgIGVsZW1lbnRzID0gZ2V0V2F2ZXNFbGVtZW50cyhlbGVtZW50cyk7XG4gICAgICAgIHZhciBlbGVtZW50c0xlbiA9IGVsZW1lbnRzLmxlbmd0aDtcblxuICAgICAgICBvcHRpb25zICAgICAgICAgID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgb3B0aW9ucy53YWl0ICAgICA9IG9wdGlvbnMud2FpdCB8fCAwO1xuICAgICAgICBvcHRpb25zLnBvc2l0aW9uID0gb3B0aW9ucy5wb3NpdGlvbiB8fCBudWxsOyAvLyBkZWZhdWx0ID0gY2VudHJlIG9mIGVsZW1lbnRcblxuXG4gICAgICAgIGlmIChlbGVtZW50c0xlbikge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQsIHBvcywgb2ZmLCBjZW50cmUgPSB7fSwgaSA9IDA7XG4gICAgICAgICAgICB2YXIgbW91c2Vkb3duID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdtb3VzZWRvd24nLFxuICAgICAgICAgICAgICAgIGJ1dHRvbjogMVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBoaWRlUmlwcGxlID0gZnVuY3Rpb24obW91c2V1cCwgZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgRWZmZWN0LmhpZGUobW91c2V1cCwgZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZvciAoOyBpIDwgZWxlbWVudHNMZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50c1tpXTtcbiAgICAgICAgICAgICAgICBwb3MgPSBvcHRpb25zLnBvc2l0aW9uIHx8IHtcbiAgICAgICAgICAgICAgICAgICAgeDogZWxlbWVudC5jbGllbnRXaWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgICAgIHk6IGVsZW1lbnQuY2xpZW50SGVpZ2h0IC8gMlxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBvZmYgICAgICA9IG9mZnNldChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBjZW50cmUueCA9IG9mZi5sZWZ0ICsgcG9zLng7XG4gICAgICAgICAgICAgICAgY2VudHJlLnkgPSBvZmYudG9wICsgcG9zLnk7XG5cbiAgICAgICAgICAgICAgICBtb3VzZWRvd24ucGFnZVggPSBjZW50cmUueDtcbiAgICAgICAgICAgICAgICBtb3VzZWRvd24ucGFnZVkgPSBjZW50cmUueTtcblxuICAgICAgICAgICAgICAgIEVmZmVjdC5zaG93KG1vdXNlZG93biwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy53YWl0ID49IDAgJiYgb3B0aW9ucy53YWl0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtb3VzZXVwID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ21vdXNldXAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uOiAxXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChoaWRlUmlwcGxlKG1vdXNldXAsIGVsZW1lbnQpLCBvcHRpb25zLndhaXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYWxsIHJpcHBsZXMgZnJvbSBhbiBlbGVtZW50LlxuICAgICAqL1xuICAgIFdhdmVzLmNhbG0gPSBmdW5jdGlvbihlbGVtZW50cykge1xuICAgICAgICBlbGVtZW50cyA9IGdldFdhdmVzRWxlbWVudHMoZWxlbWVudHMpO1xuICAgICAgICB2YXIgbW91c2V1cCA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdtb3VzZXVwJyxcbiAgICAgICAgICAgIGJ1dHRvbjogMVxuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBlbGVtZW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgRWZmZWN0LmhpZGUobW91c2V1cCwgZWxlbWVudHNbaV0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlcHJlY2F0ZWQgQVBJIGZhbGxiYWNrXG4gICAgICovXG4gICAgV2F2ZXMuZGlzcGxheUVmZmVjdCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignV2F2ZXMuZGlzcGxheUVmZmVjdCgpIGhhcyBiZWVuIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBmdXR1cmUgdmVyc2lvbi4gUGxlYXNlIHVzZSBXYXZlcy5pbml0KCkgdG8gaW5pdGlhbGl6ZSBXYXZlcyBlZmZlY3QnKTtcbiAgICAgICAgV2F2ZXMuaW5pdChvcHRpb25zKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFdhdmVzO1xufSk7XG4iLCJ2YXIgd2F2ZXMgPSByZXF1aXJlKCcuL2xpYnMvd2F2ZXMnKTtcclxuXHJcbmNvbnNvbGUubG9nKCdoaSB0aGVyZSEnKTtcclxuIl19
