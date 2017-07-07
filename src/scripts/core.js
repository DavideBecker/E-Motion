var testcar = 1

function setup() {
    frameRate(60)
    colorMode(HSB)
    rectMode(CENTER)
    noStroke()
    var canvas = createCanvas(500, 500)

    canvas.parent('canvas-wrapper');

    resize(window)

    for(var i = 0; i < environment.simulation.carAmount; i++) {
        var car = new Car()

        car.enteredCity(car.home)
    }
}

var timer = 1;
var daytimeCycle = 1;
var staticMap = new p5(renderMap)

function windowResized() {
    resize(window)
}

function draw() {
    clear()

    environment.daytime = timer % environment.dayDuration / environment.dayDuration;

    // console.log(environment.daytime)

    for(var carIndex = 0; carIndex < cars.length; carIndex++) {
        var car = cars[carIndex];

        car.update()
    }

    for(var cityIndex = 0; cityIndex < cities.length; cityIndex++) {
        var city = cities[cityIndex];

        if(events.driveHome && city.id == cityDict.Stuttgart) {
            city.sendCarHome()
        }

        if(events.driveToCenter && city.id != cityDict.Stuttgart) {
            city.sendCarTo(Nodes.getByName('Stuttgart'))
        }

        city.update()
    }

    if(environment.daytime > 0.5) {
        events.driveHome = true
    } else {
        events.driveHome = false
    }

    if(environment.daytime > 0.1 && environment.daytime < 0.4) {
        events.driveToCenter = true
    } else {
        events.driveToCenter = false
    }

    timer += 1;

    // renderAllNodes()

    // showPathFor(cars[0])

    debugMagic();
}

