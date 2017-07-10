'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function Node(raw) {
    _classCallCheck(this, Node);

    this.connectedTo = raw.connectedTo;
    this.id = raw.id;
    this.isCity = raw.isCity;
    this.x = raw.x;
    this.y = raw.y;
    this.type = 'node';
};
//# sourceMappingURL=Node.js.map
