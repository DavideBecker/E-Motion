'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NodeManager = function () {
    function NodeManager() {
        _classCallCheck(this, NodeManager);

        this.nodes = {};

        for (var i in rawNodes) {
            var rawNode = rawNodes[i];

            if (rawNode.isCity) {
                this.nodes[rawNode.id] = new City(rawNode);
            } else {
                this.nodes[rawNode.id] = new Node(rawNode);
            }
        }
    }

    _createClass(NodeManager, [{
        key: 'getRandomNode',
        value: function getRandomNode() {
            return this.nodes[nodeIDs[floor(random(0, nodeIDs.length))]];
        }
    }, {
        key: 'getRandomTown',
        value: function getRandomTown() {
            return this.nodes[cityIDsWithoutStuttgart[floor(random(0, cityIDsWithoutStuttgart.length))]];
        }
    }, {
        key: 'getRandomCity',
        value: function getRandomCity() {
            return this.nodes[cityIDs[floor(random(0, cityIDs.length))]];
        }
    }, {
        key: 'forAll',
        value: function forAll(func) {
            for (var nodeIndex in this.nodes) {
                func(nodeIndex, this.nodes[nodeIndex]);
            }
        }
    }, {
        key: 'getById',
        value: function getById(id) {
            return this.nodes[id];
        }
    }, {
        key: 'getByName',
        value: function getByName(name) {
            return this.nodes[cityDict[name]];
        }
    }, {
        key: 'getStuttgart',
        value: function getStuttgart() {
            return this.getByName('Stuttgart');
        }
    }, {
        key: 'getTownThatNeedsCharging',
        value: function getTownThatNeedsCharging() {
            var potentialTowns = [];

            for (var i in cityIDs) {
                var node = this.nodes[cityIDs[i]];

                if (node.charge < 1) {
                    potentialTowns.push(node);
                }
            }

            return potentialTowns[floor(random(0, potentialTowns.length))];
        }
    }]);

    return NodeManager;
}();

var Nodes = new NodeManager();

console.log(Nodes);
//# sourceMappingURL=NodeManager.js.map
