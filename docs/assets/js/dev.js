'use strict';

function renderAllNodes() {
    Nodes.forAll(function (id, node) {
        fill(51);

        if (node.isCity) {
            fill(50, 200, 0);
            text(cityDict[node.id], node.x * environment.scale + 5, node.y * environment.scale - 5);
        }

        var size = 10;

        ellipse(node.x * environment.scale, node.y * environment.scale, size, size);
    });
}

function mousePressed() {
    Nodes.forAll(function (nodeIndex, node) {
        if (dist(mouseX, mouseY, node.x * environment.scale, node.y * environment.scale) < 5) {
            console.log('node clicked', Nodes.getById(nodeIndex));
        }
    });

    for (var i in cars) {
        var car = cars[i];

        if (mouseX > car.position.x * environment.scale && mouseX < car.position.x * environment.scale + environment.carSize && mouseY > car.position.y * environment.scale && mouseY < car.position.y * environment.scale + environment.carSize) {
            console.log('car clicked', car);
        }
    }
}

function showPathFor(wroom) {

    if (wroom) {
        var home = wroom.home;
        var from = wroom.location;
        var next = wroom.next;
        var to = wroom.target;
        var path = wroom.moveStack;

        if (home) {
            fill('#00FFFF');
            ellipse(home.x * environment.scale, home.y * environment.scale, 20, 20);
        }

        if (from) {
            fill('#FF0000');
            ellipse(from.x * environment.scale, from.y * environment.scale, 15, 15);
        }

        if (to) {
            fill('#00FF00');
            ellipse(to.x * environment.scale, to.y * environment.scale, 10, 10);
        }

        if (next) {
            fill('#0000FF');
            ellipse(next.x * environment.scale, next.y * environment.scale, 5, 5);
        }

        var prev = wroom.position;

        for (var index = 0; index < path.length; index++) {
            var curr = Nodes.getById(path[index]);

            stroke(100, 50, 0);
            line(curr.x * environment.scale, curr.y * environment.scale, prev.x * environment.scale, prev.y * environment.scale);
            prev = curr;
        }
    }
}

function debugMagic() {
    for (var i in debugged) {
        var obj = debugged[i];

        if (obj.type == 'car') {
            showPathFor(obj);
        }
    }
}
//# sourceMappingURL=dev.js.map
