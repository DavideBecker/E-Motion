class Truck extends Vehicle {
    constructor() {
        super()

        this.busy = false;
        this.location = Nodes.getStuttgart()
        this.position = createVector(this.location.x, this.location.y);
        this.capacity = 400
        this.charge = this.capacity;
        this.dischargeSpeed = 0;
        this.type = 'truck'
        this.workTarget = false

        trucks.push(this)
    }

    chargeCar(car) {
        if(car.charge / car.capacity < environment.simulation.carChargeLimit) { //car.charge / car.capacity < environment.simulation.carChargeLimit) {
            car.charge += car.chargeSpeed
        } else {
            if(car.charge > car.capacity) {
                car.charge = car.capacity
            }
            this.busy = false
            this.rescueTarget = false
            car.isStuck = false
        }
    }

    chargeCity(city) {
        if(city.needsCharging()) {
            for(var id in city.parkedCars) {
                var car = city.parkedCars[id];

                if(car.charge / car.capacity < environment.simulation.carChargeLimit) { //car.charge / car.capacity < environment.simulation.carChargeLimit) {
                    car.charge += car.chargeSpeed / city.parkedCars.length
                }

                if(car.charge > car.capacity) {
                    car.charge = car.capacity
                }
            }

            city.calculateAverageCharge();
        } else {
            this.busy = false
            this.rescueTarget = false
        }
    }

    getNewWork() {
        this.busy = true;
        this.workTarget = queue.shift();

        switch (this.workTarget.type) {
        case 'car':
            this.driveTo(this.workTarget.location)
            break;

        case 'city':
            this.driveTo(this.workTarget)
            break;

        default:
            break;
        }
    }

    work() {
        switch (this.workTarget.type) {
        case 'car':
            this.chargeCar(this.workTarget);
            break;

        case 'city':
            this.chargeCity(this.workTarget);
            break;

        default:
            break;
        }
    }

    render() {
        applyMatrix()
        fill('#444444')
        strokeWeight(4)
        stroke('#37BDFF')
        translate(this.position.x * environment.scale, this.position.y * environment.scale)
        if(this.next) {
            rotate(atan2(this.position.y - this.next.y, this.position.x - this.next.x))
        }
        rect(
            0,
            0,
            environment.truckSize * 1.5,
            environment.truckSize,
            4
        )
        resetMatrix()
    }

    update() {
        if(this.busy && !this.isDriving) {
            this.work()
        } else if(queue.length && !this.busy) {
            this.getNewWork()
        } else if(!this.isDriving && this.location.name != 'Stuttgart') {
            this.driveTo(Nodes.getStuttgart())
        }

        this.updatePosition()
        this.render()
    }
}
