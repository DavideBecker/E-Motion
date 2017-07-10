'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventManager = function () {
    function EventManager() {
        _classCallCheck(this, EventManager);

        this.tracker = {};
        this.flags = {};
    }

    _createClass(EventManager, [{
        key: 'enable',
        value: function enable(eventType) {
            console.log(eventType, 'flag enabled');

            this.flags[eventType] = true;
        }
    }, {
        key: 'disable',
        value: function disable(eventType) {
            console.log(eventType, 'flag disabled');

            this.flags[eventType] = false;
        }
    }, {
        key: 'isActive',
        value: function isActive(eventType) {
            return this.flags[eventType];
        }
    }, {
        key: 'on',
        value: function on(eventType, func) {
            console.log('Event listener for', eventType, 'created');

            this.tracker[eventType] = func;
        }
    }, {
        key: 'trigger',
        value: function trigger(eventType, payload) {
            console.log(eventType, 'triggered');

            if (this.tracker[eventType]) {
                if (payload) {
                    this.tracker[eventType](payload);
                } else {
                    this.tracker[eventType]();
                }
            }
        }
    }]);

    return EventManager;
}();

var Events = new EventManager();
//# sourceMappingURL=Events.js.map
