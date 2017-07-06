class Car extends Vehicle {
    constructor() {
        super()

        this.home = Nodes.getRandomTown();
        this.location = this.home;
        console.log(this.home, this.location);
        this.position = createVector(this.location.x, this.location.y);
        this.capacity = 24
        this.charge = this.capacity;

        console.log('Hometown: ', cityDict[this.home.id])

        cars.push(this);
    }

    driveHome() {
        this.driveTo(this.home)
    }

    render() {
        if(this.inCity)
            return

        noStroke()
        fill(chargeToColor(this.charge / this.capacity))
        rect(this.position.x, this.position.y, 10, 10)
    }

    update() {
        this.updatePosition()
        this.render()
    }
}
