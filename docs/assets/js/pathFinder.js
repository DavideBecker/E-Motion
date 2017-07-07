"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pathfinder = function () {
	function Pathfinder(startNode, targetNode) {
		_classCallCheck(this, Pathfinder);

		this.start = startNode;
		this.target = targetNode;

		this.foundPaths = [];
	}

	_createClass(Pathfinder, [{
		key: "startFinder",
		value: function startFinder() {
			this.foundPaths = [];
			this.goDeeper([], this.start);

			console.log(this.foundPaths.toString());
		}
	}, {
		key: "goDeeper",
		value: function goDeeper(pathSoFar, current) {

			pathSoFar.push(current);

			if (current == this.target) {

				//console.log(pathSoFar.toString());
				this.foundPaths.push(concat([], pathSoFar));
			} else {
				if (current.connectedTo.length > 0) {
					for (var i = 0; i < current.connectedTo.length; i++) {
						this.goDeeper(pathSoFar, current.connectedTo[i]);
					}
				} else {}
			}
			pathSoFar.pop();
		}
	}]);

	return Pathfinder;
}();