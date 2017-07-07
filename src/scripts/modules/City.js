var cities = [];

class City extends Node {
    constructor(node) {
        super(node)

        this.parkedCars = [];
        this.charge = 0

        cities.push(this)
    }

    sendCarAway(target) {
        this.parkedCars.pop().driveTo(target)
    }

    sendCarHome() {
        this.parkedCars.pop().driveHome()
    }

    render() {
        fill(this.charge)
        ellipse(this.x, this.y, 10, 10)

        ellipse(this.x * environment.scale, this.y * environment.scale, 20, 20)
    }

    update() {
        this.render();
    }
}
