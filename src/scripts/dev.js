function renderAllNodes() {
    Nodes.forAll((id, node) => {
        fill(51);

        if(node.isCity) {
            fill(50, 200, 0)
            text(cityDict[node.id], node.x + 5, node.y - 5)
        }

        var size = 10;

        ellipse(node.x, node.y, size, size)
    })
}

function mousePressed() {
    Nodes.forAll((nodeIndex, node) => {
        if(dist(mouseX, mouseY, node.x, node.y) < 5) {
            console.log('node clicked', Nodes.getById(nodeIndex));
        }
    })

    for(var i in cars) {
        var car = cars[i];

        if(
            mouseX > car.position.x &&
            mouseX < car.position.x + environment.carSize &&
            mouseY > car.position.y &&
            mouseY < car.position.y + environment.carSize
        ) {
            console.log('car clicked', car);
        }
    }
}

function showPathFor(wroom) {

    if(wroom) {
        var home = wroom.home
        var from = wroom.location
        var next = wroom.next
        var to = wroom.target
        var path = wroom.moveStack

        fill('#00FFFF')
        ellipse(home.x, home.y, 20, 20)

        fill('#FF0000')
        ellipse(from.x, from.y, 15, 15)

        fill('#00FF00')
        ellipse(to.x, to.y, 10, 10)

        if(next) {
            fill('#0000FF')
            ellipse(next.x, next.y, 5, 5)
        }

        var prev = wroom.position

        for(var index = 0; index < path.length; index++) {
            var curr = Nodes.getById(path[index])

            stroke(100, 50, 0)
            line(curr.x, curr.y, prev.x, prev.y)
            prev = curr
        }
    }
}

function debugMagic() {
    for(var i in debugged) {
        var obj = debugged[i];

        if(obj.type == 'car') {
            showPathFor(obj);
        }
    }
}
