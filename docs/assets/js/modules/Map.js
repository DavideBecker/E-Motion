'use strict';

function renderMap(sketch) {
    function showMap(map) {
        map.strokeWeight(5);
        map.stroke('#C6C6C6');

        Nodes.forAll(function (index, node) {
            for (var connectionIndex = 0; connectionIndex < node.connectedTo.length; connectionIndex++) {
                var connectedNode = Nodes.getById(node.connectedTo[connectionIndex]);

                map.line(node.x * environment.scale, node.y * environment.scale, connectedNode.x * environment.scale, connectedNode.y * environment.scale);
            }
        });
    }

    sketch.windowResized = function () {
        resize(sketch);
        showMap(sketch);
    };

    sketch.setup = function () {
        sketch.rectMode(sketch.CENTER);
        var canvas = sketch.createCanvas(500, 500);

        canvas.parent('canvas-wrapper');
        resize(sketch);
        showMap(sketch);
    };
}
//# sourceMappingURL=Map.js.map
