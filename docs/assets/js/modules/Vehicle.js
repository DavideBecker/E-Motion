'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vehicle = function () {
    function Vehicle() {
        _classCallCheck(this, Vehicle);

        this.inCity = true;
        this.isDriving = false;
        this.isStuck = false;
        this.moveStack = [];
        this.position = createVector(0, 0);
        this.velocity = createVector(0, 0);
        this.capacity = 1;
        this.charge = 1;
        this.dischargeSpeed = 0.009; //0.012
        this.isSlacker = false;
    }

    _createClass(Vehicle, [{
        key: 'getChargePercentage',
        value: function getChargePercentage() {
            return this.charge / this.capacity;
        }
    }, {
        key: 'fancyPath',
        value: function fancyPath() {
            var detour = Nodes.getRandomNode();

            return graph.findShortestPath(this.location.id, detour.id).concat(graph.findShortestPath(detour.id, this.target.id));
        }
    }, {
        key: 'fastestPath',
        value: function fastestPath() {
            return graph.findShortestPath(this.location.id, this.target.id);
        }
    }, {
        key: 'driveTo',
        value: function driveTo(node, done) {
            this.whenTargetIsReached = done;

            if (this.location.id != node.id) {
                this.target = node;
                // console.log(this, 'is driving from', cityDict[this.location.id], 'to', cityDict[this.target.id])
                if (this.isSlacker) {
                    this.moveStack = this.fancyPath();
                } else {
                    this.moveStack = this.fastestPath();
                }
                this.isDriving = true;
                this.inCity = false;
                this.toNextNode();
            } else if (done) {
                done();
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.isDriving = false;
            this.velocity.set(0, 0);
            if (this.next) {
                this.location = this.next;
            }
        }
    }, {
        key: 'toNextNode',
        value: function toNextNode() {
            this.next = Nodes.getById(this.moveStack.shift());

            if (this.next && !this.isStuck) {
                var diff = createVector(this.next.x - this.position.x, this.next.y - this.position.y);
                var distance = dist(this.position.x, this.position.y, this.next.x, this.next.y);

                this.velocity = diff.div(distance * 2);
            } else {
                this.stop();
                this.inCity = true;
                this.location = this.target;
                if (this.target.isCity && this.type == 'car') {
                    this.enteredCity(this.target);
                }
                if (this.whenTargetIsReached) {
                    this.whenTargetIsReached();
                }
            }
        }
    }, {
        key: 'reachedNode',
        value: function reachedNode() {
            var distance = dist(this.position.x, this.position.y, this.next.x, this.next.y);

            return distance <= 1;
        }
    }, {
        key: 'updatePosition',
        value: function updatePosition() {
            if (this.isStuck) {
                return;
            }

            this.position.add(this.velocity);

            if (this.isDriving) {

                if (this.type == 'car') {
                    this.charge -= this.dischargeSpeed;
                    environment.simulation.totalCarCharge -= this.dischargeSpeed;
                }

                if (this.charge <= 0) {
                    this.charge = 0;
                    this.location = this.next;
                    this.isStuck = true;
                    Events.trigger('carStuck', this);
                }

                if (this.reachedNode()) {
                    this.toNextNode();
                }
            } else {
                this.stop();
            }
        }
    }, {
        key: 'enteredCity',
        value: function enteredCity(city) {
            city.parkedCars.push(this);
            city.updateAverageCharge(this.getChargePercentage());
            this.inCity = true;
        }
    }, {
        key: 'leftCity',
        value: function leftCity(city) {
            city.parkedCars.splice(city.parkedCars.indexOf(this), 1);
            city.updateAverageCharge(-this.getChargePercentage());
            this.inCity = false;
        }
    }, {
        key: 'highlight',
        value: function highlight() {
            this.render = function () {
                fill('#FF0000');
                rect(this.position.x * environment.scale, this.position.y * environment.scale, 50, 50);
            };
        }
    }]);

    return Vehicle;
}();
//# sourceMappingURL=Vehicle.js.map
