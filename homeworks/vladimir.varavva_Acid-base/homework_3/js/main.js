(function () {
    'use strict';

    //1
    var nativeSetTimeOut = window.setTimeout;

    window.setTimeout = function (delay, callback) {
        var args = Array.prototype.slice.call(arguments, 2);
        if (typeof callback === 'function') {
             nativeSetTimeOut(function () {
                callback.apply(this, args);
            }, delay);
        }
    };

    //2
    window.setInterval = function (callback, delay) {
        var args = Array.prototype.slice.call(arguments, 2),
            timeout;

        (function loop() {
            callback.apply(this, args);
            timeout = setTimeout(delay, loop);
        }());

        return function () {
            if (timeout) {
                clearTimeout(timeout);
                timeout = 0;
            }
        };
    };

})();
