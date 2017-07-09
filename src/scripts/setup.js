var queue = []
var timer = 1;
var daytimeCycle = 1;
var backgroundBrightness = 0;
var brightDir = 0;
var staticMap = new p5(renderMap)

function setup() {
    frameRate(60)
    colorMode(HSB)
    rectMode(CENTER)
    noStroke()
    var canvas = createCanvas(500, 500)

    canvas.parent('canvas-wrapper');

    resize(window)

    for(var carIndex = 0; carIndex < environment.simulation.carAmount; carIndex++) {
        var car = new Car()

        car.charge = car.capacity * environment.simulation.carChargeLimit
        car.enteredCity(car.home)
        environment.simulation.totalCarCharge += car.charge

        car.isSlacker = Math.random() >= 0.1
    }

    for(var truckIndex = 0; truckIndex < environment.simulation.truckAmount; truckIndex++) {
        new Truck()
    }

    console.table(cars)
    console.table(trucks)

    Events.on('carStuck', function(wroom) {
        var pos = queue.findIndex(function(elem) {
            return elem.type != 'car'
        })

        if(pos < 0) {
            pos = queue.length
        }

        queue.splice(pos, 0, wroom);
    })

    Events.on('cityNeedsCharging', function(city) {
        queue.push(city);
    })

    Events.on('nightChargeStart', function() {
        for(var cityIndex in cities) {
            var city = cities[cityIndex];

            if(city.needsCharging() && city.id != cityDict.Stuttgart) {
                Events.trigger('cityNeedsCharging', city)
            }
        }
    })

    Events.on('nightChargeEnd', function() {
        queue = queue.filter(function(item) {
            return item.type != 'city'
        })
    })

    Events.on('nightEnd', function() {
        brightDir = 0.3
    })


    Events.on('nightStart', function() {
        brightDir = -1
    })
}

function windowResized() {
    resize(window)
}
