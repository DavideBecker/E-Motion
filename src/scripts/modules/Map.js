function renderMap(sketch) {
    function showMap(map) {
        var canvas = map.createCanvas(map.windowWidth - $('#sidebar').width() + 100, map.windowHeight);

        canvas.parent('canvas-wrapper');
        map.rectMode(map.CENTER);

        Nodes.forAll(function(index, node) {
            for(var connectionIndex = 0; connectionIndex < node.connectedTo.length; connectionIndex++) {
                var connectedNode = Nodes.getById(node.connectedTo[connectionIndex]);

                map.stroke(196);
                map.strokeWeight(3)
                map.line(
                    node.x * environment.scale,
                    node.y * environment.scale,
                    connectedNode.x * environment.scale,
                    connectedNode.y * environment.scale
                );
            }
        })

    }

    sketch.windowResized = function() {
        resize(sketch)
        showMap(sketch)
    }

    sketch.setup = function() {
        var canvas = sketch.createCanvas(sketch.windowWidth - $('#sidebar').width() + 100, sketch.windowHeight);

        canvas.parent('canvas-wrapper');
        sketch.rectMode(sketch.CENTER);
        resize(sketch)
        showMap(sketch)
    }
}

var staticMap = new p5(renderMap)
