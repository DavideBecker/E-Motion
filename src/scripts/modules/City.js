var cities = [];

class City extends Node {
    constructor(node) {
        super(node)

        this.parkedCars = [];
        this.charge = 1
        this.name = cityDict[this.id]
        this.type = 'city'

        cities.push(this)
    }

    sendCarTo(target) {
        if(!this.parkedCars.length) {
            return
        }

        var car = this.parkedCars.pop()

        // this.updateAverageCharge(car.getChargePercentage())
        car.driveTo(target)
    }

    needsCharging() {
        return this.parkedCars.find(function(car) {
            return car.charge / car.capacity < environment.simulation.carChargeLimit
        })
    }

    updateAverageCharge(difference) {
        if(this.parkedCars.length) {
            this.charge = this.charge + (difference - this.charge) / this.parkedCars.length
        } else {
            this.charge = 1
        }
    }

    calculateAverageCharge() {
        var total = 0;

        for(var i in this.parkedCars) {
            var car = this.parkedCars[i];

            total += car.charge / car.capacity
        }

        this.charge = total / this.parkedCars.length
    }

    sendCarHome() {
        if(!this.parkedCars.length) {
            return
        }

        var car = this.parkedCars.pop()

        this.updateAverageCharge(car.getChargePercentage())
        car.driveHome()
    }

    render() {
        fill(51)
        noStroke()
        if(this.parkedCars.length) {
            fill(chargeToColor(this.charge))
        }

        if(this.name == 'Stuttgart') {
            ellipse(this.x * environment.scale, this.y * environment.scale, 35 * environment.scale, 35 * environment.scale)
        } else {
            ellipse(this.x * environment.scale, this.y * environment.scale, 20 * environment.scale, 20 * environment.scale)
        }

    }

    update() {
        this.render();
    }
}
