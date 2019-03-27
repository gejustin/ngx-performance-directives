import 'jest-preset-angular';
import { root } from 'rxjs/internal/util/root';

root.requestIdleCallback =
    root.requestIdleCallback ||
    function(cb) {
        const start = Date.now();
        return setTimeout(function() {
            cb({
                didTimeout: false,
                timeRemaining: function() {
                    return Math.max(0, 50 - (Date.now() - start));
                },
            });
        }, 1);
    };

root.cancelIdleCallback =
    root.cancelIdleCallback ||
    function(id) {
        clearTimeout(id);
    };
