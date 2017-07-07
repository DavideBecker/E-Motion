var cities = [];

class City extends Node {
    constructor(node) {
        super(node)

        this.parkedCars = [];
        this.charge = 1

        cities.push(this)
    }

    sendCarTo(target) {
        if(!this.parkedCars.length) {
            return
        }

        var car = this.parkedCars.pop()

        this.updateAverageCharge(car.getChargePercentage())
        car.driveTo(target)
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

            total += car.charge
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

        if(this.parkedCars.length) {
            fill(chargeToColor(this.charge))
        }

        ellipse(this.x * environment.scale, this.y * environment.scale, 20, 20)
    }

    update() {
        this.render();
    }
}
