class Car extends Vehicle {
    constructor() {
        super()

        this.home = Nodes.getRandomTown();
        this.location = this.home;
        this.position = createVector(this.location.x, this.location.y);
        this.capacity = environment.simulation.carCapacity
        this.charge = this.capacity;
        this.dischargeSpeed = 0.00185;
        this.chargeSpeed = 0.07;
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

        applyMatrix()
        strokeWeight(1)
        stroke('#444444')
        fill(chargeToColor(this.charge / this.capacity))
        translate(this.position.x * environment.scale, this.position.y * environment.scale)
        if(this.next) {
            rotate(atan2(this.position.y - this.next.y, this.position.x - this.next.x))
        }
        rect(
            0,
            0,
            environment.carSize * 1.5,
            environment.carSize,
            4
        )
        resetMatrix()
    }

    update() {
        this.updatePosition()
        this.render()
    }
}
