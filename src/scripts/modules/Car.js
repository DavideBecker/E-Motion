class Car extends Vehicle {
    constructor() {
        super()

        this.home = Nodes.getRandomTown();
        this.location = this.home;
        this.position = createVector(this.location.x, this.location.y);
        this.capacity = 24
        this.charge = this.capacity;
        this.type = 'car'

        cars.push(this);
    }

    driveHome() {
        this.driveTo(this.home)
    }

    render() {
        if(this.inCity) {
            return
        }

        noStroke()
        fill(chargeToColor(this.charge / this.capacity))
        rect(
            this.position.x * environment.scale,
            this.position.y * environment.scale,
            environment.carSize,
            environment.carSize
        )
    }

    update() {
        this.updatePosition()
        this.render()
    }
}
