'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cities = [];

var City = function (_Node) {
    _inherits(City, _Node);

    function City(node) {
        _classCallCheck(this, City);

        var _this = _possibleConstructorReturn(this, (City.__proto__ || Object.getPrototypeOf(City)).call(this, node));

        _this.parkedCars = [];
        _this.charge = 1;
        _this.name = cityDict[_this.id];
        _this.type = 'city';

        cities.push(_this);
        return _this;
    }

    _createClass(City, [{
        key: 'sendCarTo',
        value: function sendCarTo(target) {
            if (!this.parkedCars.length) {
                return;
            }

            var car = this.parkedCars.pop();

            // this.updateAverageCharge(car.getChargePercentage())
            car.driveTo(target);
        }
    }, {
        key: 'needsCharging',
        value: function needsCharging() {
            return this.parkedCars.find(function (car) {
                return car.charge / car.capacity < environment.simulation.carChargeLimit;
            });
        }
    }, {
        key: 'updateAverageCharge',
        value: function updateAverageCharge(difference) {
            if (this.parkedCars.length) {
                this.charge = this.charge + (difference - this.charge) / this.parkedCars.length;
            } else {
                this.charge = 1;
            }
        }
    }, {
        key: 'calculateAverageCharge',
        value: function calculateAverageCharge() {
            var total = 0;

            for (var i in this.parkedCars) {
                var car = this.parkedCars[i];

                total += car.charge / car.capacity;
            }

            this.charge = total / this.parkedCars.length;
        }
    }, {
        key: 'sendCarHome',
        value: function sendCarHome() {
            if (!this.parkedCars.length) {
                return;
            }

            var car = this.parkedCars.pop();

            this.updateAverageCharge(car.getChargePercentage());
            car.driveHome();
        }
    }, {
        key: 'render',
        value: function render() {
            fill(20);
            noStroke();
            if (this.parkedCars.length) {
                fill(chargeToColor(this.charge));
            }

            if (this.name == 'Stuttgart') {
                ellipse(this.x * environment.scale, this.y * environment.scale, 35 * environment.scale, 35 * environment.scale);
            } else {
                ellipse(this.x * environment.scale, this.y * environment.scale, 20 * environment.scale, 20 * environment.scale);
            }
        }
    }, {
        key: 'update',
        value: function update() {
            this.render();
        }
    }]);

    return City;
}(Node);
//# sourceMappingURL=City.js.map
