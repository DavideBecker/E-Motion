'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Car = function (_Vehicle) {
    _inherits(Car, _Vehicle);

    function Car() {
        _classCallCheck(this, Car);

        var _this = _possibleConstructorReturn(this, (Car.__proto__ || Object.getPrototypeOf(Car)).call(this));

        _this.home = Nodes.getRandomTown();
        _this.location = _this.home;
        _this.position = createVector(_this.location.x, _this.location.y);
        _this.capacity = 24;
        _this.charge = _this.capacity;
        _this.dischargeSpeed = 0.00185;
        _this.chargeSpeed = 0.07;
        _this.type = 'car';

        cars.push(_this);
        return _this;
    }

    _createClass(Car, [{
        key: 'driveHome',
        value: function driveHome() {
            this.driveTo(this.home);
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.inCity) {
                return;
            }

            applyMatrix();
            strokeWeight(1);
            stroke('#444444');
            fill(chargeToColor(this.charge / this.capacity));
            translate(this.position.x * environment.scale, this.position.y * environment.scale);
            if (this.next) {
                rotate(atan2(this.position.y - this.next.y, this.position.x - this.next.x));
            }
            rect(0, 0, environment.carSize * 1.5, environment.carSize, 4);
            resetMatrix();
        }
    }, {
        key: 'update',
        value: function update() {
            this.updatePosition();
            this.render();
        }
    }]);

    return Car;
}(Vehicle);
//# sourceMappingURL=Car.js.map
