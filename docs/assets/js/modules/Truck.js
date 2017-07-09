'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Truck = function (_Vehicle) {
    _inherits(Truck, _Vehicle);

    function Truck() {
        _classCallCheck(this, Truck);

        var _this = _possibleConstructorReturn(this, (Truck.__proto__ || Object.getPrototypeOf(Truck)).call(this));

        _this.busy = false;
        _this.location = Nodes.getStuttgart();
        _this.position = createVector(_this.location.x, _this.location.y);
        _this.capacity = 400;
        _this.charge = _this.capacity;
        _this.dischargeSpeed = 0;
        _this.type = 'truck';
        _this.workTarget = false;

        trucks.push(_this);
        return _this;
    }

    _createClass(Truck, [{
        key: 'chargeCar',
        value: function chargeCar(car) {
            if (car.charge / car.capacity < environment.simulation.carChargeLimit) {
                //car.charge / car.capacity < environment.simulation.carChargeLimit) {
                car.charge += car.chargeSpeed;
            } else {
                if (car.charge > car.capacity) {
                    car.charge = car.capacity;
                }
                this.busy = false;
                this.rescueTarget = false;
                car.isStuck = false;
            }
        }
    }, {
        key: 'chargeCity',
        value: function chargeCity(city) {
            if (city.needsCharging()) {
                for (var id in city.parkedCars) {
                    var car = city.parkedCars[id];

                    if (car.charge / car.capacity < environment.simulation.carChargeLimit) {
                        //car.charge / car.capacity < environment.simulation.carChargeLimit) {
                        car.charge += car.chargeSpeed / city.parkedCars.length;
                    }

                    if (car.charge > car.capacity) {
                        car.charge = car.capacity;
                    }
                }

                city.calculateAverageCharge();
            } else {
                this.busy = false;
                this.rescueTarget = false;
            }
        }
    }, {
        key: 'getNewWork',
        value: function getNewWork() {
            this.busy = true;
            this.workTarget = queue.shift();

            switch (this.workTarget.type) {
                case 'car':
                    this.driveTo(this.workTarget.location);
                    break;

                case 'city':
                    this.driveTo(this.workTarget);
                    break;

                default:
                    break;
            }
        }
    }, {
        key: 'work',
        value: function work() {
            switch (this.workTarget.type) {
                case 'car':
                    this.chargeCar(this.workTarget);
                    break;

                case 'city':
                    this.chargeCity(this.workTarget);
                    break;

                default:
                    break;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            applyMatrix();
            fill('#444444');
            strokeWeight(4);
            stroke('#37BDFF');
            translate(this.position.x * environment.scale, this.position.y * environment.scale);
            if (this.next) {
                rotate(atan2(this.position.y - this.next.y, this.position.x - this.next.x));
            }
            rect(0, 0, environment.truckSize * 1.5, environment.truckSize, 4);
            resetMatrix();
        }
    }, {
        key: 'update',
        value: function update() {
            if (this.busy && !this.isDriving) {
                this.work();
            } else if (queue.length && !this.busy) {
                this.getNewWork();
            } else if (!this.isDriving && this.location.name != 'Stuttgart') {
                this.driveTo(Nodes.getStuttgart());
            }

            this.updatePosition();
            this.render();
        }
    }]);

    return Truck;
}(Vehicle);
//# sourceMappingURL=Truck.js.map
