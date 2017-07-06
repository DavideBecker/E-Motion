var testcar = 1

function setup() {
    colorMode(HSB)
    frameRate(60)
    var canvas = createCanvas(500, 500)

    canvas.parent('canvas-wrapper');
    rectMode(CENTER)
    // testcar = new Car()
    // testcar.driveTo(Nodes.getRandomCity())

    resize(window)

    for(var i = 0; i < 100; i++) {
        new Car().driveTo(Nodes.getByName('Stuttgart'));
    }
}

var timer = 1;
var daytimeCycle = 1;

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

    showPathFor(cars[3])
}

