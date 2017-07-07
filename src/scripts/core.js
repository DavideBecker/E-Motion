var testcar = 1

function setup() {
    colorMode(HSB)
    frameRate(60)
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

    environment.daytime = environment.dayDuration / timer % environment.dayDuration;

    for(var carIndex = 0; carIndex < cars.length; carIndex++) {
        var car = cars[carIndex];

        car.update()
    }

    for(var cityIndex = 0; cityIndex < cities.length; cityIndex++) {
        var city = cities[cityIndex];

        city.update()
    }

    if(environment.daytime && stuttgart.parkedCars.length) {
        stuttgart.sendCarHome()
    }

    timer += 1;

    // renderAllNodes()

    // showPathFor(cars[0])

    debugMagic();
}

