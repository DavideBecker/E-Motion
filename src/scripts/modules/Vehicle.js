class Vehicle {
    constructor() {
        this.inCity = true;
        this.isDriving = false;
        this.isStuck = false;
        this.moveStack = [];
        this.position = createVector(0, 0);
        this.velocity = createVector(0, 0);
        this.charge = 1;
    }

    planPath() {
        var detour = Nodes.getRandomNode()

        return graph.findShortestPath(this.location.id, detour.id).concat(graph.findShortestPath(detour.id, this.target.id))
    }

    stop() {
        this.isDriving = false
        this.velocity.set(0, 0)
    }

    toNextNode() {
        if(this.isStuck) {
            this.stop()

            return
        }

        this.next = Nodes.getById(this.moveStack.shift());

        if(this.next && !this.isStuck) {
            var diff = createVector(this.next.x - this.position.x, this.next.y - this.position.y)
            var distance = dist(this.position.x, this.position.y, this.next.x, this.next.y);

            this.velocity = diff.div(distance)
        } else {
            this.stop()
            this.inCity = true;
            if(this.target.isCity) {
                this.target.parkedCars.push(this)
            }
        }
    }

    driveTo(node) {
        this.target = node;
        this.moveStack = this.planPath()
        this.isDriving = true;
        this.inCity = false;
        this.toNextNode()
    }

    reachedNode() {
        var distance = dist(this.position.x, this.position.y, this.next.x, this.next.y);

        return distance <= 1
    }

    updatePosition() {
        this.position.add(this.velocity)

        if(this.isDriving) {

            this.charge -= 0.1

            if(this.charge <= 0) {
                this.charge = 0
                this.isStuck = true
            }

            if(this.reachedNode()) {
                this.toNextNode()
            }
        } else {
            this.stop()
        }
    }
}
